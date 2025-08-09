document.addEventListener('DOMContentLoaded', () => {
  const services = [
    {
      title: "AI Chatbot Development",
      short: "Custom-trained chatbots for businesses.",
      full: "We design AI chatbots using NLP models and train them on your domain data. They automate customer service and increase productivity."
    },
    {
      title: "Stock Prediction Tools",
      short: "LSTM & Prophet-based predictions.",
      full: "We integrate real-time APIs with deep learning models to forecast stock trends for investors and analysts."
    },
    {
      title: "Web Apps with ML Features",
      short: "Tools for detection, classification, and sentiment analysis.",
      full: "From vehicle tracking for law enforcement to product review analyzers for e-commerce, we bring ML to the browser."
    },
    {
      title: "Student Personalized AI Tutor",
      short: "Adaptive learning systems for students.",
      full: "We develop AI tutors that assess student knowledge and deliver content tailored to their learning style using deep learning techniques."
    },
    {
      title: "DevOps & CI/CD Setup",
      short: "End-to-end deployment pipelines.",
      full: "Automated deployment with GitHub Actions, Docker, and cloud platforms like Azure or AWS."
    },
    {
      title: "Portfolio & Resume Builders",
      short: "Interactive personal websites with analytics.",
      full: "AI-enhanced resume scoring, and static or dynamic websites hosted with CI/CD pipelines."
    },
    {
      title: "AI-based Content Generators",
      short: "Blogs, captions, and presentations powered by AI.",
      full: "We build content creation tools that use transformers like GPT for generating blog posts, summaries, and even presentations."
    },
    {
      title: "College Projects & Guidance",
      short: "AI project development with mentorship.",
      full: "We help students develop real-world projects in NLP, CV, and recommendation systems with documentation and GitHub setup."
    }
  ];

  const servicesList = document.getElementById('servicesList');
  if (servicesList) {
    services.forEach((service) => {
      const card = document.createElement('div');
      card.className = "service-card bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer mb-4";

      card.innerHTML = `
        <h3 class="text-xl font-bold text-blue-400 mb-2">${service.title}</h3>
        <p class="text-sm text-gray-300">${service.short}</p>
        <div class="service-full text-sm text-white mt-3 hidden transition-all duration-300">${service.full}</div>
      `;

      card.addEventListener('click', () => {
        const fullText = card.querySelector('.service-full');
        fullText.classList.toggle('hidden');
        card.classList.toggle('bg-gray-700');
      });

      servicesList.appendChild(card);
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = {
        name: this.name.value.trim(),
        email: this.email.value.trim(),
        message: this.message.value.trim()
      };

      // Adjust API base URL for local dev or production
      // Update this if you deploy backend separately or use different ports/domains
      const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
        ? 'http://localhost:5000' 
        : 'http://localhost:5000'; // Change this to your deployed backend URL

      console.log("📤 Sending contact form data:", formData);

      try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          // Try to read error from backend
          const errorResult = await response.json().catch(() => ({}));
          throw new Error(errorResult.error || response.statusText || 'Unknown error');
        }

        const result = await response.json();
        console.log("📥 Server response:", result);

        if (result.success) {
          alert(`✅ ${result.message}`);
          this.reset();
        } else {
          alert(`❌ ${result.error || 'Something went wrong. Please try again.'}`);
        }
      } catch (err) {
        console.error("❌ Network or server error:", err);
        alert(`❌ Error sending message: ${err.message || 'Network error. Please try again later.'}`);
      }
    });
  } else {
    console.warn("Contact form (#contactForm) not found in DOM");
  }
});
