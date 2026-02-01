
onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // Interactive Elements
  const messages = [
    "FAHHHHH.....",
    "THARKULAAA....",
    "BIRYANIIII....",
    "VADAPAV",
    "GWALIOR NEWS",
    "PIJJO",
    "ATTENDANCE⚠️⚠️",
    "HMMMMMMMMMMMMMMMMMMMMMMMMMMMM",
    "TONKA JUHARI",
    "100MILES + JAB KOI BAAT"
  ];

  let lastTime = 0;

  // Mouse Move - Heart Trail
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 50) return; // Limit creation rate
    lastTime = now;

    createHeart(e.clientX, e.clientY);
  });

  // Click - Burst and Funny Text
  document.addEventListener('click', (e) => {
    // Burst of hearts
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createHeart(e.clientX, e.clientY, true);
      }, i * 50);
    }

    // Funny Text
    createFunnyText(e.clientX, e.clientY);
  });

  function createHeart(x, y, isBurst = false) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = '❤';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Randomize size and rotation
    const size = Math.random() * 20 + 10;
    const rotation = Math.random() * 60 - 30;
    const duration = isBurst ? Math.random() * 1 + 0.5 : Math.random() * 1.5 + 1;

    heart.style.fontSize = `${size}px`;
    heart.style.setProperty('--r', `${rotation}deg`);
    heart.style.animationDuration = `${duration}s`;

    // Random color variation
    const hue = Math.floor(Math.random() * 50) + 330; // Pinks/Reds
    heart.style.color = `hsl(${hue}, 100%, 65%)`;

    // Remove "clip-path" and "background-color" from previous CSS if it conflicts, 
    // but since we added it to CSS slightly broken, we'll override here if needed 
    // or rely on textContent and color. 
    // To ensure text heart works, we should unset background in inline style or rely on 
    // class specificity if the previous CSS is applied.
    // Actually, let's just make sure the CSS treats it as text. 
    // The previous CSS had clip-path and background. I should ideally overwrite that.
    heart.style.background = 'none';
    heart.style.clipPath = 'none';
    heart.style.width = 'auto';
    heart.style.height = 'auto';

    if (isBurst) {
      // Spread out burst by modifying position directly to avoid transform conflict with animation
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;
      heart.style.left = `${x + offsetX}px`;
      heart.style.top = `${y + offsetY}px`;
    }
    // Remove the previous conflicting transform if it was there (implied replacement)

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
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
};
