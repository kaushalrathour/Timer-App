import React, { useEffect, useMemo } from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ThemeState, TimerState } from "../../types/SliceTypes";
import { createStyles } from "./styles";
import { Timer } from "../../types/Timer";
import TimerCard from "../../components/TimerCard/TimerCard";
import { TimersProps } from "../../types/TimersListProp";
import { deleteTimer, updateStatus } from "../../features/timerSlice";

export default function TimersList({ categorizedTimer, category }: TimersProps) {
  const dispatch = useDispatch();
  const { colors }: ThemeState = useSelector((state: any) => state.theme);
  const { timers }: TimerState = useSelector((state: any) => state.timer);

  const filteredTimers = timers.filter(timer => 
    categorizedTimer.some(categorized => categorized.id === timer.id)
  );

  const styles = useMemo(() => {
    return createStyles(colors);
  }, [colors]);

  const handleChangeStatus = (status: string)=>{
    if(status === "delete") {
      filteredTimers.map((timer)=> dispatch(deleteTimer(timer.id)))
      return;
    }
    filteredTimers.map((timer)=> dispatch(updateStatus({id: timer.id, status})))
  }

  useEffect(()=>{
    
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      <Text onPress={()=>{
        handleChangeStatus("paused")
      }}>Pause All</Text>
      <Text onPress={()=>{
        handleChangeStatus("reset")
      }}>Reset All</Text>
      <Text onPress={()=>{
        handleChangeStatus("running")
      }}>Start All</Text>
      <Text onPress={()=>{
        handleChangeStatus("delete")
      }}>Delete All</Text>
      </View>
      {filteredTimers.length > 0 && (
        <FlatList
          data={filteredTimers}
          renderItem={({ item }: { item: Timer }) => <TimerCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
