import type { FormModelType } from 'reactjs-use-form';

// Basic form model with synchronous validation
export const formModel: FormModelType = {
  currentPassphrase: {
    value: '',
    required: true,
  },
  newPassphrase: {
    value: '',
    required: true,
    validator: (newPassphrase, values) => {
      if (newPassphrase === values?.currentPassphrase) {
        return 'New password must be different from current password';
      } else if (newPassphrase.length <= 5) {
        return 'Password must be at least 6 characters long';
      } else if (newPassphrase !== values?.verifyPassphrase) {
        return 'Passwords do not match';
      } else return '';
    },
  },
  verifyPassphrase: {
    value: '',
    required: true,
    validator: (passphrase, values) => {
      return passphrase !== values?.newPassphrase ? 'Passwords do not match' : '';
    },
  },
};

// Simple form model for basic examples
export const emptyFormModel: FormModelType = {
  currentPassphrase: {
    value: '',
    required: true,
  },
  newPassphrase: {
    value: '',
    required: true,
  },
  verifyPassphrase: {
    value: '',
    required: true,
  },
};

// Type-safe form model example with proper typing
export interface UserFormData {
  username: string;
  email: string;
  displayName: string;
}

export const typedFormModel: FormModelType<UserFormData> = {
  username: {
    value: '',
    required: true,
    validator: (username) => {
      if (username.length < 3) {
        return 'Username must be at least 3 characters long';
      }
      return '';
    },
  },
  email: {
    value: '',
    required: true,
    validator: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? '' : 'Please enter a valid email address';
    },
  },
  displayName: {
    value: '',
    required: true,
    validator: (displayName) => {
      if (displayName.length < 2) {
        return 'Display name must be at least 2 characters long';
      }
      return '';
    },
  },
};
