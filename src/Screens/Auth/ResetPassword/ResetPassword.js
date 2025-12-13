import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../../Api/configs';
import Container from '../../../Components/Container';
import InputField from '../../../Components/InputField';
import { MainButton } from '../../../Components/Buttons/MainButton';
import { showToast } from '../../../Utils/toast';
import { vh } from '../../../theme/units';
import CustomText from '../../../Components/wrappers/Text/CustomText';
import fonts from '../../../Assets/fonts';
import { font } from '../../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import routes from '../../../Navigation/routes';
import ActivityLoader from '../../../Components/ActivityLoader';
import { colors } from '../../../theme/colors';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const route = useRoute();
    const { email, otp } = route.params || {};

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            showToast('error', 'Passwords do not match');
            return;
        }

        try {
            setIsLoading(true)
            const res = await axios.post(`${baseUrl}/user/reset-password`, {
                email,
                otp,
                newPassword: password,
            });
            if (res.data) {
                setIsLoading(false)
                showToast('success', 'Password reset successfully');
                navigation.navigate(routes.auth.login);
            } else {
                setIsLoading(false)
                showToast('error', res.data.message || 'Something went wrong');
            }
        } catch (err) {
            setIsLoading(false)
            showToast('error', err?.response?.data?.message || 'Network error');
        }
    };

    return (
        <Container contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        }}>
            <CustomText
                text="Reset Password"
                font={fonts.clash.semibold}
                size={font.h6}
            />
            <View style={{ margin: vh * 3 }} />
            <InputField
                label="New Password"
                placeholder="Enter Password"
                password
                value={password}
                onChangeText={setPassword}
                required
            />
            <InputField
                label="Confirm Password"
                placeholder="Confirm Password"
                password
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                required
            />
            <View style={{ margin: vh * 2 }} />
            {isLoading ? (
                <ActivityLoader
                    style={styles.submitButton}
                    color={colors.theme.secondary}
                />
            ) : (
                <MainButton title="Reset Password" onPress={handleResetPassword} />
            )}

        </Container>
    );
};

export default ResetPassword;


const styles = StyleSheet.create({
    submitButton: {
        color: colors.theme.secondary,
        width: '90%'
    },
})