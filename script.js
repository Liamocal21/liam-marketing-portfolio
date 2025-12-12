// script.js
// script.js - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animated statistics counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateCounter();
                }
                
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.skill-category, .project-card, .about-stats').forEach(element => {
        observer.observe(element);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Interactive background circles
    const circles = document.querySelectorAll('.bg-circle');
    
    if (circles.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            circles.forEach((circle, index) => {
                const speed = 0.01 * (index + 1);
                const x = (mouseX * 20) - 10;
                const y = (mouseY * 20) - 10;
                
                circle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Tool items hover effect
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const randomColor = getRandomColor();
            this.style.backgroundColor = randomColor;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Function to generate random colors
    function getRandomColor() {
        const colors = [
            'rgba(255, 107, 107, 0.2)',
            'rgba(78, 205, 196, 0.2)',
            'rgba(255, 209, 102, 0.2)',
            'rgba(106, 90, 205, 0.2)',
            'rgba(255, 159, 67, 0.2)'
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Profile photo loading
    loadProfilePhoto();
    
    // Initialize PDF functionality
    initPDFViewers();
    
    // Initialize dental gallery if it exists
    const dentalGallery = document.querySelector('.dental-gallery');
    if (dentalGallery) {
        initDentalGallery();
    }
});

// Add image loading functionality
function loadProfilePhoto() {
    const profileImg = document.querySelector('.profile-img');
    const photoFallback = document.querySelector('.photo-fallback');
    
    if (profileImg) {
        // Add loading class
        profileImg.classList.add('loading');
        
        // Check if image exists
        const img = new Image();
        img.src = profileImg.src;
        
        img.onload = function() {
            // Image loaded successfully
            profileImg.classList.remove('loading');
            profileImg.classList.add('loaded');
            
            // Optional: Hide fallback when image loads
            if (photoFallback) {
                photoFallback.style.display = 'none';
            }
        };
        
        img.onerror = function() {
            // Image failed to load
            profileImg.style.display = 'none';
            if (photoFallback) {
                photoFallback.style.opacity = '1';
                photoFallback.style.display = 'flex';
            }
        };
    }
}

// Dental Gallery Functionality
function initDentalGallery() {
    console.log('Initializing dental gallery...');
    
    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-nav">
                <button class="lightbox-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-info">
                <h4></h4>
                <p></p>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Gallery images array
    const galleryImages = Array.from(document.querySelectorAll('.gallery-image-main')).map(img => ({
        src: img.src,
        alt: img.alt,
        title: img.closest('.gallery-item-large').querySelector('h5').textContent,
        description: img.closest('.gallery-item-large').querySelector('p').textContent
    }));
    
    let currentImageIndex = 0;
    
    // Enlarge button click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('enlarge-btn') || e.target.closest('.enlarge-btn')) {
            const galleryItem = e.target.closest('.gallery-item-large');
            const img = galleryItem.querySelector('.gallery-image-main');
            const title = galleryItem.querySelector('h5').textContent;
            const description = galleryItem.querySelector('p').textContent;
            
            // Find index of clicked image
            const allImages = Array.from(document.querySelectorAll('.gallery-image-main'));
            currentImageIndex = allImages.indexOf(img);
            
            openLightbox(img.src, title, description);
        }
    });
    
    // Open lightbox
    function openLightbox(src, title, description) {
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-info h4');
        const lightboxDesc = lightbox.querySelector('.lightbox-info p');
        
        lightboxImg.src = src;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = description;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Lightbox navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        const image = galleryImages[currentImageIndex];
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-info h4');
        const lightboxDesc = lightbox.querySelector('.lightbox-info p');
        
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            lightboxTitle.textContent = image.title;
            lightboxDesc.textContent = image.description;
            lightboxImg.style.opacity = '1';
        }, 200);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-large');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
    
    // Gallery view toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const gridView = document.getElementById('gridView');
    const carouselView = document.getElementById('carouselView');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            
            if (view === 'grid') {
                gridView.classList.add('active');
                if (carouselView) carouselView.classList.remove('active');
            } else {
                gridView.classList.remove('active');
                if (carouselView) carouselView.classList.add('active');
            }
        });
    });
    
    // Carousel functionality
    initCarousel();
}

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startCarousel() {
        stopCarousel();
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopCarousel() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        startCarousel();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        startCarousel();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            startCarousel();
        });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
    
    // Start carousel
    showSlide(0);
    startCarousel();
}

// PDF Embedding Functionality - FIXED VERSION
function initPDFViewers() {
    console.log('Initializing PDF viewers...');
    
    const toggleButtons = document.querySelectorAll('.toggle-pdf');
    
    if (toggleButtons.length === 0) {
        console.log('No PDF toggle buttons found');
        return;
    }
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const container = document.getElementById(targetId);
            
            if (!container) {
                console.error('Container not found:', targetId);
                return;
            }
            
            const embedContainer = container.parentElement;
            
            // Toggle expansion
            embedContainer.classList.toggle('expanded');
            
            // Update button text
            if (embedContainer.classList.contains('expanded')) {
                this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Document';
                loadPDF(targetId, this);
            } else {
                this.innerHTML = '<i class="fas fa-eye"></i> View Document';
                // Hide PDF iframe when collapsing
                const iframe = container.querySelector('.pdf-embed');
                if (iframe) {
                    iframe.style.display = 'none';
                }
            }
        });
    });
}

function loadPDF(targetId, button) {
    const container = document.getElementById(targetId);
    
    if (!container) {
        console.error('Container not found for PDF:', targetId);
        return;
    }
    
    // Check if already loaded
    const existingIframe = container.querySelector('.pdf-embed');
    if (existingIframe) {
        existingIframe.style.display = 'block';
        return;
    }
    
    // Get PDF path based on target - UPDATED FILENAMES
    let pdfPath = '';
    let pdfTitle = '';
    
    switch(targetId) {
        case 'marketingPdf':
            pdfPath = 'assets/documents/Marketing Guidelines.pdf';
            pdfTitle = 'Dental Marketing Guidelines';
            break;
        case 'intakePdf':
            pdfPath = 'assets/documents/PIF.pdf';
            pdfTitle = 'Patient Intake Form';
            break;
        default:
            console.error('Unknown PDF target:', targetId);
            return;
    }
    
    console.log('Loading PDF:', pdfPath);
    
    // Create iframe for PDF - SIMPLIFIED VERSION (direct PDF embedding)
    const iframe = document.createElement('iframe');
    iframe.className = 'pdf-embed';
    iframe.src = pdfPath; // Direct PDF link - browsers will handle it
    iframe.title = pdfTitle;
    iframe.style.display = 'none'; // Hide until loaded
    
    // Replace loading with iframe
    const loadingDiv = container.querySelector('.pdf-loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
    container.appendChild(iframe);
    
    // Show iframe after load
    iframe.onload = function() {
        console.log('PDF loaded successfully:', pdfPath);
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
    };
    
    // Error handling
    iframe.onerror = function() {
        console.error('Failed to load PDF:', pdfPath);
        const loadingDiv = container.querySelector('.pdf-loading');
        if (loadingDiv) {
            loadingDiv.innerHTML = `
                <div class="pdf-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load PDF preview</p>
                    <a href="${pdfPath}" class="btn btn-primary" target="_blank" style="margin-top: 10px;">
                        <i class="fas fa-external-link-alt"></i> Open PDF in New Tab
                    </a>
                </div>
            `;
        }
        
        // Reset button text
        if (button) {
            button.innerHTML = '<i class="fas fa-eye"></i> View Document';
        }
    };
}

// Add PDF styles
const pdfErrorStyles = `
    .pdf-error {
        padding: 40px;
        text-align: center;
        color: var(--gray-color);
    }
    
    .pdf-error i {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 20px;
    }
    
    .pdf-error p {
        margin-bottom: 20px;
        font-size: 1rem;
    }
    
    .pdf-embed {
        width: 100%;
        height: 100%;
        border: none;
        background: white;
    }
    
    .pdf-loading {
        text-align: center;
        padding: 40px;
        color: var(--gray-color);
    }
    
    .pdf-loading i {
        font-size: 2rem;
        color: var(--primary-color);
        margin-bottom: 15px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Add styles to document head
const styleSheet = document.createElement('style');
styleSheet.textContent = pdfErrorStyles;
document.head.appendChild(styleSheet);