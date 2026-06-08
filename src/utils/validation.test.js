import {
  sanitizeName,
  sanitizeEmail,
  getPhoneDigits,
  formatPhoneInput,
  validateName,
  validateEmail,
  validatePhone,
  validateBookingFields,
} from './validation';

describe('validation', () => {
  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('lucy@gmail.com')).toBe('');
      expect(validateEmail('  NAHAR.DEV@Company.CA  ')).toBe('');
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('')).toBeTruthy();
      expect(validateEmail('notanemail')).toBeTruthy();
      expect(validateEmail('bad@domain')).toBeTruthy();
      expect(validateEmail('a..b@gmail.com')).toBeTruthy();
    });
  });

  describe('validatePhone', () => {
    it('accepts valid NANP numbers', () => {
      expect(validatePhone('6135551234')).toBe('');
      expect(validatePhone('(613) 555-1234')).toBe('');
      expect(validatePhone('+1 613 555 1234')).toBe('');
    });

    it('rejects invalid phones', () => {
      expect(validatePhone('')).toBeTruthy();
      expect(validatePhone('123')).toBeTruthy();
      expect(validatePhone('0135551234')).toBeTruthy();
      expect(validatePhone('6130551234')).toBeTruthy();
      expect(validatePhone('1111111111')).toBeTruthy();
    });
  });

  describe('validateName', () => {
    it('accepts real names', () => {
      expect(validateName('Lucy Tremblay')).toBe('');
      expect(validateName("Jean-Pierre O'Brien")).toBe('');
    });

    it('rejects invalid names', () => {
      expect(validateName('')).toBeTruthy();
      expect(validateName('A')).toBeTruthy();
      expect(validateName('12345')).toBeTruthy();
      expect(validateName('<script>')).toBeTruthy();
    });
  });

  describe('sanitize and format', () => {
    it('formats phone as user types', () => {
      expect(formatPhoneInput('6135551234')).toBe('(613) 555-1234');
      expect(getPhoneDigits('+1 (613) 555-1234')).toBe('6135551234');
    });

    it('sanitizes email and name', () => {
      expect(sanitizeEmail('  Test@Mail.COM  ')).toBe('test@mail.com');
      expect(sanitizeName('  Lucy   Tremblay  ')).toBe('Lucy Tremblay');
    });
  });

  describe('validateBookingFields', () => {
    it('returns sanitized data when valid', () => {
      const result = validateBookingFields({
        name: 'Lucy Tremblay',
        email: 'lucy@gmail.com',
        phone: '6135551234',
        selectedDate: '2026-06-10',
        selectedTime: '02:00 PM',
      });
      expect(result.valid).toBe(true);
      expect(result.sanitized.email).toBe('lucy@gmail.com');
      expect(result.sanitized.phone).toBe('(613) 555-1234');
    });
  });
});
