import React, { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, Alert, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeState, TimerState } from "../../types/SliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { createStyles } from "./style";
import { ms } from "react-native-size-matters";
import { deleteTimer, updateRemainingTimer, updateStatus } from "../../features/timerSlice";
import { ProgressBar } from "react-native-paper";


export default function TimerCard({ id }): React.JSX.Element {
  const { colors, isDarkMode }: ThemeState = useSelector((state: any) => state.theme);
  const { timers }: TimerState = useSelector((state: any) => state.timer);
  const [halfReached, setHalfReached] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const timer = timers.find(timer => timer.id === id);

  if (!timer) {
    return <Text>Loading...</Text>;
  }

  const { name, category, status, duration, remainingTime, halfwayAlert } = timer;

  const getStatusIconName = () => {
    if (status === "running") {
      return "pause-circle";
    } else if (status === "paused") {
      return "play-circle";
    } else if (status === "completed") {
      return "check-circle";
    } else {
      return "timer-sand";
    }
  };

  const StatusIcon = useMemo(() => {
    return getStatusIconName();
  }, [status]);

  const isDanger = timer.remainingTime <= 10;
  const styles = useMemo(() => createStyles(colors, isDanger), [colors, isDanger]);

 

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    console.log("Current Status:", status);
  
    if (status === "running") {
      interval = setInterval(() => {
        if (remainingTime <= 0) {
          dispatch(updateStatus({ id, status: "completed" }));
          setModalVisible(true);
        }
        if (remainingTime > 0) {
          dispatch(updateRemainingTimer({ id, status }));
  
          if (!halfReached && remainingTime <= duration / 2 && halfwayAlert) {
            setHalfReached(true);
            Alert.alert("Halfway Alert", `You have reached 50% of the timer: ${name}`);
          }
        } 
  
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [status, remainingTime, dispatch, id, halfReached, duration]);

  useEffect(() => {
    if (timer.duration > 0) {
        const calculatedProgress = 1 - (timer.remainingTime / timer.duration);
        setProgress(Math.min(Math.max(calculatedProgress, 0), 1));
    }
}, [timer.remainingTime, timer.duration]);

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.categoryBadge}>{category}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {remainingTime}s remaining ({duration}s total)
        </Text>
        <TouchableOpacity onPress={() => {
          if (status !== "completed") {
            const updatedTimer = {
              status: (status === "running" ? "paused" : "running"),
              id
            };
            dispatch(updateStatus(updatedTimer));
          }
        }}>
          <Icon name={StatusIcon} size={ms(30)} color={colors.info} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          dispatch(deleteTimer(id))
        }}>
          <Icon name={"delete"} size={ms(30)} color={colors.info}/>
        </TouchableOpacity>
      </View>

      <ProgressBar progress={progress}  color={colors.info} style={{backgroundColor: colors.backgroundPrimary}}/>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Congratulations!</Text>
          <Text style={styles.modalText}>You have completed the timer: {name}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}