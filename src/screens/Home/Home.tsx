import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/Container/Container";
import { ThemeState, TimerState } from "../../types/SliceTypes";
import { createStyles } from "./styles";
import TimersList from "../../components/TimersList/TImersList";
import { HomeScreenProp } from "../../types/ScreenProps";
import { ms } from "react-native-size-matters";

export default function HomeScreen({ navigation }: HomeScreenProp) {
  const dispatch = useDispatch();
  const { colors }: ThemeState = useSelector((state: any) => state.theme);
  const { timers }: TimerState = useSelector((state: any) => state.timer);

  const groupByCategory = (timers) => {
    return timers.reduce((acc, timer) => {
      if (!acc[timer.category]) {
        acc[timer.category] = [];
      }
      acc[timer.category].push(timer);
      return acc;
    }, {});
  };

  const groupedTimers = groupByCategory(timers);
  const groupedArray = Object.entries(groupedTimers).map(([category, timers]) => ({
    category,
    timers,
  }));

  const styles = useMemo(() => {
    return createStyles(colors);
  }, [colors]);

  const hasCompletedTimers = timers.some(timer => timer.status === "completed");

  return (
    <Container>
      <View style={styles.container}>
      {hasCompletedTimers && (
          <TouchableOpacity
            style={styles.historyButton} 
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
        )}
        {timers.length === 0 ? (
          <Text style={{ color: colors.textPrimary, fontWeight: "600", fontSize: ms(24), alignSelf: "center" }}>No timers available</Text>
        ) : (
          <FlatList
            data={groupedArray}
            keyExtractor={(item) => item.category}
            renderItem={({ item }) => {
              return (
                  <TimersList categorizedTimer={item.timers} category={item.category} />
                );
              
            }}
          />
        )}
        
      </View>
    </Container>
  );
}
