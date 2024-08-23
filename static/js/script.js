// KimCode Creations - JavaScript Interactivity

// Particle.js configuration
const particlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#FF6B6B"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#FF6B6B",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
};

particlesJS("particles-js", particlesConfig);

// Navbar scroll effect
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('#nav-links a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    navLinks.forEach(link => link.classList.remove('text-gray-400', 'hover:text-gray-500'));
    navLinks.forEach(link => link.classList.add('text-gray-800', 'dark:text-gray-200', 'hover:text-primary', 'dark:hover:text-secondary'));
  } else {
    header.classList.remove('scrolled');
    navLinks.forEach(link => link.classList.add('text-gray-400', 'hover:text-gray-500'));
    navLinks.forEach(link => link.classList.remove('text-gray-800', 'dark:text-gray-200', 'hover:text-primary', 'dark:hover:text-secondary'));
  }
});
// Mobile menu toggle
const burgerMenu = document.getElementById('burger-menu');
const navMenu = document.getElementById('nav-links');

burgerMenu.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll-triggered animations
const fadeElems = document.querySelectorAll('.fade-in');

const fadeIn = (elem) => {
  const distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
  if (distInView < 0) {
    elem.classList.add('is-visible');
  } else {
    elem.classList.remove('is-visible');
  }
};

window.addEventListener('scroll', () => {
  fadeElems.forEach(elem => fadeIn(elem));
});

// Initialize animations on load
window.addEventListener('load', () => {
  fadeElems.forEach(elem => fadeIn(elem));
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
// Update particle colors for dark mode
const updateParticleColors = (isDark) => {
  const colors = isDark ? "#8BE9FD" : "#FF6B6B";
  if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
    window.pJSDom[0].pJS.particles.color.value = colors;
    window.pJSDom[0].pJS.particles.line_linked.color = colors;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
};

const setTheme = (isDark) => {
  if (isDark) {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  updateParticleColors(isDark);
};

// Check for saved theme preference or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  setTheme(true);
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const isDark = htmlElement.classList.toggle('dark');
  setTheme(isDark);
});

// Listen for changes in color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  setTheme(e.matches);
});