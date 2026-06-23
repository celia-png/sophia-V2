document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica do Áudio / Voz da SophIA
    const btnVoice = document.getElementById('btn-voice');
    const audioElement = document.getElementById('sophia-audio');
    let isPlaying = false;

    btnVoice.addEventListener('click', () => {
        if (isPlaying) return; 

        btnVoice.classList.add('playing');
        btnVoice.innerHTML = '<span class="icon">🔊</span> Reproduzindo...';
        isPlaying = true;

        // Tenta tocar o arquivo 'audio.mp3'. Se não achar, usa a voz do sistema.
        audioElement.play().catch(error => {
            console.log('Arquivo de áudio não encontrado. Usando síntese de voz nativa.');
            
            const speech = new SpeechSynthesisUtterance("Olá! Eu sou a Sofia e vou conduzir sua entrevista agora.");
            speech.lang = 'pt-BR';
            speech.rate = 1.0;
            
            speech.onend = resetVoiceButton;
            window.speechSynthesis.speak(speech);
        });

        audioElement.onended = resetVoiceButton;
    });

    function resetVoiceButton() {
        btnVoice.classList.remove('playing');
        btnVoice.innerHTML = '<span class="icon">🔊</span> Entrevistas por voz';
        isPlaying = false;
    }

    // 2. Lógica do Carrossel de Depoimentos
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function getCardsVisible() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        const cardsVisible = getCardsVisible();
        const cards = document.querySelectorAll('.testimonial-card');
        const maxIndex = Math.max(0, cards.length - cardsVisible);

        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        
        const moveAmount = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${moveAmount}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const maxIndex = document.querySelectorAll('.testimonial-card').length - getCardsVisible();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);

    // 3. Efeitos de Fade-in no Scroll (Lazy Loading visual)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
