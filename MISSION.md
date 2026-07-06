# Mission: Raspberry Pi Zero 2 W with SQLite, FastAPI and MQTT

## Why
The user wants to set up a Raspberry Pi Zero 2 W as a local IoT hub. It will run an MQTT broker/client to receive and send sensor data from microcontrollers, store this data in a local SQLite database, and expose a FastAPI backend to manage and serve this data.

## Success looks like
- A running MQTT Broker (like Mosquitto) on Raspberry Pi Zero 2 W.
- A FastAPI application running on Raspberry Pi Zero 2 W connected to an SQLite database.
- Microcontrollers (like ESP32/ESP8266) successfully publishing sensor data to Raspberry Pi via MQTT, which FastAPI/Python subscribes to and saves into SQLite.
- Microcontrollers subscribing to MQTT topics to receive control signals from Raspberry Pi.

## Constraints
- Raspberry Pi Zero 2 W has limited resources (512MB RAM). System resources must be optimized.
- SQLite is used for simplicity and lightweight local storage.
- Python-based backend (FastAPI, paho-mqtt) needs to run efficiently.

## Out of scope
- Advanced cloud deployment (AWS/Azure IoT Core).
- High-concurrency heavy databases (PostgreSQL/MySQL).
- Building complex frontend dashboards (focus is backend/IoT integration).
