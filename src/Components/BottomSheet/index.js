import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../theme/colors';
import CustomBottomSheet from '../CustomBottomSheet';
import {styles} from './style';

import {font, layout, spacing} from '../../theme/styles';
import {vh, vw} from '../../theme/units';
import {MainButton} from '../Buttons/MainButton';
import Gradient from '../GradientComponent';
import MyIcons from '../MyIcons';

import SpaceLine from '../SpaceLine';

import fonts from '../../Assets/fonts';
import CustomText from '../wrappers/Text/CustomText';
import InputField from '../InputField';
import {appImages} from '../../Assets/Images';

const {height, width} = Dimensions.get('screen');

const BottomSheet = props => {
  const {
    togglePopup,
    alertPopup,
    foodItems,
    onBackButtonPress,
    onDragDown,
    onCrossPress,
    onBackdropPress,
    onPress,
    onPressNo,
    onPressYes,
    successPopup = false,
    packages,
    signaturePopup = false,
    modalHeight,
    handleSign,
    handleSubmit,
    description,
    label,
    logout,
    onNoPress,
    list,
    buttontitle,
    deletePopup,
  } = props;
  const [selected, setSelected] = React.useState('');
  const [dateCheckin, setDateCheckin] = useState(new Date());
  const [showCheckinPicker, setShowCheckinPicker] = useState(false);
  const [timeCheckin, setTimeCheckin] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeTimePicker = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const amOrPm = hours < 12 ? 'AM' : 'PM';
    const formattedHour = hours % 12 || 12; // Convert 0 to 12
    const formattedTime = `${formattedHour}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${amOrPm}`;
    setTimeCheckin(formattedTime);
  };
  const handleTimePick = () => {
    setShowTimePicker(true);
  };

  //   const onChangeCheckinPicker = (event, selectedDate) => {
  //     const currentDate = selectedDate || dateCheckin;
  //     setShowCheckinPicker(Platform.OS === 'ios');
  //     const formattedDate = formatDate(currentDate);
  //     setDateCheckin(formattedDate);
  //   };

  const handleCheckin = () => {
    setDateCheckin(new Date());
    setShowCheckinPicker(true);
  };
  const hideDateTimePicker = () => {
    setShowCheckinPicker(false);
    setShowTimePicker(false);
  };

  const data = [
    {key: '1', value: 'Upcoming'},
    {key: '2', value: 'Completed'},
    {key: '3', value: 'Ongoing'},
  ];
  const jump = [
    {key: '1', value: 'Tandem'},
    {key: '2', value: 'Solo Jump'},
    {key: '3', value: 'AFF Jump'},
  ];
  const renderTitle = () => {
    return (
      <View style={styles?.titleWrapper}>
        <CustomText text={props?.title} />
      </View>
    );
  };
  const data2 = [
    {
      id: '1',
      iconName: 'cheese',
      label: 'Cheese',
      weight: '50.00g',
      calories: '201',
    },
    {
      id: '2',
      iconName: 'bread',
      label: 'Bread',
      weight: '150.00g',
      calories: '95',
    },
    {
      id: '3',
      iconName: 'beer',
      label: 'Beer',
      weight: '200.00g',
      calories: '335',
    },
    {
      id: '4',
      iconName: 'sushi',
      label: 'Sushi',
      weight: '250.00ml',
      calories: '112',
    },
  ];
  return (
    <CustomBottomSheet
      draggable={true}
      ref={togglePopup}
      height={modalHeight ? modalHeight : height * 0.3}
      onClose={onBackdropPress}
      backdropColor="rgba(0,0,0,0.5)"
      closeOnDragDown={onDragDown}
      closeOnPressBack={onBackButtonPress}
      customStyles={{
        container: styles.modal,
        backgroundColor: colors?.theme?.white,
      }}
      draggableIconColor={colors?.theme?.greyAlt2}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            foodItems ? styles.container2 : styles.container,
            {flex: 1, position: 'relative'},
          ]}>
          {/* <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#D6D6D6',
              position: 'absolute',
              top: -10,
              right: 25,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.5}
            onPress={onCrossPress}>
            <MyIcons name={'cross'} size={vh * 2.5} />
          </TouchableOpacity> */}
          {props?.title && renderTitle()}
          {successPopup && (
            <View style={styles.successPopupContainer}>
              <MyIcons name={'checkIcon2'} size={vh * 11} />
              {/* <Image source={appIcons.success} style={styles.logoStyles} /> */}
              <View style={{alignItems: 'center', gap: 6}}>
                <CustomText
                  color={colors?.text?.dimBlack}
                  text={label ? label : 'Success'}
                  style={{textAlign: 'center'}}
                  font={fonts?.clash?.semibold}
                  size={font?.xxlarge}
                />
                <CustomText
                  color={colors?.text?.dimBlack}
                  text={
                    description ? description : 'Your request was successfully'
                  }
                  style={{textAlign: 'center'}}
                  font={fonts?.benzin?.regular}
                  size={font?.large}
                />
              </View>
              <MainButton
                title={buttontitle ? buttontitle : 'Okay'}
                style={{width: layout.contentWidth - spacing.xxxlarge}}
                onPress={onPress}
              />
            </View>
          )}
          {alertPopup && (
            <View style={styles.successPopupContainer}>
              <MyIcons name={'checkIcon'} size={vh * 11} />
              {/* <MyIcons name={'alert2'} size={vh * 12} /> */}
              {/* <Image source={appIcons.success} style={styles.logoStyles} /> */}
              <View
                style={{
                  alignItems: 'center',
                  width: '85%',
                }}>
                <CustomText
                  color={colors?.text?.dimBlack}
                  text={label}
                  font={fonts?.benzin.semibold}
                  size={font?.xxlarge}
                />
                <CustomText
                  color={colors?.text?.dimBlack}
                  text={description}
                  font={fonts?.benzin.regular}
                  size={font?.large}
                  style={{textAlign: 'center'}}
                />
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <MainButton
                  title={'No'}
                  hideIcon={true}
                  style={{
                    width: vw * 40,
                    backgroundColor: colors?.theme?.white,
                    borderWidth: 1.8,
                    borderColor: colors.text.red,
                  }}
                  textStyle={{color: colors.theme.black}}
                  onPress={onPressNo}
                />
                <MainButton
                  title={'Yes'}
                  style={{width: vw * 40}}
                  onPress={onPressYes}
                />
              </View>
            </View>
          )}
          {deletePopup && (
            <View style={styles.successPopupContainer}>
              <Image
                source={appImages.deletebutton}
                resizeMode="contain"
                style={{width: vw * 20, height: vh * 12}}
              />

              <View
                style={{
                  alignItems: 'center',
                  width: '85%',
                }}>
                <CustomText
                  color={colors?.text?.dimBlack}
                  text={label}
                  font={fonts?.benzin.semibold}
                  size={font?.xxlarge}
                />
                <CustomText
                  color={colors?.text?.dimBlack}
                  text={description}
                  font={fonts?.benzin.regular}
                  size={font?.large}
                  style={{textAlign: 'center'}}
                />
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <MainButton
                  title={'No'}
                  hideIcon={true}
                  style={{
                    width: vw * 40,
                    backgroundColor: colors?.theme?.white,
                    borderWidth: 1.8,
                    borderColor: colors.text.red,
                  }}
                  textStyle={{color: colors.theme.black}}
                  onPress={onPressNo}
                />
                <MainButton
                  title={'Yes'}
                  style={{width: vw * 40}}
                  onPress={onPressYes}
                />
              </View>
            </View>
          )}
          {foodItems && (
            <View style={styles.foodContainer}>
              <InputField
                placeholder={'Search'}
                placeholderColor={colors?.text?.white}
                leftIcon={'search'}
              />
            </View>
          )}

          {packages && (
            <View style={styles.packageBtnsPopupContainer}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: vw * 80,
                }}>
                <CustomText text={label ? label : 'Success'} />
                <CustomText
                  text={
                    description ? description : 'Your request was successfully'
                  }
                  style={{textAlign: 'center'}}
                />
              </View>
              <TouchableOpacity style={styles.btnContainer}>
                <Gradient
                  colors={['#E82227', '#F79420']}
                  style={styles.gradientContainer}>
                  <CustomText
                    text={'7 Day free trail'}
                    style={{color: colors.theme.white}}
                  />
                  <SpaceLine />
                  <CustomText
                    text={'get premier for free and enjoy'}
                    style={{color: colors.theme.white}}
                  />
                </Gradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnContainer1}>
                <View style={styles.iconContainer}>
                  <MyIcons name={'monthlyPackage'} size={30} />
                </View>
                <View style={{marginHorizontal: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <PoppinsSemiBold text={'$300 '} /> */}
                    <CustomText text={'monthly'} style={{fontSize: 11}} />
                  </View>
                  <CustomText
                    text={'get premier for free and enjoy'}
                    style={{fontSize: 13}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnContainer1}>
                <View style={styles.iconContainer}>
                  <MyIcons name={'yearlyPackage'} size={30} />
                </View>
                <View style={{marginHorizontal: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <PoppinsSemiBold text={'$900 '} /> */}
                    <CustomText text={'yearly'} style={{fontSize: 11}} />
                  </View>
                  <CustomText
                    text={'get premier for free and enjoy'}
                    style={{fontSize: 13}}
                  />
                </View>
              </TouchableOpacity>
              <MainButton
                title={'Purchase'}
                style={{width: layout.contentWidth - spacing.xxxlarge}}
                onPress={onPress}
              />
            </View>
          )}
          {list && (
            <View style={{alignItems: 'center'}}>
              <InputField leftIcon={'search'} placeholder={'Search here'} />
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{maxHeight: vh * 34}}
                data={data2}
                ItemSeparatorComponent={() => (
                  <View style={{height: spacing.medium}} />
                )}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: colors.input.background,
                      width: vw * 86,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: spacing.medium,
                      borderRadius: layout.borderRadius,
                      paddingVertical: spacing.large,
                    }}>
                    <View style={{flexDirection: 'row', gap: spacing.small}}>
                      <MyIcons name={item?.iconName} />
                      <CustomText text={item?.label} />
                    </View>
                    <CustomText text={`${item?.calories} Kcal`} />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </CustomBottomSheet>
  );
};

export default BottomSheet;
