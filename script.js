        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // 1. Navbar Color Change on Scroll
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // 2. Hero Section Parallax Text (The big "SANDER")
        // Moves vertically slower than the scroll to create depth
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

        // 3. Hero Content Fade Out
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

        // --- Intersection Parallax Animation ---
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

        // 7. Image Parallax inside containers
        // Finds images inside wrappers and scales them slightly for a premium effect
        // const imgWrappers = document.querySelectorAll('.prop-img-wrapper');

        // imgWrappers.forEach(wrapper => {
        //     const img = wrapper.querySelector('img');
        //     gsap.fromTo(img,
        //         { scale: 1.2 },
        //         {
        //             scale: 1,
        //             scrollTrigger: {
        //                 trigger: wrapper,
        //                 start: "top bottom",
        //                 end: "bottom top",
        //                 scrub: 1.5 // Smooth scrubbing
        //             }
        //         }
        //     );
        // });