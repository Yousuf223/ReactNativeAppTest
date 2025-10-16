import * as yup from 'yup';
import {showToast} from '../Utils/toast';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup.string().required('Password is required').min(6),
});

export const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  gender: yup.string().required('Gender is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters'),
  confirmpassword: yup
    .string()
    .required('Confirm Password is required')
    .min(8, 'Password must be atleast 8 characters')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms & Conditions'),
});

export const cardPaymentValidation = yup.object().shape({
  cardholdername: yup.string().required('Name is required'),
  cardnumber: yup.string().required('Card number is required').max(16).min(16),
  cvv: yup.string().required('CVV is Required').max(3).min(3),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(
      /^(0[1-9]|1[0-2])\/(\d{2})$/,
      'Expiry date must be in MM/YY format',
    ),
});

export const forgetPassValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email Address is Required')
    .email('Please enter valid email'),
});

export const changePassValidation = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters'),
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters'),
  confirmPass: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export const validateEmail = email => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const forgotPassValidation = data =>
  new Promise(function (myResolve, myReject) {
    if (!data?.password) {
      showToast('Password is required');
      return myResolve(false);
    }
    if (!data?.confirmPass) {
      showToast('Confirm password is required');
      return myResolve(false);
    }

    if (data?.password !== data?.confirmPass) {
      showToast('Password does not match');
      return myResolve(false);
    }
    return myResolve(true);
  });

export const resetPassValidation = data =>
  new Promise(function (myResolve, myReject) {
    if (!data.password) {
      showToast('Current password is required');
      return myResolve(false);
    }
    if (!data.newPassword) {
      showToast('password is required');
      return myResolve(false);
    }

    if (!data?.confirmPassword) {
      showToast('confirm password is required');
      return myResolve(false);
    }

    if (data?.newPassword !== data?.confirmPassword) {
      showToast('Password does not match');
      return myResolve(false);
    }
    return myResolve(true);
  });
