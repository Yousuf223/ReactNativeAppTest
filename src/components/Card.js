
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { appIcons } from '../assets';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('screen');

const ProductCard = ({ onPress, item, cardStyle }) => {
  const [like, setLike] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, cardStyle]}
    >
      <Image source={{uri:item?.image}} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text   numberOfLines={3}
  ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
     

        <View style={styles.bottomRow}>
             <Text style={styles.price}>Rs:{item.price}</Text>
                  <Text style={styles.rating}>⭐ {item.rating?.rate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    width: width / 2.4,
    margin: 8,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    

  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 12,
    color: colors.lightGray2,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    fontSize: 13,
    color: '#f1c40f',
  },
});

