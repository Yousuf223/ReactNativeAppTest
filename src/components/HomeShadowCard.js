import React from 'react'
import { View, TouchableOpacity, Image, Text,StyleSheet } from 'react-native'
import { colors } from '../utils/colors'
import { appIcons } from '../assets'

const HomeShadowCard = ({onPress,item}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.pointCard}>
            {/* <ImageBackground source={appIcons.shadow} > */}
            <Image style={styles.strike} source={appIcons.strike} />
            <View style={{marginLeft:6}}>
                <Text style={styles.name}>{item?.badgesCount} Honor Badges</Text>
                <Text style={styles.dec}>Earn {7 - item?.badgesCount} more badges for next level</Text>
            </View>
            <Text style={styles.level}>Level {item?.UserLevelPoints?.level}</Text>
            {/* </ImageBackground> */}

        </TouchableOpacity>
    )
}

export default HomeShadowCard

const styles = StyleSheet.create({
    strike:{
        width:102,height:102,
        resizeMode:"contain"
      },
      pointCard:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:'#ffffff20',
        borderRadius:7,
        borderColor:colors.border,
        borderWidth:0.8,marginTop:19,
        width:"100%",
        paddingVertical:10,
        paddingLeft:10
      },
      name:{
        color:colors.white,
        fontWeight:"600",
        fontSize:11
      },
      dec:{
        color:colors.secondary,
        fontSize:11,
        paddingTop:6
      },
      linear:{
        width:70,
        height:30,
        alignItems:"center",
        justifyContent: 'center',
        borderRadius:20,
        position:"absolute",top:15,
        right:12
      },
      level:{
        color:colors.white,
        fontSize:12,
        fontWeight:'500'
      }
})
