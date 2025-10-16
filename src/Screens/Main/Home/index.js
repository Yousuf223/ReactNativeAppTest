import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import fonts from '../../../Assets/fonts';
import { MainButtonWithGradient } from '../../../Components/Buttons/MainButton';
import CustomHeader from '../../../Components/CustomHeader';
import MyIcons from '../../../Components/MyIcons';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import routes from '../../../Navigation/routes';
import { colors } from '../../../theme/colors';
import { font } from '../../../theme/styles';
import styles from './styles';
import { appImages } from '../../../Assets/Images';
import { useFetchRecentRecordsExpensesQuery, useFetchRecordsByUserQuery } from '../../../Api/recordsApiSlice';
import PaginatedList from '../../../Api/Pagination/List';
import { Dimensions } from 'react-native';

const Home = ({ navigation, route }) => {
  const ref = useRef();
  const [selectedBarValue, setSelectedBarValue] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const screenHeight = Dimensions.get('window').height;
  const flatListHeight = screenHeight * 0.5; // Or 50%, 60% based on your need

  const recentPurchases = [
    { id: '1', name: 'Toyota Prius 2023', price: '200.00' },
    { id: '2', name: 'Suzuki Jimny', price: '999.00' },
    { id: '3', name: 'M.Benz', price: '850.00' },
  ];
  const barData = [
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'Jan',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'Feb',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'Mar',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'Apr',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'May',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'Jun',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
    {
      value: Math.floor(Math.random() * 50) + 50,
      label: 'Jul',
      frontColor: '#ffcbcb',
      labelTextStyle: {
        color: colors.text.dimBlack,
        fontSize: font.large,
        fontFamily: fonts.benzin.regular,
      },
    },
  ];

  const EmptySpendHeader = () => {
    return (
      <View>
        <CustomText
          text={'This Month You Spend'}
          size={font.xlarge}
          font={fonts?.benzin?.regular}
        />
        <CustomText
          text={'USD 00.00'}
          size={font.h5}
          font={fonts?.clash?.semibold}
        />
      </View>
    );
  };
  const EmptyRecordFound = () => {
    return (
      <View style={styles.recordfound}>
        <CustomText
          text={'No Record Found'}
          size={font.h5}
          font={fonts?.benzin?.regular}
        />
        <MainButtonWithGradient
          style={styles.submitButton}
          title={'Subscribe Now'}
          onPress={() => {
            navigation?.navigate(routes?.main?.subscriptionplan);
          }}
        />
      </View>
    );
  };
  const RecordSpendRender = () => {
    return (
      <ImageBackground
        source={appImages.wallet}
        style={{ padding: 25 }}
        borderRadius={10}>
        <View style={styles.banner}>
          <View>
            <CustomText
              text={'This Month You Spend'}
              size={font.medium}
              font={fonts.benzin.semibold}
              color={colors.text.dimBlack}
            />
            <CustomText
              text={'$200,00'}
              size={font.h5}
              font={fonts.clash.bold}
              color={colors.text.dimBlack}
            />
          </View>
          <View style={styles.coin}>
            <MyIcons name={'coin'} size={130} />
          </View>
        </View>
      </ImageBackground>
    );
  };
  const TransactionChartRender = () => {
    const [selectedPoint, setSelectedPoint] = useState(null);

    // Chart Data (Red + Gray)
    const data = [
      { value: 90, label: '1 MAR', dataPointColor: 'red' },
      { value: 50, label: '', dataPointColor: 'red' },
      { value: 70, label: '10', dataPointColor: 'red' },
      { value: 100, label: '', dataPointColor: 'red' },
      {
        value: 20,
        label: '15',
        dataPointColor: 'red',
        showTooltip: true,
        tooltipText: '+36.95%',
      }, // Tooltip
      { value: 90, label: '', dataPointColor: 'red' },
      { value: 170, label: '', dataPointColor: 'red' },
      { value: 100, label: '20', dataPointColor: 'red' },
      { value: 175, label: '', dataPointColor: 'red' },

      { value: 90, label: '25', dataPointColor: 'gray' },
      { value: 40, label: '', dataPointColor: 'gray' },
      { value: 100, label: '', dataPointColor: 'gray' },
      { value: 60, label: '30', dataPointColor: 'gray' },
    ];

    return (
      <View style={{ padding: 10 }}>
        {/* Title */}
        <CustomText
          text="Monthly Transactions"
          color={colors.text.dimBlack}
          font={fonts.benzin.regular}
          size={font.large}
        />
        <LineChart
          data={data}
          curved
          isAnimated
          thickness={3}
          // hideRules
          noOfSections={5}
          yAxisColor="transparent"
          xAxisColor="lightgray"
          yAxisTextStyle={{ color: 'gray' }}
          xAxisTextStyle={{ color: 'gray' }}
          maxValue={250}
          spacing={20}
          initialSpacing={3}
          color={'grey'}
          showDataPoint
          dataPointsWidth={6}
          startFillColor="rgba(255, 0, 0, 0.2)"
          endFillColor="rgba(255, 0, 0, 0.1)"
          startOpacity={0.3}
          endOpacity={0.1}
          pointerConfig={{
            showPointerStrip: true,
            pointerStripColor: 'gray',
            pointerLabelComponent: item =>
              item.showTooltip ? (
                <View
                  style={{
                    backgroundColor: 'red',
                    padding: 5,
                    borderRadius: 5,
                    elevation: 5,
                  }}>
                  <CustomText text={item.tooltipText} />
                </View>
              ) : null,
          }}
        />
      </View>
    );
  };
  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper function to get display text based on expense type
  const getDisplayText = (item) => {
    switch (item.type) {
      case 'PET':
        return {
          title: item.name || 'Pet Purchase',
          subtitle: `${item.specie} - ${item.breed}`,
        };
      case 'VEHICLE_SERVICE':
        return {
          title: item.description || 'Vehicle Service',
          subtitle: item.partBrand || 'N/A',
        };
      case 'GAS':
        return {
          title: 'Gas Refill',
          subtitle: `Date: ${formatDate(item.gasDate)}`,
        };
      case 'ACCIDENT':
        return {
          title: 'Accident',
          subtitle: item.location || 'N/A',
        };
      case 'EQUIPMENT':
        return {
          title: item.equipmentName || 'Equipment Purchase',
          subtitle: item.equipmentType || 'N/A',
        };
      case 'VET':
        return {
          title: 'Vet Visit',
          subtitle: item.details || 'N/A',
        };
      default:
        return {
          title: 'Expense',
          subtitle: 'N/A',
        };
    }
  };
  return (
    <>
      <CustomHeader
        routeName={routes?.tab.home}
        onIconPress={() => navigation.navigate(routes.main.notification)}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {/* {!isEmpty === true ? (
          <>
            {EmptySpendHeader && EmptySpendHeader()}
            {EmptyRecordFound && EmptyRecordFound()}
          </>
        ) : (
          <> */}

        {RecordSpendRender && RecordSpendRender()}
        {TransactionChartRender && TransactionChartRender()}
        <View style={styles.transheadercontainer}>
          <CustomText
            text="Recent Purchases"
            color={colors.text.dimBlack}
            size={font.large}
            font={fonts.clash.semibold}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.tab.records)}>
              <CustomText
                text="View Records"
                color={colors.text.red}
                font={fonts.benzin.semibold}
                size={font.small}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate(routes.tab.otherrecord)}>
              <CustomText
                text="View Other"
                color={colors.text.red}
                font={fonts.benzin.semibold}
                size={font.small}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      

      </ScrollView>
    </>
  );
};

export default Home;
