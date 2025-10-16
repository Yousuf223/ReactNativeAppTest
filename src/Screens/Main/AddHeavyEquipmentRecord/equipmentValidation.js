import * as Yup from 'yup';

const equipmentValidation = Yup.object().shape({
  equipmentName: Yup.string().required('Equipment is required'),
  // purchaseDate: Yup.date(),
  // price: Yup.number().required('Price is required'),
  // gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
});

export default equipmentValidation;
