document.addEventListener("DOMContentLoaded", () => {
    // 1. Identify current page
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || "0001-architecture-overview.html";

    // List of lessons and paths (10 lessons + Cheat Sheet with categories)
    const menuItems = [
        { name: "L1: Architecture", file: "0001-architecture-overview.html", type: "lesson", category: "core" },
        { name: "L2: Terminal & MQTT", file: "0002-mqtt-broker-setup.html", type: "lesson", category: "core" },
        { name: "L3: Docker Intro", file: "0003-docker-fundamentals.html", type: "lesson", category: "core" },
        { name: "L4: FastAPI & SQLite", file: "0004-fastapi-sqlite-setup.html", type: "lesson", category: "core" },
        { name: "L5: FastAPI + MQTT", file: "0005-fastapi-mqtt-subscriber.html", type: "lesson", category: "core" },
        { name: "L6: Web Dashboard", file: "0006-responsive-dashboard.html", type: "lesson", category: "core" },
        { name: "L7: Tunnel & VPN", file: "0007-cloud-tunnel-vpn.html", type: "lesson", category: "core" },
        { name: "L8: OOP Principles", file: "0008-oop-cpp-python.html", type: "lesson", category: "core" },
        { name: "L9: ESP32 OOP Firm", file: "0009-microcontroller-esp32-platformio.html", type: "lesson", category: "core" },
        { name: "L10: PiVPN & Pi-hole", file: "0010-pivpn-pihole-setup.html", type: "lesson", category: "supplementary" },
        { name: "Cheat Sheet", file: "iot-hub-cheat-sheet.html", type: "reference", category: "reference" }
    ];

    // Determine base paths
    const isReferenceDir = currentPath.includes('/reference/');
    const isLessonsDir = currentPath.includes('/lessons/');

    // Helper to build relative path
    function getRelativePath(item) {
        if (item.type === "lesson") {
            if (isLessonsDir) return `./${item.file}`;
            if (isReferenceDir) return `../lessons/${item.file}`;
            return `./lessons/${item.file}`; // from root
        } else {
            if (isReferenceDir) return `./${item.file}`;
            if (isLessonsDir) return `../reference/${item.file}`;
            return `./reference/${item.file}`; // from root
        }
    }

    // 2. Setup Layout wrapper elements
    const originalBodyChildren = Array.from(document.body.children);
    
    const appContainer = document.createElement("div");
    appContainer.className = "app-container";
    
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    
    const sidebarOverlay = document.createElement("div");
    sidebarOverlay.className = "sidebar-overlay";
    
    const contentArea = document.createElement("main");
    contentArea.className = "content-area";
    
    const mobileHeader = document.createElement("div");
    mobileHeader.className = "mobile-header";

    // Append layouts to body
    document.body.appendChild(mobileHeader);
    document.body.appendChild(sidebarOverlay);
    document.body.appendChild(appContainer);
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentArea);

    // Move original child elements to contentArea (excluding scripts, styles, etc.)
    originalBodyChildren.forEach(child => {
        const tagName = child.tagName.toLowerCase();
        if (tagName !== "script" && tagName !== "link" && tagName !== "style") {
            contentArea.appendChild(child);
        }
    });

    // 3. Inject Mobile Header Setup
    mobileHeader.innerHTML = `
        <span class="mobile-brand">⚡ IoT_HUB_DEBUGGER</span>
        <button class="hamburger-btn">☰</button>
    `;
    const hamburgerBtn = mobileHeader.querySelector(".hamburger-btn");
    hamburgerBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("open");
    });
    sidebarOverlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("open");
    });

    // 4. Inject Left Sidebar Brand
    const brand = document.createElement("div");
    brand.className = "brand";
    brand.innerHTML = `⚡ IoT_HUB_DEBUGGER`;
    sidebar.appendChild(brand);

    // 5. Inject Navigation Menu inside Sidebar
    const navMenu = document.createElement("nav");
    navMenu.className = "sidebar-nav";
    
    let activeCategory = null;
    const categoryTitles = {
        core: "บทเรียนหลัก",
        supplementary: "เนื้อหาเพิ่มเติม",
        reference: "เอกสารอ้างอิง"
    };

    menuItems.forEach(item => {
        if (item.category !== activeCategory) {
            activeCategory = item.category;
            const header = document.createElement("div");
            header.className = "sidebar-category-title";
            header.textContent = categoryTitles[activeCategory] || activeCategory;
            navMenu.appendChild(header);
        }

        const link = document.createElement("a");
        link.href = getRelativePath(item);
        link.className = `sidebar-link ${item.type === 'reference' ? 'cheat-sheet-btn' : ''}`;
        link.textContent = item.name;
        
        // Active check
        if (currentFile === item.file) {
            link.classList.add("active");
        }
        navMenu.appendChild(link);
    });
    sidebar.appendChild(navMenu);

    // 6. Inject Theme Switcher in Sidebar (bottom-aligned)
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
    }
    
    const themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle-btn";
    themeBtn.innerHTML = `🌓 Toggle Theme`;
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", theme);
    });
    sidebar.appendChild(themeBtn);

    // 7. (Hex Dump Header removed - not shown in lessons)

    const h1 = contentArea.querySelector("h1");
    if (h1) {
        h1.className = "page-title";
        
        // Add an icon prefix
        const iconSpan = document.createElement("span");
        iconSpan.style.color = "var(--accent-red)";
        iconSpan.textContent = "▶ ";
        h1.insertBefore(iconSpan, h1.firstChild);

        // Find immediately following p to style as subtitle
        const subtitle = h1.nextElementSibling;
        if (subtitle && subtitle.tagName.toLowerCase() === "p") {
            subtitle.className = "page-subtitle";
        }
    }

    // 9. Address Ruler Motif, Dual Accent Card Classifier & Sidebar Anchors
    const cards = Array.from(contentArea.querySelectorAll(".card"));
    const quiz = contentArea.querySelector(".quiz");
    const citations = contentArea.querySelector(".citation");

    // Gather sections to display in the hex address ruler
    const sections = [];
    cards.forEach(c => sections.push({ element: c, type: "card" }));
    if (quiz) sections.push({ element: quiz, type: "quiz" });
    if (citations) sections.push({ element: citations, type: "citations" });

    let hexOffset = 0;
    const sidebarAnchorsData = [];

    sections.forEach((sec, idx) => {
        const el = sec.element;
        
        // Semantic Card Classification
        if (sec.type === "card") {
            const contentText = el.innerText.toLowerCase();
            
            // Check for Contiguous / Structured Database indicators (Teal)
            const contiguousScore = (contentText.match(/sqlite|database|db|sqlalchemy|ตาราง|models|get_db|session/g) || []).length * 1.5 + 
                                     (contentText.match(/fastapi|main\.py|endpoint|api/g) || []).length;
            
            // Check for Scattered / Distributed network indicators (Orange)
            const scatteredScore = (contentText.match(/mqtt|mosquitto|broker|pubsub|publish|subscribe|client|paho/g) || []).length * 1.5 +
                                   (contentText.match(/esp32|esp8266|microcontroller|บอร์ด|wifi|sensor|เซ็นเซอร์|led/g) || []).length;

            const eyebrow = document.createElement("span");
            eyebrow.className = "eyebrow";

            if (contiguousScore > scatteredScore && contiguousScore > 0) {
                el.classList.add("contiguous-card");
                eyebrow.classList.add("contiguous");
                eyebrow.textContent = "Contiguous Storage / DB Unit";
                el.insertBefore(eyebrow, el.firstChild);
            } else if (scatteredScore > contiguousScore && scatteredScore > 0) {
                el.classList.add("scattered-card");
                eyebrow.classList.add("scattered");
                eyebrow.textContent = "Scattered Client / Network Node";
                el.insertBefore(eyebrow, el.firstChild);
            } else {
                eyebrow.classList.add("general");
                eyebrow.textContent = "System Core Config";
                el.insertBefore(eyebrow, el.firstChild);
            }

            // Assign unique ID for anchors
            const h2 = el.querySelector("h2");
            if (h2) {
                const cardId = el.id || `part-${idx + 1}`;
                el.id = cardId;
                sidebarAnchorsData.push({ id: cardId, title: h2.textContent.replace(/^[0-9.\s]+/, "") });
            }
        }

        // Convert Quiz to Modern Interactive Quiz
        if (sec.type === "quiz") {
            upgradeQuiz(el);
            sidebarAnchorsData.push({ id: "quiz-section", title: "Quick Quiz" });
            el.id = "quiz-section";
        }

        // Convert Citations
        if (sec.type === "citations") {
            sidebarAnchorsData.push({ id: "citations-section", title: "Citations" });
            el.id = "citations-section";
        }

        // Wrap in simple section container (no address ruler)
        const sectionContainer = document.createElement("div");
        sectionContainer.className = "section-container";

        const sectionContent = document.createElement("div");
        sectionContent.className = "section-content";

        el.parentNode.insertBefore(sectionContainer, el);
        sectionContainer.appendChild(sectionContent);
        sectionContent.appendChild(el);
    });

    // 9.5 Add copy button to pre blocks (black boxes)
    const preBlocks = contentArea.querySelectorAll("pre");
    preBlocks.forEach(pre => {
        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "Copy";
        wrapper.appendChild(copyBtn);

        copyBtn.addEventListener("click", () => {
            const codeEl = pre.querySelector("code");
            const textToCopy = codeEl ? codeEl.textContent : pre.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.textContent = "Copied!";
                copyBtn.classList.add("copied");
                setTimeout(() => {
                    copyBtn.textContent = "Copy";
                    copyBtn.classList.remove("copied");
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
                copyBtn.textContent = "Error";
            });
        });
    });


    // 10. Inject Sidebar Anchor Links (Parts)
    if (sidebarAnchorsData.length > 0) {
        const anchorsDiv = document.createElement("div");
        anchorsDiv.className = "sidebar-anchors";
        anchorsDiv.innerHTML = `<span class="sidebar-anchors-title">ส่วนประกอบบทเรียน (Parts)</span>`;
        
        sidebarAnchorsData.forEach(item => {
            const anchorLink = document.createElement("a");
            anchorLink.href = `#${item.id}`;
            anchorLink.className = "anchor-link";
            anchorLink.innerHTML = `<span>⚬</span> ${item.title}`;
            anchorsDiv.appendChild(anchorLink);
        });
        // Insert right before theme button
        sidebar.insertBefore(anchorsDiv, themeBtn);
    }

    // 11. Upgrade Quiz helper function
    function upgradeQuiz(quizEl) {
        // Upgrade layout class
        quizEl.className = "quiz-container";

        // Style the heading
        const qTitle = quizEl.querySelector("h2");
        if (qTitle) {
            qTitle.innerHTML = "⚡ " + qTitle.innerHTML;
        }

        // Wrap options
        const originalOptions = Array.from(quizEl.querySelectorAll(".quiz-option"));
        if (originalOptions.length === 0) return;

        const optionsContainer = document.createElement("div");
        optionsContainer.className = "quiz-options";
        originalOptions[0].parentNode.insertBefore(optionsContainer, originalOptions[0]);

        // Feedback box
        const feedbackBox = document.createElement("div");
        feedbackBox.className = "quiz-feedback-box";
        quizEl.appendChild(feedbackBox);

        originalOptions.forEach((opt, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C...
            
            // Extract the feedback text and correctness
            let feedbackText = opt.getAttribute("data-feedback") || "";
            let isCorrect = false;

            if (opt.hasAttribute("data-correct")) {
                isCorrect = opt.getAttribute("data-correct") === "true";
            } else {
                // Fallback to legacy onclick alert parsing
                const onClickStr = opt.getAttribute("onclick") || "";
                const match = onClickStr.match(/alert\(['"](.*?)['"]\)/);
                feedbackText = match ? match[1] : "";
                isCorrect = feedbackText.includes("ถูกต้อง");
            }

            // Clear attributes
            opt.removeAttribute("onclick");
            opt.removeAttribute("data-feedback");
            opt.removeAttribute("data-correct");
            
            // Re-structure option text
            const cleanText = opt.textContent.replace(/^[A-Z]\)\s*/, "");
            opt.innerHTML = `<span class="quiz-option-marker">${letter} //</span> <span class="quiz-option-text">${cleanText}</span>`;
            
            // Add click listener
            opt.addEventListener("click", () => {
                // Clear previous states
                optionsContainer.querySelectorAll(".quiz-option").forEach(o => {
                    o.classList.remove("correct", "incorrect");
                });
                feedbackBox.className = "quiz-feedback-box";

                // Set states
                if (isCorrect) {
                    opt.classList.add("correct");
                    feedbackBox.classList.add("correct");
                    feedbackBox.innerHTML = `<strong>✔ CORRECT //</strong> ${feedbackText}`;
                } else {
                    opt.classList.add("incorrect");
                    feedbackBox.classList.add("incorrect");
                    feedbackBox.innerHTML = `<strong>✖ ERROR_OFFSET //</strong> ${feedbackText}`;
                }
            });

            optionsContainer.appendChild(opt);
        });
    }

    // 12. Convert Citations styling
    if (citations) {
        citations.className = "citation-container";
        const citTitle = citations.querySelector("p strong");
        if (citTitle) {
            const citHeader = document.createElement("h3");
            citHeader.textContent = "📖 CITATIONS & LOG_REFERENCES";
            citTitle.parentNode.replaceChild(citHeader, citTitle.parentNode.firstChild);
        }
        const citUl = citations.querySelector("ul");
        if (citUl) {
            citUl.className = "citation-list";
        }
    }

    // 13. Inject Prev/Next Navigation buttons
    const currentIdx = menuItems.findIndex(item => item.file === currentFile);
    if (currentIdx !== -1) {
        const navPrev = menuItems[currentIdx - 1];
        const navNext = menuItems[currentIdx + 1];
        
        if (navPrev || navNext) {
            const pageNavContainer = document.createElement("div");
            pageNavContainer.className = "page-nav-container";
            
            if (navPrev) {
                const prevBtn = document.createElement("a");
                prevBtn.href = getRelativePath(navPrev);
                prevBtn.className = "page-nav-btn prev-btn";
                prevBtn.innerHTML = `
                    <span class="page-nav-label">◀ ย้อนกลับ</span>
                    <span class="page-nav-title">${navPrev.name}</span>
                `;
                pageNavContainer.appendChild(prevBtn);
            } else {
                const empty = document.createElement("div");
                empty.style.flex = "1";
                pageNavContainer.appendChild(empty);
            }
            
            if (navNext) {
                const nextBtn = document.createElement("a");
                nextBtn.href = getRelativePath(navNext);
                nextBtn.className = "page-nav-btn next-btn";
                nextBtn.innerHTML = `
                    <span class="page-nav-label">ถัดไป ▶</span>
                    <span class="page-nav-title">${navNext.name}</span>
                `;
                pageNavContainer.appendChild(nextBtn);
            } else {
                const empty = document.createElement("div");
                empty.style.flex = "1";
                pageNavContainer.appendChild(empty);
            }
            contentArea.appendChild(pageNavContainer);
        }
    }
});
