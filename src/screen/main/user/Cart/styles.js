import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
    width: '98%',
    alignSelf:'center',
    backgroundColor:colors.white,
    height:height*0.9,
    borderTopLeftRadius:14,
    borderTopRightRadius:14,
    top:10
  },
  outerConatiner:{
    backgroundColor:colors.white,
    flex:1,
    borderTopLeftRadius:24,
    borderTopRightRadius:24,
    paddingHorizontal:20,
    marginTop:1,
    bottom:-10
  },
  containerStyle:{
    width:'100%',
    backgroundColor:colors.white,
    borderRadius:40,
    borderWidth:0
  },
  addCard:{
    backgroundColor:colors.primary,
    marginTop:20,
    flexDirection:'row',
    borderRadius:12,
    marginBottom:10,
    paddingHorizontal:16
  },
  image:{
    width:58,
    height:58,
    borderRadius:30
  },
  addText:{
    fontSize:19,
    color:colors.white,
    paddingVertical:17
  },
  title:{
    color:colors.black,
    fontWeight:600,
    fontSize:16,
    marginTop:8
  },
  Categories:{
    fontWeight:600,
    fontSize:16,
    marginTop:8,
    color:colors.primary,
    paddingHorizontal:20,
    marginTop:10
    
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  categoryCard: {
    width: 120,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 15,
    height: 50,
    marginHorizontal: 10
  },
  card:{
    width:'90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    alignSelf:'center',
    flexDirection:'row',
    paddingHorizontal:10,
    justifyContent:"space-between"
  },

  emojiIcon: {
    fontSize: 30,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  flatListContainer: {
    paddingVertical:7,
  
  },
  rowStyle: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 4,
},

totalText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#222',
},

checkoutBtn: {
  backgroundColor: '#4CAF50',
  paddingVertical: 12,
  paddingHorizontal: 18,
  borderRadius: 8,
},

});
export default styles;
