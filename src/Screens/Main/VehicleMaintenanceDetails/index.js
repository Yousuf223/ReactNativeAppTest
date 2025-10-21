
import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { spacing } from '../../../theme/styles';
import { colors } from '../../../theme/colors';
import { useFetchPartByUserQuery } from '../../../Api/partApi';

const VehicleMaintenanceDetails = (props) => {
    const { id } = props?.route?.params;
    const [payload, setPayload] = useState({ page: 1, limit: 1000, vehicleId: id })
    const { data = [], isLoading, isError } = useFetchPartByUserQuery(payload, { refetchOnMountOrArgChange: true, refetchOnFocus: true }); // Assuming id is vehicleId
    console.log('datadatadata', data);

    const maintenanceRecords = data || []// Filter by vehicleId
    console.log('maintenanceRecords', maintenanceRecords);

    return (
        <>
            <CustomHeader title="Part Detail" />
            <ScrollView contentContainerStyle={styles.container}>

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <CustomText text="Loading..." color={colors.text.black} />
                    </View>
                )}

                {isError && (
                    <View style={styles.errorContainer}>
                        <CustomText text="Error fetching data" color={colors.text.red} />
                    </View>
                )}

                {maintenanceRecords?.length > 0 ? (
                    <View style={styles.dataContainer}>
                        {maintenanceRecords?.map((item) => (
                            <View key={item._id} style={styles.itemContainer}>
                                <CustomText
                                    text={`Part Name: ${item.name || 'N/A'}`}
                                    color={colors.text.black}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`For What: ${item.forWhat || 'N/A'}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Store: ${item.storeName || 'N/A'}, ${item.storeAddress || ''}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Price: $${item.price || '0'}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Warranty: ${item.warranty || 'N/A'}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Purchase Date: ${item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'N/A'
                                        }`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                            </View>
                        ))}

                    </View>
                ) : (
                    !isLoading && (
                        <View style={styles.noDataContainer}>
                            <CustomText text="No maintenance records found" color={colors.text.grey} />
                        </View>
                    )
                )}
            </ScrollView>
        </>
    );
};

export default VehicleMaintenanceDetails;

const styles = StyleSheet.create({
    container: {
        gap: 10,
        paddingBottom: 20,
    },
    headerContainer: {
        paddingHorizontal: spacing.medium,
    },
    loadingContainer: {
        alignItems: 'center',
        padding: spacing.medium,
    },
    errorContainer: {
        alignItems: 'center',
        padding: spacing.medium,
    },
    dataContainer: {
        paddingHorizontal: spacing.medium,
        gap: 15,
    },
    itemContainer: {
        backgroundColor: colors.background.light,
        padding: spacing.medium,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.border.color_1,
    },
    itemText: {
        marginBottom: 5,
    },
    noDataContainer: {
        alignItems: 'center',
        padding: spacing.medium,
    },
});