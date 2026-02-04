// Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // 1. Navbar Color Change on Scroll
        const header = document.querySelector('.header');

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // 2. Hero Section Parallax Text (The big "SANDER")
        // Moves vertically slower than the scroll to create depth
        if (document.querySelector("#bigText")) {
            gsap.to("#bigText", {
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 200, // Move down 200px
                opacity: 0.5 // Fade out slightly
            });
        }

        // 3. Hero Content Fade Out
        if (document.querySelector(".hero-content")) {
            gsap.to(".hero-content", {
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom center",
                    scrub: true
                },
                y: -100,
                opacity: 0
            });
        }

        // 4. General Text Reveals (Slide Up)
        const textReveals = gsap.utils.toArray('.reveal-text');
        textReveals.forEach(text => {
            gsap.from(text, {
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // 5. Staggered Property Cards
        // This targets the container to trigger, but animates the children
        ScrollTrigger.batch(".fade-item", {
            start: "top 85%",
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                overwrite: true,
                duration: 1,
                ease: "power3.out"
            }),
        });
        // Set initial state for batch items (since CSS is tricky with batch sometimes)
        gsap.set(".fade-item", { y: 60, opacity: 0 });

        // Handle "See All Properties" Click
        const seeAllBtn = document.getElementById('see-all-btn');
        if (seeAllBtn) {
            seeAllBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const hiddenProps = document.querySelectorAll('.hidden-property');
                
                hiddenProps.forEach(prop => {
                    prop.classList.remove('hidden-property');
                    // We need to reset their GSAP state so they can be animated in
                    gsap.set(prop, { y: 60, opacity: 0 });
                });

                // Trigger animation for the newly revealed items
                gsap.to(hiddenProps, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out"
                });

                // Refresh ScrollTrigger to account for new page height
                ScrollTrigger.refresh();

                // Hide the button after showing all
                this.style.display = 'none';
            });
        }

        // 6. Generic Fade Up for miscellaneous elements
        const fadeUps = gsap.utils.toArray('.fade-up');
        fadeUps.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
        // --- Founder Section Animations ---

        // 1. Text Stagger Animation
        if (document.querySelector(".founder-section")) {
            const founderTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".founder-section",
                    start: "top 60%", // Triggers when section is 40% into view
                    toggleActions: "play none none reverse"
                }
            });

            // 1. The "Mask" Animation: Image reveals from bottom to top
            founderTl.fromTo(".founder-image-wrapper",
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" // Start hidden at bottom
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveal fully
                    duration: 1.5,
                    ease: "power4.inOut" // The signature "Framer" smooth ease
                }
            )
            // This animates the title, bio, signature, and button sequentially
            // 3. Text Stagger: Enters slightly after the image starts moving
            gsap.from(".founder-content > *", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=1.0"); // Overlap with the image animation by 1 second

            // 2. Image Curtain Reveal Animation
            // This unclips the image from Left to Right
            gsap.to(".founder-reveal", {
                scrollTrigger: {
                    trigger: ".founder-section",
                    start: "top 10%",
                },
                clipPath: "inset(0 0% 0 0)", // Fully reveals the image
                duration: 1.5,
                ease: "power4.out" // Slowing down at the end for a premium feel
            });

            // 3. Parallax Effect on the Founder Image
            // Subtle movement of the image inside its container as you scroll past
            gsap.fromTo(".founder-img",
                {
                    scale: 1.6, // Start zoomed in
                    filter: "blur(15px)" // Start blurry
                },
                {
                    scale: 1, // End normal size
                    filter: "blur(0px)", // End sharp
                    duration: 1.5,
                    ease: "power4.inOut"
                },
                "<"
            )
        }
                // --- 4. FAQ Accordion Logic (GSAP) ---
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-toggle');
                
                // Toggle active class
                const isActive = item.classList.toggle('active');
                
                // Animate Height
                if (isActive) {
                    gsap.to(answer, { height: "auto", duration: 0.4, ease: "power2.out" });
                    gsap.to(icon, { rotation: 45, duration: 0.4 });
                } else {
                    gsap.to(answer, { height: 0, duration: 0.4, ease: "power2.out" });
                    gsap.to(icon, { rotation: 0, duration: 0.4 });
                }
            });
        });

        // --- Intersection Parallax Animation ---
        if (document.querySelector(".intersection-wrapper")) {
            gsap.to(".parallax-img", {
                yPercent: 30, // Move the image down by 20% of its height
                ease: "none", // Important: No easing for parallax sync
                scrollTrigger: {
                    trigger: ".intersection-wrapper",
                    start: "top bottom", // Start when section hits bottom of viewport
                    end: "bottom top",   // End when section leaves top of viewport
                    scrub: true          // Link animation strictly to scroll bar
                }
            });

            // Optional: Make the text move slightly too for a "Deep" 3D feel
            gsap.from(".intersection-content", {
                y: 70,
                scrollTrigger: {
                    trigger: ".intersection-wrapper",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // --- CONTACT FORM HANDLING ---
        const contactForm = document.querySelector('.contact-form-modern');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Change button state to loading
                submitBtn.innerHTML = 'Sending...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Success state
                    submitBtn.innerHTML = 'Message Sent! <div class="arrow-icon"><i class="fas fa-check"></i></div>';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = '#4CAF50'; // Green
                    submitBtn.style.borderColor = '#4CAF50';
                    
                    // Reset form
                    contactForm.reset();

                    // Revert button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = ''; // Revert to CSS
                        submitBtn.style.borderColor = '';
                    }, 3000);
                }, 1500);
            });
        }
