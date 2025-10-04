import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { appIcons } from '../../../../assets';
import AppBackground from '../../../../components/AppBackground';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';
import NavService from '../../../../helpers/NavService';
import { useDispatch } from 'react-redux';
import { colors } from '../../../../utils/colors';
import { addProduct } from '../../../../redux/actions/appAction';

const ProductDetail = ({ route }) => {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
const dispatch = useDispatch()
  useEffect(() => {
    if (route?.params?.item) {
      setItem(route.params.item);
    }
  }, [route]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const totalPrice = item ? (item.price * quantity) : '0.00';
  const handleAddToCart = () => {
    if (item) {
      const productData = {
        ...item,
        quantity: quantity,
      };
      dispatch(addProduct(productData));
    }
  };
  if (!item) {
    return (
      <AppBackground back cart title={'Cart'}>
        <Text>No item selected</Text>
      </AppBackground>
    );
  }
  return (
    <AppBackground
      titleStyle={styles.titleStyle}
      containerStyle={styles.containerStyle}
      onBack
      title={'Cart'}
      iconColor={colors.black}
      marginHorizontal={false}
      cart
    >
      <Image style={styles.productImage} source={{uri:item?.image}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
          <Text style={styles.itemPrice}>Rs{item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.dec}>{item?.description}</Text>
        <Text style={styles.totalText}>Total: Rs{totalPrice}</Text>
      </View>
      <CustomButton
        title="Add to cart"
        buttonStyle={styles.buttonStyle}
        textStyle={{ fontSize: 17 }}
        onPress={handleAddToCart}
      />
    </AppBackground>
  );
};

export default ProductDetail;