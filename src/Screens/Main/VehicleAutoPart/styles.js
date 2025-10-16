import { StyleSheet } from "react-native";
import { spacing } from "../../../theme/styles";
import { vh } from "../../../theme/units";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.large,
        alignItems: 'center',
        marginTop: vh * 2,
    },
})