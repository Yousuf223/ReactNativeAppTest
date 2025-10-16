import React, {useEffect, useState} from 'react';
import routes from '../routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../../Screens/Main/ChangePassword';
import ContactUs from '../../Screens/Main/ContactUs';
import EditProfile from '../../Screens/Main/EditProfile';
import MyProfile from '../../Screens/Main/MyProfile';
import PrivacyPolicy from '../../Screens/Main/PrivacyPolicy';
import TermAndConditions from '../../Screens/Main/TermAndConditions';
import UserAppStack from '../Drawers/Drawers';
import NavigationOptions from '../NavigationOptions';
import MyPurchase from '../../Screens/Main/MyPurchase';
import SubscriptionPlan from '../../Screens/Main/SubscriptionPlan';
import AddVehicles from '../../Screens/Main/AddVehicle';
import PaymentDetails from '../../Screens/Main/PaymentDetails';
import AddVehicleDetails from '../../Screens/Main/AddVehicleDetails';
import Notification from '../../Screens/Main/Notification';
import AutoPartsDetails from '../../Screens/Main/AutoPartsDetails';
import VehicleDetails from '../../Screens/Main/VehicleDetails';
import VehicleAutoPart from '../../Screens/Main/VehicleAutoPart';
import RepairsDetails from '../../Screens/Main/RepairsDetails';
import AddAutoPartRecord from '../../Screens/Main/AddAutoPartRecord';
import AddRepairRecord from '../../Screens/Main/AddRepairRecord';
import AddAStore from '../../Screens/Main/AddAStore';
import AddNewSeller from '../../Screens/Main/AddNewSeller';
import AddNewMechanic from '../../Screens/Main/AddNewMechanic';
import EditAutoParts from '../../Screens/Main/EditAutoParts';
import EditRepairRecord from '../../Screens/Main/EditRepairRecord';
import EditVechile from '../../Screens/Main/EditVechile';
import OtherRecords from '../../Screens/Main/OtherRecords';
import VehicleHistory from '../../Screens/Main/VehicleHistory';
import AddGasRecord from '../../Screens/Main/AddGasRecord';
import AddAccidentRecord from '../../Screens/Main/AddAccidentRecord';
import AddMaintenanceRecord from '../../Screens/Main/AddMaintenanceRecord';
import AddTravelRecord from '../../Screens/Main/AddTravelRecord';
import AddHeavyEquipmentRecord from '../../Screens/Main/AddHeavyEquipmentRecord';
import AddHomeRecord from '../../Screens/Main/AddHomeRecord';
import AddSmallEquipmentRecord from '../../Screens/Main/AddSmallEquipmentRecord';
import AddToolRecord from '../../Screens/Main/AddToolRecord';
import AddPetRecord from '../../Screens/Main/AddPetRecord';
import AddVetRecordForPet from '../../Screens/Main/AddVetRecordForPet';
import AddCustomRecord from '../../Screens/Main/AddCustomRecord';
import AddDynamicCustomRecords from '../../Screens/Main/AddDynamicCustomRecords';
import CreateDraft from '../../Screens/Main/CreateDraft';
import DraftDetails from '../../Screens/Main/DraftDetails';
import AddVehicleSubCategory from '../../Screens/Main/AddVehicleSubCategory';
import EditCustomRecords from '../../Screens/Main/EditCustomRecords';
import ExpenseDetails from '../../Screens/Main/ExpenseDetails';
import EditCustomRecordsCategory from '../../Screens/Main/EditCustomRecordsCategory';
import VehicleMaintenanceDetails from '../../Screens/Main/VehicleMaintenanceDetails';
import TestScreen from '../../Screens/Main/TestScreen';
import AddPart from '../../Screens/Main/AddPart/AddPart'
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
       initialRouteName={routes.navigator.tab}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={routes.navigator.tab} component={UserAppStack} />

      {/* <Stack.Screen name={routes.main.myProfile} component={MyProfile} /> */}
      <Stack.Screen
        name={routes.main.changePassword}
        component={ChangePassword}
      />
      <Stack.Screen name={routes.main.editProfile} component={EditProfile} />

      <Stack.Screen
        name={routes.main.termAndConditions}
        component={TermAndConditions}
      />
         <Stack.Screen
        name={routes.main.AddPart}
        component={AddPart}
      />
      <Stack.Screen
        name={routes.main.privacyPolicy}
        component={PrivacyPolicy}
      />
      <Stack.Screen name={routes.main.contactUs} component={ContactUs} />
      <Stack.Screen name={routes.main.mypurchase} component={MyPurchase} />
      <Stack.Screen
        name={routes.main.subscriptionplan}
        component={SubscriptionPlan}
      />
      <Stack.Screen name={routes.main.addVehicles} component={AddVehicles} />
      <Stack.Screen
        name={routes.main.addVehicleSubCategory}
        component={AddVehicleSubCategory}
      />

      <Stack.Screen
        name={routes.main.addVehicleDetails}
        component={AddVehicleDetails}
      />
      <Stack.Screen
        name={routes.main.vehicleDetails}
        component={VehicleDetails}
      />
      <Stack.Screen
        name={routes.main.vehicleAutoPart}
        component={VehicleAutoPart}
      />

      <Stack.Screen
        name={routes.main.paymentDetails}
        component={PaymentDetails}
      />
      <Stack.Screen name={routes.main.notification} component={Notification} />
      <Stack.Screen
        name={routes.main.autoPartsDetails}
        component={AutoPartsDetails}
      />
      <Stack.Screen
        name={routes.main.repairsdetails}
        component={RepairsDetails}
      />
      <Stack.Screen
        name={routes.main.addautopartrecord}
        component={AddAutoPartRecord}
      />
      <Stack.Screen
        name={routes.main.addrepairrecord}
        component={AddRepairRecord}
      />
      <Stack.Screen name={routes.main.addastore} component={AddAStore} />
      <Stack.Screen name={routes.main.addnewseller} component={AddNewSeller} />
      <Stack.Screen
        name={routes.main.addnewmechanic}
        component={AddNewMechanic}
      />
      <Stack.Screen
        name={routes.main.editautoparts}
        component={EditAutoParts}
      />
      <Stack.Screen
        name={routes.main.editcustomrecords}
        component={EditCustomRecords}
      />
      <Stack.Screen
        name={routes.main.editrepairrecord}
        component={EditRepairRecord}
      />
      <Stack.Screen name={routes.main.editvechile} component={EditVechile} />
      <Stack.Screen name={routes.main.otherrecord} component={OtherRecords} />
      <Stack.Screen
        name={routes.main.vehiclehistory}
        component={VehicleHistory}
      />
      <Stack.Screen name={routes.main.myProfile} component={MyProfile} />
      <Stack.Screen name={routes.main.addgasrecord} component={AddGasRecord} />
      <Stack.Screen name={routes.main.addpetrecord} component={AddPetRecord} />
      <Stack.Screen
        name={routes.main.addcustomrecord}
        component={AddCustomRecord}
      />

      <Stack.Screen
        name={routes.main.addvetrecordforpet}
        component={AddVetRecordForPet}
      />

      <Stack.Screen
        name={routes.main.addtoolrecord}
        component={AddToolRecord}
      />

      <Stack.Screen
        name={routes.main.addsmallequipmentrecord}
        component={AddSmallEquipmentRecord}
      />

      <Stack.Screen
        name={routes.main.addhomerecord}
        component={AddHomeRecord}
      />

      <Stack.Screen
        name={routes.main.addheavyequipmentrecord}
        component={AddHeavyEquipmentRecord}
      />

      <Stack.Screen
        name={routes.main.addtravelrecord}
        component={AddTravelRecord}
      />

      <Stack.Screen
        name={routes.main.addmaintenancerecord}
        component={AddMaintenanceRecord}
      />

      <Stack.Screen
        name={routes.main.addaccidentrecord}
        component={AddAccidentRecord}
      />
      <Stack.Screen
        name={routes.main.addDynamicCustomRecords}
        component={AddDynamicCustomRecords}
      />
      <Stack.Screen name={routes.main.createdraft} component={CreateDraft} />
      <Stack.Screen name={routes.main.draftdetails} component={DraftDetails} />
      <Stack.Screen name={routes.main.expensedetails} component={ExpenseDetails} />
      <Stack.Screen name={routes.main.editcustomrecordscategory} component={EditCustomRecordsCategory} />
      <Stack.Screen name={routes.main.vehicleMaintenanceDetails} component={VehicleMaintenanceDetails} />
      <Stack.Screen name={routes.main.testScreen} component={TestScreen} />

    </Stack.Navigator>
  );
};

export default Main;
