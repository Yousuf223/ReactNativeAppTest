import React from 'react';
import {View} from 'react-native';
import {spacing} from '../../../theme/styles';

import {useNavigation} from '@react-navigation/native';
import {MainButtonWithCircle} from '../../../Components/Buttons/MainButton';
import AgePicker from '../../../Components/Cards/AgePicker';
import TitleWithDescription from '../../../Components/Cards/TitleWithDescription';
import {generateHeightData} from '../../../Functions/generateHeightData';
import {useResetToScreen} from '../../../Functions/resetToScreen';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import {vh} from '../../../theme/units';

const HeightCreation = () => {
  const navigation = useNavigation();
  const {resetToScreen} = useResetToScreen();
  const data = Array.from({length: 100}, (_, index) => index + 1);
  const heightData = generateHeightData();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.theme.black,
      }}>
      <View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.large,
            paddingHorizontal: spacing.medium,
          },
        ]}>
        <TitleWithDescription
          title="Tell Us Your Height"
          description="Please provide your personal details so we can help you achieve the best version of you!"
        />
        <AgePicker data={heightData} />
        <View style={{marginTop: vh * 10}}>
          <MainButtonWithCircle
            icon={true}
            onPress={() => navigation.navigate(routes.auth.weight)}
          />
        </View>
      </View>
    </View>
  );
};

export default HeightCreation;
