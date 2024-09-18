document.addEventListener('DOMContentLoaded', () => {
  // Register Form
  const registerForm = document.getElementById('registerForm');
  const registerBtn = document.getElementById('registerBtn');
  const inputs = document.querySelectorAll('#registerForm input');
  const message = document.getElementById('message');

  // Enable/Disable the register button based on form input
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const allFilled = [...inputs].every(input => input.value.trim() !== '');
      registerBtn.disabled = !allFilled;
    });
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };

    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    message.textContent = result.message;
  });

  // Login Form
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const loginInputs = document.querySelectorAll('#loginForm input');

  loginInputs.forEach(input => {
    input.addEventListener('input', () => {
      const allFilled = [...loginInputs].every(input => input.value.trim() !== '');
      loginBtn.disabled = !allFilled;
    });
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: document.getElementById('loginUsername').value,
      password: document.getElementById('loginPassword').value,
    };

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    message.textContent = result.message;
  });
});
