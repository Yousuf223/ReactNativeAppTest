import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {shimmerColors} from '../../theme/colors';
import {spacing} from '../../theme/styles';
import {vw} from '../../theme/units';

const ListShimmer = ({type, limit}) => {
  const renderShimmerV1 = () => {
    return (
      <View style={styles.shimmerRow}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={{
            height: vw * 20,
            width: vw * 20,
            borderRadius: vw * 2,
            marginRight: spacing.small,
          }}
          shimmerColors={shimmerColors}
        />
        <View style={{flex: 1}}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{height: vw * 4, marginBottom: vw * 2, borderRadius: vw * 2}}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{height: vw * 4, width: vw * 40, borderRadius: vw * 2}}
            shimmerColors={shimmerColors}
          />
        </View>
      </View>
    );
  };

  const renderShimmerV2 = ({item, index}) => {
    return (
      <View style={styles.shimmerRow}>
        {(index === 0 || (index - 3) % 4 === 0) && (
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: vw * 10,
              width: vw * 10,
              borderRadius: vw * 2,
              marginRight: spacing.small,
            }}
            shimmerColors={shimmerColors}
          />
        )}
        <View
          style={{
            flex: 1,
            marginLeft: !(index === 0 || (index - 3) % 4 === 0) && vw * 12,
          }}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{height: vw * 4, marginBottom: vw * 2, borderRadius: vw * 2}}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{height: vw * 4, width: vw * 40, borderRadius: vw * 2}}
            shimmerColors={shimmerColors}
          />
        </View>
      </View>
    );
  };

  const renderShimmerV3 = () => {
    return (
      <View style={styles.shimmerRowV3}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={{
            height: vw * 4,
            width: vw * 18,
            borderRadius: vw * 2,
            marginBottom: spacing.small,
          }}
          shimmerColors={shimmerColors}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={{
            height: vw * 30,
            width: vw * 30,
            borderRadius: vw * 2,
            marginRight: spacing.small,
          }}
          shimmerColors={shimmerColors}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={{
            height: vw * 14,
            width: vw * 70,
            borderRadius: vw * 2,
            marginTop: spacing.small,
          }}
          shimmerColors={shimmerColors}
        />
      </View>
    );
  };

  const renderShimmerV4 = () => {
    return (
      <View style={styles.shimmerCardRow}>
        {/* Card 1 */}
        <View style={styles.card}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: 150, // Approx 150px height
              width: '100%',
              borderRadius: vw * 2,
              marginBottom: spacing.small,
            }}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: vw * 4,
              width: '80%',
              borderRadius: vw * 2,
            }}
            shimmerColors={shimmerColors}
          />
        </View>
        {/* Card 2 */}
        <View style={styles.card}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: 150, // Approx 150px height
              width: '100%',
              borderRadius: vw * 2,
              marginBottom: spacing.small,
            }}
            shimmerColors={shimmerColors}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              height: vw * 4,
              width: '80%',
              borderRadius: vw * 2,
            }}
            shimmerColors={shimmerColors}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        gap: spacing.small,
        paddingHorizontal: type === 'word' ? 0 : spacing.large,
      }}
      data={Array(Math.ceil((limit || 8) / 2)).fill(0)} // Divide limit by 2 since each item renders 2 cards
      renderItem={
        type === 'default'
          ? renderShimmerV1
          : type === 'word'
          ? renderShimmerV3
          : type === 'card'
          ? renderShimmerV4
          : renderShimmerV2
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ListShimmer;

const styles = StyleSheet.create({
  shimmerRow: {
    flexDirection: 'row',
    padding: spacing.small,
    backgroundColor: '#FBFBFC',
    borderRadius: vw * 2,
    marginBottom: spacing.small,
  },
  shimmerRowV3: {
    flexDirection: 'column',
    padding: spacing.small,
    backgroundColor: '#FBFBFC',
    borderRadius: vw * 2,
  },
  shimmerCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.small,
    backgroundColor: '#FBFBFC',
    borderRadius: vw * 2,
    marginBottom: spacing.small,
  },
  card: {
    width: '48%', // Approximately half the row width, accounting for spacing
    backgroundColor: '#FFFFFF',
    borderRadius: vw * 2,
    padding: spacing.small,
    // elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
