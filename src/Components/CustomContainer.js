import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { appShadow, colors } from '../theme/colors';
import { vw } from '../theme/units';

const { width, height } = Dimensions.get('screen');

const CustomContainer = ({ children, children2, bgImage, customBgStyles, customItemStyles, noImage, bannerStyle, secondContainer = false, styleSecond }) => {
    return (
        <>
            {noImage ?
                <View style={[styles.bannerContainer, bannerStyle]} />
                :
                <View style={styles.bannerContainer}>
                    <Image style={[styles.image, customBgStyles]} source={bgImage} resizeMode='cover' />
                </View>
            }
            <View style={[styles.itemsContainer, customItemStyles]}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,

                    }}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: height * 0.1 }}>

                        {children}
                    </View>
                </ScrollView>
                {secondContainer &&

                    <View style={[styles?.secondContainerStyles, styleSecond]}>
                        {children2}
                    </View>
                }
            </View>
        </>
    );
};

export default CustomContainer;

const styles = StyleSheet.create({
    itemsContainer: {
        backgroundColor: colors?.theme?.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        zIndex: 1,
        flex: 1,
        marginTop: -height * 0.035,
        paddingTop: 10

    },
    bannerContainer: {
        height: height / 2.29,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: -height * 0.02,


    },
    image: {
        width: '100%',
        height: '100%',
    },
    secondContainerStyles: {
        width: '100%',
        height: height * 0.12,
        backgroundColor: colors?.theme?.white,
        ...appShadow,
        position: 'absolute',
        bottom: 0, 
        justifyContent: 'center', 
        paddingHorizontal: vw*5, 
        borderWidth: 1, 
        borderColor: '#EFECEC'
    }
});
