import { ILoginParams, ILoginValidation, IRegisterParam, IRegisterValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire'; 
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

const validateRePassword = (password: string, repassword: string) => {
  if (!repassword) {
    return 'passwordRequire'; 
  }

  if (repassword.length < 4) {
    return 'minPasswordInvalid';
  }

  if(repassword !== password) {
    return 'wrongRePassword'
  }

  return '';
};

const validateEmptyField = (fieldValue: string | number) => {
  if(!fieldValue) {
    return 'valueRequire';
  }

  return '';
}

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

export const validateRegister = (values: IRegisterParam): IRegisterValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    repeatPassword: validateRePassword(values.password, values.repeatPassword),
    name: validateEmptyField(values.name),
    gender: validateEmptyField(values.gender),
    region: validateEmptyField(values.region),
    state: validateEmptyField(values.state),
  };
};

export const validRegister = (values: IRegisterValidation) => {
  return !values.email && !values.password && !values.repeatPassword && !values.name && !values.gender;
};
