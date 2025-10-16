import {View} from 'react-native';
import React from 'react';
import SwitchButton from '../../../Components/Buttons/SwitchButton';
import {styles} from './styles';
import {MainButton} from '../../../Components/Buttons/MainButton';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../Navigation/routes';
import Container from '../../../Components/Container';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import ToggleSwitch from '../../../Components/Buttons/ToggleSwitch';
import fonts from '../../../Assets/fonts';
import {font} from '../../../theme/styles';

const Settings = () => {
  const navigation = useNavigation();
  const buttons = [
    {title: 'Notifications'},
    {title: 'Habit motivation levels'},
    {title: 'Habit satisfaction levels'},
  ];

  const renderButtons = () => {
    const handleToggle = isOn => {
      console.log('Toggle is now:', isOn);
    };
    return (
      <View style={styles?.renderButtonsContainer}>
        {buttons.map((item, index) => (
          <View key={index} style={styles.list}>
            <CustomText
              text={item.title}
              font={fonts.benzin.regular}
              size={font.medium}
            />
            <ToggleSwitch initialState={false} onToggle={handleToggle} />
          </View>
        ))}
      </View>
    );
  };
  return (
    <View>
      <CustomHeader routeName={routes?.main.setting} />
      <Container keyboardAware={false}>{renderButtons()}</Container>
    </View>
  );
};

export default Settings;
