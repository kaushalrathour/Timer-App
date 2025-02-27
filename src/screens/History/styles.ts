import { ColorPalette } from "../../types/ColorPalette";
import { ScaledSheet as StyleSheet } from "react-native-size-matters";

export const createStyles = (colors: ColorPalette) => (
    StyleSheet.create({
        container: {
            flex: 1,
            padding: '16@ms',
            backgroundColor: colors.backgroundPrimary,
        },
        timerItem: {
            backgroundColor: colors.backgroundTertiary,
            borderRadius: '10@ms',
            padding: '16@ms',
            marginVertical: '8@ms',
            shadowOpacity: 0.2,
            shadowRadius: '4@ms',
            elevation: 3,
        },
        timerName: {
            fontSize: '18@ms',
            fontWeight: 'bold',
            color: colors.textPrimary,
        },
        timerCompletionTime: {
            fontSize: '14@ms',
            color: colors.textSecondary,
            marginTop: '4@ms',
        },
    })
);
