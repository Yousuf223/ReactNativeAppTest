
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { appIcons } from '../assets';
import NavService from '../helpers/NavService';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('screen');

const ItemCard = ({ onPress, item, cardStyle }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=> NavService.navigate('Cart',{
        item
      })}
      style={[styles.card, cardStyle]}
    >
      <Image source={appIcons.post1} style={styles?.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.shopName}>{item?.name}</Text>
        {/* <Text style={styles.shopAddress}>{item?.address}</Text> */}

        <View style={styles.bottomRow}>
          <Text style={styles.rating}>Price: <Text style={{color:colors.primary}}>Rs{item?.price}</Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

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
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  shopAddress: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    fontSize: 13,
    color: colors.black,
    fontWeight:'500'
  },
});

