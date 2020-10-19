import * as yup from 'yup';

export default yup.object().shape({
    userType: yup.string().required('Please select a user type.'),
    userName: yup.string().required('Please choose a username.'),
    email: yup.string().required('Please enter a valid email.'),
    password: yup.string().required('Please choose a password.'),
})
