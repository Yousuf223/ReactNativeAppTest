import React from 'react';
import { View, ScrollView } from 'react-native';
import { font, spacing } from '../../../theme/styles'; // Your theme
import { colors } from '../../../theme/colors';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import CustomHeader from '../../../Components/CustomHeader';

// Helper function to format date
const formatDate = (dateString) => {
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    } catch (error) {
        return 'N/A';
    }
};

// Helper function to format currency
const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `$${Number(value).toFixed(2)}`;
};

// Helper function to format field value based on key
const formatFieldValue = (key, value) => {
    if (value === null || value === undefined || value === '') return null;
    // Fields that are likely dates
    const dateFields = ['date', 'purchaseDate', 'serviceDate', 'gasDate', 'accidentDate', 'checkupDate', 'createdAt', 'updatedAt'];
    // Fields that are likely currency
    const currencyFields = ['amount', 'price', 'partsCost', 'laborCost', 'warrantyPrice', 'repairPrice', 'payment', 'otherExpense'];

    if (dateFields.includes(key)) return formatDate(value);
    if (currencyFields.includes(key)) return formatCurrency(value);
    return String(value); // Convert to string for other types
};

// Helper function to create human-readable label
const formatLabel = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .replace('_', ' ') // Replace underscores with spaces
        .trim();
};

// Priority order for fields (to display important fields first)
const priorityFields = [
    'amount', 'price', 'date', 'purchaseDate', 'serviceDate', 'gasDate', 'accidentDate', 'checkupDate',
    'name', 'description', 'specie', 'breed', 'partBrand', 'equipmentName', 'equipmentType', 'location',
    'involvedDriverName', 'involvedDriverPhone', 'details', 'comment', 'veterinarianName', 'veterinarianPhone',
    'partsCost', 'laborCost', 'warrantyPrice', 'repairPrice', 'payment', 'otherExpense', 'createdAt', 'updatedAt'
];

const ExpenseDetails = ({ route }) => {
    const { item } = route.params; // Get item from navigation params

    // Get all fields from item, prioritizing important ones
    const fields = Object.keys(item)
        .filter(key => key !== '_id' && item[key] !== null && item[key] !== undefined && item[key] !== '') // Exclude _id and empty fields
        .sort((a, b) => {
            const aIndex = priorityFields.indexOf(a);
            const bIndex = priorityFields.indexOf(b);
            // Sort by priority (lower index = higher priority), or alphabetically if not in priority list
            if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });

    return (
        <>
            <CustomHeader title={item.type ? item.type.replace('_', ' ').toUpperCase() : 'EXPENSE'} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.cardcontainer}>
                    <CustomText
                        //   text={item.type ? item.type.replace('_', ' ').toUpperCase() : 'EXPENSE'}
                        text={'Details:'}
                        color={colors.text.blueGray}
                        size={font.large}
                        font={fonts.benzin.bold}
                        style={styles.headerText}
                    />
                    <CustomText
                        text={item.date ? formatDate(item.date) : 'N/A'}
                        color={colors.text.blueGray}
                        size={font.small}
                        font={fonts.benzin.regular}
                        style={styles.subHeaderText}
                    />
                    <View style={styles.border} />
                    {fields.map((key, index) => {
                        const value = formatFieldValue(key, item[key]);
                        if (!value) return null; // Skip null or empty values
                        return (
                            <View key={index} style={styles.detailRow}>
                                <CustomText
                                    text={`${formatLabel(key)}:`}
                                    color={colors.text.blueGray}
                                    size={font.medium}
                                    font={fonts.benzin.regular}
                                    style={styles.labelText}
                                />
                                <CustomText
                                    text={value}
                                    color={colors.text.blueGray}
                                    size={font.medium}
                                    font={fonts.benzin.regular}
                                    style={styles.valueText}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </>

    );
};

export default ExpenseDetails;

// Example styles (adjust to match your theme)
const localStyles = {
    container: {
        flex: 1,
        backgroundColor: colors.background.white,
    },
    contentContainer: {
        padding: spacing.medium,
    },
    cardcontainer: {
        backgroundColor: colors.background.white,
        borderRadius: 8,
        padding: spacing.medium,
        marginBottom: spacing.medium,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    headerText: {
        marginBottom: spacing.small,
    },
    subHeaderText: {
        marginBottom: spacing.medium,
    },
    border: {
        height: 1,
        backgroundColor: colors.text.blueGray,
        opacity: 0.2,
        marginVertical: spacing.small,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: spacing.xs,
    },
    labelText: {
        flex: 1,
    },
    valueText: {
        flex: 1,
        textAlign: 'right',
    },
};

// Merge with existing styles
const styles = { ...localStyles };