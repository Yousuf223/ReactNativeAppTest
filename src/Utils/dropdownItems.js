export const carBrands = [
  {key: '0', value: 'Toyota'},
  {key: '1', value: 'Honda'},
  {key: '2', value: 'Ford'},
  {key: '3', value: 'Chevrolet'},
  {key: '4', value: 'BMW'},
  {key: '5', value: 'Mercedes-Benz'},
  {key: '6', value: 'Volkswagen'},
  {key: '7', value: 'Audi'},
  {key: '8', value: 'Hyundai'},
  {key: '9', value: 'Kia'},
  {key: '10', value: 'Nissan'},
  {key: '11', value: 'Tesla'},
  {key: '12', value: 'Subaru'},
  {key: '13', value: 'Mazda'},
  {key: '14', value: 'Jeep'},
  {key: '15', value: 'Porsche'},
  {key: '16', value: 'Lexus'},
  {key: '17', value: 'Volvo'},
  {key: '18', value: 'Dodge'},
  {key: '19', value: 'Land Rover'},
  {key: '20', value: 'Mitsubishi'},
  {key: '21', value: 'Peugeot'},
  {key: '22', value: 'Renault'},
  {key: '23', value: 'Skoda'},
  {key: '24', value: 'Fiat'},
  {key: '25', value: 'Citroën'},
  {key: '26', value: 'Mini'},
  {key: '27', value: 'Acura'},
  {key: '28', value: 'Infiniti'},
  {key: '29', value: 'Alfa Romeo'},
  {key: '30', value: 'Chrysler'},
  {key: '31', value: 'Buick'},
  {key: '32', value: 'GMC'},
  {key: '33', value: 'Genesis'},
  {key: '34', value: 'Saab'},
  {key: '35', value: 'Hummer'},
  {key: '36', value: 'Bentley'},
  {key: '37', value: 'Ferrari'},
  {key: '38', value: 'Lamborghini'},
  {key: '39', value: 'Maserati'},
  {key: '40', value: 'Rolls-Royce'},
  {key: '41', value: 'Bugatti'},
  {key: '42', value: 'McLaren'},
  {key: '43', value: 'Pagani'},
  {key: '44', value: 'Tata'},
  {key: '45', value: 'Mahindra'},
  {key: '46', value: 'Proton'},
  {key: '47', value: 'Geely'},
  {key: '48', value: 'BYD'},
  {key: '49', value: 'Lucid Motors'},
  {key: '50', value: 'Others'},
];

export const fuelTypes = [
  {key: '0', value: 'GASOLINE'},
  {key: '1', value: 'DIESEL'},
  {key: '2', value: 'ELECTRIC'},
  {key: '3', value: 'HYBRID'},
  {key: '4', value: 'PROPANE'},
];

export const drivetrainTypes = [
  {key: '0', value: '2WD'}, // generally covers both FWD & RWD
  {key: '1', value: '4WD'},
  {key: '2', value: 'AWD'},
];

export const transmissionTypes = [
  {key: '0', value: 'MANUAL'},
  {key: '1', value: 'AUTOMATIC'},
  {key: '2', value: 'SEMI-AUTOMATIC'},
  {key: '3', value: 'CVT'},
  {key: '4', value: 'HYBRID'},
  {key: '5', value: 'ELECTRIC DRIVE'},
  {key: '6', value: 'HYDROSTATIC'},
  {key: '7', value: 'OTHERS'},
];

export const transmissionNo = [
  {key: '0', value: 'N/A (CVT, Hydrostatic, & Electric)'},
  {key: '1', value: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'},
];

export const cylinderOptions = [
  {key: '0', value: '1'},
  {key: '1', value: '2'},
  {key: '2', value: '3'},
  {key: '3', value: '4'},
  {key: '4', value: '5'},
  {key: '5', value: '6'},
  {key: '6', value: '8'},
  {key: '6', value: '10'},
  {key: '6', value: '12'},
  {key: '6', value: '14'},
  {key: '6', value: '16'},
];

export const year = Array.from({length: 2026 - 1900 + 1}, (_, index) => ({
  key: index, // Numeric keys starting from 0
  value: (2026 - index).toString(), // Years from 2025 down to 1980 as strings
}));
