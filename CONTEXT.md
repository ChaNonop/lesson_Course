# Domain Glossary & System Context

This document captures the canonical terminology and domain boundaries resolved during the curriculum redesign and technical alignment.

## Core Domain Terms

### SQLite Concurrency (WAL Mode)
Write-Ahead Logging (WAL) is a journal mode in SQLite that changes how transactions are logged. Instead of writing directly to the main database file, changes are written to a separate `.db-wal` file. This allows multiple reader threads to read concurrent with a writer thread, avoiding the common `database is locked` error in multi-device IoT setups.

### Busy Timeout
A configuration parameter for the database connection engine. It dictates how many milliseconds SQLite should wait (retry) to acquire a lock on the database before raising an `OperationalError`. In SQLAlchemy, it is passed in `connect_args` as `{"timeout": 30}` (30 seconds).

### SQLite Language Syntax
The SQL dialect used by SQLite. It is a lightweight, standard-compliant query language. For this IoT curriculum, the essential queries include table creation (`CREATE TABLE`), record insertions (`INSERT INTO`), and sequential queries (`SELECT` with `ORDER BY` and `LIMIT` clauses) optimized for time-series sensor logs.

### MQTT Authentication
A security model where the MQTT Broker requires clients (such as the ESP32 microcontroller or the FastAPI backend) to authenticate using a unique username and password. This prevents unauthorized clients on the local network from publishing fraudulent sensor data or subscribing to private actuator control channels.

### Cloud Tunnel (Inbound Security)
A network configuration where a secure agent (like Cloudflare Tunnel or Tailscale) runs on the local server and establishes an outbound tunnel to a cloud gateway. This allows external clients to access the local FastAPI web dashboard securely without requiring public IP addresses, home router port forwarding, or firewall exceptions. Access can be restricted to authorized users using access controls (like email OTP).

### Responsive Web Dashboard
A single-page web application served by FastAPI from a `/static` directory that adapts dynamically to different screen sizes (desktop, tablet, mobile). It consumes JSON data from the backend REST API via polling at configured intervals to display telemetry history and toggle active controls.

### Non-blocking Reconnection (Embedded Systems)
A connection management pattern in microcontrollers where connectivity state is verified asynchronously using non-blocking timers (`millis()`). It replaces blocking `while` loops and `delay()` statements, ensuring the microcontroller's main physical execution loop remains active to handle local operations even during network dropouts.

### Arduino C++ OOP Encapsulation & Polymorphism
An embedded software pattern where Wi-Fi connections, MQTT client interactions, and payload serialization are encapsulated within dedicated C++ classes, and sensor configurations are modeled using inheritance (`SensorReader` parent class, with `DHTSensorReader` and `AnalogSensorReader` child classes). Credentials security is maintained by separating credentials into `include/secrets.h` and ignoring it via `.gitignore`. This isolates hardware and communication logic, ensuring safe, modular, and reusable micro-controller firmware.


### SQL Injection Mitigation (ORM Parameterization)
A security pattern where queries are executed using parameterized statements rather than string concatenation. By utilizing SQLAlchemy ORM to build queries, input variables are automatically treated as parameters, fully preventing SQL Injection attacks.

### Cross-Site Scripting (XSS) Prevention
A web client security control. The dashboard prevents malicious code injection into the browser document structure by binding incoming sensor data properties strictly to safe DOM text nodes (using `.textContent` or `.innerText` in Javascript) rather than raw HTML parsing (`.innerHTML`).

### Payload Size Limits & Type Constraints
An input validation pattern where incoming MQTT message buffers are capped to a maximum byte length (e.g., 512 bytes) on the broker/client, and Pydantic schemas enforce value boundaries to prevent Denial of Service (DoS) or memory exhaustion attacks from corrupted payloads.

### Docker Compose Orchestration
A declarative multi-container management tool using a single `docker-compose.yml` file to define, link, and start all backend services (Mosquitto broker + FastAPI backend) in a shared internal network bridge. Services refer to each other by container name (hostname) rather than IP addresses. A single `docker compose up -d` command starts the entire stack. Volume mounts are used to persist the SQLite database file on the host machine outside the container lifecycle.

### Cloudflare Tunnel
An outbound secure tunnel agent (`cloudflared`) installed on the local server that registers a public HTTPS URL for the FastAPI web dashboard without requiring router port forwarding or a public IP address. Access policies are enforced through Cloudflare Access (email OTP or Google OAuth), limiting dashboard visibility to a named list of authorized users.

### Tailscale
A peer-to-peer VPN mesh network using WireGuard under the hood. Devices enrolled in the same Tailnet receive stable private IP addresses and can connect directly regardless of NAT or firewall configuration. For this project, it enables secure remote SSH access to the server and MQTT broker inspection without exposing any public endpoints. Requires the Tailscale client installed on each accessing device.

### PlatformIO
A professional embedded development environment (VS Code extension) used in place of Arduino IDE for writing, building, and uploading firmware to ESP32 and ESP8266 boards. It manages library dependencies via `platformio.ini`, supports OOP-structured `.cpp`/`.h` file separation (not a single monolithic `.ino` file), and provides a serial monitor and debugger integrated into VS Code.

### DNS Sinkholing (Pi-hole)
A network security pattern that intercepts DNS queries for known advertising, tracking, or malicious domains and returns an invalid IP address (sinkhole), blocking access at the domain-name resolution level before any network connections are established.

### Client-Server VPN (PiVPN)
A virtual private network deployment model where client devices connect to a central server acting as a gateway (using protocols like WireGuard or OpenVPN). Requires port forwarding on the server's router for external inbound connections.

### WireGuard
A modern, extremely fast, and lightweight VPN protocol operating directly in Linux kernel space, offering high performance, rapid handshakes, and low CPU/memory overhead.

### OpenVPN
A robust, highly configurable open-source VPN protocol that operates in user space, supporting broad legacy platforms and complex routing setups at the expense of higher CPU and memory overhead.

### Port 53 Conflict (systemd-resolved)
A common Linux networking issue where the default local DNS resolver stub (`systemd-resolved`) binds to port 53 on the loopback interface, preventing third-party DNS servers (like Pi-hole) from binding to the same port unless stub resolving is disabled or reconfigured.

