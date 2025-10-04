import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { appIcons } from '../../../../assets';
import AppBackground from '../../../../components/AppBackground';
import ProductCard from '../../../../components/Card';
import CustomTextInput from '../../../../components/CustomTextInput';
import NavService from '../../../../helpers/NavService';
import styles from './styles';
import { API } from "../../../../api/index";
import { loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { useDispatch } from 'react-redux';


const Home = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch()
  const getProducts = async () => {
    try {
      dispatch(loaderStart())
      const res = await API.getAllProducts();
      if (res?.data) {
        setProducts(res?.data)
      }
      console.log('sadsadf', res?.data)
    } catch (err) {
      console.error(err);

    } finally {
      dispatch(loaderStop())
    }
  };

  const getCategories = async () => {
    try {
      const res = await API.categories();
      if (res?.data) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (search.trim() !== "") {
      temp = temp.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      temp = temp.filter((item) => item.category === selectedCategory);
    }

    setFilteredProducts(temp);
  }, [search, selectedCategory, products]);


  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item && { backgroundColor: "#ddd" },
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item ? null : item)
      }
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );
  const renderProductCard = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() => NavService.navigate("ProductDetail", { item })}
    />
  );





  return (
    <AppBackground menu title={'Home'} cart marginHorizontal={false}>
      <View style={styles.container} >
        <CustomTextInput
          leftIcon={appIcons.search}
          placeholder={'Search'}
          value={search}
          keyboardType={'email-address'}
          onChangeText={setSearch}
          maxLength={35}
          containerStyle={styles.containerStyle}
        />
      </View>
      <View style={styles.outerConatiner}>
        <View style={styles.addCard}>
          <Text style={styles.addText}>Get 40% discount on your first order from app</Text>
        </View>
        <Text style={styles.title}>Categories</Text>
        <View>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
        <Text style={styles.title}>Shops</Text>


        <FlatList
          data={filteredProducts}
          key={'products'}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.rowStyle}
          contentContainerStyle={styles.flatListContainer}
        />
        <View style={{ marginBottom: "12%" }}>
        </View>

      </View>
    </AppBackground>
  );
};

export default Home;
