document.addEventListener('DOMContentLoaded', () => {
  // Interactive background
  const canvas = document.getElementById('interactive-bg');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const numParticles = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].size <= 0.2) {
        particles.splice(i, 1);
        i--;
        particles.push(new Particle());
      }
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  document.addEventListener('mousemove', (event) => {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle());
      particles[particles.length - 1].x = event.x;
      particles[particles.length - 1].y = event.y;
    }
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Hamburger menu toggle
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('nav ul');

  navbarToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      // Form is valid, proceed with submission
      const formData = new FormData(this);

      // Here you would typically send the form data to a server
      // For demonstration, we'll just log it to the console
      console.log('Form submitted with the following data:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Show a success message
      showFormMessage('Thank you for your message! We will get back to you soon.', 'success');

      // Reset the form
      this.reset();
    } else {
      // Form is invalid, show error messages
      showFormMessage('Please fill out all required fields correctly.', 'error');
    }
  });

  function showFormMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;

    contactForm.appendChild(messageElement);

    // Remove the message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  // Real-time form validation feedback
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', function () {
      if (this.checkValidity()) {
        this.classList.remove('invalid');
        this.classList.add('valid');
      } else {
        this.classList.remove('valid');
        this.classList.add('invalid');
      }
    });
  });

  // Testimonial Slider
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevButton = document.querySelector('.prev-testimonial');
  const nextButton = document.querySelector('.next-testimonial');
  let currentSlide = 0;

  function updateSlidePosition() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function moveToNextSlide() {
    if (currentSlide === testimonialSlides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    updateSlidePosition();
  }

  function moveToPrevSlide() {
    if (currentSlide === 0) {
      currentSlide = testimonialSlides.length - 1;
    } else {
      currentSlide--;
    }
    updateSlidePosition();
  }

  nextButton.addEventListener('click', moveToNextSlide);
  prevButton.addEventListener('click', moveToPrevSlide);

  // Auto-slide functionality
  let slideInterval = setInterval(moveToNextSlide, 5000);

  // Pause auto-slide on hover
  testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  testimonialTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(moveToNextSlide, 5000);
  });

  // Add this to your existing window.addEventListener('load', ...) function
  window.addEventListener('load', () => {
    // ... (other code)

    // Initialize testimonial slider
    updateSlidePosition();
  });
})