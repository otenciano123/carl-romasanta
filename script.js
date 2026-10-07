
document.addEventListener("DOMContentLoaded", () => {

    // Mobile Navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth"
                });
            }
        });
    });

    // Scroll Reveal Animations
    const revealElements = document.querySelectorAll(
        ".section-title, .about-content, .card, .goal-box, .contact-form"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // Active Navigation Link
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll("#nav-links a");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navItems.forEach(link => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            { rootMargin: "-20% 0px -65% 0px" }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle(
                "visible",
                window.scrollY > 350
            );
        }, { passive: true });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });
        });
    }

    // Automatic Copyright Year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Contact Form
    const contactForm = document.getElementById("contact-form");
    const formNote = document.getElementById("form-note");

    // Replace with your actual email address
    const portfolioEmail = "your.email@example.com";

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) return;

            const subject = encodeURIComponent(
                "Portfolio message from " + name
            );

            const body = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            if (formNote) {
                formNote.textContent =
                    "Opening your email application...";
            }

            window.location.href =
                "mailto:" + portfolioEmail +
                "?subject=" + subject +
                "&body=" + body;
        });
    }

    console.log("Portfolio website is ready!");

});