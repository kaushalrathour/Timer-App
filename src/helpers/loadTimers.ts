import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function loadTimersFromAsync() {
    try {
        const timers = await AsyncStorage.getItem("timers");
        if (timers === null) {
            return [];
        }
        
        const parsedTimers = JSON.parse(timers);
        if (Array.isArray(parsedTimers)) {
            return parsedTimers;
        }
        
        return [];
    } catch (error) {
        return [];
    }
}
