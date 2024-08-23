document.addEventListener('DOMContentLoaded', () => {
  // Particle.js configuration
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#00ffff"
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
        color: "#00ffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
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
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
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

  // Initialize testimonial slider
  updateSlidePosition();
});