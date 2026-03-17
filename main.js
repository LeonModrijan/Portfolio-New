function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    
    if (target) {
        target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

const container = document.querySelector(".tilt-container");
const img = document.getElementById("logo-hero");

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  targetX = y * -60; // strength
  targetY = x * 60;
});

container.addEventListener("mouseleave", () => {
  targetX = 0;
  targetY = 0;
});

function animate() {
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  img.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

  requestAnimationFrame(animate);
}

animate();


function copyDiscord() {
    const username = "leonmodri";
navigator.clipboard.writeText(username);

    const toast = document.getElementById("copy-toast");
    
    // Reset the animation in case it's already showing
    toast.classList.remove("show");
    
    // Small timeout to allow the browser to register the removal
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Auto-hide after 2.5 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

window.addEventListener('scroll', () => {
    const mainDiv = document.querySelector('.main');
    const scrollArea = document.querySelector('.scroll-area');
    
    // 1. Calculate progress (0 at top, 1 at bottom of track)
    let progress = window.scrollY / (scrollArea.offsetHeight - window.innerHeight);
    progress = Math.min(Math.max(progress, 0), 1);

    // 2. Shrink it! 
    // It starts at scale 1.0 and shrinks to 0.7
    let scaleValue = 1 - (progress * 0.3);
    
    // 3. Move it!
    // It starts at 0 and moves up -100px
    let moveUp = progress * -100;

    // Apply the styles
    mainDiv.style.transform = `scale(${scaleValue}) translateY(${moveUp}px)`;
    

});


window.addEventListener('scroll', () => {
    const scrollContainer = document.querySelector('.scroll');
    
    // 1. Logic to hide the "Scroll Down" text
    if (window.scrollY > 50) {
        scrollContainer.classList.add('hidden');
    } else {
        scrollContainer.classList.remove('hidden');
    }
});


const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct movement for the dot
    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // The outline uses an animation frame or delay for a "trailing" effect
    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});


const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .about-inner').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});


// 1. Record the start time immediately
const startTime = Date.now();

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const minimumWait = 1500; // 1 second in milliseconds

    // 2. Calculate if we need to wait longer
    const remainingTime = Math.max(0, minimumWait - elapsedTime);

    setTimeout(() => {
        loader.classList.add("loader-hidden");
        
        // Optional: Re-enable scrolling if you disabled it
        document.body.style.overflow = 'auto'; 
    }, remainingTime);
});



window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Or as an alternative:
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}