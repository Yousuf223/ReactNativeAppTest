import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import fonts from '../Assets/fonts';
import { appShadow, colors } from '../theme/colors';
import { font } from '../theme/styles';
import { getImageUrl, LOG } from '../Utils/helperFunction';
import CustomIcon from './CustomIcon';
import CustomText from './wrappers/Text/CustomText';
import { appImages } from '../Assets/Images';
import MyIcons from './MyIcons';

const { width, height } = Dimensions.get('screen');

const CustomCard = ({
  dealCard = false,
  onPress,
  disabled = false,
  product = false,
  shopMyCart = false,
  orderCardList = false,
  item,
  index,
  couponCard = false,
  addRecordCard = false,
  noPadding,
  isEdit,
  onEditPress,
  isDelete,
  onDeletePress,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  let imgSrc = couponCard && getImageUrl(  item?.gallery[0]);
  let title = couponCard && `${item?.vehicleDetails?.make ? item?.vehicleDetails?.make : "Default Vehicle"} ${item?.vehicleDetails?.model ? item?.vehicleDetails?.model : ""}`
// console.log('sdsadsad',item?.image && item?.image || item?.gallery[0] && item?.gallery[0]  )
  return (
    <TouchableOpacity
      style={[
        !product && styles.container,
        { paddingHorizontal: noPadding ? 0 : 10 },
        shopMyCart && { backgroundColor: 'transparent' },
        (shopMyCart || orderCardList) && { backgroundColor: 'transparent' },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}>
      {couponCard && (
        <View style={styles.bookingContainer}>
          <CustomIcon
            src={ imgSrc}
            disabled={true}
            customIconWrapper={[styles.eventImg, { height: height * 0.232 }]}
            resizeMode={'cover'}
            customIconStyle={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
          <View style={styles?.couponItems}>
            <CustomText
              text={title}
              color={colors?.text?.dimBlack}
              font={fonts?.clash?.regular}
              size={font.xxlarge}
              numberOfLines={1}
            />
          </View>
        </View>
      )}
      {addRecordCard && (
        <View
          style={[
            styles.productCard,
            index % 2 === 0 ? styles.leftItem : styles.rightItem,
          ]}>
          {!isDelete && <TouchableOpacity onPress={onDeletePress} activeOpacity={0.9} style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 6, borderRadius: 6, position: 'absolute', top: 10, zIndex: 999, left: 10 }}>
            <MyIcons name='delete' />
          </TouchableOpacity>}
          {!isEdit && <TouchableOpacity onPress={onEditPress} activeOpacity={0.9} style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 6, borderRadius: 6, position: 'absolute', top: 10, zIndex: 999, right: 10 }}>
            <MyIcons name='editIcon' />
          </TouchableOpacity>}
          <View style={styles?.productImageBg}>
            <Image
              style={styles?.productImg}
              source={item?.image}
              resizeMode="cover"
            />
          </View>
          <View style={{ padding: 10 }}>
            <CustomText
              text={`${item?.name.toUpperCase()} HISTORY`}
              color={colors?.text?.dimBlack}
              font={fonts?.clash?.semibold}
              size={font.xsmall}
              numberOfLines={2}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderRadius: 10,
    position: 'relative',
  },

  bookingContainer: {
    // gap: 8,
  },

  couponItems: {
    ...appShadow,
    backgroundColor: colors?.theme?.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    gap: 5,
    alignItems: 'center',
  },

  bookingImg: {
    height: height * 0.155,
    width: width - 58,
    // ...Shadows?.shadow0
  },
  eventImg: {
    height: height * 0.215,
    width: '100%',
  },
  productCard: {
    backgroundColor: colors?.theme?.white,
    width: width / 2.5,

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // ...Shadows?.shadow5,
    ...appShadow,
  },
  productImageBg: {
    width: '100%',
    height: width / 2.5,
    borderRadius: 10,
  },
  productImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rightItem: {
    marginTop: 6,
    marginBottom: -6,
  },
  leftItem: {
    marginBottom: 6,
    marginTop: -6,
  },
});
