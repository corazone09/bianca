document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const mainMessage = document.getElementById('main-message');
    const floatingHearts = document.querySelector('.floating-hearts');
    const photoFrame = document.querySelector('.photo-frame');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const photoCounter = document.getElementById('photo-counter');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const bgMusic = document.getElementById('bg-music');
    
    // Daftar foto (ganti dengan URL foto Anda)
    const photos = [
        '/assets/a1.jpg',
        '/assets/a2.jpg',
        '/assets/a3.jpg',
        '/assets/a4.jpg',
        '/assets/a5.jpg',
        '/assets/a6.jpg',
        '/assets/a7.jpg',
        '/assets/a8.jpg',
        '/assets/a9.jpg',
        '/assets/a10.jpg',
        '/assets/a11.jpg',
        '/assets/a13.jpg',
        '/assets/a12.jpg'

    ];
    
    let currentPhotoIndex = 0;
    let slideInterval;
    
    // Inisialisasi galeri foto
    function initPhotoGallery() {
        photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `Foto ${index + 1}`;
            img.classList.add('photo');
            if (index === 0) img.classList.add('active');
            photoFrame.appendChild(img);
        });
        updatePhotoCounter();
    }
    
    // Ganti foto
    function changePhoto(direction) {
        const images = document.querySelectorAll('.photo');
        images[currentPhotoIndex].classList.remove('active');
        
        if (direction === 'next') {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        } else {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        }
        
        images[currentPhotoIndex].classList.add('active');
        updatePhotoCounter();
    }
    
    // Update counter foto
    function updatePhotoCounter() {
        photoCounter.textContent = `${currentPhotoIndex + 1}/${photos.length}`;
    }
    
    // Auto slide foto
    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(() => {
            changePhoto('next');
        }, 5000);
    }
    
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // Buat animasi hati
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('heart-float');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 4 + 3 + 's';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            floatingHearts.appendChild(heart);
            
            // Hapus hati setelah animasi selesai
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 300);
    }
    
    // Animasi pesan
    function animateMessage() {
        const messages = [
            "Kamu Cantik",
            "Kamu Menawan",
            "Kamu Memesona",
            "Kamu Luar Biasa",
            "Kamu Sempurna"
        ];
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            mainMessage.style.animation = 'none';
            void mainMessage.offsetWidth; // Trigger reflow
            mainMessage.style.animation = null;
            mainMessage.innerHTML = messages[currentIndex] + ' <span class="heart">❤️</span>';
        }, 3000);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        changePhoto('prev');
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        changePhoto('next');
        startAutoSlide();
    });
    
    playBtn.addEventListener('click', () => {
        bgMusic.play();
    });
    
    pauseBtn.addEventListener('click', () => {
        bgMusic.pause();
    });
    
    volumeSlider.addEventListener('input', () => {
        bgMusic.volume = volumeSlider.value;
    });
    
    // Inisialisasi
    initPhotoGallery();
    createFloatingHearts();
    animateMessage();
    startAutoSlide();
    
    // Coba mainkan musik otomatis (mungkin diblokir browser)
    document.addEventListener('click', function initMusic() {
        bgMusic.volume = volumeSlider.value;
        bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        document.removeEventListener('click', initMusic);
    }, { once: true });
});