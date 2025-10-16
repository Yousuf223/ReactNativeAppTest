import * as Yup from 'yup';

const petValidation = Yup.object().shape({
  // specie: Yup.string().required('Specie is required'),
  // breed: Yup.string().required('Breed is required'),
  // purchaseDate: Yup.date(),
  // dateOfBirth: Yup.date(),
  name: Yup.string().required('Name is required'),
  // price: Yup.number().required('Price is required'),
  // gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
});

export default petValidation;
