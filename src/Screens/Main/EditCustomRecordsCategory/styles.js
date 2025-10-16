import { StyleSheet } from 'react-native';
import { colors, font, spacing, vh, vw } from '../../../theme/styles';

export const styles = StyleSheet.create({
  // Common container styles
  container: {
    flex: 1,
    // backgroundColor: colors.background.white,
  },
  contentContainer: {
    padding: spacing.medium,
  },

  // Card container for ExpenseList and ExpenseDetails
  cardcontainer: {
    // backgroundColor: colors.background.white,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Border for separating items in ExpenseList and ExpenseDetails
  border: {
    height: 1,
    // backgroundColor: colors.text.blueGray,
    opacity: 0.2,
    marginVertical: spacing.small,
  },

  // Recent purchase container for ExpenseList items
  recentpurchase: {
    marginHorizontal: spacing.medium,
    marginVertical: spacing.xs,
  },

  // Header text for ExpenseDetails
  headerText: {
    marginBottom: spacing.small,
  },

  // Subheader text for ExpenseDetails (e.g., date)
  subHeaderText: {
    marginBottom: spacing.medium,
  },

  // Detail row for ExpenseDetails (key-value pairs)
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.xs,
  },

  labelText: {
    flex: 1,
  },

  valueText: {
    flex: 1,
    textAlign: 'right',
  },

  // Container for AddCustomRecord and EditCustomRecord form sections
  barcontainer: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    marginTop: spacing.medium
  },

  // Secondary container for form fields in AddCustomRecord and EditCustomRecord
  barcontainer1: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.large,
  },

  // Horizontal rule for separating sections
  hr: {
    height: 1,
    // backgroundColor: colors.text.blueGray,
    opacity: 0.2,
    marginVertical: spacing.medium,
  },

  // Add more button for text/date fields
  addmore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end',
    gap: 5,
    marginVertical: spacing.small,
    marginLeft: spacing.medium,
  },

  // Submit button for AddCustomRecord and EditCustomRecord
  submitButton: {
    marginTop: spacing.large,
    alignSelf: 'center',
    width: vw * 80,
    borderRadius: 8,
    paddingVertical: spacing.medium,
  },

  // Floating action button for ExpenseList (to navigate to AddCustomRecord)
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    // backgroundColor: colors.background.white,
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});