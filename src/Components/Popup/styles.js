import { appShadow, colors } from '../../theme/colors';
import { font, spacing } from '../../theme/styles';
import { vh, vw } from '../../theme/units';

import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    blur: {
        height: 100 * vh,
        width: 100 * vw,
    },
    contentContainer: {
        backgroundColor: colors.theme.white,
        width: vw * 75,
        paddingVertical: vh * 1.5,
        borderRadius: vh * 1.75,
        position: 'absolute',
        alignItems: 'center',
        // height: vh * 50,
        // bottom: 0,
        // borderTopEndRadius: vh * 4,
        // borderTopStartRadius: vh * 4,
        ...appShadow,
        elevation: 16
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdropContainer: {
        height: 100 * vh,
        width: 100 * vw,
        backgroundColor: colors.theme.black + '50',
        // position: 'absolute',
        // top: 0,
        // left: 0,
    },
    cross: {
        height: vh * 1.25,
        width: vh * 1.25
    },
    crossContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        paddingRight: vw * 2.5,
        marginBottom: spacing.medium
    },
    headerText: {
        color: colors.text.primary,
        fontSize: font.xlarge
    },
    headerContainer: {
        justifyContent: 'space-between',
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.medium
    },
    pill: {
        alignSelf: 'center',
        height: vh * 0.5,
        width: vw * 8,
        marginTop: spacing.xsmall,
        borderRadius: vh * 1,
        backgroundColor: colors.text.altGrey + '45'
    },
    image: {
        resizeMode: 'contain',
        height: vh * 7,
        width: vh * 7,
        marginBottom: spacing.small
    },
    successBtnTitle: {
        width: vw * 22,
        height: vh * 5,
        marginBottom: spacing.xlarge
    },
    noBtnTitle: {
        width: vw * 22,
        height: vh * 5,
        marginBottom: spacing.xlarge,
        backgroundColor: colors.background.header,
        marginLeft: spacing.mediumh
    },
    title: {
        color: colors.text.dimBlack,
        fontSize: font.medium,
        marginBottom: spacing.medium
    },
    subTitle: {
        width: '70%',
        textAlign: 'center',
        fontSize: font.small,
        lineHeight: vh * 2.5,
        marginBottom: spacing.medium
    },
    reasonInput: {
        fontSize: font.xsmall,
        borderWidth: 1,
        width: '70%',
        borderRadius: vh * 1,
        height: Platform.OS == 'ios' ? vh * 12 : null,
        borderColor: colors.text.dimWhite,
        marginBottom: spacing.medium
    }
});
export default styles;
