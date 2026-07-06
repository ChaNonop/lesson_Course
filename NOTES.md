# User Preferences & Teaching Workspace Notes

## Design Preferences
*   **Theme:** Hex-editor / Memory Inspector technical dark theme (Dual-accent)
*   **Colors:**
    *   Canvas Background: `#0F1419` (graphite-blue)
    *   Orange Accent (`#E8944A`): Used for "List / Scattered" concepts (MQTT, Client devices, ESP32, distributed networks).
    *   Teal Accent (`#4FD1C5`): Used for "Contiguous / NumPy" concepts (FastAPI servers, SQLite, local database tables).
    *   Plum Accent (`#5E244E`) & Burgundy Accent (`#AA1C41`): Used for secondary layouts, borders, and error feedback elements.
    *   Text Cream (`#FFE8B4`) & Body Text (`#E2E8F0`): Code and layout labels.
*   **Fonts:**
    *   Labels, eyebrows, terminal boxes, and code snippets: `JetBrains Mono`
    *   Main content / Thai descriptions: `Inter` and `Noto Sans Thai`
*   **Motif:** Address Ruler showing hex counters (`0x00`, `0x08`, `0x10`...) aligned with sections.

## Interactive Systems
*   **Navigation:** A dynamically built navigation bar is injected at the top of each lesson and reference sheet to jump across lessons.
*   **Quiz Engine:** Inline disclosure feedback replacing native `alert()` browser popups for a sleek, immersive feel.
