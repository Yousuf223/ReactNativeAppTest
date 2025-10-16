import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View} from 'react-native';

import {font, spacing} from '../../../theme/styles';
import Container from '../../../Components/Container';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import {colors} from '../../../theme/colors';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {vw} from '../../../theme/units';
import fonts from '../../../Assets/fonts';

export default function PrivacyPolicy() {
  useFocusEffect(
    useCallback(() => {
      // NavService.closeDrawer();
    }, []),
  );
  const privacyPolicy = [
    {
      title: '1- Type of data we collect',
      desc: `Lorem Ipsum is simply dummy text of the print and typesetting industry. Lorem Ipsum has been the only industry's standard dummy text ever since the when an unknown printer took a galley of type and scram able it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essential software unchanged. It was popularised in the with the release of LetterÏ set sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus Page Maker including versions.`,
    },
    {
      title: '2- Use of your personal data',
      desc: `Lorem Ipsum is simply dummy text of the print and typesetting industry. Lorem Ipsum has been the only industry's standard dummy text ever since the when an unknown printer took a galley of type and scram able it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essential software unchanged. It was popularised in the with the release of LetterÏ set sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus Page Maker including versions.`,
    },
    {
      title: '3- Information Collection and use:',
      desc: `Lorem Ipsum is simply dummy text of the print and typesetting industry. Lorem Ipsum has been the only industry's standard dummy text ever since the when an unknown printer took a galley of type and scram able it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essential software unchanged. It was popularised in the with the release of LetterÏ set sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus Page Maker including versions.`,
    },
    {
      title: '4- Information Collection and use:',
      desc: `Lorem Ipsum is simply dummy text of the print and typesetting industry. Lorem Ipsum has been the only industry's standard dummy text ever since the when an unknown printer took a galley of type and scram able it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essential software unchanged. It was popularised in the with the release of LetterÏ set sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus Page Maker including versions.`,
    },
  ];
  return (
    <View>
      <CustomHeader
        routeName={routes.main.privacyPolicy}
        titleStyle={{width: vw * 75}}
      />
      <Container>
        <View style={{marginBottom: spacing.xxlarge}}>
          {privacyPolicy?.map((item, index) => (
            <View key={index}>
              <CustomText
                text={item?.title}
                font={fonts.benzin.semibold}
                size={font.medium}
                style={{paddingVertical: spacing.small}}
              />
              <CustomText
                text={item?.desc}
                font={fonts.benzin.regular}
                size={font.small}
                style={{
                  marginLeft: spacing.small,
                }}
              />
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}
