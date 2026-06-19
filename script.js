document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       PRELOADER SYSTEM LOGIC
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('loaderProgressBar');
    const loaderText = document.getElementById('loaderText');
    const enterBtn = document.getElementById('enterBtn');
    const heroVideo = document.getElementById('heroVideo');

    // Simulate system booting sequence
    const loadSteps = [
        { progress: 15, text: "CONNECTING TO GRID..." },
        { progress: 35, text: "LOADING SYSTEM PROTOCOLS..." },
        { progress: 55, text: "STABILIZING PARTICLE FIELD..." },
        { progress: 75, text: "FETCHING DATABASE SCHEMAS..." },
        { progress: 90, text: "SYNCING NEURAL NETWORKS..." },
        { progress: 100, text: "SYSTEM STATUS: READY" }
    ];

    let currentStep = 0;
    let progress = 0;

    function runLoader() {
        if (!preloader || !progressBar || !loaderText) return;

        const interval = setInterval(() => {
            if (currentStep < loadSteps.length) {
                const step = loadSteps[currentStep];
                if (progress < step.progress) {
                    progress += Math.floor(Math.random() * 3) + 1;
                    if (progress > step.progress) progress = step.progress;
                    progressBar.style.width = progress + '%';
                } else {
                    loaderText.textContent = step.text;
                    currentStep++;
                }
            } else {
                clearInterval(interval);
                // System is ready, show enter button
                progressBar.style.background = 'var(--accent)';
                progressBar.style.boxShadow = '0 0 15px var(--accent)';
                
                setTimeout(() => {
                    if (loaderText) loaderText.style.display = 'none';
                    if (progressBar.parentElement) progressBar.parentElement.style.display = 'none';
                    if (enterBtn) {
                        enterBtn.style.display = 'inline-block';
                        enterBtn.style.opacity = '1';
                    }
                }, 500);
            }
        }, 30);
    }
    
    // Start loader immediately
    runLoader();

    const videoControlBtn = document.getElementById('videoControlBtn');

    if (enterBtn && preloader) {
        enterBtn.addEventListener('click', () => {
            preloader.classList.add('fade-out');
            
            // Play hero video and unmute after user gesture to bypass autoplay policy safely
            if (heroVideo) {
                heroVideo.muted = false;
                heroVideo.currentTime = 0; // Reset video to start for synchronized voice introduction
                heroVideo.play().catch(err => {
                    console.log("Autoplay play triggered: ", err);
                });
            }

            // Reveal the video control play/pause button
            if (videoControlBtn) {
                videoControlBtn.classList.add('visible');
            }

            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        });
    }

    /* ==========================================================================
       CUSTOM FOLLOW CURSOR
       ========================================================================== */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        if (cursor && ring) {
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Enlarge custom cursor ring on interactive element hovers
    const interactiveElements = document.querySelectorAll(
        'a, button, .skill-card, .lang-card, .about-card, .project-card, .chat-suggestion-chip, .chat-close-btn, .theme-dot, .timeline-cert-btn'
    );
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (ring) {
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.borderColor = 'rgba(0, 212, 255, 0.8)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (ring) {
                ring.style.width = '40px';
                ring.style.height = '40px';
                ring.style.borderColor = 'rgba(0, 212, 255, 0.5)';
            }
        });
    });

    /* ==========================================================================
       3D CARD TILT FOR OTHER CONTENT CARDS
       ========================================================================== */
    const contentCards = document.querySelectorAll('.project-card, .skill-card, .about-card, .lang-card, .contact-card');
    contentCards.forEach(c => {
        c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const rotateX = (-(y / r.height - 0.5) * 10).toFixed(2);
            const rotateY = ((x / r.width - 0.5) * 10).toFixed(2);
            c.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        c.addEventListener('mouseleave', () => {
            c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    /* ==========================================================================
       INTERACTIVE CANVAS BACKGROUND (PARTICLES NETWORK)
       ========================================================================== */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.2;
                this.alpha = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '0, 212, 255' : '168, 85, 247'; // Cyan or Purple
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 120; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animate);
        }
        animate();
    }

    /* ==========================================================================
       SCROLL REVEAL TRIGGERS
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                e.target.querySelectorAll('.skill-card').forEach(c => c.classList.add('active'));
                if (e.target.classList.contains('skill-card')) {
                    e.target.classList.add('active');
                }
            }
        });
    }, observerOptions);

    reveals.forEach(r => observer.observe(r));
    document.querySelectorAll('.skill-card').forEach(c => observer.observe(c));

    /* ==========================================================================
       AI CHATBOT DIALOG LOGIC (PRASHANTHBOT)
       ========================================================================== */
    const chatbotKnowledgeBase = {
        greetings: {
            keywords: ['hi', 'hello', 'hey', 'greetings', 'yo'],
            response: "Hello! I am Prashanth's AI assistant. Ask me anything about his projects, education, experience, technical skills, or certifications! 👋"
        },
        about: {
            keywords: ['who are you', 'about prashanth', 'summary', 'introduce', 'who is', 'prashanth'],
            response: "Prashanth is a motivated Computer Science & Engineering student at Basaveshwar Engineering College, Bagalkote, and a Data Scientist & Analyst. He completed his internship at Tech Fortune Technologies, Bengaluru. He has built web-based projects with real-time updates and has active experience in Machine Learning, Data Analytics, and Generative AI. He loves creating tools that solve practical, real-world problems!"
        },
        education: {
            keywords: ['education', 'college', 'school', 'study', 'degree', 'bec', 'engineering'],
            response: "<strong>Education details:</strong><br>• <strong>B.E in Computer Science & Engineering</strong> at Basaveshwar Engineering College, Bagalkote (2022 - Present)<br>• <strong>PUC in Science</strong> at Dr. Thimmareddy PU College, Davangere (2020 - 2022) with an impressive score of <strong>94.88%</strong>."
        },
        skills: {
            keywords: ['skills', 'languages', 'databases', 'tools', 'coding', 'program', 'python', 'java'],
            response: "<strong>Technical Skills:</strong><br>• <strong>Languages:</strong> Python, Java, C, JavaScript<br>• <strong>ML & AI:</strong> ARIMA Forecasting, Deep Neural Networks, Gemini LLM API<br>• <strong>Web Dev:</strong> HTML5, CSS3, ES6+ JS<br>• <strong>Databases:</strong> SQL, Firebase, Supabase, MongoDB<br>• <strong>Tools:</strong> Git, GitHub, GitLab, VS Code"
        },
        projects: {
            keywords: ['projects', 'build', 'make', 'portfolio', 'develop'],
            response: "Prashanth has built three major projects:<br>1. <strong>APMC Price Pulse</strong> (crop price predictor using ARIMA & Python)<br>2. <strong>IPL Score Prediction</strong> (score forecasting using Deep Learning & Neural Networks)<br>3. <strong>Docu-Chat Gemini Chatbot</strong> (RAG chatbot using Gemini API & Streamlit)<br><br>Which one would you like to know more about?"
        },
        apmc: {
            keywords: ['apmc', 'price pulse', 'crop', 'grocery'],
            response: "<strong>APMC PRICE PULSE:</strong><br>• Tech: HTML, CSS, JS, Firebase, ARIMA, Python.<br>• Details: A crop price prediction tool for APMC markets. Features real-time responsive updates to assist farmers and buyers.<br>• Repo: <a href='https://github.com/PrashanthP606/APMC-Price-Pulse' target='_blank'>APMC-Price-Pulse</a>"
        },
        ipl: {
            keywords: ['ipl', 'cricket', 'score prediction', 'neural network', 'deep learning'],
            response: "<strong>IPL SCORE PREDICTION:</strong><br>• Tech: Python, Deep Learning, Neural Networks (Keras/TensorFlow).<br>• Details: Predicts final expected scores in IPL mid-game coordinates using historical match datasets.<br>• Repo: <a href='https://github.com/PrashanthP606/IPL-Score-Prediction' target='_blank'>IPL-Score-Prediction</a>"
        },
        docuchat: {
            keywords: ['docu-chat', 'docuchat', 'chatbot', 'gemini', 'streamlit', 'rag'],
            response: "<strong>DOCU-CHAT:</strong><br>• Tech: Python, Streamlit, Google Gemini API.<br>• Details: RAG document chatbot answering queries on uploaded PDF, DOCX, and TXT files with high contextual accuracy.<br>• Repo: <a href='https://github.com/PrashanthP606/Docuchat-Chatbot' target='_blank'>Docuchat-Chatbot</a>"
        },
        contact: {
            keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'social', 'linkedin'],
            response: "You can reach Prashanth at:<br>• <strong>Email:</strong> <a href='mailto:vikasprashanth04@gmail.com'>vikasprashanth04@gmail.com</a><br>• <strong>Phone:</strong> +91 6363986280<br>• <strong>GitHub:</strong> <a href='https://github.com/PrashanthP606' target='_blank'>PrashanthP606</a><br>• <strong>LinkedIn:</strong> <a href='https://linkedin.com/in/prashanth' target='_blank'>Prashanth</a>"
        },
        experience: {
            keywords: ['experience', 'internship', 'intern', 'work', 'job', 'tech fortune', 'fortune'],
            response: "<strong>Internship & Experience:</strong><br>• <strong>Data Science & Analyst Intern</strong> at <strong>Tech Fortune Technologies, Bengaluru</strong> (2024)<br>• Gained hands-on experience in data analytics, data preprocessing, model evaluation, and visualizing datasets using Python (Pandas, NumPy, Scikit-Learn)."
        },
        certifications: {
            keywords: ['certifications', 'certify', 'certificate', 'credential', 'ibm', 'infosys', 'tata', 'hp'],
            response: "<strong>Prashanth's Certifications:</strong><br>• <strong>Python Foundation Certification</strong> (Infosys Springboard)<br>• <strong>AI Fundamentals</strong> (IBM SkillsBuild)<br>• <strong>Front End Web Developer</strong> (Infosys Springboard)<br>• <strong>Data Science & Analytics</strong> (HP Life)<br>• <strong>Java Training</strong> (IIT Bombay Spoken Tutorial)<br>• <strong>GenAI Powered Data Analytics</strong> (TATA Job Simulation)"
        },
        achievements: {
            keywords: ['achievements', 'award', 'compete', 'accomplishment', 'contest', 'won', 'place', 'techthronix', 'techignite'],
            response: "<strong>Key Achievements:</strong><br>• Completed Java training program by IIT Bombay Spoken Tutorial.<br>• <strong>5th place</strong> in TechThronix (college-level tech event).<br>• <strong>Top 10</strong> in TechIgnite (technical competition)."
        },
        interests: {
            keywords: ['interests', 'hobby', 'hobbies', 'free time', 'like to do', 'movies', 'sci-fi'],
            response: "<strong>Interests & Hobbies:</strong><br>• Exploring open-source projects & contributions<br>• Watching science fiction movies & documentaries<br>• Generative AI and its real-world integrations<br>• Using AI tools to automate workflows & boost productivity"
        }
    };

    const chatWindow = document.getElementById('chatWindow');
    const chatbotFab = document.getElementById('chatbotFab');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const suggestionChips = document.querySelectorAll('.chat-suggestion-chip');

    // Toggle chatbot window on FAB click
    if (chatbotFab && chatWindow && chatCloseBtn) {
        chatbotFab.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWindow.classList.toggle('open');
            if (chatBody.children.length === 0) {
                addMessageToChat("Hi! I am Prashanth's AI assistant. Ask me anything about his projects, skills, or background! 🤖", 'bot');
            }
        });

        chatCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWindow.classList.remove('open');
        });
        
        // Prevent closing window when clicking inside it
        chatWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close window when clicking outside
        document.addEventListener('click', () => {
            chatWindow.classList.remove('open');
        });
    }

    function addMessageToChat(text, sender) {
        if (!chatBody) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerHTML = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleBotResponse(userInput) {
        let cleanInput = userInput.toLowerCase().trim();
        let matchedResponse = "I'm sorry, I didn't quite get that. Ask about 'projects', 'skills', 'education', 'experience', 'certifications', 'achievements', 'interests', or 'contact'! 🤖";
        
        // Split input into words and strip punctuation for clean keyword matching
        let words = cleanInput.split(/[\s,?!.();:]+/).filter(w => w);
        
        for (let category in chatbotKnowledgeBase) {
            let matches = chatbotKnowledgeBase[category].keywords.some(keyword => {
                if (keyword.includes(' ')) {
                    return cleanInput.includes(keyword);
                }
                return words.includes(keyword);
            });
            if (matches) {
                matchedResponse = chatbotKnowledgeBase[category].response;
                break;
            }
        }

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-loader';
        typingDiv.innerHTML = 'Thinking...';
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            addMessageToChat(matchedResponse, 'bot');
        }, 500);
    }

    const sendMessage = () => {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (text) {
            addMessageToChat(text, 'user');
            chatInput.value = '';
            handleBotResponse(text);
        }
    };

    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const question = chip.textContent;
            addMessageToChat(question, 'user');
            handleBotResponse(question);
        });
    });

    /* ==========================================================================
       HERO VIDEO PLAY/PAUSE CONTROLLER
       ========================================================================== */
    if (videoControlBtn && heroVideo) {
        videoControlBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (heroVideo.paused) {
                heroVideo.play();
                videoControlBtn.innerHTML = '<i class="fas fa-pause"></i>';
                videoControlBtn.setAttribute('aria-label', 'Pause background video');
            } else {
                heroVideo.pause();
                videoControlBtn.innerHTML = '<i class="fas fa-play"></i>';
                videoControlBtn.setAttribute('aria-label', 'Play background video');
            }
        });

        // Reset play/pause button state when the voice intro finishes
        heroVideo.addEventListener('ended', () => {
            videoControlBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoControlBtn.setAttribute('aria-label', 'Play background video');
        });
    }

    /* ==========================================================================
       CYBERPUNK THEME SWITCHER LOGIC
       ========================================================================== */
    const themeDots = document.querySelectorAll('.theme-dot');
    
    // Load persisted theme or default to cyan
    const currentTheme = localStorage.getItem('prashanth-theme') || 'cyan';
    setTheme(currentTheme);

    themeDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = dot.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    function setTheme(theme) {
        // Remove all theme classes from body
        document.body.classList.remove('theme-cyan', 'theme-purple', 'theme-green');
        
        // Add selected theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Persist selection
        localStorage.setItem('prashanth-theme', theme);
        
        // Update active class on dots
        themeDots.forEach(dot => {
            if (dot.getAttribute('data-theme') === theme) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       DYNAMIC TYPEWRITER TAGLINE LOGIC
       ========================================================================== */
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const words = [
            'CS Student, Data Scientist & Analyst.',
            'Machine Learning Enthusiast.',
            'Full Stack Web Developer.',
            'Predictive Analytics Specialist.',
            'Generative AI Practitioner.'
        ];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIdx];
            if (isDeleting) {
                typewriter.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typewriter.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }
            
            let typeSpeed = isDeleting ? 40 : 80;
            
            if (!isDeleting && charIdx === currentWord.length) {
                typeSpeed = 1500; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typewriter
        type();
    }
});
