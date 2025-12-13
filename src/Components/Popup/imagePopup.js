import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';
import Modal from 'react-native-modal';
import { vh, vw } from '../../theme/units';
import { getImageUrl } from '../../Utils/helperFunction'
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('screen');
const ImagePopup = ({
  isVisible,
  images,
  setIsFavorite
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsFavorite(false)}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      backdropOpacity={0.8}
    >
      <View style={{ height: height * 0.488 ,width:'100%'}}>
        <FlatList
          data={images?.gallery}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const img = getImageUrl(item);
            return (
              <View
                style={{
                  width: width - 36,
                  height: height * 0.420,
                  overflow: 'hidden',
                  borderRadius: 10,
                  backgroundColor:'#fff',
                  // marginHorizontal:10
                }}
              >
                <FastImage
                  source={{
                    uri: typeof img === 'string' ? img : img?.uri
                  }}
                  style={{
                    width: '100%',
                    height: height * 0.410,
                  }}
                  
                  // resizeMode="cover"
                />
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ImagePopup;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
    gap: vh * 2,
    borderRadius: 10,
    // marginHorizontal:20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
















