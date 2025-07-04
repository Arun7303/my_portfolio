document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                isValid = false;
                name.classList.add('is-invalid');
            } else {
                name.classList.remove('is-invalid');
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                isValid = false;
                email.classList.add('is-invalid');
            } else {
                email.classList.remove('is-invalid');
            }
            
            if (message.value.trim() === '') {
                isValid = false;
                message.classList.add('is-invalid');
            } else {
                message.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Submit form (you can add AJAX submission here)
                this.submit();
            }
        });
    }

    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Animate progress bars on scroll
    const animateProgressBars = function() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Use Intersection Observer to animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Certificate Scroller Functionality
    const scroller = document.querySelector('.certificates-scroller');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', function() {
            scroller.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        scrollRightBtn.addEventListener('click', function() {
            scroller.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
        
        // Hide/show scroll buttons based on scroll position
        scroller.addEventListener('scroll', function() {
            scrollLeftBtn.style.display = scroller.scrollLeft > 0 ? 'flex' : 'none';
            scrollRightBtn.style.display = scroller.scrollLeft < (scroller.scrollWidth - scroller.clientWidth) ? 'flex' : 'none';
        });
        
        // Initial state
        scrollLeftBtn.style.display = 'none';
        if (scroller.scrollWidth <= scroller.clientWidth) {
            scrollRightBtn.style.display = 'none';
        }
    }
    
    // Project View Functionality
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    const projectDetailsContainer = document.getElementById('project-details-container');
    const closeDetailBtns = document.querySelectorAll('.btn-close-details');
    
    if (viewProjectBtns.length > 0 && projectDetailsContainer) {
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const projectDetails = document.getElementById(`${projectId}-details`);
                
                if (projectDetails) {
                    // Hide all project details first
                    document.querySelectorAll('.project-details').forEach(detail => {
                        detail.style.display = 'none';
                    });
                    
                    // Show the selected project details
                    projectDetails.style.display = 'block';
                    
                    // Scroll to the details section
                    projectDetailsContainer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Initialize slideshow for this project
                    initProjectSlideshow(projectId);
                }
            });
        });
    }
    
    if (closeDetailBtns.length > 0) {
        closeDetailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.project-details').forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Scroll back to projects grid
                document.querySelector('.projects-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
    
    // Initialize all slideshows in project details (hidden initially)
    document.querySelectorAll('.project-details').forEach(detail => {
        const projectId = detail.id.replace('-details', '');
        initProjectSlideshow(projectId);
    });

    // Initialize achievement modals
    document.querySelectorAll('[data-bs-target^="#achievementModal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-bs-target');
            const modal = document.querySelector(target);
            if (modal) {
                const modalImg = modal.querySelector('img');
                if (modalImg) {
                    // Set the correct image source based on the button clicked
                    const certSrc = this.closest('.timeline-content').querySelector('a').getAttribute('data-cert-src');
                    if (certSrc) {
                        modalImg.src = certSrc;
                    }
                }
            }
        });
    });

    // Initialize certificate modals
    document.querySelectorAll('[data-bs-target^="#certificateModal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-bs-target');
            const modal = document.querySelector(target);
            if (modal) {
                const modalImg = modal.querySelector('img');
                if (modalImg) {
                    // Set the correct image source based on the certificate card clicked
                    const certImg = this.querySelector('img');
                    if (certImg) {
                        modalImg.src = certImg.src;
                    }
                }
            }
        });
    });
});

// Initialize project slideshow
function initProjectSlideshow(projectId) {
    const projectDetails = document.getElementById(`${projectId}-details`);
    if (!projectDetails) return;

    const slideshowContainer = projectDetails.querySelector('.slideshowContainer');
    if (!slideshowContainer) return;

    const slides = slideshowContainer.querySelectorAll('.imageSlides');
    const leftArrow = slideshowContainer.querySelector(`#leftArrow${projectId.replace('project', '')}`);
    const rightArrow = slideshowContainer.querySelector(`#rightArrow${projectId.replace('project', '')}`);
    const circles = slideshowContainer.querySelectorAll('.circle');

    let currentSlide = 0;
    let slideshowInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('visible'));
        
        // Show the selected slide
        slides[index].classList.add('visible');
        
        // Update circles
        circles.forEach((circle, i) => {
            circle.classList.toggle('dot', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start slideshow
    function startSlideshow() {
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(nextSlide, 5000);
    }

    // Initialize
    showSlide(0);
    startSlideshow();

    // Event listeners
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            prevSlide();
            startSlideshow();
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            nextSlide();
            startSlideshow();
        });
    }

    // Circle navigation
    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            startSlideshow();
        });
    });

    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideshowInterval);
    });

    slideshowContainer.addEventListener('mouseleave', startSlideshow);
}