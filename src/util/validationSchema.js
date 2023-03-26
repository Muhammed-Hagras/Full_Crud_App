import * as Yup from 'yup';
 

export const postSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Please insert 2 characters at least!')
    .max(50, 'please insert title 50 characters maximum!')
    .required('Title is required'),
    description: Yup.string().required("Required")
});
