onload = () => {

    // Cute & Romantic Lotus Messages for Khushi
    const messages = [
        " 🌸",
        "Mazak se hatt se ke bolru",
        "aisaa jii",
        ""
    ];

    let lastTime = 0;

    // Mouse Move - Trail of Hearts and Lotus Petals
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 40) return; // Limit creation rate for performance
        lastTime = now;

        createPetalOrHeart(e.clientX, e.clientY);
    });

    // Click - Burst of Petals + Hearts + Romantic Floating Text
    document.addEventListener('click', (e) => {
        // Prevent click trigger if clicking inside inputs or buttons
        if (e.target.closest('#askCard') || e.target.closest('#successBox')) return;

        // Burst of particles
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createPetalOrHeart(e.clientX, e.clientY, true);
            }, i * 40);
        }

        // Floating Text
        createFunnyText(e.clientX, e.clientY);
    });

    // Spawns Hearts or Floating Lotus Petals
    function createPetalOrHeart(x, y, isBurst = false) {
        const p = document.createElement('div');
        const isPetal = Math.random() > 0.4;

        if (isPetal) {
            p.classList.add('heart-particle');
            p.textContent = '🌸';
            p.style.fontFamily = 'sans-serif';
        } else {
            p.classList.add('heart-particle');
            p.textContent = '💖';
        }

        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        const size = Math.random() * 18 + 14;
        const rotation = Math.random() * 360;
        const duration = isBurst ? Math.random() * 1.2 + 0.8 : Math.random() * 1.5 + 1;

        p.style.fontSize = `${size}px`;
        p.style.setProperty('--r', `${rotation}deg`);
        p.style.animationDuration = `${duration}s`;
        p.style.background = 'none';
        p.style.clipPath = 'none';
        p.style.width = 'auto';
        p.style.height = 'auto';

        if (isBurst) {
            const offsetX = (Math.random() - 0.5) * 140;
            const offsetY = (Math.random() - 0.5) * 140;
            p.style.left = `${x + offsetX}px`;
            p.style.top = `${y + offsetY}px`;
        }

        document.body.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, duration * 1000);
    }

    function createFunnyText(x, y) {
        const text = document.createElement('div');
        text.classList.add('funny-text');
        text.textContent = messages[Math.floor(Math.random() * messages.length)];
        text.style.left = `${x}px`;
        text.style.top = `${y}px`;

        document.body.appendChild(text);

        setTimeout(() => {
            text.remove();
        }, 2500);
    }

    // ===================================================
    // INTERACTIVE ASK CARD LOGIC (YES / NO BUTTONS)
    // ===================================================
    const askCard = document.getElementById('askCard');
    const successBox = document.getElementById('successBox');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const btnSubmit = document.getElementById('btnSubmit');
    const numberInput = document.getElementById('numberInput');
    const whatsappNote = document.getElementById('whatsappNote');

    // Runaway "No" Button
    if (btnNo) {
        const moveNoButton = () => {
            // Keep the playful button on-screen on compact touch devices.
            const horizontalRange = Math.min(110, Math.max(40, window.innerWidth * 0.22));
            const verticalRange = Math.min(60, Math.max(25, window.innerHeight * 0.08));
            const x = (Math.random() - 0.5) * horizontalRange * 2;
            const y = (Math.random() - 0.5) * verticalRange * 2;
            btnNo.style.transform = `translate(${x}px, ${y}px)`;
        };

        btnNo.addEventListener('mouseover', moveNoButton);
        btnNo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    // "Yes!" Button Click Handler
    if (btnYes) {
        btnYes.addEventListener('click', () => {
            // Massive Celebration Burst
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const rx = window.innerWidth * 0.2 + Math.random() * (window.innerWidth * 0.6);
                    const ry = window.innerHeight * 0.2 + Math.random() * (window.innerHeight * 0.5);
                    createPetalOrHeart(rx, ry, true);
                }, i * 35);
            }

            // Hide askCard, show successBox
            if (askCard) askCard.style.display = 'none';
            if (successBox) successBox.classList.remove('hidden');
        });
    }

    // Save/Send Number Handler
    const handleSendNumber = () => {
        const val = numberInput ? numberInput.value.trim() : '';
        const targetNumber = '919311696555';
        if (val) {
            const message = encodeURIComponent(`Hey! Here's my number Khushi ji: ${val} 💕`);
            window.open(`https://api.whatsapp.com/send?phone=${targetNumber}&text=${message}`, '_blank');
        } else {
            const defaultMsg = encodeURIComponent("💕");
            window.open(`https://api.whatsapp.com/send?phone=${targetNumber}&text=${defaultMsg}`, '_blank');
        }
    };

    if (btnSubmit) btnSubmit.addEventListener('click', handleSendNumber);
    if (whatsappNote) whatsappNote.addEventListener('click', handleSendNumber);

    // ===================================================
    // BACKGROUND LOTUS FIELD — DENSE BLOOMING FROM BOTTOM
    // ===================================================
    const lotusPositions = []; // Track positions for spark spawning

    function spawnBackgroundLotuses() {
        const lotusField = document.createElement('div');
        lotusField.classList.add('lotus-field');
        document.body.appendChild(lotusField);

        const numberOfLotuses = 80;
        for (let i = 0; i < numberOfLotuses; i++) {
            const lotus = document.createElement('div');
            lotus.classList.add('bg-lotus');

            const leftPos = (i / numberOfLotuses) * 100 + (Math.random() - 0.5) * 6;
            const row = Math.floor(Math.random() * 5);
            // Stagger rows starting from negative offset up to 12vh
            const bottomOffset = (row * 3.0) - 2 + (Math.random() * 2);
            // Increase scale slightly (0.35 to 0.8) to fill any gaps perfectly
            const scale = 0.35 + (row * 0.08) + (Math.random() * 0.25);
            const delay = Math.random() * 3.5 + row * 0.4;
            const rotation = (Math.random() - 0.5) * 18;

            lotus.style.left = `${leftPos}%`;
            lotus.style.bottom = `${bottomOffset}vh`;
            lotus.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
            lotus.style.animationDelay = `${delay}s`;
            lotus.style.zIndex = 10 - row;

            lotus.innerHTML = `
                <div class="bg-lotus-petal center"></div>
                <div class="bg-lotus-petal left-1"></div>
                <div class="bg-lotus-petal right-1"></div>
                <div class="bg-lotus-petal left-2"></div>
                <div class="bg-lotus-petal right-2"></div>
                <div class="bg-lotus-petal out-left"></div>
                <div class="bg-lotus-petal out-right"></div>
            `;

            lotusField.appendChild(lotus);

            // Store position for spark emitter
            lotusPositions.push({
                left: leftPos,
                bottom: bottomOffset
            });
        }
    }

    // ===================================================
    // YELLOW SPARK EMITTER
    // ===================================================
    function emitSpark() {
        if (lotusPositions.length === 0) return;

        // Pick a random lotus to emit from
        const pos = lotusPositions[Math.floor(Math.random() * lotusPositions.length)];

        const spark = document.createElement('div');
        spark.classList.add('lotus-spark');

        // Position at the lotus center
        spark.style.left = `${pos.left + (Math.random() - 0.5) * 2}%`;
        spark.style.bottom = `${pos.bottom + 3 + Math.random() * 2}vh`;

        // Randomize drift and duration
        const duration = 1.5 + Math.random() * 2;
        const driftY = 30 + Math.random() * 60;
        const driftX = (Math.random() - 0.5) * 40;
        const size = 2 + Math.random() * 4;

        spark.style.setProperty('--spark-dur', `${duration}s`);
        spark.style.setProperty('--spark-drift', `${driftY}px`);
        spark.style.setProperty('--spark-x', `${driftX}px`);
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), duration * 1000);
    }

    function startSparkEmitter() {
        // Emit sparks continuously — ~3–5 per second
        setInterval(() => {
            const count = 2 + Math.floor(Math.random() * 3);
            for (let i = 0; i < count; i++) {
                setTimeout(() => emitSpark(), Math.random() * 300);
            }
        }, 250);
    }

    spawnBackgroundLotuses();
    // Start sparks after lotuses have bloomed
    setTimeout(startSparkEmitter, 3000);
};
