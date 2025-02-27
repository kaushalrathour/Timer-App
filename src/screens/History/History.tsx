import React, { useMemo } from "react";
import { FlatList, View, Text } from "react-native";
import Container from "../../components/Container/Container";
import { useSelector } from "react-redux";
import { ThemeState, TimerState } from "../../types/SliceTypes";
import { HistoryScreenProp } from "../../types/ScreenProps";
import { createStyles } from "./styles";
import { Timer } from "../../types/Timer";

export default function HistoryScreen({ navigation }: HistoryScreenProp) {
    const { timers }: TimerState = useSelector((state: any) => state.timer);
    const { colors }: ThemeState = useSelector((state: any) => state.theme);
    const completedTimers = timers.filter((timer) => timer.status === "completed");
    const styles = useMemo(() => {
        return createStyles(colors);
    }, [colors]);

    const renderItem = ({ item }: { item: Timer }) => (
        <View style={styles.timerItem}>
            <Text style={styles.timerName}>{item.name}</Text>
            <Text style={styles.timerCompletionTime}>
                Completion Time: {item.completionTime}
            </Text>
        </View>
    );

    return (
        <Container>
            <View style={styles.container}>
                <FlatList
                    data={completedTimers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </Container>
    );
}
