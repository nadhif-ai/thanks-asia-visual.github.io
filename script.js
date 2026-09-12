/* ============================================================
   SCRIPT.JS — Ucapan Terimakasih, 6 Tahun (2020-2026)
   ------------------------------------------------------------
   Cara baca file ini:
   1. CONFIG DATA        <-- PALING SERING ANDA EDIT (foto, timeline, nama & pesan rekan)
   2. HERO INTRO ANIMATION
   3. SCROLL REVEAL (Intersection Observer)
   4. CAROUSEL / GALLERY
   5. TIMELINE
   6. FRIENDS + MODAL
   7. MINI GAME (endless runner)
   8. MISC (scroll progress, audio toggle, back to top)
   9. INIT
   ============================================================ */

(function () {
    'use strict';

    /* ========================================================
       1. CONFIG DATA — GANTI DI SINI
       ======================================================== */

    // GANTI FOTO CAROUSEL DI SINI. Tambah/hapus baris sesuai jumlah foto Anda.
    const galleryImages = [
        { src: './assets/images/photo-01.jpg', caption: 'Foto zaman kapan ini... after masa pandemi kayanya.' },
        { src: './assets/images/photo-02.jpg', caption: 'Kalo ini kayanya pas tahun baru, marinasi ayam yang buat mertua mas aji kalo ga salah.' },
        { src: './assets/images/photo-03.jpg', caption: 'Bento kopi ada ceritanya.' },
        { src: './assets/images/photo-04.jpg', caption: 'Gapake instruksi gaya, yang penting keliatan hidup.' },
        { src: './assets/images/photo-05.jpg', caption: 'Dibawain daging gratis, kalo panggangannya pake punya mba intan.' },
        { src: './assets/images/photo-06.jpg', caption: 'Ekspresi ketika belum mendapatkan tiket bus.' },
        { src: './assets/images/photo-07.jpg', caption: 'Ramennya kurang asin, semuanya pada suka udon sih kecuali saya.' },
        { src: './assets/images/photo-08.jpg', caption: 'Mas syai dan bospop lagi memikirkan apa?.' },
        { src: './assets/images/photo-09.jpg', caption: 'Mas hadi pertama kali pakai ekspresi senyum.' },
        { src: './assets/images/photo-10.jpg', caption: 'Foto terakhir boleh disimpulkan sendiri saja ...' },
    ];

    // GANTI TIMELINE KENANGAN DI SINI. Boleh tambah/kurangi tahun.
    const timelineData = [
        { year: 2020, text: 'Awal perjalanan, mengenal tempat dan wajah-wajah baru.' },
        { year: 2021, text: 'Mulai mengenal banyak orang dan ritme pekerjaan.' },
        { year: 2022, text: 'Berbagai pengalaman baru dan tanggung jawab yang bertambah.' },
        { year: 2023, text: 'Belajar dan berkembang bersama tim.' },
        { year: 2024, text: 'Berbagai cerita, tawa, dan tantangan yang dilalui bersama.' },
        { year: 2025, text: 'Semakin banyak kenangan yang tersimpan baik suka dan duka.' },
        { year: 2026, text: 'Saatnya mengucapkan terima kasih dan melangkah ke babak baru.' },
    ];

    // GANTI NAMA & PESAN REKAN DI SINI. Jangan ubah urutan/jumlah tanpa perlu — total 20 orang.
    // Setiap object: name (jangan diubah), message (silakan diedit bebas), emoji (opsional), photo (opsional, isi path jika ada).
    const friends = [
        { name: "Pak Iwan", emoji: "🤵🌟", message: "Maturnuwun pak, sudah diberi kesempatan buat jadi bagian asia visual, sama bantuan yang udah diberikan buat saya. ", photo: null },
        { name: "Bu Soufy", emoji: "💁🌸", message: "Makasih banyak ya bu, udah ngasih kelonggaran buat kerja sambil kuliah, bantuan selama waktu sakit dan bantuan lain yang gabisa disebut satu per satu. ", photo: null },
        { name: "Mas Ajhi", emoji: "💎⚽Salam 2-8😄", message: "Buat mas aji, terimakasih banyak buat arahanya, bimbinganya dan nggak lupa traktiranya wkwk, sering sering rematch ps yak, masih ada waktu latihan kalo lagi istirahat, tunggu aja.", photo: null },
        { name: "Pak Ali", emoji: "🌊", message: "Makasih pak, udah diajarin cara bikin kabel jaringan, cara benerin komputer lemot sama cara make printer docu yang lama., Karedok Sama Nasi Lengko Mba May Kalo Bisa Sediakan Sampai Sore.", photo: null },
        { name: "Mas Syai", emoji: "🌊", message: "Mas Syai, Matursuwun.. next nnton ajakin ke pekan raya jakarta, jangan konser yang gratisan bae, jangan dangdut sound horeg terus, sesekali tipe-x apa metal yak. ", photo: null },
        { name: "Mas Hadi", emoji: "🌊", message: "Thanks mas had, karena udah sering dipinjemin motor, semoga dilancarkan urusanya dan rezekinya, sebentar lagi udah jadi bapak ya mas. ", photo: null },
        { name: "Mas Faik", emoji: "🌊", message: "Bospop, kalo kerja yang fokus, kerjain satu satu dulu aja bospop, kalo ada sesuatu ngomong aja bospop wkwk jangan diem2 bae, makasih bospop.", photo: null },
        { name: "Mas Vi'i", emoji: "🌊", message: "Sing sabar mas pii nek apa2, inget umur wis terus nambah, makasih mas udah teliti kalo ngerjain cetakan, meringankan desain biar gak kena komplainan.", photo: null },
        { name: "Mas Duta", emoji: "🌊", message: "Syukron mas dut, sering nuker cash tiap minggu, hidangan bukber setiap harinya pas puasa, sing semangat nek shift malem mas dut jangan diem2 bae wkwk.", photo: null },
        { name: "Mba Intan", emoji: "🌊", message: "wah, habis duit gue mba nurutin ajakan lu jajan2 bae, tabung napa duitnya di jago pake fitur kantong, inget mba senengin diri dulu jangan peliharaanya bae. Makasih mba rekomendasi jajanannya.", photo: null },
        { name: "Livia", emoji: "🎀💅", message: "Si paling aktif, informasi apa aja pasti ngerti, kurangi makan seblaknya, perut temen2mu nggak sekuat itu, thanks liv.", photo: null },
        { name: "Shinta", emoji: "🌷", message: "Shin, banyakin healing yak, jaga kesehatan, masih muda, playlist lagunya jangan tiara andini bae dong coba band lain wkwk, makasih banyak shin.", photo: null },
        { name: "Aina", emoji: "🌷", message: "Ai, ganti genre filmnya, suka banget heran nonton horor, kalo bawa cemilan buah jangan ditaruh diatas meja nanti ilang. Makasih ya ai, semoga hajatnya cepat tertunaikan.", photo: null },
        { name: "Rizky", emoji: "⚽Salam 2-8😄😂😜", message: "Ki, parah lu ki udah sering ngalahin main ps, ayoklah rematch, Hala Madrid! Salam 8-2, Kalahin Mas Aji ki nanti dia jumawa.", photo: null },
        { name: "Reyhan", emoji: "🌊", message: "Thanks han udah banyak bantu yak, aslinya masih banyak perempuan diluar sana kok yang lebih baik dan tepat, santai saja.", photo: null },
        { name: "Devina", emoji: "🌷", message: "Ayo battle tebak negara jangan pake bendera dev, pakai ibukota aja coba, semoga bisa virtual zoom ya sama charles lerlecnya., saya tim vertstappen soalnya. ", photo: null },
        { name: "Ujang", emoji: "🌊", message: "Makasih jang, udah kooperatif banyak bantu nurunin banner yang diduluin finisingnya, buat yang ditunggu dan ditinggal mana.", photo: null },
        { name: "Tiara", emoji: "🌷", message: "Walau baru sebentar, tapi udah jago aja ya tiara, mantap lanjutkan, makasih banyak ya buat kerjasamanya.", photo: null },
        { name: "Mas Kholik", emoji: "🌊", message: "Bang bedul, jangan sering makan mie instan, ganti yang lain nasi sama mie sama2 karbo bukan protein, ganti tempe aja mas, makasih banyak mas.", photo: null },
        { name: "Mas Hanafi", emoji: "🌊", message: "Walau orangnya gak masuk grup, entah karena apa sebabnya, yang jelas, makasih mas hanafi, tiap ganti motor selalu bagus, pikirkan buat makan dulu aja sama kelangsungan hidupnya.", photo: null },
        { name: "Mas Subhan", emoji: "🌊", message: "Thanks Mas Subhan buat kerjasamanya. Semoga dilancarkan dan dimudahkan selalu urusanya, Aminnn.", photo: null },
        { name: "Mas Andi", emoji: "🌊", message: "Thanks Mas Andi buat kerjasamanya. Semoga dilancarkan dan dimudahkan selalu urusanya, Aminnn.", photo: null },
    
    ];

    // Data dummy untuk papan skor (boleh diganti / dikosongkan array-nya)
    const leaderboardData = [
        { name: "Sukses Dunia Akhirat", score: 120 },
        { name: "Diberikan Jawaban Dari Doa2nya", score: 100 },
        { name: "Dilancarkan Urusanya", score: 90 },
        { name: "Diberikan Kesehatan Selalu ...", score: 80 },
        { name: "Dimudahkan Rezekinya...", score: 65 },
    ];


    /* ========================================================
       UTIL
       ======================================================== */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));


    /* ========================================================
       2. HERO INTRO ANIMATION
       ======================================================== */
    function initHero() {
        const heroEls = $$('#hero .reveal');
        heroEls.forEach((el, i) => {
            el.style.transitionDelay = prefersReducedMotion ? '0ms' : `${500 + i * 220}ms`;
        });
        // beri sedikit jeda agar transisi CSS ter-trigger dengan baik
        window.requestAnimationFrame(() => {
            setTimeout(() => heroEls.forEach((el) => el.classList.add('active')), 60);
        });
    }


    /* ========================================================
       3. SCROLL REVEAL (Intersection Observer)
       ======================================================== */
    function createRevealObserver(options) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, options || { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
        return obs;
    }

    function initScrollReveal() {
        const generalObserver = createRevealObserver();
        const targets = $$('.reveal, .reveal-up, .reveal-scale')
            .filter((el) => !el.closest('#hero') && el.id !== 'carousel' && !el.closest('#friends-grid'));
        targets.forEach((el) => generalObserver.observe(el));

        // Stagger khusus untuk urutan closing: judul -> pesan -> nama -> tombol
        const closingEls = $$('#closing .reveal');
        closingEls.forEach((el, i) => {
            el.style.transitionDelay = prefersReducedMotion ? '0ms' : `${i * 180}ms`;
        });
    }


    /* ========================================================
       4. CAROUSEL / GALLERY
       ======================================================== */
    function initCarousel() {
        const track = $('#carousel-track');
        const dotsWrap = $('#carousel-dots');
        const prevBtn = $('#carousel-prev');
        const nextBtn = $('#carousel-next');
        if (!track) return;

        // Bangun slide dari data galleryImages
        track.innerHTML = galleryImages.map((img, i) => `
            <div class="carousel-slide" data-index="${i}">
                <img src="${img.src}" alt="${img.caption}" loading="lazy"
                     onerror="this.closest('.carousel-slide').style.background='linear-gradient(135deg,#C9AE93,#8C6A4C)'; this.style.display='none';">
                <div class="carousel-slide-caption">${img.caption}</div>
            </div>
        `).join('');

        dotsWrap.innerHTML = galleryImages.map((_, i) =>
            `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Foto ke-${i + 1}"></button>`
        ).join('');

        const slides = $$('.carousel-slide', track);
        const dots = $$('.carousel-dot', dotsWrap);
        let current = 0;
        let autoplayTimer = null;
        const AUTOPLAY_MS = 4500;

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAutoplay() {
            if (prefersReducedMotion) return;
            stopAutoplay();
            autoplayTimer = setInterval(next, AUTOPLAY_MS);
        }
        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); startAutoplay(); });
        nextBtn.addEventListener('click', () => { next(); stopAutoplay(); startAutoplay(); });
        dots.forEach((d) => d.addEventListener('click', () => {
            goTo(parseInt(d.dataset.index, 10));
            stopAutoplay(); startAutoplay();
        }));

        // Swipe gesture (mobile)
        let startX = 0;
        let isDragging = false;
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoplay();
        }, { passive: true });

        track.addEventListener('touchmove', () => { /* dibiarkan sederhana, swipe dihitung di touchend */ }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 40) {
                diff > 0 ? next() : prev();
            }
            startAutoplay();
        });

        // Reveal saat scroll ke section gallery
        const galleryObserver = createRevealObserver({ threshold: 0.2 });
        galleryObserver.observe($('#carousel'));
        $('#carousel').classList.add('reveal-up');

        goTo(0);
        startAutoplay();

        // Jeda autoplay saat tab tidak aktif
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay(); else startAutoplay();
        });
    }


    /* ========================================================
       5. TIMELINE
       ======================================================== */
    function initTimeline() {
        const wrap = $('#timeline-items');
        const line = $('.timeline-line');
        if (!wrap) return;

        wrap.innerHTML = timelineData.map((item) => `
            <div class="timeline-item">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-text">${item.text}</div>
            </div>
        `).join('');

        const items = $$('.timeline-item', wrap);
        items.forEach((el, i) => {
            el.style.transitionDelay = prefersReducedMotion ? '0ms' : `${i * 140}ms`;
        });

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    line.classList.add('active');
                    items.forEach((el) => el.classList.add('active'));
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineObserver.observe($('#timeline'));
    }


    /* ========================================================
       6. FRIENDS + MODAL
       ======================================================== */
    function initFriends() {
        const grid = $('#friends-grid');
        if (!grid) return;

        grid.innerHTML = friends.map((f, i) => `
            <button class="friend-card" data-index="${i}" type="button">
                <div class="friend-card-top">
                    <span class="friend-name">${f.name}</span>
                    <span class="friend-emoji">${f.emoji || '❤️'}</span>
                </div>
                <p class="friend-preview">${f.message}</p>
                <span class="friend-tap-hint">Ketuk untuk baca selengkapnya</span>
            </button>
        `).join('');

        const cards = $$('.friend-card', grid);
        cards.forEach((el, i) => {
            el.style.transitionDelay = prefersReducedMotion ? '0ms' : `${(i % 6) * 90}ms`;
        });

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

        cards.forEach((c) => cardObserver.observe(c));

        // Modal
        const modal = $('#friend-modal');
        const modalName = $('#friend-modal-name');
        const modalMessage = $('#friend-modal-message');
        const modalEmoji = $('#friend-modal-emoji');
        const closeBtn = $('#friend-modal-close');
        const backdrop = $('#friend-modal-backdrop');

        function openModal(index) {
            const f = friends[index];
            modalName.textContent = f.name;
            modalMessage.textContent = f.message;
            modalEmoji.textContent = f.emoji || '❤️';
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.friend-card');
            if (card) openModal(parseInt(card.dataset.index, 10));
        });

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }


    /* ========================================================
       7. MINI GAME — ENDLESS RUNNER
       ======================================================== */
    function initGame() {
        const canvas = $('#game-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const overlay = $('#game-overlay');
        const overlayTitle = $('#game-overlay-title');
        const overlayDesc = $('#game-overlay-desc');
        const startBtn = $('#game-start-btn');
        const jumpBtn = $('#game-jump-btn');
        const scoreEl = $('#game-score');
        const bestEl = $('#game-best');

        const HIGH_SCORE_KEY = 'farewell_highscore_2026';
        let bestScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
        bestEl.textContent = bestScore;

        let W, H, DPR;
        function resize() {
            DPR = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            W = rect.width;
            H = rect.height;
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);

        const GROUND_RATIO = 0.78;
        const GRAVITY = 0.0018;
        const JUMP_VELOCITY = -0.62;

        let state = 'idle'; // idle | playing | gameover
        let player, obstacles, score, speed, lastTime, spawnTimer, groundOffset;

        function resetState() {
            const groundY = H * GROUND_RATIO;
            player = {
                x: W * 0.16,
                y: groundY,
                size: Math.max(30, H * 0.16),
                vy: 0,
                jumping: false,
                squash: 1,
            };
            obstacles = [];
            score = 0;
            speed = 0.28; // px per ms (akan naik perlahan)
            lastTime = null;
            spawnTimer = 0;
            groundOffset = 0;
            scoreEl.textContent = '0';
        }

        function jump() {
            if (state !== 'playing') return;
            if (!player.jumping) {
                player.vy = JUMP_VELOCITY;
                player.jumping = true;
            }
        }

        function spawnObstacle() {
            const groundY = H * GROUND_RATIO;
            const size = Math.max(24, H * 0.13) * (0.85 + Math.random() * 0.4);
            obstacles.push({
                x: W + size,
                y: groundY,
                size,
                emoji: Math.random() > 0.5 ? '🌵' : '📦',
                passed: false,
            });
        }

        function update(dt) {
            const groundY = H * GROUND_RATIO;

            // Player physics
            player.vy += GRAVITY * dt;
            player.y += player.vy * dt;
            if (player.y > groundY) {
                player.y = groundY;
                player.vy = 0;
                player.jumping = false;
            }

            // Ground scroll
            groundOffset -= speed * dt;

            // Spawn obstacles
            spawnTimer -= dt;
            if (spawnTimer <= 0) {
                spawnObstacle();
                spawnTimer = 1200 + Math.random() * 900 - Math.min(500, score * 4);
                spawnTimer = Math.max(spawnTimer, 650);
            }

            // Move obstacles + collision + score
            for (let i = obstacles.length - 1; i >= 0; i--) {
                const o = obstacles[i];
                o.x -= speed * dt;

                // collision (bounding circle sederhana)
                const dx = (o.x) - (player.x);
                const dy = (o.y - o.size * 0.4) - (player.y - player.size * 0.4);
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < (o.size + player.size) * 0.32) {
                    gameOver();
                    return;
                }

                if (!o.passed && o.x < player.x) {
                    o.passed = true;
                    score += 10;
                    scoreEl.textContent = score;
                }

                if (o.x < -o.size) {
                    obstacles.splice(i, 1);
                }
            }

            // Naikkan speed perlahan
            speed = Math.min(0.65, 0.28 + score * 0.0022);
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            const groundY = H * GROUND_RATIO;

            // Ground line
            ctx.strokeStyle = '#DCD1BE';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, groundY + player.size * 0.42);
            ctx.lineTo(W, groundY + player.size * 0.42);
            ctx.stroke();

            // Dash marks bergerak (kesan lari)
            ctx.strokeStyle = '#E7DCC8';
            ctx.lineWidth = 2;
            const dashLen = 24, gap = 20;
            const total = dashLen + gap;
            let offset = ((groundOffset % total) + total) % total;
            for (let x = -offset; x < W; x += total) {
                ctx.beginPath();
                ctx.moveTo(x, groundY + player.size * 0.42 + 10);
                ctx.lineTo(x + dashLen, groundY + player.size * 0.42 + 10);
                ctx.stroke();
            }

            // Player
            ctx.save();
            ctx.font = `${player.size}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.translate(player.x, player.y);
            ctx.scale(1, player.jumping ? 0.94 : 1);
            ctx.fillText('🏃', 0, 0);
            ctx.restore();

            // Obstacles
            obstacles.forEach((o) => {
                ctx.save();
                ctx.font = `${o.size}px serif`;
                ctx.textAlign = 'center';
                ctx.translate(o.x, o.y);
                ctx.fillText(o.emoji, 0, 0);
                ctx.restore();
            });
        }

        function loop(ts) {
            if (state !== 'playing') return;
            if (lastTime === null) lastTime = ts;
            const dt = Math.min(40, ts - lastTime); // clamp agar tidak lompat jauh saat tab lag
            lastTime = ts;
            update(dt);
            if (state === 'playing') {
                draw();
                requestAnimationFrame(loop);
            }
        }

        function startGame() {
            resize();
            resetState();
            state = 'playing';
            overlay.classList.add('hidden');
            requestAnimationFrame(loop);
        }

        function gameOver() {
            state = 'gameover';
            draw();
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem(HIGH_SCORE_KEY, String(bestScore));
                bestEl.textContent = bestScore;
            }
            overlayTitle.textContent = 'Yah, Berhenti';
            overlayDesc.textContent = `Skor kamu: ${score}. Tetap jalani dan lalui karena perjalanan hidup masih panjang, jatuh terus bangkit  dan ulangi seperti game ini.`;
            startBtn.textContent = 'MAIN LAGI';
            overlay.classList.remove('hidden');
        }

        startBtn.addEventListener('click', startGame);
        jumpBtn.addEventListener('click', jump);
        canvas.addEventListener('pointerdown', jump);

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                if (state === 'playing') jump();
                else startGame();
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && state === 'playing') {
                state = 'gameover';
                overlayTitle.textContent = 'Jeda';
                overlayDesc.textContent = `Skor kamu: ${score}. Tekan mulai untuk main lagi.`;
                startBtn.textContent = 'MULAI LAGI';
                overlay.classList.remove('hidden');
            }
        });

        // Render leaderboard dummy
        const lbList = $('#leaderboard-list');
        if (lbList) {
            lbList.innerHTML = leaderboardData
                .sort((a, b) => b.score - a.score)
                .map((row) => `<li><span class="lb-name">${row.name}</span><span>${row.score}</span></li>`)
                .join('');
        }

        resetState();
        draw();
    }


    /* ========================================================
       8. MISC — scroll progress, audio toggle, back to top
       ======================================================== */
    function initMisc() {
        // Scroll progress bar
        const progressBar = $('#scroll-progress');
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = pct + '%';
        }
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        // Audio toggle (struktur disiapkan, musik belum diisi)
        const audioBtn = $('#audio-toggle');
        // GANTI MUSIK DI SINI: letakkan file di assets/audio/ lalu isi src di bawah
        const bgAudio = new Audio('./assets/audio/backsound.mp3'); // contoh: new Audio('./assets/audio/backsound.mp3');
        bgAudio.loop = true;
        let audioOn = false;

        audioBtn.addEventListener('click', () => {
            if (!bgAudio.src) {
                audioBtn.textContent = audioOn ? '🔇' : '🔊';
                audioOn = !audioOn;
                // Belum ada file musik — tombol hanya berganti ikon.
                // Setelah Anda isi src musik di atas, baris di bawah akan otomatis berfungsi.
                return;
            }
            if (audioOn) {
                bgAudio.pause();
                audioBtn.textContent = '🔇';
            } else {
                bgAudio.play().catch(() => {});
                audioBtn.textContent = '🔊';
            }
            audioOn = !audioOn;
        });

        // Back to top
        const backBtn = $('#back-to-top');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });
        }
    }


    /* ========================================================
       9. INIT
       ======================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        initHero();
        initScrollReveal();
        initCarousel();
        initTimeline();
        initFriends();
        initGame();
        initMisc();
    });
})();
