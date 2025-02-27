import { ScaledSheet as StyleSheet } from "react-native-size-matters";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        gap: "10@ms"
    },
    logo: {
        width: "100%",
        height: "200@ms",
        resizeMode: "contain"
    },
})
