import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appShadow, colors} from '../../theme/colors';
import MultiTabbar from '../Tabs/MultiTabbar';
import Graph from '../Graph';
import CustomText from '../wrappers/Text/CustomText';
import fonts from '../../Assets/fonts';
import {font, spacing} from '../../theme/styles';
import {vw} from '../../theme/units';

const GraphView = ({tabData, data1, data2, onTabPress}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#24262B',
        padding: 20,
        borderRadius: 20,
        alignItems: 'flex-start',
        ...appShadow,
      }}>
      <MultiTabbar
        labels={tabData}
        activeBgColor={'#676C75'}
        onPress={onTabPress}
      />
      <View
        style={{
          width: '100%',
          overflow: 'hidden',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Graph data={data1} data2={data2} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <CustomText
          text="3000 Total"
          font={fonts?.clash?.semibold}
          size={font?.xxlarge}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing?.small,
          }}>
          <View
            style={{
              width: vw * 3,
              height: vw * 3,
              borderRadius: 50,
              backgroundColor: colors?.graph?.secondary,
            }}
          />
          <CustomText
            text="Current"
            font={fonts?.clash?.regular}
            size={font?.medium}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing?.small,
          }}>
          <View
            style={{
              width: vw * 3,
              height: vw * 3,
              borderRadius: 50,
              backgroundColor: colors?.graph?.primary,
            }}
          />
          <CustomText
            text="Previous"
            font={fonts?.clash?.regular}
            size={font?.medium}
          />
        </View>
      </View>
    </View>
  );
};

export default GraphView;

const styles = StyleSheet.create({});
