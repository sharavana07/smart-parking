# 🅿️ Smart Parking System  
### 🚗 Real-Time IoT Solution for Layered Parking

<p align="center">
  <img src="frontend/assets/Smart Parking.jpg" alt="Smart Parking Logo" width="300"/>
</p>

---

## 📌 Overview

The **Smart Parking System** is an IoT-driven solution developed to simplify vehicle parking management in layered parking environments. Utilizing **ESP32 microcontrollers** and **HC-SR04 ultrasonic sensors**, the system detects real-time slot availability and updates the status live on a user-friendly web interface.

---

## ✨ Features

- 🚙 Accurate detection of occupied and free parking slots  
- ⚡ Real-time data transmission via ESP32 microcontroller  
- 🌐 Node.js backend server for serial communication and routing  
- 🖥️ Interactive frontend for users to view parking availability  
- 🔄 Simulation option for development without hardware  

---

## 🧭 System Workflow

```
[HC-SR04 Sensors] → [ESP32 Microcontroller] → [Node.js Server] → [Web Frontend]
```

---

## ⚙️ Tech Stack

| Component  | Technologies/Tools                |
|------------|-----------------------------------|
| Hardware   | ESP32, HC-SR04                    |
| Backend    | Node.js, Express, SerialPort      |
| Frontend   | HTML, CSS, JavaScript             |
| Others     | Git, GitHub, VS Code              |

---

## 📂 Folder Structure

```
SmartParkingSystem/
├── assets/               # Logo and supporting media
│   └── Smart Parking.jpg
├── backend/              # Node.js backend files
│   └── index.js
├── frontend/             # HTML/CSS/JS for UI
│   └── index.html
├── .env                  # Config (PORT, DEVICE_PATH)
├── README.md             # Project documentation
└── package.json          # Node dependencies
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SmartParkingSystem.git
cd SmartParkingSystem
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file:

```env
PORT=3000
DEVICE_PATH=/dev/ttyUSB0   # or COMx (Windows)
```

### 4. Run the Backend

```bash
node backend/index.js
```

### 5. Access the Frontend

Open your browser and visit:
```
http://localhost:3000
```

---

## 👥 Contributors

| Name                 | Role                        |
|----------------------|-----------------------------|
| Sharavana Ragav S.   | Backend + Frontend Developer|
| Aryan Sharma         | ESP32 Hardware Integration  |
| Abhishek             | Sensor Logic & Circuitry    |

---

## 🧩 Future Enhancements

- Firebase/MQTT-based cloud data sync  
- React Native mobile application  
- Real-time analytics and slot history  
- QR-based secure parking access  

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📣 Connect

📫 [Sharavana Ragav S. on LinkedIn](https://www.linkedin.com/in/sharavanaragav)  
📦 GitHub: [@SharavanaRagav](https://github.com/SharavanaRagav)

> “You can park here — smarter, faster, and stress-free.”  
> — Smart Parking System
```

Let me know if you'd like this saved as a `.md` file, or if you need help with the GitHub `push` instructions.
