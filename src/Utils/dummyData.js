import {appImages} from '../Assets/Images';
import {appProfiles} from '../Assets/Profile';
import {generateRandomImages} from '../Functions/generateRandomImages';
import routes from '../Navigation/routes';

export const CarDetails = [
  {
    carId: 1,
    imageSource: appImages?.vehicle1,
    type: 'Car',
    name: 'Toyota Supra',
    details: [
      {id: 1, title: 'Type', detail: 'Car'},
      {id: 2, title: 'Make', detail: 'Toyota'},
      {id: 3, title: 'Model', detail: 'Supra'},
      {id: 4, title: 'Year', detail: '2024'},
      {id: 5, title: 'VIN', detail: '123456aa34'},
      {id: 6, title: 'Entry Date', detail: 'Sep 12 2024'},
      {
        id: 7,
        title: 'Description',
        detail:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {id: 8, title: 'Engine Size (l)', detail: '3.5l'},
      {id: 9, title: 'Engine Type', detail: 'Turbo'},
      {id: 10, title: 'Cylinders', detail: '16'},
      {id: 11, title: 'Turbo Charger', detail: 'Yes'},
      {id: 12, title: 'Fuel', detail: 'Gasoline'},
      {id: 13, title: 'Drivetrain', detail: '4WD'},
      {id: 14, title: 'Transmission', detail: '3-Speed'},
      {id: 15, title: 'Transmission Type', detail: 'Manual'},
      {id: 16, title: 'Current Milleage', detail: '15,000'},
      {id: 17, title: 'Note', detail: 'Turbo, trans-3 speed Automatic'},
    ],
  },
  {
    carId: 2,
    imageSource: appImages?.vehicle3,
    name: 'Ford Truck 200',
    type: 'Truck',
    details: [
      {id: 1, title: 'Type', detail: 'Truck'},
      {id: 2, title: 'Make', detail: 'Ford'},
      {id: 3, title: 'Model', detail: 'Truck'},
      {id: 4, title: 'Year', detail: '2024'},
      {id: 5, title: 'VIN', detail: '1234526aa34'},
      {id: 6, title: 'Entry Date', detail: 'Sep 19 2024'},
      {
        id: 7,
        title: 'Description',
        detail:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {id: 8, title: 'Engine Size (l)', detail: '3.5l'},
      {id: 9, title: 'Engine Type', detail: 'Turbo'},
      {id: 10, title: 'Cylinders', detail: '16'},
      {id: 11, title: 'Turbo Charger', detail: 'No'},
      {id: 12, title: 'Fuel', detail: 'Gasoline'},
      {id: 13, title: 'Drivetrain', detail: '4WD'},
      {id: 14, title: 'Transmission', detail: '3-Speed'},
      {id: 15, title: 'Transmission Type', detail: 'Automatic'},
      {id: 16, title: 'Current Milleage', detail: '65,000'},
      {id: 17, title: 'Note', detail: 'Turbo, trans-3 speed Automatic'},
    ],
  },
  {
    carId: 3, // Changed carId to be unique
    imageSource: appImages?.vehicle2,
    name: 'Toyota Supra',
    type: 'Tractor',
    details: [
      {id: 1, title: 'Type', detail: 'Tractor'},
      {id: 2, title: 'Make', detail: 'Ford'},
      {id: 3, title: 'Model', detail: 'Truck'},
      {id: 4, title: 'Year', detail: '2024'},
      {id: 5, title: 'VIN', detail: '1234526aa34'},
      {id: 6, title: 'Entry Date', detail: 'Sep 19 2024'},
      {
        id: 7,
        title: 'Description',
        detail:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {id: 8, title: 'Engine Size (l)', detail: '3.5l'},
      {id: 9, title: 'Engine Type', detail: 'Turbo'},
      {id: 10, title: 'Cylinders', detail: '16'},
      {id: 11, title: 'Turbo Charger', detail: 'No'},
      {id: 12, title: 'Fuel', detail: 'Gasoline'},
      {id: 13, title: 'Drivetrain', detail: '4WD'},
      {id: 14, title: 'Transmission', detail: '3-Speed'},
      {id: 15, title: 'Transmission Type', detail: 'Automatic'},
      {id: 16, title: 'Current Milleage', detail: '65,000'},
      {id: 17, title: 'Note', detail: 'Turbo, trans-3 speed Automatic'},
    ],
  },
];

export const Vehicle = [
  {
    key: 0,
    value: 'Bugatti',
  },
  {
    key: 1,
    value: 'Tesla',
  },
  {
    key: 2,
    value: 'G Vagon',
  },
];
export const PetRecord = [
  {
    key: 0,
    value: 'Solo',
  },
  {
    key: 1,
    value: 'Tolo',
  },
  {
    key: 2,
    value: 'Golo',
  },
];
export const ConditionRecord = [
  {
    key: 0,
    value: 'Used',
  },
  {
    key: 1,
    value: 'New',
  },
  {
    key: 2,
    value: 'Bad',
  },
  {
    key: 3,
    value: 'Good',
  },
  {
    key: 4,
    value: 'Best',
  },
];
export const hasAttachments = [
  {
    key: 0,
    value: 'YES',
  },
  {
    key: 1,
    value: 'NO',
  },
];
export const ShopData = [
  {
    key: 0,
    value: 'Auto Parts Shops',
  },
  {
    key: 1,
    value: 'Vechiler Shops',
  },
  {
    key: 2,
    value: 'Wagnor Shops',
  },
];
export const VehicleStore = [
  {
    key: 0,
    value: 'Tesla Plant',
  },
  {
    key: 1,
    value: 'Tesla Store',
  },
  {
    key: 2,
    value: 'Mitsubishi Showroom',
  },
];
export const VehicleMech = [
  {
    key: 0,
    value: 'Camela Haris',
  },
  {
    key: 1,
    value: 'Joe Biden',
  },
  {
    key: 2,
    value: 'Doland Trump',
  },
];

export const Gender = [
  {
    key: 0,
    value: 'Male',
  },
  {
    key: 1,
    value: 'Female',
  },
  {
    key: 2,
    value: 'Other',
  },
];
export const year = [
  {
    key: 0,
    value: '2021',
  },
  {
    key: 1,
    value: '2022',
  },
  {
    key: 2,
    value: '2023',
  },
];
const profileImagesArray = [
  appProfiles.profile1,
  appProfiles.profile2,
  appProfiles.profile3,
  appProfiles.profile4,
  appProfiles.profile5,
  appProfiles.profile6,
  appProfiles.profile7,
];

const mediaImagesArray = [
  appImages.sceneI,
  appImages.sceneII,
  appImages.sceneIII,
  appImages.sceneIV,
  appImages.sceneV,
];
const data = [
  {
    id: '1',
    profileImage: '',
    username: 'Salina Hales',
    postTime: 'Just now',
    mediaImage: appImages?.media4,
    likes: 200,
    comments: 120,
    description:
      'Hello Gz.. Good morning 😎 Don’t forget to follow and comment on this post...',
  },
  {
    id: '2',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },

  {
    id: '3',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '4',
    profileImage: appImages?.profile,
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '5',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '6',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '7',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '8',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '9',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '10',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  {
    id: '11',
    profileImage: '',
    username: 'Katherine',
    postTime: '10 mins ago',
    mediaImage: appImages?.media4,
    likes: 150,
    comments: 90,
    description: 'Had a great day at the park!',
  },
  // Add other data here...
];
export const genderData = [
  {
    title: 'Male',
    iconBgColor: '#098B8E',
    iconSrc: appImages.male,
  },
  {
    title: 'Female',
    iconBgColor: '#31343A',
    iconSrc: appImages.female,
  },
  {
    title: 'Others',
    iconBgColor: '#31343A',
    iconSrc: appImages.others,
  },
  {
    title: 'Prefer not to mention',
  },
];
export const genderData1 = [
  {
    title: 'Male',
    iconSrc: appImages.male,
  },
  {
    title: 'Female',
    iconSrc: appImages.female,
  },
];
export const questions = [
  {
    id: 1,
    question: 'Do you burn fat easily or hard?',
    options: [
      {id: 'easy', text: 'Easily'},
      {id: 'hard', text: 'Hard'},
    ],
    selectedOption: null,
  },
  {
    id: 2,
    question: 'Do you gain weight fast or slow?',
    options: [
      {id: 'fast', text: 'Fast'},
      {id: 'slow', text: 'Slow'},
    ],
    selectedOption: null,
  },
  {
    id: 3,
    question: 'Do you want to cut or bulk?',
    options: [
      {id: 'cut', text: 'cut'},
      {id: 'bulk', text: 'bulk'},
    ],
    selectedOption: null,
  },
  {
    id: 4,
    question: 'Do is your body type?',
    options: [
      {id: 'mesomorph', text: 'Mesomorph'},
      {id: 'endo', text: 'Endomorph'},
      {id: 'ecto', text: 'Ectomorph'},
    ],
    selectedOption: null,
  },
];

const media = [
  {
    id: '1',
    image: '',
    yearWithMonth: 'July 2023',
    date: '15',
  },
  {
    id: '2',
    image: '',
    yearWithMonth: 'August 2024',
    date: '23',
  },
  {
    id: '3',
    image: '',
    yearWithMonth: 'September 2022',
    date: '10',
  },
  {
    id: '4',
    image: '',
    yearWithMonth: 'October 2025',
    date: '7',
  },
  {
    id: '5',
    image: '',
    yearWithMonth: 'November 2021',
    date: '29',
  },
  {
    id: '6',
    image: '',
    yearWithMonth: 'December 2024',
    date: '18',
  },
  {
    id: '7',
    image: '',
    yearWithMonth: 'January 2023',
    date: '3',
  },
  {
    id: '8',
    image: '',
    yearWithMonth: 'February 2022',
    date: '20',
  },
  {
    id: '9',
    image: '',
    yearWithMonth: 'March 2025',
    date: '11',
  },
  {
    id: '10',
    image: '',
    yearWithMonth: 'April 2024',
    date: '8',
  },
  {
    id: '11',
    image: '',
    yearWithMonth: 'May 2023',
    date: '26',
  },
  {
    id: '12',
    image: '',
    yearWithMonth: 'June 2025',
    date: '30',
  },
];
export const tabData = [
  {id: 0, title: '1d'},
  {id: 1, title: '1w'},
  {id: 2, title: '1m'},
  {id: 3, title: '1y'},
  {id: 4, title: 'All'},
];

export const workoutDataBlock = [
  {
    title: 'Push',
    details:
      'Details about push workout: Bench press, Shoulder press, Triceps dips.',
  },
  {
    title: 'Pull',
    details:
      'Details about pull workout: Deadlift, Pull-ups, Rows, Bicep curls.',
  },
  {
    title: 'Cardio',
    details: 'Details about cardio workout: Running, Cycling, Jump rope, HIIT.',
  },
];

//Premium feature plans

export const features = [
  {id: 1, text: 'Personalized workout plans'},
  {id: 2, text: 'Nutrition tracking'},
  {id: 3, text: 'Exclusive access to new programs'},
  {id: 4, text: 'Weekly check-ins with a coach'},
  {id: 5, text: '24/7 customer support'},
];

export const updatedRandomImages = generateRandomImages(
  data,
  profileImagesArray,
  'profileImage',
);

export const undatedRandomScenes = generateRandomImages(
  media,
  mediaImagesArray,
  'image',
);

export const addRecordData = [
  // {
  //   id: 1,
  //   name: 'Auto-Part Record',
  //   image: appImages?.autopartrecord,
  //   nav: routes.main.addautopartrecord,
  //   dummy: true,
  
  // },
  // {
  //   id: 2,
  //   name: 'Repair Record',
  //   image: appImages?.repairrecord,
  //   nav: routes.main.addrepairrecord,
  // },
  {
    id: 2,
    // name: 'Maintenance Record',
    name: 'Vehicle Maintenance',
    image: appImages?.maintenance,
    nav: routes.main.addmaintenancerecord,
    dummy: true,
  },

  {
    id: 3,
    name: 'Gas Record',
    image: appImages?.gasrecord,
    nav: routes.main.addgasrecord,
    dummy: true,
  },
  {
    id: 4,
    name: 'Accident Record',
    image: appImages?.accidentrecord,
    nav: routes.main.addaccidentrecord,
    dummy: true,
  },
  // {
  //   id: 5,
  //   name: 'Maintenance Record',
  //   image: appImages?.maintenancerecord,
  //   nav: routes.main.addmaintenancerecord,
  // },
  {
    id: 5,
    name: 'Travel Record',
    image: appImages?.travelrecord,
    nav: routes.main.addtravelrecord,
    dummy: true,
  },
  {
    id: 6,
    name: 'Heavy Equipment Record',
    image: appImages?.categoryTractor,
    nav: routes.main.addheavyequipmentrecord,
    dummy: true,
  },
  {
    id: 7,
    name: 'Home Appliances',
    image: appImages?.homerecord,
    nav: routes.main.addhomerecord,
    dummy: true,
  },
  {
    id: 8,
    name: 'Small Equipment Record',
    image: appImages?.smallrecord,
    nav: routes.main.addsmallequipmentrecord,
    dummy: true,
  },
  {
    id: 9,
    name: 'Tool Record',
    image: appImages?.toolrecord,
    nav: routes.main.addtoolrecord,
    dummy: true,
  },
  {
    id: 10,
    name: 'Farm Animals/Pets',
    image: appImages?.doghorse,
    nav: routes.main.addpetrecord,
    dummy: true,
  },
  {
    id: 11,
    name: 'Custom Record',
    image: appImages?.autopartrecord,
    nav: routes.main.addcustomrecord,
    dummy: true,
  },
];
export const vehicleHistory = [
  {
    id: 1,
    name: 'Auto Part',
    image: appImages?.autopartrecord,
    // nav: routes.main.addautopartrecord,
  },
  {
    id: 2,
    name: 'Repair',
    image: appImages?.repairrecord,
    // nav: routes.main.addrepairrecord,
  },
  {
    id: 3,
    name: 'Maintenance',
    image: appImages?.maintenancerecord,
  },

  {
    id: 4,
    name: 'Accident',
    image: appImages?.accidentrecord,
  },
  {
    id: 5,
    name: 'Gas',
    image: appImages?.gasrecord,
  },
];
