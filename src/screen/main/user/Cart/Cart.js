import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import CartItem from '../../../../components/cartItem'
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../../../redux/actions/appAction';
const Checkout = () => {
const dispatch = useDispatch()
    const cartItems = useSelector((state) => state?.appReducer?.cart || []);

    const onDeleteItem = (item) => {
        dispatch(removeProduct(item?.id));
    };


    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    const renderCartItem = ({ item, index }) => (
        <CartItem item={item} onDelete={() => onDeleteItem(item)} />
    );







    return (
        <AppBackground back title={'Cart'} marginHorizontal={false}>
            <View style={styles.container}>

                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: '20%' }}
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.totalText}>Total: Rs {totalPrice?.toFixed(2)}</Text>
                </View>
            </View>
        </AppBackground>
    );
};

export default Checkout;
