import React from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import {font} from '../../../theme/styles';
import {colors} from '../../../theme/colors';
import fonts from '../../../Assets/fonts';
import {styles} from './styles';

const Notification = () => {
  const notificationsData = [
    {id: 1, message: 'New message received', time: 'Just now'},
    {id: 2, message: 'Your order has been shipped', time: '2 hours ago'},
  ];

  return (
    <>
      <CustomHeader routeName={routes?.main.notification} />
      <FlashList
        data={notificationsData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.container}>
            <CustomText
              text={item.message}
              color={colors.text.dimBlack}
              size={font.medium}
              font={fonts.benzin.regular}
            />
            <CustomText
              text={item.time}
              color={'#F6075A'}
              size={font.medium}
              font={fonts.benzin.regular}
            />
          </View>
        )}
        estimatedItemSize={50}
      />
    </>
  );
};

export default Notification;
