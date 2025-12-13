import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import { spacing } from '../../../theme/styles';
import { colors } from '../../../theme/colors';
import { useFetchPartByUserQuery } from '../../../Api/partApi';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getImageUrl } from '../../../Utils/helperFunction';

const { width: screenWidth } = Dimensions.get('window');

// Move ImageViewer component outside to avoid hook order issues
const ImageViewer = ({ visible, images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!visible || !images || images.length === 0) return null;

    const handleSwipe = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / screenWidth);
        setCurrentIndex(newIndex);
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
        >
            <View style={styles.imageViewerOverlay}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Icon name="close" size={30} color={colors.text.white} />
                </TouchableOpacity>
                
                <ScrollView 
                    horizontal 
                    pagingEnabled 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imageViewerContainer}
                    onMomentumScrollEnd={handleSwipe}
                    initialScrollIndex={initialIndex}
                >
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageViewerItem}>
                            <Image 
                                source={{ uri: image }} 
                                style={styles.fullSizeImage}
                                resizeMode="contain"
                            />
                        </View>
                    ))}
                </ScrollView>
                
                <View style={styles.imageCounter}>
                    <CustomText 
                        text={`${currentIndex + 1} / ${images.length}`} 
                        color={colors.text.white}
                        style={styles.counterText}
                    />
                </View>
            </View>
        </Modal>
    );
};

// Move ImageGrid component outside as well
const ImageGrid = ({ images, onImagePress }) => {
    // if (!images || images.length === 0) return null;

    // const displayedImages = images.slice(0, 4);
    // const remainingCount = images.length - 4;
    return (
        <View style={styles.imageGrid}>
            {images.map((imageUrl, index) => {
                return (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.imageGridItem,
                            images.length === 1 && styles.singleImage,
                            images.length === 2 && styles.doubleImage,
                            images.length === 3 && index === 0 && styles.threeImageFirst,
                            images.length === 3 && index > 0 && styles.threeImageRest,
                            images.length >= 4 && styles.fourImage,
                        ]}
                        onPress={() => onImagePress(index)}
                    >
                        <Image 
                            source={{ uri:  `https://api.partslogger.com/uploads/${imageUrl}` }} 
                            style={styles.gridImage}
                            resizeMode="cover"
                        />
                        {index === 3 && remainingCount > 0 && (
                            <View style={styles.remainingOverlay}>
                                <CustomText 
                                    text={`+${remainingCount}`} 
                                    color={colors.text.white}
                                    style={styles.remainingText}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const VehicleMaintenanceDetails = (props) => {
    const { id } = props?.route?.params;
    console.log('idid',id)
    const [payload, setPayload] = useState({ page: 1, limit: 1000, vehicleId: id });
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { data = [], isLoading, isError } = useFetchPartByUserQuery(payload, { 
        refetchOnMountOrArgChange: true, 
        refetchOnFocus: true 
    });

    const maintenanceRecords = data || [];

    const handleImagePress = (images, index) => {
        setSelectedImages(images);
        setSelectedImageIndex(index);
        setImageViewerVisible(true);
    };

    const handleCloseImageViewer = () => {
        setImageViewerVisible(false);
        setSelectedImages([]);
        setSelectedImageIndex(0);
    };

    return (
        <>
            <CustomHeader title="Part Details" />
            <ScrollView contentContainerStyle={styles.container}>
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <Icon name="refresh" size={24} color={colors.primary} />
                        <CustomText text="Loading..." color={colors.text.black} style={styles.loadingText} />
                    </View>
                )}

                {isError && (
                    <View style={styles.errorContainer}>
                        <Icon name="error-outline" size={24} color={colors.text.red} />
                        <CustomText text="Error fetching data" color={colors.text.red} style={styles.errorText} />
                    </View>
                )}

                {maintenanceRecords?.length > 0 ? (
                    <View style={styles.dataContainer}>
                        {maintenanceRecords?.map((item) => (
                            console.log('itemitemitem',item),
                            <View key={item._id} style={styles.itemContainer}>
                                {/* Header Section */}
                                <View style={styles.headerSection}>
                                    <View style={styles.titleSection}>
                                        <CustomText
                                            text={item.name || 'Unnamed Part'}
                                            color={colors.text.black}
                                            style={styles.partName}
                                            fontWeight="bold"
                                        />
                                        {item.price && (
                                            <View style={styles.priceBadge}>
                                                <CustomText
                                                    text={`$${item.price}`}
                                                    color={colors.text.white}
                                                    style={styles.priceText}
                                                />
                                            </View>
                                        )}
                                    </View>
                                    <CustomText
                                        text={item.forWhat || 'General Maintenance'}
                                        color={colors.primary}
                                        style={styles.forWhatText}
                                    />
                                </View>

                                {/* Images Section */}
                                {item.gallery && item.gallery.length > 0 && (
                                    <View style={styles.imagesSection}>
                                        <CustomText
                                            text="Part Images:"
                                            color={colors.text.grey}
                                            style={styles.sectionLabel}
                                        />
                                        <ImageGrid 
                                            images={item.gallery} 
                                            onImagePress={(index) => handleImagePress(item.images, index)}
                                        />
                                    </View>
                                )}

                                {/* Details Section */}
                                <View style={styles.detailsSection}>
                                    <View style={styles.detailRow}>
                                        <Icon name="store" size={16} color={colors.text.grey} />
                                        <CustomText
                                            text={`${item.storeName || 'Unknown Store'}${item.storeAddress ? `, ${item.storeAddress}` : ''}`}
                                            color={colors.text.grey}
                                            style={styles.detailText}
                                        />
                                    </View>

                                    {item.warranty && (
                                        <View style={styles.detailRow}>
                                            <Icon name="verified-user" size={16} color={colors.text.grey} />
                                            <CustomText
                                                text={`Warranty: ${item.warranty}`}
                                                color={colors.text.grey}
                                                style={styles.detailText}
                                            />
                                        </View>
                                    )}

                                    {item.purchaseDate && (
                                        <View style={styles.detailRow}>
                                            <Icon name="event" size={16} color={colors.text.grey} />
                                            <CustomText
                                                text={`Purchased: ${new Date(item.purchaseDate).toLocaleDateString()}`}
                                                color={colors.text.grey}
                                                style={styles.detailText}
                                            />
                                        </View>
                                    )}

                                    {item.installedDate && (
                                        <View style={styles.detailRow}>
                                            <Icon name="build" size={16} color={colors.text.grey} />
                                            <CustomText
                                                text={`Installed: ${new Date(item.installedDate).toLocaleDateString()}`}
                                                color={colors.text.grey}
                                                style={styles.detailText}
                                            />
                                        </View>
                                    )}
                                </View>

                                {/* Additional Notes */}
                                {item.notes && (
                                    <View style={styles.notesSection}>
                                        <CustomText
                                            text="Notes:"
                                            color={colors.text.black}
                                            style={styles.notesLabel}
                                        />
                                        <CustomText
                                            text={item.notes}
                                            color={colors.text.grey}
                                            style={styles.notesText}
                                        />
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                ) : (
                    !isLoading && (
                        <View style={styles.noDataContainer}>
                            <Icon name="inventory-2" size={48} color={colors.text.grey} />
                            <CustomText 
                                text="No maintenance records found" 
                                color={colors.text.grey} 
                                style={styles.noDataText}
                            />
                        </View>
                    )
                )}
            </ScrollView>

            {/* Image Viewer Modal */}
            <ImageViewer 
                visible={imageViewerVisible}
                images={selectedImages}
                initialIndex={selectedImageIndex}
                onClose={handleCloseImageViewer}
            />
        </>
    );
};

export default VehicleMaintenanceDetails;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        padding: spacing.large,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loadingText: {
        marginLeft: spacing.small,
    },
    errorContainer: {
        alignItems: 'center',
        padding: spacing.large,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    errorText: {
        marginLeft: spacing.small,
    },
    dataContainer: {
        paddingHorizontal: spacing.medium,
        gap: 15,
    },
    itemContainer: {
        backgroundColor: colors.background.light,
        padding: spacing.medium,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.border.color_1
    },
    headerSection: {
        marginBottom: spacing.medium,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.small,
    },
    partName: {
        fontSize: 18,
        flex: 1,
        marginRight: spacing.small,
    },
    priceBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.small,
        paddingVertical: 4,
        borderRadius: 12,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    forWhatText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    imagesSection: {
        marginBottom: spacing.medium,
    },
    sectionLabel: {
        fontSize: 14,
        marginBottom: spacing.small,
        fontWeight: '500',
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    imageGridItem: {
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.background.grey,
    },
    singleImage: {
        width: '100%',
    },
    doubleImage: {
        width: '48%',
    },
    threeImageFirst: {
        width: '100%',
        height: 120,
    },
    threeImageRest: {
        width: '48%',
    },
    fourImage: {
        width: '48%',
        flexBasis: '48%',
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    remainingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    remainingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsSection: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.small,
    },
    detailText: {
        fontSize: 14,
        flex: 1,
    },
    notesSection: {
        marginTop: spacing.medium,
        paddingTop: spacing.medium,
        borderTopWidth: 1,
        borderTopColor: colors.border.color_1,
    },
    notesLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: spacing.small,
    },
    notesText: {
        fontSize: 14,
        lineHeight: 20,
    },
    noDataContainer: {
        alignItems: 'center',
        padding: spacing.large,
        flex: 1,
        justifyContent: 'center',
    },
    noDataText: {
        marginTop: spacing.medium,
        fontSize: 16,
    },
    // Image Viewer Styles
    imageViewerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1001,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
    },
    imageViewerContainer: {
        alignItems: 'center',
    },
    imageViewerItem: {
        width: screenWidth,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullSizeImage: {
        width: '100%',
        height: '100%',
    },
    imageCounter: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
        borderRadius: 20,
    },
    counterText: {
        fontSize: 14,
    },
});