import * as yup from 'yup';

export const AppRegex = {
  email_plus: /^\w+([\.-]?\w+([\+]?\d+)*)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  number_regex: /\B(?=(\d{3})+(?!\d))/g,
  phoneNumber: /(^(\(\d{3}\) \d{3}-\d{4})?$)|^$/,
};

export const registerSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  email: yup
    .string()
    .matches(AppRegex.email_plus, 'Email is not valid')
    .max(255)
    .email()
    .required(),
  password: yup.string().min(6).max(255).required(),
});
