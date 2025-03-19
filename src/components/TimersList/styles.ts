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
            backgroundColor: colors.accentSecondary,
            paddingVertical: "5@s",
            paddingHorizontal: "30@s",
            borderRadius: "5@s",
            alignItems: "center",
            marginBottom: "10@s"
        },
        headerText: {
            fontWeight: "600",
            color: "white",
            fontSize: "20@s",
        },
        bulkActionContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "5@s",
            justifyContent: "space-between"
        },
        bulkAction: {
            padding: "10@s",
            backgroundColor: colors.backgroundTertiary,
            borderRadius: "5@s",
        },
        bulkActionText: {
            fontSize: "16@s",
            color: colors.textTertiary,
            fontWeight: "500",
            textAlign: "center",
        },
    });
