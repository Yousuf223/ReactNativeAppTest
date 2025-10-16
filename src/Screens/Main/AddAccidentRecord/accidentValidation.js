import * as Yup from 'yup';

const accidentValidation = Yup.object().shape({
  vehicleId: Yup.string().required('Vehicle is required'),
  // location: Yup.string().required('Gallons are required'),
  // involvedDriverName: Yup.string().required('Other Driver Name is required'),
  // involvedDriverPhone: Yup.string().required(
  //   'Other Driver Contact is required',
  // ),
  // description: Yup.string().required('Other Details are required'),
  // gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
  // accidentDate: Yup.date(),
});

export default accidentValidation;
