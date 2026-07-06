# แผนการปรับปรุงหลักสูตรและดีไซน์ (Consolidated Redesign & Curriculum Plan)
**สถานะ: [Approved]**

เอกสารนี้รวบรวมแผนการปรับปรุงระบบการเรียนการสอน IoT Hub ทั้งในส่วนของดีไซน์ (Responsive Dual-Accent Technical Theme) และการขยายเนื้อหาบทเรียนเชิงลึก (Best Practices) เพื่อใช้เป็นแนวทางในการลงมือแก้ปัญหา

---

## 🎨 1. ระบบดีไซน์และธีม (UI/UX Design System)

### A. พาเลทสี Dual-Accent Technical Theme (Hex-Editor Style)
เราเลือกใช้โทนสีเข้มแนวดีบักเกอร์ ผสานเข้ากับชุดสีของ Color Hunt (`5e244e`, `aa1c41`, `e68457`, `ffe8b4`) และกำหนดความหมายของคู่สีเน้น (Dual-Accent) เพื่อให้สีทำหน้าที่สื่อสารเชิงลึก:

| ตัวแปร CSS | ธีมมืด (Dark Mode - Default) | ธีมสว่าง (Light Mode) | การใช้งาน |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#0F1419` (Graphite-Blue) | `#FFE8B4` (Cream) | พื้นหลังหลักของระบบ |
| `--bg-card` | `#141A24` (Dark Card) | `#FFFFFF` (White Card) | พื้นหลังของการ์ดและเมนู |
| `--text-body` | `#E2E8F0` (Off-white) | `#5E244E` (Plum) | ข้อความทั่วไปและคำอธิบาย |
| `--text-cream` | `#FFE8B4` (Cream) | `#AA1C41` (Burgundy) | หัวข้อ โค้ด และส่วนเน้นย้ำ |
| `--border-plum` | `#5E244E` | `#E68457` (Peach) | เส้นขอบและการ์ดทั่วไป |
| `--accent-orange`| `#E8944A` (Orange) | `#E68457` (Orange) | **Scattered/List Zone** (MQTT, Client, ESP32) |
| `--accent-teal` | `#4FD1C5` (Teal) | `#0E7C7B` (Dark Teal) | **Contiguous/NumPy Zone** (FastAPI, SQLite, DB Pages) |

### B. โครงสร้าง Layout (Responsive Left Sidebar)
*   **Desktop:** แสดงผลเป็นแถบข้างความกว้าง 260px ตรึงไว้ทางซ้าย (Fixed Left Sidebar) โดยจะแยกหัวข้อย่อยเป็น **Parts** เพื่อให้ผู้เรียนกด Anchor Link กระโดดไปยังเนื้อหาที่สนใจได้ทันที
*   **Mobile:** แถบข้างจะหุบตัวลง และแปลงร่างเป็นเมนูแบบแฮมเบอร์เกอร์ (Hamburger Menu) ที่กดเปิด-ปิดจากด้านบนสุดของหน้าจอ เพื่อให้รองรับการเปิดอ่านบนสมาร์ทโฟน
*   **Theme Switcher:** มีปุ่ม `🌓 Toggle Theme` สำหรับสลับธีมมืด/สว่างได้แบบเรียลไทม์ และบันทึกสถานะไว้ใน `localStorage`
*   **Address Ruler:** วิ่งแสดงค่า Offset อัตโนมัติ (`0x00`, `0x08`, `0x10`...) ที่ด้านซ้ายของการ์ดเนื้อหาแต่ละส่วน
*   **Previous/Next Navigation:** เพิ่มปุ่มเปลี่ยนบทเรียนขนาดใหญ่ที่ส่วนท้ายสุดของทุกหน้าเว็บ

---

## 🏗️ 2. โครงสร้างไฟล์โปรเจคในบทเรียน (Project Structure)

เพื่อความเป็นสัดส่วนและสอดคล้องกับแนวทางปฏิบัติระดับโปรดักชัน (Best Practices) เราจะสอนโครงสร้างแบบแยกโฟลเดอร์งานดังนี้:

```
iot-hub/
├── docker-compose.yml          # มัดรวม Broker + Backend ไว้ด้วยกัน
├── mosquitto/
│   └── config/
│       ├── mosquitto.conf      # คอนฟิกความปลอดภัยของโบรกเกอร์
│       └── passwd              # ไฟล์รหัสผ่าน MQTT
├── backend/
│   ├── Dockerfile              # สำหรับแพ็ก FastAPI App เป็น Container
│   ├── requirements.txt
│   ├── main.py                 # จุดเริ่มต้นของเซิร์ฟเวอร์ + Lifespan handler
│   ├── database.py             # จัดตั้ง SQLAlchemy Connection + เปิด WAL Mode
│   ├── models.py               # โครงสร้างตาราง SQLite (ORM Models)
│   ├── schemas.py              # ตัวควบคุมการรับส่งข้อมูล (Pydantic Schemas)
│   ├── mqtt_client.py          # คลาสควบคุม MQTT (OOP)
│   ├── routers/
│   │   ├── sensors.py          # จัดการข้อมูล telemetry
│   │   └── actuators.py        # จัดการคำสั่งเปิด-ปิดไฟ
│   └── static/
│       ├── index.html          # Responsive Dashboard
│       ├── dashboard.js        # JavaScript (REST Polling + Chart)
│       └── style.css           # สไตล์ของหน้าแดชบอร์ด
└── firmware/
    ├── esp32/                  # โปรเจค PlatformIO สำหรับ ESP32
    │   ├── platformio.ini      # จัดการ Library และ Board settings
    │   ├── src/
    │   │   └── main.cpp        # โค้ดหลัก
    │   └── include/
    │       ├── MqttManager.h
    │       └── WifiManager.h
    └── esp8266/                 # โปรเจค PlatformIO สำหรับ ESP8266
        ├── platformio.ini
        ├── src/
        │   └── main.cpp
        └── include/
            ├── MqttManager.h
            └── WifiManager.h
```

---

## 📚 3. แผนการปรับปรุงบทเรียน (Curriculum Structure)

### 🔵 Lesson 1: ภาพรวมสถาปัตยกรรม (Architecture Overview)
*   **Part 1: IoT Hub Concept** - บล็อกไดอะแกรมเชื่อมโยง ESP32 -> Mosquitto -> FastAPI -> SQLite ⬌ Web Dashboard
*   **Part 2: Platform Selection** - การเลือกใช้งาน Linux Server บนคอมพิวเตอร์ทั่วไป (Ubuntu) เทียบกับ Raspberry Pi OS
*   **Part 3: Data Memory Layout** - เปรียบเทียบความหมายของ Scattered Packet ในเครือข่าย กับ Contiguous DB Pages ในดิสก์

### 🔵 Lesson 2: การควบคุม Terminal, tmux และติดตั้ง MQTT Broker
*   **Part 1: Linux Terminal** - คำสั่งพื้นฐานที่จำเป็นในการควบคุมเซิร์ฟเวอร์และส่องดู Log (`journalctl`)
*   **Part 2: tmux session** - วิธีควบคุมเซสชัน tmux ขั้นพื้นฐาน, คำสั่งแบ่งหน้าจอ (Split Panes) บน-ล่าง ซ้าย-ขวา, สลับบล็อก และการเข้า-ออก
*   **Part 3: Mosquitto Installation** - การติดตั้งทั้งแบบตรงด้วย `apt` และแบบรันผ่าน Docker Container
*   **Part 4: MQTT Security** - ยกเลิกการเชื่อมต่อภายนอกแบบสุ่มสี่สุ่มห้าด้วยการทำ Authentication (Username/Password)

### 🔵 Lesson 3: พื้นฐาน Docker และการใช้งานในระบบ IoT Hub
*   **Part 1: Docker คืออะไร** - เปรียบเทียบระหว่าง Virtual Machine (VM) กับ Container และสถาปัตยกรรมการแชร์ Kernel
*   **Part 2: 4 เสาหลักของ Docker** - ทำความเข้าใจ Image, Container, Volume (Stateless vs State persistence) และ Network
*   **Part 3: คำสั่งควบคุม Docker CLI** - การใช้งาน `run`, `ps`, `logs`, `stop`, `start`, `rm`
*   **Part 4: Docker Compose เบื้องต้น** - ตัวจัดระเบียบหลายตู้ผ่านไฟล์ `docker-compose.yml` ด้วยคำสั่ง `up` และ `down`

### 🔵 Lesson 4: การจัดทำระบบ FastAPI และ SQLite 
*   **Part 1: Python Virtual Environment** - การใช้ venv เพื่อสร้างกล่องทรายหลีกเลี่ยงไลบรารีระบบชนกัน
*   **Part 2: SQLite Syntax & Performance** - คำสั่ง SQL พื้นฐาน และการจูนความไวด้วย **WAL (Write-Ahead Logging) Mode** เพื่อป้องกันปัญหา Database Locked
*   **Part 3: ORM & Data Validation** - การใช้ SQLAlchemy กำหนดรุ่นตาราง และใช้ **Pydantic** ตรวจสอบชนิดข้อมูลก่อนเซฟลงฐานข้อมูล
*   **Part 4: Docker & Docker Compose Orchestration** - การเขียน `Dockerfile` สำหรับแอป FastAPI และเชื่อมบริการเข้าหากัน

### 🔵 Lesson 5: การผสานการทำงานของ MQTT Client ภายใน FastAPI
*   **Part 1: Encapsulated MQTT Client** - เขียนคลาสสวมทับ (Wrapper Class) เพื่อควบคุมการรับส่งข้อความแบบ OOP
*   **Part 2: Multi-threading Database Session** - การใช้ `sessionmaker` เปิด-ปิดเซสชันตารางข้อมูลในเธรดเบื้องหลังของ MQTT callback อย่างปลอดภัย
*   **Part 3: Data Integrity Protection** - การจำกัดขนาด Payload (512 bytes) และเขียนบล็อกดักตรวจข้อผิดพลาด

### 🔵 Lesson 6: หน้าเว็บบอร์ดแสดงผลแบบตอบสนอง (Responsive Dashboard)
*   **Part 1: Static Files Service** - วิธีสั่งให้ FastAPI ส่งไฟล์ HTML/JS หน้าบ้านจากโฟลเดอร์ `/static`
*   **Part 2: REST Polling, Time-based Filtering & Chart.js Integration** - การเขียนกราฟเส้นสีนีออนม่วง-ฟ้าแสดงแนวโน้มข้อมูลเซ็นเซอร์ พร้อมเพิ่มกล่อง Dropdown สำหรับกรองข้อมูลย้อนหลังตามช่วงเวลา (1 นาที, 15 นาที, 1 วัน และ 1 สัปดาห์)
*   **Part 3: Interactive Actuator Command** - ปุ่มสั่งกระพริบ LED (BLINK) ที่เรียก API ไปพับลิชค่าสั่งการข้ามเครือข่าย
*   **Part 4: XSS Prevention** - ข้อควรระวังและการใช้คำสั่ง `.textContent` ฝั่งเบราว์เซอร์เพื่อความปลอดภัย

### 🔵 Lesson 7: รีโมทข้ามโครงข่ายด้วย Cloudflare Tunnel และ Tailscale
*   **Part 1: Cloudflare Tunnel** - วิธีผูกโดเมนย่อยให้เว็บภายนอกเข้าถึงแดชบอร์ดได้โดยไม่ต้องเปิดพอร์ตที่บ้าน พร้อมตั้งรหัสยืนยันตัวตนผ่าน Cloudflare Access (Email OTP)
*   **Part 2: Tailscale VPN** - การใช้ WireGuard VPN เชื่อมโยงอุปกรณ์ส่วนตัวเข้าหาเซิร์ฟเวอร์โดยตรงเพื่อการ SSH

### 🔵 Lesson 8: พื้นฐาน OOP และหลักการ 4 เสาหลัก (C++ & Python) [บทเรียนใหม่]
*   **Part 1: Class & Object Fundamentals** - องค์ประกอบของคลาส และความแตกต่างระหว่าง Attribute กับ Method
*   **Part 2: Encapsulation (การห่อหุ้ม)** - การใช้ Access Specifiers ใน C++ (`public`, `private`) และกลไกใน Python (การใช้ single `_` และ double `__` prefix) พร้อมการใช้ Getter/Setter
*   **Part 3: Inheritance (การสืบทอด)** - การทำซ้ำคุณลักษณะ และคีย์เวิร์ด `super()` ใน Python และ `virtual`/`override` ใน C++
*   **Part 4: Polymorphism & Abstraction** - การพหุสัณฐานและการเขียน Interface หรือ Abstract Class เพื่อกำหนดกรอบการเชื่อมต่อ

### 🔵 Lesson 9: การพัฒนาเฟิร์มแวร์ ESP32/ESP8266 แบบไร้รอยต่อ [บทเรียนเดิมที่เลื่อนดัชนี]
*   **Part 1: secrets.h & .gitignore Credentials Security** - ย้าย Wi-Fi SSID, Password และ MQTT credentials ไปไว้ที่ไฟล์ `secrets.h` และเพิ่มใน `.gitignore` เพื่อความปลอดภัย
*   **Part 2: PlatformIO Multi-Board Configuration** - สอนตั้งค่าบอร์ดใน `platformio.ini` โดยใส่คอนฟิกทั้งของ `[env:esp32dev]` และ `[env:nodemcuv2]`
*   **Part 3: C++ OOP Sensor Inheritance** - สร้างคลาสลูก `DHTSensorReader` (สำหรับ ESP32 DHT11) และ `AnalogSensorReader` (สำหรับ ESP8266 Analog A0) โดยสืบทอดคุณสมบัติมาจากคลาสแม่ `SensorReader`
*   **Part 4: Non-blocking LED Blinking (millis())** - เมื่อได้รับคำสั่ง `"BLINK"` บอร์ดจะสั่งไฟกระพริบ 5 ครั้ง โดยใช้วิธีจับเวลาแบบไม่ขัดจังหวะตัวเครื่อง
*   **Part 5: Integration Testing** - การทดสอบระบบจริง ตั้งแต่ตรวจเช็คข้อมูลบนบอร์ด ส่งไป Pi และการแสดงผลบนเว็บแดชบอร์ด

---

### 🟠 [เนื้อหาเพิ่มเติม - Supplementary Content]
### 🔵 Lesson 10: การสร้างระบบเครือข่ายและความปลอดภัยส่วนบุคคล (PiVPN, Tailscale และ Pi-hole) [บทเรียนเสริม]
*   **Part 1: Network Theory & Hardware Compatibility** - ทฤษฎี VPN (Client-Server vs P2P Mesh), ทฤษฎี DNS Sinkholing (Pi-hole), ข้อจำกัดทรัพยากรบน Raspberry Pi OS (512MB RAM OOM warning) และรายการบอร์ดคอมพิวเตอร์ที่แนะนำ (Pi 4/5, Ubuntu Desktop/Server)
*   **Part 2: Bare-metal Installation & DNS Integration** - การติดตั้ง PiVPN (WireGuard & OpenVPN) และ Pi-hole แบบติดตั้งตรงบนระบบ (Bare-metal), การตั้งค่าให้ VPN clients วิ่งเข้าหา DNS ของ Pi-hole เพื่อบล็อกโฆษณาและเรียกใช้ชื่อโดเมนภายใน (`iothub.local`)
*   **Part 3: Docker-based Pi-hole & Port 53 Resolving** - การรัน Pi-hole ผ่าน Docker Compose ควบคู่กับระบบ FastAPI, วิธีแก้ไขปัญหาพอร์ต 53 ชนกันกับ `systemd-resolved` บน Linux, และการกำหนดสิทธิ์ความปลอดภัยในระดับเครือข่าย Container
*   **Part 4: Remote DNS Access via Tailscale (MagicDNS)** - การผูกเซิร์ฟเวอร์เข้ากับเครือข่าย P2P Tailnet, และการกำหนดค่า MagicDNS บนแดชบอร์ด Tailscale เพื่อชี้พิกัดคำถาม DNS ไปยัง Pi-hole ทำให้ทุกอุปกรณ์ที่เชื่อมต่อได้รับการปกป้องจากภายนอกโดยสมบูรณ์



