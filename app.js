document.addEventListener('DOMContentLoaded', function() {

    // ========== NAVBAR MOBILE ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== SLIDER ==========
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.transition = 'opacity 0.8s ease-in-out';
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function nextSlideFn() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    function prevSlideFn() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }

    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlideFn, 5000);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            prevSlideFn();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nextSlideFn();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            showSlide(index);
            startAutoSlide();
        });
    });

    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlideFn();
            startAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlideFn();
            startAutoSlide();
        }
    });

    if (slides.length > 0) {
        slides.forEach((s, i) => {
            s.style.opacity = i === 0 ? '1' : '0';
            s.style.transition = 'opacity 0.8s ease-in-out';
        });
        showSlide(0);
        startAutoSlide();
    }

    // ========== MODAL PORTOFOLIO ==========
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const portfolioData = {
        modal1: {
            title: 'Lovebird',
            image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop',
            category: 'Burung Kicau',
            description: 'Lovebird adalah burung kicau yang populer dengan suara merdu dan warna bulu yang indah. Burung ini mudah dirawat dan sangat cocok untuk pemula.',
            link: 'https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Lovebird'
        },
        modal2: {
            title: 'Kenari',
            image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop&sat=-100',
            category: 'Burung Kicau',
            description: 'Kenari adalah burung dengan suara kicauan yang merdu dan beragam. Tersedia dalam berbagai warna dan jenis dengan kualitas suara terbaik.',
            link: 'https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Kenari'
        },
        modal3: {
            title: 'Murai Batu',
            image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop&sat=50',
            category: 'Burung Kicau Premium',
            description: 'Murai Batu adalah burung kicau premium dengan suara keras dan variasi kicauan yang kompleks. Sangat diminati oleh kolektor burung kelas atas.',
            link: 'https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Murai%20Batu'
        },
        modal4: {
            title: 'Cucak Jenggot',
            image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop&sat=30',
            category: 'Burung Kicau',
            description: 'Cucak Jenggot adalah burung kicau dengan suara yang unik dan menarik. Memiliki bulu yang indah dan mudah beradaptasi dengan lingkungan baru.',
            link: 'https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Cucak%20Jenggot'
        }
    };

    function openModal(modalId) {
        const data = portfolioData[modalId];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalCategory.textContent = 'Kategori: ' + data.category;
        modalDescription.textContent = data.description;
        modalLink.href = data.link;

        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            if (modalId) {
                openModal(modalId);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ========== CONTACT FORM ==========
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const msgDiv = document.getElementById('formMessage');

            if (!name || !email || !message) {
                showMessage('Semua field harus diisi!', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Email tidak valid!', 'error');
                return;
            }

            showMessage('Pesan berhasil dikirim! Terima kasih 🙏', 'success');
            this.reset();

            setTimeout(() => {
                msgDiv.style.display = 'none';
            }, 5000);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(text, type) {
        const el = document.getElementById('formMessage');
        if (!el) return;
        el.textContent = text;
        el.className = 'mt-4 ' + type;
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 5000);
    }

    // ========== SCROLL ANIMATION ==========
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.bg-white.rounded-2xl, .bg-\\[\\#f5f0e8\\].rounded-2xl, .portfolio-item, .service-item').forEach(el => {
        if (!el.closest('nav') && !el.closest('footer')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });

    // ========== VIDEO MODAL ==========
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoButton = document.getElementById('videoButton');
    const videoIframe = document.getElementById('videoIframe');

    if (videoButton) {
        videoButton.addEventListener('click', function() {
            videoModalOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            videoIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        });
    }

    if (videoModalClose) {
        videoModalClose.addEventListener('click', function() {
            videoModalOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
            videoIframe.src = '';
        });
    }

    videoModalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            videoModalOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
            videoIframe.src = '';
        }
    });

        // ========== TESTIMONI SLIDER ==========
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;
    let testimonialInterval;
    const totalSlides = testimonialSlides.length;

    function showTestimonial(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentTestimonial = index;
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('bg-[#ffd700]', i === index);
            dot.classList.toggle('bg-gray-300', i !== index);
        });
    }

    function nextTestimonialFn() {
        showTestimonial(currentTestimonial + 1);
    }

    function prevTestimonialFn() {
        showTestimonial(currentTestimonial - 1);
    }

    function startTestimonialAuto() {
        if (testimonialInterval) clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonialFn, 5000);
    }

    function stopTestimonialAuto() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
            testimonialInterval = null;
        }
    }

    // Event listeners tombol
    if (nextTestimonial) {
        nextTestimonial.addEventListener('click', function() {
            nextTestimonialFn();
            startTestimonialAuto();
        });
    }

    if (prevTestimonial) {
        prevTestimonial.addEventListener('click', function() {
            prevTestimonialFn();
            startTestimonialAuto();
        });
    }

    // Event listeners dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
            startTestimonialAuto();
        });
    });

    // Pause on hover
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopTestimonialAuto);
        testimonialSection.addEventListener('mouseleave', startTestimonialAuto);
    }

    // Start slider
    if (totalSlides > 0) {
        showTestimonial(0);
        startTestimonialAuto();
    }

    console.log('🐦 Kicau Mania - Website Revisi Aktif!');
});