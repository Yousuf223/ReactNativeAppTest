// export const baseUrl = 'https://react.customdev.solutions:3056/api';
export const baseUrl = 'http://66.29.143.67/api';

// export const baseUrl = 'https://ea72-204-157-158-10.ngrok-free.app/api';
export const imageServer = 'https://react.customdev.solutions:3056/Uploads/';

export const endpoints = {
  auth: {
    login: {
      url: 'user/login',
      method: 'POST',
    },
    register: {
      url: 'user/register',
      method: 'POST',
    },
  },
  profile: {
    update: {
      url: 'user/updateProfile',
      method: 'PUT',
    },
  },
  vehicle: {
    add: {
      url: 'vehicle/addVehicle',
      method: 'POST',
    },
    fectchVehicleByUser: {
      url: '/vehicle/getVehicleByUser',
      method: 'GET',
    },
    fetchVehicleById: {
      url: '/vehicle/getVehicleById',
      method: 'GET',
    },
    edit: {
      url: '/vehicle/updateVehicle',
      method: 'PUT',
    },
    delete: {
      url: '/vehicle/deleteVehicle',
      method: 'DELETE',
    },
  },
  vehicleTypes: {
    fectchVehicleType: {
      url: '/vehicleType/getVehicleTypes',
      method: 'GET',
    },
  },
  contactUs: {
    add: {
      url: '/feedback/addFeedback',
      method: 'POST',
    },
  },
  worker: {
    add: {
      url: '/worker/addWorker',
      method: 'POST',
    },
    fectchVehicleByUser: {
      url: '/vehicle/getVehicleByUser',
      method: 'GET',
    },
    fetchVehicleById: {
      url: '/vehicle/getVehicleById',
      method: 'GET',
    },
    edit: {
      url: '/vehicle/updateVehicle',
      method: 'PUT',
    },
  },
  store: {
    add: {
      url: '/store/addStore',
      method: 'POST',
    },
    addMechanicsSellers: {
      url: '/store/addWorkers',
      method: 'POST',
    },
    fectchStoreByUser: {
      url: '/store/getStoresByUser',
      method: 'GET',
    },
    fetchStoreById: {
      url: 'store/getStore',
      method: 'GET',
    },
    edit: {
      url: '/store/updateStore',
      method: 'PUT',
    },
  },
  mechanic: {
    add: {
      url: '/mechanic/addMechanic',
      method: 'POST',
    },
    fetchMechanicsByUser: {
      url: '/mechanic/getMechanicsByUser',
      method: 'GET',
    },
    fetchMechanicById: {
      url: '/mechanic/getMechanicById',
      method: 'GET',
    },
    edit: {
      url: '/mechanic/updateMechanic',
      method: 'PUT',
    },
  },
  gas: {
    add: {
      url: 'gas/addGasExpense',
      method: 'POST',
    },
  },
  accident: {
    add: {
      url: 'accident/addAccident',
      method: 'POST',
    },
  },
  autoparts: {
    add: {
      url: '/autopart/addAutoPart',
      method: 'POST',
    },
    fetchAutoPartsByUser: {
      url: '/autoPart/getAutoPartsByUserId',
      method: 'GET',
    },
  },
  repairAutoparts: {
    add: {
      url: '/repair/addRepair',
      method: 'POST',
    },
  },
  maintenanceAutoparts: {
    add: {
      url: '/vehicleService/addVehicleService',
      method: 'POST',
    },
    fetchMaintenaceByUser: {
      url: '/vehicleService/getVehicleServicesByUserId',
      method: 'GET',
    },
  },
  travel: {
    add: {
      url: 'travel/addTravelExpense',
      method: 'POST',
    },
  },
  equipment: {
    add: {
      url: 'equipment/addEquipment',
      method: 'POST',
    },
    // fectchVehicleByUser: {
    //   url: '/vehicle/getVehicleByUser',
    //   method: 'GET',
    // },
    // fetchVehicleById: {
    //   url: '/vehicle/getVehicleById',
    //   method: 'GET',
    // },
    // edit: {
    //   url: '/vehicle/updateVehicle',
    //   method: 'PUT',
    // },
  },
  pet: {
    add: {
      url: 'pet/addPet',
      method: 'POST',
    },
    fectchPetByUser: {
      url: 'pet/getPets',
      method: 'GET',
    },
    // fetchVehicleById: {
    //   url: '/vehicle/getVehicleById',
    //   method: 'GET',
    // },
    // edit: {
    //   url: '/vehicle/updateVehicle',
    //   method: 'PUT',
    // },
  },
  vet: {
    add: {
      url: 'vet/addVet',
      method: 'POST',
    },
  },
  otherRecords: {
    fetchchOtherRecordsByUser: {
      url: '/history/getOtherRecords',
      method: 'GET',
    },
  },
  records: {
    fetchchRecordsByUser: {
      url: '/history/getRecords',
      method: 'GET',
    },
    fetchRecentRecordsExprenses:{
      url: '/history/getExpenses',
      method: 'GET',
    },
    deleteRecordsByUser: {
      url: '/history/deleteRecord',
      method: 'DELETE',
    },
    edit: {
      url: '/history/updateRecord',
      method: 'PUT',
    },
  },
  category: {
    add: {
      url: 'category/addCategory',
      method: 'POST',
    },
    fetchCategories: {
      url: '/category/getCategories',
      method: 'GET',
    },
    delete: {
      url: '/category/deleteCategory',
      method: 'DELETE',
    },
    edit: {
      url: '/category/updateCategory',
      method: 'PUT',
    },
  },
  payment: {
    add: {
      url: 'payment/savePayment',
      method: 'POST',
    },
    fetchPaymentByUser: {
      url: '/subscription/getSubscriptions',
      method: 'GET',
    },
    fetchPaymentByUserID: {
      url: '/payment/getUserSubscriptions',
      method: 'GET',
    },
  },
  customRecords: {
    add: {
      url: '/record/addRecord',
      method: 'POST',
    },
    edit: {
      url: '/record/updateRecord',
      method: 'PUT',
    }
    // fetchPaymentByUser: {
    //   url: '/subscription/getSubscriptions',
    //   method: 'GET',
    // },
    // fetchPaymentByUserID: {
    //   url: '/payment/getUserSubscriptions',
    //   method: 'GET',
    // },
  },
  drafts: {
    add: {
      url: '/draft/createDraft',
      method: 'POST',
    },
    fetchRecordsByUser: {
      url: '/draft/getDrafts',
      method: 'GET',
    },
    fetchRecordsById: {
      url: '/draft/getDraftById',
      method: 'GET',
    },
    deleteRecordsByUser: {
      url: '/draft/deleteDraft',
      method: 'DELETE',
    },
  },
    part: {
    add: {
      url: '/part/add',
      method: 'POST',
    },
    getPart: {
      url: '/part/getAll',
      method: 'GET',
    },
  },
};

export const reducers = {
  path: {
    auth: 'authApi',
    journal: 'journalApi',
    journalEntries: 'journalEntriesApi',
    profile: 'profileApi',
    vehicle: 'vehicleApi',
    part:'partApi',
    vehicleTypes: 'vehicleTypesApi',
    contactUs: 'contactUsApi',
    worker: 'workerApi',
    store: 'storeApi',
    mechanic: 'mechanicApi',
    gas: 'gasApi',
    accident: 'accidentApi',
    travel: 'travelApi',
    autoparts: 'autopartsApi',
    repairAutoparts: 'repairAutopartsApi',
    maintenanceAutoparts: 'maintenanceAutopartsApi',
    equipment: 'equipmentApi',
    pet: 'petApi',
    vet: 'vetApi',
    otherRecords: 'otherRecordsApi',
    records: 'recordsApi',
    payment: 'paymentApi',
    category: 'categoryApi',
    customRecords: 'customRecordsApi',
    drafts: 'draftsApi',
  },
};
