import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { styles } from './styles';
import Step01 from './FormSteps/Step01';
import Step02 from './FormSteps/Step02';
import Step03 from './FormSteps/Step03';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Navigation/routes';
import { reduxStorage } from '../../Redux/mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CyroLiabilityForm = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const checkFirstTime = async () => {
    await AsyncStorage.setItem('isStarter', JSON.stringify(true));
  };
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    checkFirstTime();
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step01 titleData />;
      case 2:
        return <Step02 titleData />;
      case 3:
        return <Step03 titleData />;

      default:
        return <Text>Invalid Step</Text>;
    }
  };
  const renderStepContents = () => {
    switch (currentStep) {
      case 1:
        return <Step01 onButtonNext={handleNextStep} banner />;
      case 2:
        return <Step02 onButtonNext={handleNextStep} banner />;
      case 3:
        return (
          <Step03
            onButtonNext={() => navigation.navigate(routes.auth.login)}
            banner
          />
        );

      default:
        return <Text>Invalid Step</Text>;
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContent}>{renderStepContent()}</View>
      <View style={styles.indicatorContainer}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index < currentStep
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
      <View style={styles.formContent}>{renderStepContents()}</View>
    </ScrollView>
  );
};

export default CyroLiabilityForm;
