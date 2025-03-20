// Configuration object for easier maintenance
const config = {
    apiEndpoint: "http://localhost:3000/get_slots",
    refreshInterval: 3000,
    containerId: "parkingSlots"
};

/**
 * Fetches and renders parking slot information
 * @returns {Promise<void>}
 */
async function fetchParkingSlots() {
    const container = document.getElementById(config.containerId);
    
    // Show loading state
    container.classList.add("loading");
    
    try {
        const response = await fetch(config.apiEndpoint);
        
        // Handle non-OK responses
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const slots = await response.json();
        
        // Clear previous content only after successful data fetch
        container.innerHTML = "";
        
        // Create and append slot elements
        renderParkingSlots(slots, container);
        
    } catch (error) {
        console.error("Error fetching parking slots:", error);
        // Show user-friendly error message
        renderErrorMessage(container, error);
    } finally {
        // Remove loading state regardless of outcome
        container.classList.remove("loading");
    }
}

/**
 * Renders parking slots in the container
 * @param {Array} slots - Array of slot objects
 * @param {HTMLElement} container - Container element
 */
function renderParkingSlots(slots, container) {
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    if (slots.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No parking slots available at this time";
        message.classList.add("no-slots-message");
        fragment.appendChild(message);
    } else {
        slots.forEach(slot => {
            const slotDiv = document.createElement("div");
            const isOccupied = slot.status === "Occupied";
            
            slotDiv.classList.add("slot", isOccupied ? "occupied" : "available");
            slotDiv.setAttribute("data-slot-id", slot.slot_id);
            slotDiv.setAttribute("aria-label", `Slot ${slot.slot_id}, ${slot.status}`);
            
            slotDiv.innerHTML = `
                <span class="slot-id">Slot ${slot.slot_id}</span>
                <span class="slot-status">${slot.status}</span>
            `;
            
            fragment.appendChild(slotDiv);
        });
    }
    
    container.appendChild(fragment);
}

/**
 * Renders an error message in the container
 * @param {HTMLElement} container - Container element
 * @param {Error} error - Error object
 */
function renderErrorMessage(container, error) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.innerHTML = `
        <p>Unable to load parking information</p>
        <button id="retryButton">Retry</button>
    `;
    container.innerHTML = "";
    container.appendChild(errorDiv);
    
    // Add retry functionality
    document.getElementById("retryButton").addEventListener("click", fetchParkingSlots);
}

// Store timer ID for potential cleanup
let refreshTimerId;

/**
 * Initializes the parking slot system
 */
function initParkingSystem() {
    // Initial fetch
    fetchParkingSlots();
    
    // Set up periodic refresh
    refreshTimerId = setInterval(fetchParkingSlots, config.refreshInterval);
    
    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

/**
 * Handles page visibility changes to conserve resources
 */
function handleVisibilityChange() {
    if (document.hidden) {
        // Pause updates when tab is not visible
        clearInterval(refreshTimerId);
    } else {
        // Resume updates and fetch fresh data immediately
        fetchParkingSlots();
        refreshTimerId = setInterval(fetchParkingSlots, config.refreshInterval);
    }
}

// Initialize the system when DOM is ready
document.addEventListener("DOMContentLoaded", initParkingSystem);