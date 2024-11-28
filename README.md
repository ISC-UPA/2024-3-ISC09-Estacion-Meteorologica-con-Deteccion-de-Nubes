# 2024-3-ISC09-Weather-Station-with-Cloud-Detection

This project consists of a Meteorological Station with Cloud Detection using various technologies. The system is designed to collect meteorological data, process it, and use cloud detection algorithms to provide insights. The system is built with a KeystoneJS backend, a React frontend, and it will also include a future Raspberry Pi application to handle data collection from sensors.
 The project is divided into four main folders:

- **01_Docs**: Contains the project documentation.
- **Raspberry**: Contains the Python files needed for the Raspberry Pi, including scripts for humidity, temperature, and atmospheric pressure sensors.
- **backend**: Runs the application API using KeystoneJS.
- **frontend**: Mobile application developed with React Native and Expo.

## Requirements

Before starting, make sure you have the following requirements installed:

- Node.js
- npm (Node Package Manager)
- Python 3
- Raspberry Pi with Raspbian installed
- Humidity, temperature, and atmospheric pressure sensors
- KeystoneJS
- Expo

## Setup and Deployment Instructions

### 1. Raspberry Pi Setup

1. *Clone the repository to your Raspberry Pi:*

    ```bash
    git clone https://github.com/your-username/2024-3-ISC09-Weather-Station-with-Cloud-Detection.git
    cd 2024-3-ISC09-Weather-Station-with-Cloud-Detection/Raspberry
    ```

2. *Install the Python dependencies:*

    ```bash
    pip3 install -r requirements.txt
    ```

4. *Run the sensor scripts:*

    ```bash
    python3 final.py
    ```

### 2. Backend Setup

1. *Navigate to the backend folder:*

    ```bash
    cd ../backend
    ```

2. *Install the backend dependencies:*

    ```bash
    npm install
    ```

4. *Start the Keystone server:*

    ```bash
    npm run build
    npm run start
    ```

### 3. Frontend Setup

1. *Navigate to the frontend folder:*

    ```bash
    cd ../frontend
    ```

2. *Install the frontend dependencies:*

    ```bash
    npm install
    ```

3. *Configure Expo:*

    Make sure you have Expo CLI installed globally:

    ```bash
    npm install -g expo-cli
    ```

4. *Start the mobile application:*

    ```bash
    npm run start
    ```

### 4. Documentation

1. *Navigate to the 01_Docs folder to access the project documentation:*

    ```bash
    cd ../01_Docs
    ```

2. *Review the documentation for additional details on setup, usage, and maintenance of the project.*

## Contribution

If you want to contribute to the project, please follow these steps:

1. Fork the project.
2. Create a new branch (```git checkout -b feature/new-feature```).
3. Make your changes and commit them (```git commit -am 'Add new feature'```).
4. Push to the branch (```git push origin feature/new-feature```).
5. Open a Pull Request.
