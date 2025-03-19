import React, { useEffect, useMemo } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ThemeState, TimerState } from "../../types/SliceTypes";
import { createStyles } from "./styles";
import { Timer } from "../../types/Timer";
import TimerCard from "../../components/TimerCard/TimerCard";
import { TimersProps } from "../../types/TimersListProp";
import { deleteTimer, updateStatus } from "../../features/timerSlice";

const bulkAction = [
  {
    label: "Pause All",
    action: "paused"
  },
  {
    label: "Reset All",
    action: "reset"
  },
  {
    label: "Run All",
    action: "running"
  },
  {
    label: "Delete All",
    action: "delete"
  }
];


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


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>{category}</Text>
      </View>
      <View style={styles.bulkActionContainer}>
      {bulkAction.map((item, key)=>{
        return(
        <TouchableOpacity onPress={()=>{handleChangeStatus(item.action)}} key={key} style={styles.bulkAction} activeOpacity={0.7}>
            <Text style={styles.bulkActionText}>{item.label}</Text>
        </TouchableOpacity>
        )
      })}
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
