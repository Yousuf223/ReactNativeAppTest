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
  outerConatiner:{
    backgroundColor:colors.white,
    flex:1,
    borderTopLeftRadius:24,
    borderTopRightRadius:24,
    paddingHorizontal:20,
    top:10
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
  addImage:{
    width:120,
    height:120
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
    height:50,
    marginHorizontal:10,
    justifyContent:'center'
  },
  emojiIcon: {
    fontSize: 30,
  },
  categoryText: {
    // marginTop: 8,
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
});
export default styles;
