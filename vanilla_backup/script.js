document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initTypewriter();
    initParticles();
    initScrollEffects();
    initTiltEffect();
    initTerminal();
    initGithubStats();
    initGithubGraphs();
    initLeetCodeStats();
    initChatbot();
    initMagneticButtons();
    initThemeSwitcher();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

/* =========================================
   1. Loading Screen
   ========================================= */
function initLoader() {
    const loader = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            loaderText.textContent = "Welcome.";
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => loader.style.display = 'none', 800);
            }, 500);
        }
    }, 100);
}

/* =========================================
   2. Custom Cursor / Mouse Spotlight
   ========================================= */
function initCustomCursor() {
    const spotlight = document.querySelector('.mouse-spotlight');
    
    document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

/* =========================================
   3. Typewriter Effect
   ========================================= */
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    const phrases = [
        "Scalable Backend Systems.",
        "Interactive Web Apps.",
        "AI/ML Integrations.",
        "Premium User Interfaces."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 2000); // Start after loader
}

/* =========================================
   4. Particles Background
   ========================================= */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: float-particle ${duration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/* =========================================
   5. Scroll Effects & Scroll Spy
   ========================================= */
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(scrollProgress) scrollProgress.style.width = scrolled + '%';
        
        // Hide/Show Navbar on Scroll Direction
        // Navbar is now permanently fixed based on user request.
        navbar.classList.remove('hidden');
        
        // Navbar Glass effect enhancement
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg-glass-hover)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'var(--bg-glass)';
            navbar.style.boxShadow = 'none';
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'all';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
        
        lastScrollY = window.scrollY;
        
        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* =========================================
   6. 3D Tilt Effect
   ========================================= */
function initTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.zIndex = '10';
            card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.zIndex = '1';
        });
    });
}

/* =========================================
   7. Interactive Terminal
   ========================================= */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;
    
    const commands = {
        help: "Available commands: help, about, projects, resume, skills, contact, github, theme, clear, sudo hire piyush",
        about: "Piyush Jain is a Full-Stack Software Engineer building scalable backend systems and intelligent AI integrations.",
        projects: "Featured: Curio, Agro AI, StreamHub, Cyber Guardian. Type 'github' to see more.",
        skills: "Languages: Python, JavaScript, Java, C++ | Frameworks: React, Node.js, FastAPI | Tools: Docker, AWS, Git",
        contact: "Email: Piyushjain1857@gmail.com | Phone: +91 8595850153",
        github: "Redirecting to GitHub... <script>setTimeout(()=>window.open('https://github.com/Piyushjain1857','_blank'),1000)</script>",
        "sudo hire piyush": "Access Granted. Initializing offer letter protocols... just kidding, please email me at Piyushjain1857@gmail.com!",
        theme: "Use the theme switcher in the navigation bar to toggle between Dark, Light, Cyberpunk, and Forest themes.",
    };
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            this.value = '';
            
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span class="prompt">piyush@macbook:~$</span> ${cmd}`;
            output.appendChild(cmdLine);
            
            if (cmd === 'clear') {
                output.innerHTML = '';
                return;
            }
            
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-response';
            
            if (commands[cmd]) {
                responseLine.innerHTML = commands[cmd];
            } else if (cmd !== '') {
                responseLine.innerHTML = `bash: ${cmd}: command not found. Type 'help' for available commands.`;
            }
            
            if (cmd !== '') {
                output.appendChild(responseLine);
            }
            
            output.scrollTop = output.scrollHeight;
        }
    });
}

/* =========================================
   8. GitHub Stats API
   ========================================= */

// Language color palette
const LANG_COLORS = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    HTML:       '#e34c26', CSS:        '#563d7c', Java:       '#b07219',
    'C++':      '#f34b7d', C:          '#555555', Go:         '#00ADD8',
    Rust:       '#dea584', Ruby:       '#701516', PHP:        '#4F5D95',
    Swift:      '#F05138', Kotlin:     '#A97BFF', Shell:      '#89e051',
    Vue:        '#41b883',  Dart:       '#00B4AB', R:          '#198CE7',
};

function getLangColor(lang) {
    return LANG_COLORS[lang] || '#8b949e';
}

async function initGithubStats() {
    const ghContainer = document.getElementById('github-stats-container');
    if (!ghContainer) return;

    try {
        const username = 'Piyushjain1857';
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API Error');

        const user  = await userRes.json();
        const repos = await reposRes.json();

        // ── Stats ────────────────────────────────
        const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
        const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);
        const ownRepos   = repos.filter(r => !r.fork);

        // ── Language distribution ─────────────────
        const langMap = {};
        repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const langEntries = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const langTotal   = langEntries.reduce((s, [, c]) => s + c, 0);

        // Build SVG donut for languages
        const DONUT_R = 38, DONUT_CX = 50, DONUT_CY = 50;
        const donutCirc = 2 * Math.PI * DONUT_R;
        let donutOffset = 0;
        const donutSlices = langEntries.map(([lang, count]) => {
            const pct   = count / langTotal;
            const dash  = (pct * donutCirc).toFixed(2);
            const gap   = (donutCirc - dash).toFixed(2);
            const slice = `<circle cx="${DONUT_CX}" cy="${DONUT_CY}" r="${DONUT_R}"
                fill="none" stroke="${getLangColor(lang)}" stroke-width="12"
                stroke-dasharray="${dash} ${gap}"
                stroke-dashoffset="${(-donutOffset).toFixed(2)}"
                stroke-linecap="butt"
                style="filter:drop-shadow(0 0 3px ${getLangColor(lang)}88)"/>`;
            donutOffset -= pct * donutCirc;
            return slice;
        }).join('');

        const legendHtml = langEntries.map(([lang, count]) => `
            <div class="gh-legend-item">
                <span class="gh-legend-dot" style="background:${getLangColor(lang)}"></span>
                <span class="gh-legend-name">${lang}</span>
                <span class="gh-legend-pct">${((count/langTotal)*100).toFixed(0)}%</span>
            </div>`).join('');

        // ── Monthly activity bar chart ─────────────
        // Bucket repos by push month (last 12 months)
        const now = new Date();
        const monthBuckets = {};
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
            monthBuckets[key] = 0;
        }
        repos.forEach(r => {
            const d   = new Date(r.pushed_at);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
            if (key in monthBuckets) monthBuckets[key]++;
        });
        const bucketValues  = Object.values(monthBuckets);
        const bucketKeys    = Object.keys(monthBuckets);
        const maxVal        = Math.max(...bucketValues, 1);
        const monthLabels   = ['J','F','M','A','M','J','J','A','S','O','N','D'];

        const barSvgWidth  = 360;
        const barSvgHeight = 80;
        const barCount     = bucketValues.length;
        const barW         = Math.floor(barSvgWidth / barCount) - 3;
        const barMaxH      = 60;

        const barRects = bucketValues.map((v, i) => {
            const h   = Math.max(3, Math.round((v / maxVal) * barMaxH));
            const x   = i * (barW + 3) + 1;
            const y   = barSvgHeight - h - 14;
            const mo  = new Date(bucketKeys[i] + '-01').getMonth();
            const lbl = monthLabels[mo];
            const isRecent = i >= barCount - 3;
            const col = isRecent ? 'url(#ghBarGrad)' : 'rgba(79,70,229,0.45)';
            return `
                <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="2" fill="${col}"
                    class="gh-bar" data-val="${v}" data-month="${bucketKeys[i]}"/>
                <text x="${x + barW/2}" y="${barSvgHeight - 1}" text-anchor="middle"
                    font-size="7" fill="var(--text-muted)">${lbl}</text>`;
        }).join('');

        // ── Top repos list ─────────────────────────
        const topRepos = ownRepos
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 4);

        const reposHtml = topRepos.map(r => {
            const ago = timeAgo(new Date(r.pushed_at));
            return `
            <a href="${r.html_url}" target="_blank" class="gh-repo-row">
                <div class="gh-repo-info">
                    <span class="gh-repo-name">${r.name}</span>
                    <span class="gh-repo-meta">
                        ${r.language ? `<span class="gh-lang-dot" style="background:${getLangColor(r.language)}"></span>${r.language}` : ''}
                        <span class="gh-repo-time">· ${ago}</span>
                    </span>
                </div>
                <div class="gh-repo-stars">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ${r.stargazers_count}
                </div>
            </a>`;
        }).join('');

        // ── Render compact card (profile + pills + CTA only) ───────────
        ghContainer.innerHTML = `
            <div class="gh-card">
                <!-- Profile Header -->
                <div class="gh-top">
                    <img src="${user.avatar_url}" alt="avatar" class="gh-avatar">
                    <div class="gh-title">
                        <h3>${user.name || username}</h3>
                        <span class="gh-login">@${user.login}</span>
                    </div>
                </div>

                <!-- Stat Pills -->
                <div class="gh-pills">
                    <div class="gh-pill">
                        <span class="gh-pill-val">${user.public_repos}</span>
                        <span class="gh-pill-lbl">Repos</span>
                    </div>
                    <div class="gh-pill">
                        <span class="gh-pill-val">${user.followers}</span>
                        <span class="gh-pill-lbl">Followers</span>
                    </div>
                    <div class="gh-pill">
                        <span class="gh-pill-val">${totalStars}</span>
                        <span class="gh-pill-lbl">Stars</span>
                    </div>
                    <div class="gh-pill">
                        <span class="gh-pill-val">${totalForks}</span>
                        <span class="gh-pill-lbl">Forks</span>
                    </div>
                </div>

                <!-- CTA -->
                <a href="${user.html_url}" target="_blank" class="gh-cta-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View GitHub Profile
                </a>
            </div>
        `;

    } catch (err) {
        console.error('GitHub stats error:', err);
        ghContainer.innerHTML = `
            <div class="gh-card gh-error">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Could not load GitHub data.</p>
                <small>Rate limit may be exceeded. <a href="https://github.com/Piyushjain1857" target="_blank">View profile →</a></small>
            </div>`;
    }
}

/* =========================================
   8b. GitHub Graphs Section
   ========================================= */
async function initGithubGraphs() {
    const activityEl  = document.getElementById('gh-activity-chart');
    const langEl      = document.getElementById('gh-lang-chart');
    const reposEl     = document.getElementById('gh-repos-list');
    if (!activityEl && !langEl && !reposEl) return;

    const username = 'Piyushjain1857';
    try {
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`);
        if (!reposRes.ok) throw new Error('GitHub API Error');
        const repos = await reposRes.json();
        const ownRepos = repos.filter(r => !r.fork);

        // ── Language donut ──────────────────────────
        const langMap = {};
        repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const langEntries = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const langTotal   = langEntries.reduce((s, [, c]) => s + c, 0);

        const DONUT_R = 42, CX = 54, CY = 54;
        const donutCirc = 2 * Math.PI * DONUT_R;
        let donutOffset = 0;
        const donutSlices = langEntries.map(([lang, count]) => {
            const pct  = count / langTotal;
            const dash = (pct * donutCirc).toFixed(2);
            const gap  = (donutCirc - dash).toFixed(2);
            const s    = `<circle cx="${CX}" cy="${CY}" r="${DONUT_R}"
                fill="none" stroke="${getLangColor(lang)}" stroke-width="14"
                stroke-dasharray="${dash} ${gap}"
                stroke-dashoffset="${(-donutOffset).toFixed(2)}"
                stroke-linecap="butt"
                style="filter:drop-shadow(0 0 4px ${getLangColor(lang)}99)"/>`;
            donutOffset -= pct * donutCirc;
            return s;
        }).join('');

        const legendRows = langEntries.map(([lang, count]) => `
            <div class="ghs-legend-row">
                <span class="ghs-legend-dot" style="background:${getLangColor(lang)}"></span>
                <span class="ghs-legend-name">${lang}</span>
                <div class="ghs-legend-bar-wrap">
                    <div class="ghs-legend-bar" style="width:0%" data-w="${((count/langTotal)*100).toFixed(1)}%"
                         style="background:${getLangColor(lang)}"></div>
                </div>
                <span class="ghs-legend-pct">${((count/langTotal)*100).toFixed(0)}%</span>
            </div>`).join('');

        if (langEl) {
            langEl.innerHTML = `
                <div class="ghs-lang-wrap">
                    <div class="ghs-donut-wrap">
                        <svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg);width:100%;height:100%">
                            ${donutSlices}
                        </svg>
                        <div class="ghs-donut-center">
                            <span class="ghs-donut-num">${langEntries.length}</span>
                            <span class="ghs-donut-lbl">Languages</span>
                        </div>
                    </div>
                    <div class="ghs-legend-list">${legendRows}</div>
                </div>`;
            // Animate bars
            requestAnimationFrame(() => {
                langEl.querySelectorAll('.ghs-legend-bar[data-w]').forEach(el => {
                    el.style.transition = 'width 1.2s cubic-bezier(0.25,1,0.5,1)';
                    el.style.background = el.parentElement.previousElementSibling.previousElementSibling.style.background || 'var(--accent-1)';
                    el.style.width = el.dataset.w;
                });
            });
        }

        // ── Activity bar chart ───────────────────────
        const now = new Date();
        const monthBuckets = {};
        const monthFullLabels = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
            monthBuckets[key] = 0;
            monthFullLabels.push(d.toLocaleString('default', { month: 'short' }));
        }
        repos.forEach(r => {
            const d   = new Date(r.pushed_at);
            const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
            if (key in monthBuckets) monthBuckets[key]++;
        });
        const bucketValues = Object.values(monthBuckets);
        const bucketKeys   = Object.keys(monthBuckets);
        const maxVal       = Math.max(...bucketValues, 1);

        const W = 800, H = 160;
        const padL = 8, padR = 8, padT = 10, padB = 28;
        const chartW = W - padL - padR;
        const chartH = H - padT - padB;
        const barCount = bucketValues.length;
        const barW     = Math.floor(chartW / barCount) - 4;

        const gridLines = [0.25, 0.5, 0.75, 1].map(f => {
            const y = padT + chartH * (1 - f);
            return `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"
                stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;  
        }).join('');

        const bars = bucketValues.map((v, i) => {
            const barH    = Math.max(3, Math.round((v / maxVal) * chartH));
            const x       = padL + i * (barW + 4);
            const y       = padT + chartH - barH;
            const isNew   = i >= barCount - 3;
            const fill    = isNew ? 'url(#ghGraphGrad)' : 'rgba(79,70,229,0.4)';
            const lbl     = monthFullLabels[i];
            return `
                <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3"
                      fill="${fill}" class="ghs-bar"/>
                <text x="${x + barW/2}" y="${H - 5}" text-anchor="middle"
                      font-size="9" fill="rgba(255,255,255,0.35)">${lbl}</text>
                ${v > 0 ? `<text x="${x + barW/2}" y="${y - 4}" text-anchor="middle"
                      font-size="8" fill="rgba(255,255,255,0.5)">${v}</text>` : ''}`;
        }).join('');

        if (activityEl) {
            activityEl.innerHTML = `
                <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="ghs-bar-chart">
                    <defs>
                        <linearGradient id="ghGraphGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stop-color="#818cf8"/>
                            <stop offset="100%" stop-color="#a855f7"/>
                        </linearGradient>
                    </defs>
                    ${gridLines}
                    ${bars}
                </svg>`;
        }

        // ── Recent repos grid ───────────────────────
        const topRepos = ownRepos
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 6);

        const repoCards = topRepos.map(r => {
            const ago = timeAgo(new Date(r.pushed_at));
            const desc = r.description ? r.description.slice(0, 70) + (r.description.length > 70 ? '…' : '') : 'No description';
            return `
            <a href="${r.html_url}" target="_blank" class="ghs-repo-card">
                <div class="ghs-repo-top">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z"/>
                    </svg>
                    <span class="ghs-repo-name">${r.name}</span>
                    ${r.fork ? '<span class="ghs-fork-badge">Fork</span>' : ''}
                </div>
                <p class="ghs-repo-desc">${desc}</p>
                <div class="ghs-repo-footer">
                    ${r.language ? `<span class="ghs-repo-lang"><span class="gh-lang-dot" style="background:${getLangColor(r.language)}"></span>${r.language}</span>` : ''}
                    <span class="ghs-repo-star"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>${r.stargazers_count}</span>
                    <span class="ghs-repo-time">${ago}</span>
                </div>
            </a>`;
        }).join('');

        if (reposEl) {
            reposEl.innerHTML = repoCards;
        }

    } catch (err) {
        console.error('GitHub Graphs error:', err);
        [activityEl, langEl, reposEl].forEach(el => {
            if (el) el.innerHTML = '<p class="error-text">Could not load data.</p>';
        });
    }
}

function timeAgo(date) {
    const secs = Math.floor((Date.now() - date) / 1000);
    if (secs < 60)        return 'just now';
    if (secs < 3600)      return `${Math.floor(secs/60)}m ago`;
    if (secs < 86400)     return `${Math.floor(secs/3600)}h ago`;
    if (secs < 2592000)   return `${Math.floor(secs/86400)}d ago`;
    if (secs < 31536000)  return `${Math.floor(secs/2592000)}mo ago`;
    return `${Math.floor(secs/31536000)}y ago`;
}

/* =========================================
   9. LeetCode Stats API
   ========================================= */
async function initLeetCodeStats() {
    const lcContainer = document.getElementById('leetcode-stats-container');
    if (!lcContainer) return;

    const username = 'piyushjain1857';
    const BASE = 'https://alfa-leetcode-api.onrender.com';

    try {
        // Parallel fetch: profile info + solved stats
        const [profileRes, solvedRes] = await Promise.all([
            fetch(`${BASE}/${username}`),
            fetch(`${BASE}/${username}/solved`)
        ]);

        if (!profileRes.ok || !solvedRes.ok) throw new Error('API error');

        const profile = await profileRes.json();
        const solved  = await solvedRes.json();

        const totalSolved  = solved.solvedProblem   || 0;
        const easySolved   = solved.easySolved       || 0;
        const medSolved    = solved.mediumSolved     || 0;
        const hardSolved   = solved.hardSolved       || 0;

        // Totals from acSubmissionNum
        const totals = { easy: 869, medium: 1826, hard: 824 }; // LeetCode approximate totals
        const easyPct = Math.min((easySolved / totals.easy) * 100, 100).toFixed(1);
        const medPct  = Math.min((medSolved  / totals.medium) * 100, 100).toFixed(1);
        const hardPct = Math.min((hardSolved / totals.hard) * 100, 100).toFixed(1);

        // Donut ring SVG — circle with dasharray trick
        const total      = totals.easy + totals.medium + totals.hard;
        const pctSolved  = Math.min(totalSolved / total, 1);
        const r          = 54;
        const circ       = 2 * Math.PI * r;
        const dash       = (pctSolved * circ).toFixed(2);
        const gap        = (circ - dash).toFixed(2);

        const rankStr = profile.ranking
            ? '#' + Number(profile.ranking).toLocaleString()
            : '—';

        // Recent accepted submissions
        const subRows = (solved.acSubmissionNum || [])
            .filter(s => s.difficulty !== 'All')
            .map(s => `
                <tr>
                    <td>${s.difficulty}</td>
                    <td class="lc-sub-count">${s.count}</td>
                    <td class="lc-sub-total">${s.submissions}</td>
                </tr>`).join('');

        lcContainer.innerHTML = `
            <div class="lc-card">

                <!-- Header row: avatar + title + rank -->
                <div class="lc-top">
                    <img src="${profile.avatar || ''}" alt="avatar" class="lc-avatar"
                         onerror="this.style.display='none'">
                    <div class="lc-title">
                        <h3>${profile.name || username}</h3>
                        <span class="lc-username">@${username}</span>
                    </div>
                    <div class="lc-rank-badge">
                        <span class="lc-rank-label">Global Rank</span>
                        <span class="lc-rank-value">${rankStr}</span>
                    </div>
                </div>

                <!-- Donut + stats grid -->
                <div class="lc-body">
                    <!-- SVG Donut -->
                    <div class="lc-donut-wrap">
                        <svg class="lc-donut" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="${r}" fill="none"
                                stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
                            <circle cx="60" cy="60" r="${r}" fill="none"
                                stroke="url(#lcGrad)" stroke-width="10"
                                stroke-linecap="round"
                                stroke-dasharray="${dash} ${gap}"
                                stroke-dashoffset="${(circ * 0.25).toFixed(2)}"
                                class="lc-donut-ring"/>
                            <defs>
                                <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%"   stop-color="#ffa116"/>
                                    <stop offset="100%" stop-color="#ff6b35"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div class="lc-donut-center">
                            <span class="lc-total-num">${totalSolved}</span>
                            <span class="lc-total-lbl">Solved</span>
                        </div>
                    </div>

                    <!-- Difficulty bars -->
                    <div class="lc-bars">
                        <div class="lc-bar-item">
                            <div class="lc-bar-meta">
                                <span class="lc-diff easy">Easy</span>
                                <span class="lc-bar-count">${easySolved}</span>
                            </div>
                            <div class="lc-track">
                                <div class="lc-fill easy" style="width:0%" data-width="${easyPct}%"></div>
                            </div>
                        </div>
                        <div class="lc-bar-item">
                            <div class="lc-bar-meta">
                                <span class="lc-diff medium">Medium</span>
                                <span class="lc-bar-count">${medSolved}</span>
                            </div>
                            <div class="lc-track">
                                <div class="lc-fill medium" style="width:0%" data-width="${medPct}%"></div>
                            </div>
                        </div>
                        <div class="lc-bar-item">
                            <div class="lc-bar-meta">
                                <span class="lc-diff hard">Hard</span>
                                <span class="lc-bar-count">${hardSolved}</span>
                            </div>
                            <div class="lc-track">
                                <div class="lc-fill hard" style="width:0%" data-width="${hardPct}%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Submissions summary table -->
                <div class="lc-sub-section">
                    <p class="lc-sub-title">Accepted Submissions</p>
                    <table class="lc-sub-table">
                        <thead><tr><th>Difficulty</th><th>Problems</th><th>Submissions</th></tr></thead>
                        <tbody>${subRows}</tbody>
                    </table>
                </div>

                <!-- CTA -->
                <a href="https://leetcode.com/u/${username}/" target="_blank" class="lc-cta-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                    </svg>
                    View on LeetCode
                </a>
            </div>
        `;

        // Animate progress bars after paint
        requestAnimationFrame(() => {
            document.querySelectorAll('.lc-fill[data-width]').forEach(el => {
                el.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
                el.style.width = el.dataset.width;
            });
        });

    } catch (err) {
        console.error('LeetCode stats error:', err);
        lcContainer.innerHTML = `
            <div class="lc-card lc-error">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Could not load LeetCode stats.</p>
                <small>The API may be temporarily unavailable. <a href="https://leetcode.com/u/piyushjain1857/" target="_blank">View profile directly →</a></small>
            </div>`;
    }
}

/* =========================================
   10. Chatbot Assistant
   ========================================= */
function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const windowEl = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
    
    if (!toggle || !windowEl) return;
    
    toggle.addEventListener('click', () => {
        windowEl.classList.toggle('active');
        if (windowEl.classList.contains('active')) input.focus();
    });
    
    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('active');
    });
    
    // Very simple local Knowledge Base logic
    const responses = {
        "who are you": "I am an AI assistant representing Piyush Jain. Piyush is a Full-Stack Software Engineer who loves building robust backend systems.",
        "projects": "Piyush has built several projects including Curio, Agro AI, StreamHub, Cyber Guardian, and AI Analytics Suite. You can view them in the Projects section.",
        "skills": "Piyush excels in HTML, CSS, JavaScript, React, Node.js, Python, FastAPI, Docker, and AWS.",
        "education": "He is constantly learning and building, turning caffeine into code.",
        "contact": "You can reach Piyush at Piyushjain1857@gmail.com or call +91 8595850153.",
        "experience": "He has extensive experience in Full-Stack development and AI/ML integrations, having participated in various hackathons and leadership roles."
    };
    
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-bubble ${sender}`;
        msgDiv.textContent = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }
    
    function processInput() {
        const val = input.value.trim().toLowerCase();
        if (!val) return;
        
        addMessage(input.value, 'user');
        input.value = '';
        
        // Typing animation
        const typing = document.createElement('div');
        typing.className = 'chat-bubble bot typing';
        typing.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
        
        setTimeout(() => {
            messages.removeChild(typing);
            let found = false;
            for (let key in responses) {
                if (val.includes(key)) {
                    addMessage(responses[key], 'bot');
                    found = true;
                    break;
                }
            }
            if (!found) {
                addMessage("I'm not sure about that. Try asking about his skills, projects, or contact info!", 'bot');
            }
        }, 1000);
    }
    
    sendBtn.addEventListener('click', processInput);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') processInput();
    });
}

/* =========================================
   11. Magnetic Buttons
   ========================================= */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        btn.addEventListener('mouseleave', function(e) {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/* =========================================
   12. Theme Switcher
   ========================================= */
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeOptions = document.querySelectorAll('.theme-option');
    const htmlEl = document.documentElement;

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeToggle.parentElement.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!themeToggle.parentElement.contains(e.target)) {
                themeToggle.parentElement.classList.remove('active');
            }
        });

        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-set-theme');
                setTheme(theme);
                themeToggle.parentElement.classList.remove('active');
            });
        });
    }

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        // Update active class
        themeOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-set-theme') === theme) {
                opt.classList.add('active');
            }
        });
        
        // Update icon on main button
        if (themeIcon) {
            let iconName = 'moon';
            if (theme === 'light') iconName = 'sun';
            else if (theme === 'cyberpunk') iconName = 'zap';
            else if (theme === 'forest') iconName = 'feather';
            
            // Set the feather icon explicitly inside the button
            themeToggle.innerHTML = `<i data-feather="${iconName}" id="theme-icon"></i>`;
            if (window.feather) window.feather.replace();
        }
    }
}
