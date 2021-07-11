import { FormModelType } from '../../main/src';

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
