// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form Validation
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form elements
    const fullName = document.getElementById("fullName")
    const email = document.getElementById("email")
    const message = document.getElementById("message")

    // Get error elements
    const nameError = document.getElementById("nameError")
    const emailError = document.getElementById("emailError")
    const messageError = document.getElementById("messageError")
    const successMessage = document.getElementById("successMessage")

    // Reset previous errors
    nameError.style.display = "none"
    emailError.style.display = "none"
    messageError.style.display = "none"
    successMessage.style.display = "none"

    let isValid = true

    // Validate full name
    if (fullName.value.trim().length < 2) {
      nameError.textContent = "Please enter a valid full name (at least 2 characters)"
      nameError.style.display = "block"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address"
      emailError.style.display = "block"
      isValid = false
    }

    // Validate message
    if (message.value.trim().length < 10) {
      messageError.textContent = "Please enter a message (at least 10 characters)"
      messageError.style.display = "block"
      isValid = false
    }

    // If form is valid, show success message
    if (isValid) {
      successMessage.style.display = "block"
      contactForm.reset()

      // Scroll to success message
      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  })

  // Real-time validation
  document.getElementById("fullName").addEventListener("blur", function () {
    const nameError = document.getElementById("nameError")
    if (this.value.trim().length < 2) {
      nameError.textContent = "Please enter a valid full name (at least 2 characters)"
      nameError.style.display = "block"
    } else {
      nameError.style.display = "none"
    }
  })

  document.getElementById("email").addEventListener("blur", function () {
    const emailError = document.getElementById("emailError")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.value.trim())) {
      emailError.textContent = "Please enter a valid email address"
      emailError.style.display = "block"
    } else {
      emailError.style.display = "none"
    }
  })

  document.getElementById("message").addEventListener("blur", function () {
    const messageError = document.getElementById("messageError")
    if (this.value.trim().length < 10) {
      messageError.textContent = "Please enter a message (at least 10 characters)"
      messageError.style.display = "block"
    } else {
      messageError.style.display = "none"
    }
  })
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0.2s"
      entry.target.classList.add("fade-in")
    }
  })
}, observerOptions)

// Observe all elements that should fade in
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".fade-in")
  elementsToAnimate.forEach((el) => {
    observer.observe(el)
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "#ffffff"
    navbar.style.backdropFilter = "none"
  }
})

// Add loading animation to buttons
document.querySelectorAll(".cta-button, .submit-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Add ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .cta-button, .submit-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
