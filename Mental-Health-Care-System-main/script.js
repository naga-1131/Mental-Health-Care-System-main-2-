// Handle login form submission
function handleLoginFormSubmit(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Dummy login check (hardcoded credentials)
  if (email === "user@example.com" && password === "password123") {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = "dashboard.html";
  } else {
    alert('Invalid credentials. Please try again.');
  }
}

// Handle registration form submission
function handleRegisterFormSubmit(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = { username, email, password };
  localStorage.setItem('user', JSON.stringify(userData));

  window.location.href = "dashboard.html";
}

// Handle session booking form submission
function handleSessionBookingSubmit(e) {
  e.preventDefault();

  const sessionDate = document.getElementById('session-date').value;
  const sessionTime = document.getElementById('session-time').value;

  alert(`Session booked for ${sessionDate} at ${sessionTime}`);
  window.location.href = "dashboard.html";
}

// Check login status on dashboard page
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = "login.html";
}

// Calculate results based on answers (updated function)
function calculateResults(answers) {
  const totalScore = Object.values(answers).reduce((acc, value) => acc + parseInt(value, 10), 0);

  let diagnosis = '';
  let treatment = '';
  let therapyRecommendation = '';

  // Short diagnosis, treatment, and therapy based on total score ranges
  if (totalScore <= 20) {
    diagnosis = 'Good mental health.';
    treatment = 'Maintain a healthy routine, exercise, and relax.';
    therapyRecommendation = 'No therapy needed. Consider mindfulness or meditation.';
  } else if (totalScore <= 35) {
    diagnosis = 'Mild stress/anxiety.';
    treatment = 'Practice stress management, rest well, and stay active.';
    therapyRecommendation = 'Try CBT or relaxation techniques.';
  } else if (totalScore <= 50) {
    diagnosis = 'Moderate stress detected.';
    treatment = 'Prioritize self-care, set boundaries, and rest.';
    therapyRecommendation = 'Consider CBT or counseling.';
  } else {
    diagnosis = 'High stress detected.';
    treatment = 'Seek support, rest, and avoid overwork.';
    therapyRecommendation = 'Engage in DBT or CBT with a professional.';
  }

  return { diagnosis, treatment, therapyRecommendation };
}

// Attach event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginFormSubmit);
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterFormSubmit);
  }

  const sessionBookingForm = document.getElementById('session-booking-form');
  if (sessionBookingForm) {
    sessionBookingForm.addEventListener('submit', handleSessionBookingSubmit);
  }

  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
  }

  // Check if user is logged in on the dashboard
  if (document.getElementById('logout-btn')) {
    checkLoginStatus();
  }
});

// Update range values in real time
document.querySelectorAll('input[type="range"]').forEach((range) => {
  range.addEventListener('input', function () {
    const valueSpan = document.getElementById(range.id + '-value');
    valueSpan.textContent = range.value;
  });
});