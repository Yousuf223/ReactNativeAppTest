import * as Yup from 'yup';

const vehicleValidation = Yup.object().shape({
  vehicleType: Yup.string().required('Vehicle Category is required'),
  make: Yup.string().required('Vehicle Make is required'),
  // model: Yup.string().required('Model is required'),
  // year: Yup.string().required('Year is required'),
  // VIN: Yup.string().required('SR# or VIN is required'),
  // engineSize: Yup.string().required('Engine Size is required'),
  // hasTurboCharger: Yup.string().required('Turbo Charger selection is required'),
  // transmissionType: Yup.string().required('Transmission Type is required'),
  // carMilage: Yup.string().required('Current Mileage is required'),
  // fuel: Yup.string().required('Fuel type is required'),
  // driveTrain: Yup.string().required('Drivetrain is required'),
  // gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
  // entryDate: Yup.date(),
  // description: Yup.string(),
  // engineType: Yup.string(),
  // notes: Yup.string(),
  // type: Yup.string(),
  // cylinders: Yup.string(),
});

export default vehicleValidation;
