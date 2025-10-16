
import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { spacing } from '../../../theme/styles';
import { colors } from '../../../theme/colors';
import { useFetchMaintenanceAutopartsByUserQuery } from '../../../Api/mainteinanceAutopartsApiSlice';

const VehicleMaintenanceDetails = (props) => {
    const { id } = props?.route?.params;
    const [payload, setPayload] = useState({ page: 1, limit: 1000, vehicleId: id })
    const { data = [], isLoading, isError } = useFetchMaintenanceAutopartsByUserQuery(payload, { refetchOnMountOrArgChange: true, refetchOnFocus: true }); // Assuming id is vehicleId
    console.log('datadatadata', data);

    const maintenanceRecords = data?.docs || []// Filter by vehicleId
    console.log('maintenanceRecords', maintenanceRecords);

    return (
        <>
            <CustomHeader title="Vehicle Maintenance Details" />
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
                        {maintenanceRecords?.map((item, index) => (
                            <View key={item._id} style={styles.itemContainer}>
                                <CustomText
                                    text={`Vehicle: ${item.vehicle?.vehicleDetails?.make && item.vehicle?.vehicleDetails?.model
                                            ? `${item.vehicle.vehicleDetails.make} ${item.vehicle.vehicleDetails.model}`
                                            : 'N/A'
                                        }`}
                                    color={colors.text.black}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Part Brand: ${item.partBrand || 'N/A'}`}
                                    color={colors.text.black}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Enter Date: ${item.serviceDate
                                            ? new Date(item.serviceDate).toLocaleDateString()
                                            : 'N/A'
                                        }`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Description: ${item.description || 'N/A'}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Total Cost: $${item.totalMaintenanceCost || '0'}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Mileage: ${item.currentMileage || 'N/A'} miles`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                <CustomText
                                    text={`Warranty: ${item.warranty || 'N/A'}`}
                                    color={colors.text.grey}
                                    style={styles.itemText}
                                />
                                {item.warranty === 'YES' && (
                                    <CustomText
                                        text={`Warranty Expiration: ${item.warrantyExpiration
                                                ? new Date(item.warrantyExpiration).toLocaleDateString()
                                                : 'N/A'
                                            }`}
                                        color={colors.text.grey}
                                        style={styles.itemText}
                                    />
                                )}
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