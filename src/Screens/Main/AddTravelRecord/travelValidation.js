import * as Yup from 'yup';

const travelValidation = Yup.object().shape({
  flightInfo: Yup.array()
    .of(
      Yup.object().shape({
        from: Yup.string().required('Field is required'),
        to: Yup.string().required('Field is required'),
        departureDate: Yup.date().required('Departure date is required'),
        arrivalDate: Yup.date().required('Arrival date is required'),
      })
    )
    .min(1, 'At least one travel segment is required'),
  // flightExpense: Yup.number().required('Flight Expense is required'),
  // hotelExpense: Yup.number().required('Hotel Expense is required'),
  // carRentalExpense: Yup.number().required('Car Rental Expense is required'),
  // otherExpense: Yup.number().required('Other Expense is required'),
  // mealExpense: Yup.number().required('Meal Expense is required'),
  // gallery: Yup.array().min(1, 'At least one image is required in the gallery'),
  // documentDescription: Yup.string(),
});

export default travelValidation;
