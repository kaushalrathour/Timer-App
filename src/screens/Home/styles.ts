import { ScaledSheet as StyleSheet } from "react-native-size-matters";
import { ColorPalette } from "../../types/ColorPalette";

export const createStyles = (colors: ColorPalette) => (
    StyleSheet.create({
        container: {
            flex: 1,
            gap: "10@s"
        },
        historyButton: {
            backgroundColor: colors.backgroundTertiary,
            padding: '12@s',
            borderRadius: '8@s',
            alignItems: 'center',
            marginTop: '20@s',
        },
        buttonText: {
            color: colors.textPrimary,
            fontSize: '16@s',
            fontWeight: 'bold',
        },
    })
);

  