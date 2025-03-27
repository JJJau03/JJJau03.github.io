document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme from localStorage or default to dark
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Set appropriate icon for current theme
  if (currentTheme === 'light') {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme and save to localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeToggle.innerHTML = newTheme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  });

  // Highlight active nav link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Initialize all videos to be hidden
  document.querySelectorAll('.project-video').forEach(video => {
    video.classList.remove('video-active');
  });

  // Typewriter effect for homepage if element exists
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const text = typingText.textContent.trim();
    typingText.textContent = '';
    let i = 0;
    const typing = setInterval(() => {
      typingText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typing);
        // Add blinking cursor effect
        typingText.classList.add('cursor');
      }
    }, 100);
  }
});

// Video toggle functionality
function toggleVideo(videoId) {
  const video = document.getElementById(videoId);
  const image = video.previousElementSibling;
  const videoBtn = video.nextElementSibling.querySelector('.video-btn');

  if (video.classList.contains('video-active')) {
    // Hide video
    video.classList.remove('video-active');
    if (image) image.style.display = 'block';
    video.pause();
    videoBtn.innerHTML = '<i class="fas fa-play"></i> Show Demo';
  } else {
    // Show video
    video.classList.add('video-active');
    if (image) image.style.display = 'none';
    videoBtn.innerHTML = '<i class="fas fa-times"></i> Hide Demo';
    video.play().catch(e => {
      console.log("Autoplay prevented, showing fallback:", e);
      // Fallback for browsers that block autoplay
      video.controls = true;
    });
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL without page jump
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });

  function filterProjects(category) {
    let projects = document.querySelectorAll('.project-card');
  
    projects.forEach(project => {
      if (category === 'all' || project.classList.contains(category)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  }
  
});