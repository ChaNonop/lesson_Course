<div align="center">

# ⚡ Raspberry Pi IoT Hub & Edge Computing Lessons

### Interactive Local IoT Hub Development and System Orchestration Course

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![MQTT](https://img.shields.io/badge/MQTT-3C525F?style=for-the-badge&logo=mqtt&logoColor=white)](https://mqtt.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![PlatformIO](https://img.shields.io/badge/PlatformIO-F37626?style=for-the-badge&logo=platformio&logoColor=white)](https://platformio.org)

> บทเรียนเว็บแอปพลิเคชันแบบอินเตอร์แอคทีฟ รวบรวมแนวคิดและการสร้างระบบ local IoT Hub  
> บน Raspberry Pi Zero 2 W ตั้งแต่ระดับโครงสร้างข้อมูล SQLite WAL, MQTT, Docker, FastAPI ไปจนถึง ESP32 C++ OOP

</div>

---

## 🗺️ ภาพรวมโปรเจค (Project Overview)

**Raspberry Pi IoT Hub & Edge Computing Lessons** คือโปรเจคสื่อการเรียนรู้และทบทวนความรู้ส่วนตัวที่พัฒนาขึ้นมาในรูปแบบเว็บแอปพลิเคชันแบบตอบโต้ได้ (Interactive Web Application) เพื่อสรุปเนื้อหาและทบทวนความรู้ในการสร้างระบบ **IoT Hub** ภายในบ้านหรือเครือข่ายส่วนตัวด้วยบอร์ดทรัพยากรจำกัดอย่าง **Raspberry Pi Zero 2 W (512MB RAM)** โดยโครงสร้างบทเรียนจะเน้นไปที่การทำงานจริง มีภาพรวมการไหลของข้อมูลดังนี้:

```
ESP32 / ESP8266 (Sensors) ──(MQTT / JSON)──> MQTT Broker (Mosquitto) ──(Subscribe)──> FastAPI Backend (Python) ──(SQL)──> SQLite Database (.db WAL)
                                                                                                                           ▲
                                                                                                                           │
                                                                                                                        (HTTP)
                                                                                                                           │
                                                                                                                           ▼
                                                                                                                    Web Dashboard (UI)
```

---

## ✨ Features

| Feature                         | รายละเอียด                                                                                                          |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| ⚡ **Interactive UI Dashboard** | การแสดงผลหน้าจอเรียนรู้แบบ Technical Dark Theme (Hex Theme) พร้อม Sidebar และเมนูนำทางที่โหลดแบบ Dynamic            |
| 📖 **10 Lessons & Cheat Sheet** | เนื้อหาบทเรียนจัดลำดับความรู้รวม 10 บทเรียน พร้อม 1 หน้าเอกสารสรุปคำสั่งใช้งานจริง (Quick Reference Cheat Sheet)    |
| 📝 **Inline Quiz Engine**       | แบบทดสอบสั้น (Quick Quiz) ท้ายแต่ละบทเรียนเพื่อตรวจสอบความเข้าใจ พร้อมระบบแจ้งเฉลยและคำอธิบายโดยไม่ต้องรีเฟรชหน้าจอ |
| 🔬 **Full IoT Integration**     | เรียนรู้ครอบคลุมทั้งระบบ Firmware, Backend REST API, Database Optimization, และ Security                            |

---

## 🛠️ Tech Stack

- **HTML5 / CSS3 / JavaScript (ES6)** — พัฒนา UI หน้าการเรียนรู้และกลไกแบบอินเตอร์แอคทีฟทั้งหมด
- **FastAPI / Python** — สแต็คสำหรับเขียน Backend Service ในการรับค่าจาก MQTT และบริการ REST API
- **SQLite (WAL Mode)** — ระบบฐานข้อมูลเบาบาง (Lightweight DB) พร้อมฟีเจอร์เขียน/อ่านพร้อมกันโดยหลีกเลี่ยงข้อจำกัด Database Locked
- **MQTT (Mosquitto)** — ตัวกลางส่งสารถ่ายโอนข้อมูลเซ็นเซอร์แบบเรียลไทม์ผ่านกลไก Publisher/Subscriber
- **Docker & Docker Compose** — การทำ Containerization และประสานการทำงานระหว่าง Backend กับ Broker ให้ง่ายต่อการรัน
- **PlatformIO / C++ (Arduino Framework)** — การเขียนบอร์ด ESP32 ด้วยหลักการ OOP เพื่อให้โค้ดเฟิร์มแวร์มีความเป็นโมดูลและดูแลง่าย
- **Network & VPN Controls (Cloudflare Tunnel / Tailscale / PiVPN / Pi-hole)** — ความปลอดภัยเครือข่าย และการรีโมตจากนอกบ้าน

---

## 📚 สารบัญบทเรียนทั้งหมด (Course Index)

บทเรียนถูกออกแบบให้ไล่ลำดับทักษะจากโครงสร้างสถาปัตยกรรมพื้นฐานไปจนถึงระบบเครือข่ายและการรักษาความปลอดภัยระดับโปรดักชัน:

1. [**Lesson 1: ภาพรวมสถาปัตยกรรม IoT Hub**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0001-architecture-overview.html)
   - แนวคิด IoT Hub, การเลือก OS (Ubuntu Server vs Raspberry Pi OS), และการเปรียบเทียบการเก็บข้อมูล (Scattered vs Contiguous)
2. [**Lesson 2: การตั้งค่าระบบและการจัดการผ่าน Terminal**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0002-mqtt-broker-setup.html)
   - การควบคุมผ่าน SSH, คำสั่ง Linux Terminal พื้นฐาน และติดตั้ง Mosquitto Broker แบบเปิด Authentication
3. [**Lesson 3: Docker และ Docker Compose พื้นฐานสำหรับ IoT**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0003-docker-fundamentals.html)
   - ฟังก์ชัน Container, การเขียน Dockerfile และใช้ Compose รวมสแต็คบริการ IoT
4. [**Lesson 4: พัฒนา FastAPI เชื่อมต่อฐานข้อมูล SQLite**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0004-fastapi-sqlite-setup.html)
   - การเปิด SQLite WAL Mode ป้องกันคอขวดเขียนพร้อมกัน และการใช้ ORM (SQLAlchemy) หลีกเลี่ยง SQL Injection
5. [**Lesson 5: FastAPI MQTT Subscriber สำหรับบันทึกข้อมูล**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0005-fastapi-mqtt-subscriber.html)
   - พัฒนา Background Client ใน Python เพื่อดักรอรับ Payload แล้วบันทึกเข้า SQLite
6. [**Lesson 6: สร้าง Responsive Web Dashboard**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0006-responsive-dashboard.html)
   - การเขียน Dashboard UI ป้องกันความปลอดภัย XSS ด้วย DOM Text Node binding และดึงค่าแบบ REST Polling
7. [**Lesson 7: รีโมทควบคุมผ่าน Cloud Tunnel และ VPN**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0007-cloud-tunnel-vpn.html)
   - ตั้งค่า Cloudflare Tunnel เชื่อมต่อภายนอกแบบปลอดภัย และ Tailscale Peer-to-Peer Mesh VPN
8. [**Lesson 8: แนวคิดการออกแบบ OOP สำหรับ IoT**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0008-oop-cpp-python.html)
   - ทบทวนหลักการ OOP (Encapsulation, Inheritance, Polymorphism) ในภาษา C++ และ Python
9. [**Lesson 9: เขียนเฟิร์มแวร์ ESP32 ด้วยโครงสร้าง OOP บน PlatformIO**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0009-microcontroller-esp32-platformio.html)
   - ตั้งค่าโปรเจค PlatformIO, จัดโครงสร้างคลาสบอร์ด ESP32, และออกแบบ Non-blocking Reconnection (ใช้ `millis()`)
10. [**Lesson 10: ความปลอดภัยเครือข่ายภายในบ้านด้วย PiVPN & Pi-hole**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0010-pivpn-pihole-setup.html)
    - ติดตั้งระบบบล็อกโฆษณาด้วย DNS Sinkholing (Pi-hole) และจัดการ Client-Server VPN ด้วย WireGuard
11. [**Cheat Sheet: IoT Hub Quick Reference**](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/reference/iot-hub-cheat-sheet.html)
    - รวมชุดคำสั่งด่วนและตัวอย่างโค้ดลัดสำหรับใช้คัดลอก (Copy/Paste) เพื่อขึ้นระบบจริงทันที

---

## 📁 โครงสร้างโปรเจค (Project Directory Structure)

```
IoT-and-Sqlite/
├── .agents/                 # การตั้งค่า Skill และ AI Agent ประจำระบบ
├── learning-records/        # บันทึกประวัติพัฒนาบทเรียนและสเปก UI
│   ├── 0001-established-mission-and-curriculum.md
│   ├── 0002-hex-theme-redesign.md
│   └── 0003-quiz-system-declarative-attributes.md
├── lessons/                 # ไฟล์หน้าบทเรียนอินเตอร์แอคทีฟ (.html)
│   ├── 0001-architecture-overview.html
│   ├── 0002-mqtt-broker-setup.html
│   ├── ...
│   └── 0010-pivpn-pihole-setup.html
├── reference/               # ไฟล์เอกสารสรุปความรู้ด่วน
│   └── iot-hub-cheat-sheet.html
├── CONTEXT.md               # นิยามคำศัพท์ของบทเรียนและ Domain Glossary
├── MISSION.md               # ข้อจำกัดของฮาร์ดแวร์และเป้าหมายของบทเรียน
├── NOTES.md                 # รายละเอียดโทนสี ดีไซน์ (Hex Technical Theme) และฟอนต์
├── REDESIGN_PLAN.md         # แผนการอัปเดตและปรับแต่งหน้าเว็บ
├── RESOURCES.md             # แหล่งข้อมูลและลิ้งก์คู่มือหลัก
├── main.js                  # สคริปต์กลางในการฉีด Sidebar และควบคุมการทำงานของ Quiz
├── style.css                # ไฟล์สไตล์ CSS หลัก
└── README.md                # แนะนำบทเรียนโครงสร้างหลัก (ไฟล์นี้)
```

---

## 🚀 วิธีการเริ่มเรียนรู้ (Getting Started)

โครงสร้างระบบถูกออกแบบให้เป็น **Static Web Client Engine** ดังนั้นจึงสามารถเปิดอ่านและทำควิซทบทวนความรู้ได้โดยตรงจากเครื่องคอมพิวเตอร์ของคุณโดยไม่ต้องต่ออินเทอร์เน็ตหรือรันเซิร์ฟเวอร์ใดๆ:

1. **ดาวน์โหลดหรือ Clone โปรเจคนี้** มายังเครื่องโลคอล:

   ```bash
   git clone https://github.com/ChaNonop/lesson_Course.git
   cd lesson_Course
   ```

2. **เปิดบทเรียนบทที่ 1** เพื่อเริ่มต้นศึกษา:
   - เข้าโฟลเดอร์ `lessons/` และดับเบิลคลิกเปิดไฟล์ [0001-architecture-overview.html](file:///c:/5.Datasheet/บทเรียน IoT/IoT and Sqlite/lessons/0001-architecture-overview.html) ผ่านเว็บบราวเซอร์ (Chrome, Firefox, Edge หรือ Safari)

3. **เรียนรู้อย่างต่อเนื่อง:**
   - ระบบจะใช้ `main.js` ทำการตรวจหาหน้าปัจจุบันและแสดงเมนู Sidebar ขึ้นมาโดยอัตโนมัติ ช่วยให้สามารถสลับบทเรียน ทำควิซท้ายบท หรือเปิด Cheat Sheet ได้อย่างลื่นไหลทันที

---

## 🧠 แนวคิดสำคัญที่บันทึกและทบทวน (Key Concepts Documented)

- **SQLite WAL Mode**: การสลับไปใช้ Write-Ahead Logging เพื่อช่วยให้ SQLite สามารถประมวลผลการอ่านและเขียนพร้อมกันได้อย่างลื่นไหล เหมาะสำหรับฐานข้อมูล IoT ที่มีการล็อกค่าบ่อยๆ
- **Non-blocking Firmware Design**: การหลีกเลี่ยงการใช้คำสั่ง `delay()` ในบอร์ด ESP32 โดยหันมาเช็คความถี่ด้วยเวลาอิงตามฟังก์ชัน `millis()` เพื่อควบคุมวงจรตรวจวัดได้อย่างเสถียร
- **Robust Network Tunneling & Access Control**: การเข้าถึง Backend Server ของ Pi Zero 2 W ได้อย่างปลอดภัยผ่านการเปิด Cloudflare Tunnel (หรือ VPN Tailscale/WireGuard) ซึ่งแก้ปัญหาการเปิดเผย IP และปัญหาเราเตอร์ส่วนตัวไม่มี IP สาธารณะ
- **XSS & SQL Injection Defense**: ทบทวนการเขียนโค้ดหลังบ้านและหน้าเว็บบอร์ดให้ปลอดจากภัยคุกคาม ด้วยการทำ parameterization ใน ORM (SQLAlchemy) และการผูกค่า DOM ด้วย `.textContent` เท่านั้น

---

## 🤝 ผู้จัดทำ (Author)

- **ผู้พัฒนาหลัก:** [ChaNonop](https://github.com/ChaNonop)
- **วัตถุประสงค์:** บทเรียนที่สร้างขึ้นเองทั้งหมดนี้ถูกสร้างมาเพื่อใช้ทบทวนความรู้ ทักษะทางด้าน IoT, Python Backend, Embedded C++, Docker Containers และ System Networking
- ⭐ หากคิดว่าบทเรียนและโครงสร้างชุดนี้เป็นประโยชน์ อย่าลืมกด Star ใน repository ด้วยนะครับ! 😊
