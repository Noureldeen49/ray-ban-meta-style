// Format card number: 4-digit groups
const card = document.getElementById('card');
card.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 16);
  e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
});

// Format expiry MM / YY
const exp = document.getElementById('exp');
exp.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2);
  e.target.value = v;
});

// CVC numeric
document.getElementById('cvc').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// Submit
const form = document.getElementById('pay-form');
const btn = form.querySelector('.pay-btn');

// Validation functions
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateCardNumber(card) {
  return /^[0-9]{16}$/.test(card.replace(/\s/g, ''));
}
function validateExpiry(exp) {
  return /^(0[1-9]|1[0-2]) \/ \d{2}$/.test(exp);
}
function validateCVC(cvc) {
  return /^[0-9]{3,4}$/.test(cvc);
}
function validatePhone(phone) {
  return /^[0-9\-\+\(\)\s]{7,}$/.test(phone);
}
function setError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorEl = document.getElementById(`${fieldName}-error`);
  field.parentElement.classList.add('error');
  if (errorEl) errorEl.textContent = message;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const fields = {
    email:   document.getElementById('email'),
    name:    document.getElementById('name'),
    country: document.getElementById('country'),
    city:    document.getElementById('city'),
    address: document.getElementById('address'),
    zip:     document.getElementById('zip'),
    phone:   document.getElementById('phone'),
    card:    document.getElementById('card'),
    exp:     document.getElementById('exp'),
    cvc:     document.getElementById('cvc'),
  };

  // Clear previous errors
  Object.keys(fields).forEach(key => {
    fields[key].parentElement.classList.remove('error');
    const errorEl = document.getElementById(`${key}-error`);
    if (errorEl) errorEl.textContent = '';
  });

  let valid = true;

  if (!fields.email.value.trim()) {
    setError('email', 'Email is required'); valid = false;
  } else if (!validateEmail(fields.email.value)) {
    setError('email', 'Please enter a valid email address'); valid = false;
  }
  if (!fields.name.value.trim()) {
    setError('name', 'Full name is required'); valid = false;
  }
  if (!fields.country.value.trim()) {
    setError('country', 'Country is required'); valid = false;
  }
  if (!fields.city.value.trim()) {
    setError('city', 'City is required'); valid = false;
  }
  if (!fields.address.value.trim()) {
    setError('address', 'Street address is required'); valid = false;
  }
  if (!fields.zip.value.trim()) {
    setError('zip', 'Postal code is required'); valid = false;
  }
  if (!fields.phone.value.trim()) {
    setError('phone', 'Phone number is required'); valid = false;
  } else if (!validatePhone(fields.phone.value)) {
    setError('phone', 'Please enter a valid phone number'); valid = false;
  }
  if (!fields.card.value.trim()) {
    setError('card', 'Card number is required'); valid = false;
  } else if (!validateCardNumber(fields.card.value)) {
    setError('card', 'Please enter a valid 16-digit card number'); valid = false;
  }
  if (!fields.exp.value.trim()) {
    setError('exp', 'Expiry date is required'); valid = false;
  } else if (!validateExpiry(fields.exp.value)) {
    setError('exp', 'Please use format MM / YY'); valid = false;
  }
  if (!fields.cvc.value.trim()) {
    setError('cvc', 'CVC is required'); valid = false;
  } else if (!validateCVC(fields.cvc.value)) {
    setError('cvc', 'Please enter a valid 3 or 4 digit CVC'); valid = false;
  }

  if (!valid) {
    const firstError = document.querySelector('.field.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Show processing state
  btn.classList.add('loading');
  btn.querySelector('span').textContent = 'Processing…';

  // --- SEND ORDER TO DATABASE ---
  fetch('checkout.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sku:      'RBMETA004',   // Ray-Ban Meta Wayfarer (shown on page)
      quantity: 1,
      email:    fields.email.value.trim(),
      name:     fields.name.value.trim(),
      country:  fields.country.value.trim(),
      city:     fields.city.value.trim(),
      address:  fields.address.value.trim(),
      zip:      fields.zip.value.trim(),
      phone:    fields.phone.value.trim(),
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      // Server rejected the order — show error and reset button
      btn.classList.remove('loading');
      btn.querySelector('span').textContent = 'Pay $411.20';
      alert('Order failed: ' + data.message);
      return;
    }

    // Success — show the confirmation overlay
    const firstName = fields.name.value.trim().split(' ')[0];
    document.getElementById('success-name').textContent = firstName || 'friend';
    document.getElementById('success-loc').textContent =
      `${fields.city.value.trim()}, ${fields.country.value.trim()}`;

    const overlay = document.getElementById('success');
    overlay.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })
  .catch(() => {
    btn.classList.remove('loading');
    btn.querySelector('span').textContent = 'Pay $411.20';
    alert('Could not reach the server. Make sure XAMPP is running.');
  });
});

// Reveal product on load
document.querySelector('.product').classList.add('reveal');
requestAnimationFrame(() => document.querySelector('.product').classList.add('in'));
