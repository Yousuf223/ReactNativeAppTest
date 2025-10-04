
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
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('screen');

const CartItem = ({ onPress, cardStyle, onDelete, item }) => {
    const [like, setLike] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch()
    const increaseQty = () => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } });
    };

    const decreaseQty = () => {
        if (item.quantity > 1) {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } });
        }
    };

    return (
        <View style={[styles.card, cardStyle]}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                <Image source={{ uri: item?.image }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text numberOfLines={2}
                    ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Rs. {Number(item?.price).toFixed(2)}</Text>

                <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={decreaseQty} style={styles.qtyBtn}>
                        <Ionicons name="remove" size={17} color="#333" />
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity}</Text>

                    <TouchableOpacity onPress={increaseQty} style={styles.qtyBtn}>
                        <Ionicons name="add" size={17} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.actionContainer}>

                <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.7} onPress={onDelete} style={{ marginTop: 12 }}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        backgroundColor: '#fff',
        width: '92%',
        margin: 8,
        marginBottom: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: 'center',
        padding: 12,
    },
    image: {
        width: 90,
        height: 80,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',

    },
    price: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.primary,
        marginVertical: 4,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 1.5,
        alignSelf: 'flex-start',
    },
    qtyBtn: {
        padding: 4,
    },
    qtyText: {
        fontSize: 13,
        fontWeight: '500',
        marginHorizontal: 8,
        color: '#000',
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

});

