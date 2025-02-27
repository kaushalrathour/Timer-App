import { ScaledSheet as StyleSheet } from "react-native-size-matters";
import { ColorPalette } from "../../types/ColorPalette";

export const createStyles = (colors: ColorPalette) => (
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
    },
    title: {
      fontSize: "24@s",
      fontWeight: "bold",
      color: colors.textPrimary,
      marginBottom: "20@s",
    },
    formContainer: {
      flex: 1,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.borderPrimary,
      borderRadius: "8@s",
      padding: "12@s",
      marginBottom: "16@s",
      color: colors.textPrimary,
      backgroundColor: colors.backgroundSecondary,
    },
    inputError: {
      borderColor: colors.error,
    },
    errorText: {
      color: colors.error,
      fontSize: "12@s",
      marginBottom: "16@s",
    },
    label: {
      color: colors.textPrimary,
      fontSize: "16@s",
      marginBottom: "8@s",
    },
    picker: {
      tintColor: "black",
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: "10@s",
      marginBottom: "16@s",
    },
    toggleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20@s",
    },
    submitButton: {
      backgroundColor: colors.accentPrimary,
      padding: "16@s",
      borderRadius: "8@s",
      alignItems: "center",
    },
    submitButtonText: {
      color: colors.textPrimary,
      fontSize: "16@s",
      fontWeight: "bold",
    },
  })
);
