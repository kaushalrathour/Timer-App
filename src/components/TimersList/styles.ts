import { ScaledSheet as StyleSheet } from "react-native-size-matters";
import { ColorPalette } from "../../types/ColorPalette";

export const createStyles = (colors: ColorPalette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            marginBottom: "10@s",
            gap: "5@s"
        },
        header: {
            fontWeight: "600",
            color: "white",
            fontSize: "20@s",
            alignSelf: "center",
            backgroundColor: colors.accentSecondary,
            paddingVertical: "5@s",
            paddingHorizontal: "30@s",
            borderRadius: "5@s"
        }
    });
