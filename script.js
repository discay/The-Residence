// Property Website - Interactive JavaScript
// Handles: Mobile menu, Gallery lightbox, Leaflet Map, Form submission, Navbar scroll effect

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled', 'shadow-lg');
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow-lg');
        }
    });

    // ============================================
    // 2. MOBILE HAMBURGER MENU
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
        });

        // Close mobile menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            });
        });
    }

    // ============================================
    // 3. PHOTO GALLERY LIGHTBOX
    // ============================================
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    let currentImageIndex = 0;
    const imageSources = [];

    // Collect all gallery image sources
    galleryImages.forEach((img, index) => {
        imageSources.push(img.src);
        
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (!lightbox || !lightboxImg) return;
        
        lightboxImg.src = imageSources[currentImageIndex];
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        updateLightboxCounter();
    }

    function closeLightbox() {
        if (!lightbox) return;
        
        lightbox.classList.remove('flex');
        lightbox.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scroll
    }

    function updateLightboxCounter() {
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${imageSources.length}`;
        }
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
        updateLightboxCounter();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        lightboxImg.src = imageSources[currentImageIndex];
        updateLightboxCounter();
    }

    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Close lightbox on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox && !lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // ============================================
    // 4. LEAFLET INTERACTIVE MAP
    // ============================================
    // TODO: Change these coordinates to your property's exact location
    // Get coordinates from Google Maps: Right-click on location → "What's here?"
    const lat = 7.2734;   // Richmond Hill, Kandy example - REPLACE WITH YOUR LATITUDE
    const lng = 80.6239; // Richmond Hill, Kandy example - REPLACE WITH YOUR LONGITUDE

    const mapContainer = document.getElementById('map');
    
    if (mapContainer && typeof L !== 'undefined') {
        // Initialize map
        const map = L.map('map', {
            zoomControl: true,
            scrollWheelZoom: false, // Better UX - user can enable if needed
        }).setView([lat, lng], 15);

        // Add OpenStreetMap tiles (free, no API key needed)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            className: 'map-tiles'
        }).addTo(map);

        // Custom marker icon (using Font Awesome via DivIcon for nicer look)
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #059669; width: 36px; height: 36px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3); display: flex; align-items: center; justify-content: center;">
                     <i class="fas fa-home" style="color: white; font-size: 16px; transform: rotate(45deg);"></i>
                   </div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36]
        });

        // Add marker with popup
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        
        marker.bindPopup(`
            <div style="min-width: 200px; font-family: system-ui, sans-serif;">
                <strong style="color: #059669; font-size: 1.1rem;">The Residence</strong><br>
                <span style="color: #64748b;">Heerassagala,Kandy</span><br><br>
                <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" 
                   target="_blank" 
                   style="color: #059669; text-decoration: underline; font-weight: 500;">
                    Open in Google Maps →
                </a>
            </div>
        `, {
            closeButton: true,
            offset: [0, -10]
        }).openPopup();

        // Allow scroll zoom only after clicking the map (improves page scroll UX)
        map.on('focus', () => {
            map.scrollWheelZoom.enable();
        });
    } else if (mapContainer) {
        // Fallback if Leaflet fails to load
        mapContainer.innerHTML = `
            <div class="flex items-center justify-center h-full bg-slate-100 rounded-2xl">
                <div class="text-center p-8">
                    <i class="fas fa-map-marked text-4xl text-emerald-600 mb-4"></i>
                    <p class="text-slate-600">Interactive map loading...</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=33.6846,-117.8265" 
                       target="_blank"
                       class="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                        View on Google Maps →
                    </a>
                </div>
            </div>
        `;
    }

    // ============================================
    // 5. INQUIRY FORM HANDLING
    // ============================================
    const inquiryForm = document.getElementById('inquiry-form');
    const formSuccess = document.getElementById('form-success');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            // If running locally (not on Netlify), prevent actual submit and show nice message
            // When deployed to Netlify with data-netlify="true", it will handle submission
            
            const isNetlify = window.location.hostname.includes('netlify.app') || 
                             document.querySelector('form[data-netlify="true"]');
            
            if (!isNetlify) {
                e.preventDefault(); // Prevent default only for local demo
                
                // Show success message
                showFormSuccess();
                
                // Optional: Log form data to console for testing
                const formData = new FormData(inquiryForm);
                console.log('Form submission (demo mode):');
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                
                // Reset form after short delay
                setTimeout(() => {
                    inquiryForm.reset();
                }, 1500);
            }
            // If on Netlify, let the form submit naturally to Netlify's backend
        });
    }

    function showFormSuccess() {
        if (!formSuccess) return;
        
        // Hide form temporarily
        inquiryForm.style.transition = 'opacity 0.3s ease';
        inquiryForm.style.opacity = '0';
        
        setTimeout(() => {
            inquiryForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            formSuccess.classList.add('flex', 'success-toast');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // After 5 seconds, allow user to submit another inquiry
            setTimeout(() => {
                const resetBtn = document.createElement('button');
                resetBtn.innerHTML = '<i class="fas fa-redo mr-2"></i> Submit Another Inquiry';
                resetBtn.className = 'mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors flex items-center mx-auto';
                
                resetBtn.onclick = () => {
                    formSuccess.classList.add('hidden');
                    formSuccess.classList.remove('flex', 'success-toast');
                    inquiryForm.style.display = 'block';
                    inquiryForm.style.opacity = '1';
                    inquiryForm.reset();
                    resetBtn.remove();
                };
                
                formSuccess.appendChild(resetBtn);
            }, 4500);
        }, 300);
    }

    // ============================================
    // 6. WHATSAPP BUTTON (Optional enhancement)
    // ============================================
    // The WhatsApp button in HTML already has wa.me link.
    // This adds a small confirmation toast on click (optional)
    const whatsappBtn = document.querySelector('a[href*="wa.me"]');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // Optional: You can track clicks here or add analytics
            console.log('WhatsApp contact initiated');
        });
    }

    // ============================================
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS (Enhanced)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 8. ACCESSIBILITY & KEYBOARD SUPPORT
    // ============================================
    // Make sure all interactive elements are keyboard accessible
    // (Tailwind + semantic HTML already helps a lot)

    console.log('%c[Property Website] All interactive features initialized successfully.', 'color: #059669');
});
