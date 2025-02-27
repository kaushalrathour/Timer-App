import { ScaledSheet as StyleSheet } from "react-native-size-matters";
import { ColorPalette } from "../../types/ColorPalette";

export const createStyles = (colors: ColorPalette, isDanger: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: "10@ms",
      padding: "16@ms",
      marginBottom: "10@s",
      borderWidth: 1,
      borderColor: isDanger ? colors.error : colors.borderPrimary,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12@ms",
    },
    title: {
      fontSize: "18@ms",
      fontWeight: "600",
      color: colors.textPrimary,
      maxWidth: "70%",
    },
    categoryBadge: {
      backgroundColor: colors.accentSecondary,
      color: "white",
      paddingVertical: "4@ms",
      paddingHorizontal: "8@ms",
      borderRadius: 8,
      fontSize: "12@ms",
    },
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: "12@ms",
    },
    timeText: {
      color: colors.textSecondary,
      fontSize: "14@ms",
    },
    dangerIndicator: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "8@ms",
      padding: "8@ms",
      backgroundColor: colors.error + "20",
      borderRadius: 8,
      gap: 4,
    },
    dangerText: {
      color: colors.error,
      fontSize: "12@ms",
      fontWeight: "500",
    },
    modalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
      padding: "20@ms",
    },
    modalContent: {
      margin: "20@ms",
      backgroundColor: colors.backgroundSecondary,
      borderRadius: "10@ms",
      padding: "35@ms",
      alignItems: "center",
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: "15@ms",
      textAlign: "center",
      fontSize: "16@ms",
      color: colors.textPrimary,
    },
    button: {
      borderRadius: "5@ms",
      padding: "10@ms",
      elevation: 2,
      backgroundColor: colors.accentPrimary,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
