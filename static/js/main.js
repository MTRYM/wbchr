document.addEventListener("DOMContentLoaded", () => {
    // Menu navigation script
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".menunav");
    const closeBtn = document.querySelector(".close-btn");
    const body = document.body;

    if (hamburger && nav && closeBtn) {
        function openNav() {
            nav.classList.add("open");
            body.classList.add("overlay", "side-panel-open");
        }

        function closeNav() {
            nav.classList.remove("open");
            body.classList.remove("overlay", "side-panel-open");
        }

        hamburger.addEventListener("click", openNav);
        closeBtn.addEventListener("click", closeNav);

        document.querySelectorAll(".menunav a").forEach(link => {
            link.addEventListener("click", closeNav);
        });

        document.addEventListener("click", function (event) {
            if (event.target === body && body.classList.contains("side-panel-open")) {
                closeNav();
            }
        });
    }

    // Intersection Observer for reveal animations
    const elementsToAnimate = document.querySelectorAll(
        "h1, h2, .btn-primary, .btn-large, .contact-btn, .testimonial-card, .hero p.lead, .reveal"
    );

    if (elementsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elementsToAnimate.forEach((el) => {
            el.classList.add("reveal");
            observer.observe(el);
        });
    }

    // Features carousel script
    const frames = document.querySelectorAll('.features-frame');
    if (frames.length > 0) {
        let index = 0;
        setInterval(() => {
            frames.forEach((frame, i) => {
                frame.classList.toggle('visible', i === index);
            });
            index = (index + 1) % frames.length;
        }, 3000);
    }

    // Infinite gallery scroll script
    const galleryTracks = document.querySelectorAll('.gallery-track');
    if (galleryTracks.length > 0) {
        galleryTracks.forEach(track => {
            const items = Array.from(track.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
        });
    }

    // Section 4 slider script
    const section4 = document.querySelector("#section4");
    if (section4) {
        const leftArrow = section4.querySelector(".left-arrow");
        const rightArrow = section4.querySelector(".right-arrow");
        const titleEl = section4.querySelector(".section4-left h3");
        const descEl = section4.querySelector(".section4-left p");
        const numEl = section4.querySelector(".section4-left .item-number");
        const imgEl = section4.querySelector(".section4-right img");

        if (leftArrow && rightArrow && titleEl && descEl && numEl && imgEl) {
            const slides = [
                {
                    num: "01",
                    title: "1h00 Soin Clarifiant, 80€",
                    desc: "Lissage des cheveux à sec, nettoyage, lotion, bain de vapeur + masque purifiant, cure intensive : ampoule visage, masque crème, massage du décolleté, étirement réveil de la musculature aux pieds.",
                    img: "/static/assets/images/pexels-karola-g-6629551.jpg"
                },
                {
                    num: "02",
                    title: "1h00 Soin un temps pour moi, 80€",
                    desc: "Lissage des cheveux à secs, nettoyage, lotion, stimulation lymphatique avec les pinceaux, cures intensives : ampoules visage ou spray, masque crème, effleurage décolleté, compresse chaude sur nuque + épaules, crème soin du jour.",
                    img: "/static/assets/images/pexels-karola-g-6629554.jpg"
                }
            ];

            let current = 0;

            function fadeOutIn(element, newContent, isImage = false) {
                if (!element) return;
                element.classList.add("fade-out");
                setTimeout(() => {
                    if (isImage) {
                        element.src = newContent;
                    } else {
                        element.textContent = newContent;
                    }
                    element.classList.remove("fade-out");
                    element.classList.add("fade-in");
                    setTimeout(() => element.classList.remove("fade-in"), 400);
                }, 300);
            }

            function updateSlide(index) {
                const slide = slides[index];
                fadeOutIn(numEl, slide.num);
                fadeOutIn(titleEl, slide.title);
                fadeOutIn(descEl, slide.desc);
                fadeOutIn(imgEl, slide.img, true);
            }

            leftArrow.addEventListener("click", () => {
                current = (current - 1 + slides.length) % slides.length;
                updateSlide(current);
            });

            rightArrow.addEventListener("click", () => {
                current = (current + 1) % slides.length;
                updateSlide(current);
            });
        }
    }

    // Header scroll effect
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                header.style.backgroundColor = "#012d2c";
                header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
            } else {
                header.style.backgroundColor = "var(--green)";
                header.style.boxShadow = "none";
            }
        });
    }
});
