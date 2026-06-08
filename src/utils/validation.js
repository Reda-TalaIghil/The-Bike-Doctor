const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const NAME_REGEX = /^[\p{L}][\p{L}\s'.-]*[\p{L}.]$/u;

/** Strip control chars, HTML tags, and clamp length. */
export function sanitizeText(value, maxLength = 255) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\0/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeName(value) {
  return sanitizeText(value, 80).replace(/\s+/g, ' ');
}

export function sanitizeEmail(value) {
  return sanitizeText(value, 254).toLowerCase();
}

/** Keep only digits; normalize leading +1 country code. */
export function getPhoneDigits(value) {
  if (typeof value !== 'string') return '';
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function formatPhoneInput(value) {
  const digits = getPhoneDigits(value);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function validateName(name) {
  const cleaned = sanitizeName(name);
  if (!cleaned) return 'Please enter your name';
  if (cleaned.length < 2) return 'Name needs at least 2 characters';
  if (cleaned.length > 80) return 'That name is a bit too long';
  if (!/[\p{L}]/u.test(cleaned)) return 'Name should include letters';
  if (!NAME_REGEX.test(cleaned)) {
    return 'Letters only please (hyphens and apostrophes are fine)';
  }
  return '';
}

export function validateEmail(email) {
  const cleaned = sanitizeEmail(email);
  if (!cleaned) return 'Please enter your email';
  if (cleaned.length > 254) return 'That email is too long';
  if (cleaned.includes('..')) return 'Check the email address';
  if (!EMAIL_REGEX.test(cleaned)) return 'That doesn\'t look like a valid email';
  const domain = cleaned.split('@')[1];
  if (!domain || domain.length < 4) return 'Check the email address';
  return '';
}

/** North American Numbering Plan — 10 digits, valid area/exchange codes. */
export function validatePhone(phone) {
  const digits = getPhoneDigits(phone);
  if (!digits) return 'Please enter your phone number';
  if (digits.length !== 10) return 'Phone number should be 10 digits';

  const areaCode = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);

  if (areaCode[0] === '0' || areaCode[0] === '1') {
    return 'Check the area code';
  }
  if (exchange[0] === '0' || exchange[0] === '1') {
    return 'That phone number doesn\'t look right';
  }
  if (/^(\d)\1{9}$/.test(digits)) {
    return 'Please enter a real phone number';
  }

  return '';
}

export function validateBookingFields({ name, email, phone, selectedDate, selectedTime }) {
  const errors = {};

  const dateError = !selectedDate ? 'Pick a date first' : '';
  const timeError = !selectedTime ? 'Pick a time too' : '';
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);

  if (dateError) errors.date = dateError;
  if (timeError) errors.time = timeError;
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (phoneError) errors.phone = phoneError;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: sanitizeName(name),
      email: sanitizeEmail(email),
      phone: formatPhoneInput(phone),
    },
  };
}
