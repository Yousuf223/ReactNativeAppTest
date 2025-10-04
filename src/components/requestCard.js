import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appIcons } from '../assets';
import { colors } from '../utils/colors';

export default function RequestCard() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.userImage} source={appIcons.userPlaceholder} />
                <Text style={styles.title}>
                    Jos Butler
                </Text>
            </View>
            <Text style={styles.number}>08923872743</Text>
            <Text style={styles.description}>RanchoreLine Karachi, Pakistan</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-around',marginTop:13}}>
                <TouchableOpacity style={styles.acceptButton}>
                    <Text style={{color:colors.white}}>Accept</Text>
                </TouchableOpacity>
                   <TouchableOpacity style={styles.rejectButton}>
                    <Text style={{color:colors.white}}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 6
    },
    description: {
        color: colors.black,
        fontSize: 14,
        paddingLeft:10
    },
    number: {
        color: colors.black,
        fontSize: 14,
        paddingLeft:10,
        paddingTop:8
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.secondary
    },
    acceptButton:{
        backgroundColor:colors.primary,
        borderRadius:30,
        width:100,
        height:35,
        justifyContent:'center',
        alignItems:'center'
    },
    rejectButton:{
        backgroundColor:colors.black,
        borderRadius:30,
        width:100,
        height:35,
        justifyContent:'center',
        alignItems:'center'
    }
});