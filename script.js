/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform =
        `translate(${mouseX}px, ${mouseY}px)`;

});


function animateCursor() {

    followerX += (mouseX - followerX) * .15;
    followerY += (mouseY - followerY) * .15;

    follower.style.transform =
        `translate(${followerX - 17}px, ${followerY - 17}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =========================
   TYPING EFFECT
========================= */

const typingElement =
    document.querySelector(".typing");

const words = [
    "Developer",
    "Designer",
    "Creative Coder",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;

let deleting = false;


function typingEffect() {

    const currentWord =
        words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 60 : 100
    );
}

typingEffect();


/* =========================
   SCROLL REVEAL
========================= */

const reveals =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: .12
        }

    );


reveals.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   SCROLL PROGRESS
========================= */

const progress =
    document.querySelector(".scroll-progress");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    progress.style.width =
        `${percentage}%`;

});


/* =========================
   ACTIVE NAV
========================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   COUNTER ANIMATION
========================= */

const counters =
    document.querySelectorAll("[data-count]");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.count
                    );

                let count = 0;

                const speed =
                    target / 80;


                function updateCounter() {

                    count += speed;

                    if (count < target) {

                        counter.textContent =
                            Math.floor(count);

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target;

                    }

                }

                updateCounter();

                counterObserver.unobserve(
                    counter
                );

            });

        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================
   3D TILT CARDS
========================= */

const cards =
    document.querySelectorAll(".tilt");


cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


/* =========================
   MAGNETIC BUTTONS
========================= */

const magneticButtons =
    document.querySelectorAll(".magnetic");


magneticButtons.forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect =
            button.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left -
            rect.width / 2;

        const y =
            e.clientY -
            rect.top -
            rect.height / 2;


        button.style.transform =
            `translate(${x * .15}px, ${y * .15}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translate(0,0)";

    });

});


/* =========================
   THEME SWITCH
========================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");


    const icon =
        themeBtn.querySelector("i");


    if (
        document.body.classList.contains("light")
    ) {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";

    }

});


/* =========================
   SMOOTH IMAGE PARALLAX
========================= */

window.addEventListener("scroll", () => {

    const profile =
        document.querySelector(".profile-card");

    if (!profile) return;

    const scroll =
        window.scrollY;

    if (window.innerWidth > 900) {

        profile.style.transform =
            `translateY(${scroll * .05}px)`;

    }

});