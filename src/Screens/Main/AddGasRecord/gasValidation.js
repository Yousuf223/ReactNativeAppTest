import * as Yup from 'yup';

const gasValidation = Yup.object().shape({
  vehicleId: Yup.string().required('Vehicle is required'),
  // gallons: Yup.number().required('Gallons are required'),
  // price: Yup.number().required('Price is required'),
  // carMileage: Yup.number().required('Current Car Mileage is required'),
  // gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
  // gasDate: Yup.date(),
});

export default gasValidation;
