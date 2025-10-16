import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { useFetchCategoriesQuery, useDeleteMutation, categoryApi } from '../../../Api/categoryApiSlice';
import { appImages } from '../../../Assets/Images';
import CustomCard from '../../../Components/CustomCard';
import CustomHeader from '../../../Components/CustomHeader';
import routes from '../../../Navigation/routes';
import { HEIGHT, vw } from '../../../theme/units';
import { addRecordData } from '../../../Utils/dummyData';
import { LOG } from '../../../Utils/helperFunction';
import ListShimmer from '../../../Components/Shimmers/ListShimmer';
import EmptyDataComponent from '../../../Components/EmptyDataComponent';
import { imageServer } from '../../../Api/configs';
import ModalComponent from '../../../Components/ModalComponent';
import { useDispatch } from 'react-redux';
import { executeApiRequest } from '../../../Api/methods/method';
const AddRecord = () => {
  const [customData, setCustomData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState('')

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {
    data,
    isLoading: categoryLoading,
    isFetching,
    error,
    refetch,
  } = useFetchCategoriesQuery({ refetchOnFocus: true, refetchOnReconnect:true });

  const [
    deleteCategory,
    { isLoading: deleteLoading, isError: deleteIsError, error: deleteError },
  ] = useDeleteMutation();

  LOG('customData', customData);

  LOG('data-data', data);

  useEffect(() => {
    if (data) {
      const converted = data.map((item, index) => ({
        id: item?._id,
        name: item.title,
        image: item?.gallery ? { uri: `${imageServer}${item?.gallery}` } : appImages?.autopartrecord,
        nav: routes.main.addDynamicCustomRecords,
        fields: item?.fields,
        hasAttachments: item?.hasAttachments,
      }));

      setCustomData(prev => [...converted, ...addRecordData]);
    }
  }, [data]);

  const handleDelete = async (id) => {
    console.log('ididid', id);

    try {
      if (id) {
        // await deleteCategory(id).unwrap();
        let result = await executeApiRequest({
          apiCallFunction: deleteCategory,
          toast: true,
          timeout: 30000,
          params: { id }
        });
        if (result) {
          refetch();
        }
        dispatch(categoryApi.util.resetApiState());
      }

    } catch (err) {
      LOG('Delete error:', err);
    }
  };



  return (
    <>
      <CustomHeader routeName={routes.tab.addrecords} />

      <FlatList
        style={{ marginBottom: HEIGHT * 0.05 }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          paddingBottom: HEIGHT * 0.12,
        }}
        ListEmptyComponent={
          categoryLoading ? (
            <View style={{ width: vw * 90 }}>
              <ListShimmer type={'card'} limit={5} />
            </View>
          ) : (
            <EmptyDataComponent message="No records found" />
          )
        }
        showsVerticalScrollIndicator={false}
        data={customData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item, index }) => {
          // console.log('itemmmmss', item);
          return (
            <CustomCard

              onEditPress={() => {
                console.log('ite,,,,,,,record', item)
                navigation.navigate(routes.main.editcustomrecordscategory, { item })
              }}
              addRecordCard={true}
              isEdit={item?.dummy}
              isDelete={item?.dummy}
              onDeletePress={() => setTimeout(() => {
                setModalVisible(true)
                setDeleteCategoryId(item?.id)

              }, 700)}
              item={item}
              onPress={() => {
                if (item?.dummy) {
                  navigation?.navigate(item?.nav);
                } else {
                  navigation?.navigate(item?.nav, {
                    dynamicFields: item,
                  });
                }
              }}
            />
          );
        }}
        numColumns={2}
      />
      <ModalComponent
        doublemodal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onPressCross={() => {
          setModalVisible(false);
          dispatch(categoryApi.util.resetApiState());
        }}
        message="Are you sure you want to delete this category?"
        buttonText1="No"
        buttonText="Yes"
        onButtonPress={() => {
          setModalVisible(false);
          handleDelete(deleteCategoryId)
          // dispatch(categoryApi.util.resetApiState());
          setTimeout(() => {
            // navigation?.goBack();
          }, 1000);
        }}
      />
    </>
  );
};

export default AddRecord;
