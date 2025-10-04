import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
    // flex: 1,
    // alignItems: 'center',
    width: '92%',
    alignSelf:'center'
  },
    titleStyle:{
    color:colors.black,
    fontWeight:600,
    fontSize:16,

  },
  productImage: {
    width:'100%',
    height:230,
    // resizeMode:'contain',
    borderBottomLeftRadius:16,
    borderBottomRightRadius:16
},
  containerStyle:{
    flex :1,
    backgroundColor:colors.white
  },
    itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal:20,paddingVertical:10
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color:colors.black
  },
  itemPrice: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  dec:{
    color:colors.black,
    fontWeight:'400',
    fontSize:12,
    lineHeight:18,paddingVertical:10
  },
  buttonStyle:{
    borderRadius: 10,
    alignSelf:'center',
    width:'92%',
    position:'absolute',
    bottom:26
  }
});
export default styles;











