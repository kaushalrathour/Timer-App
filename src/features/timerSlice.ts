import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TimerState } from "../types/SliceTypes";
import { Timer } from "../types/Timer";
import convertToSeconds from "../helpers/convertToSeconds";



const initialState: TimerState = {
  timers: [],
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    addTimer: (state, action: PayloadAction<Timer>) => {
      state.timers.push(action.payload);
      AsyncStorage.setItem("timers", JSON.stringify(state.timers));
    },
    deleteTimer: (state, action) => {
      const id = action.payload;
      state.timers = state.timers.filter(timer => timer.id !== id);
      AsyncStorage.setItem("timers", JSON.stringify(state.timers));
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.timers.findIndex(timer => timer.id === id);
      
      if (index !== -1) {
        if (state.timers[index].remainingTime > 0) {
          if (status !== "reset") {
            state.timers[index].status = status;
          }
          if (status === "reset") {
            state.timers[index].remainingTime = state.timers[index].duration;
          }
        }
    
        AsyncStorage.setItem("timers", JSON.stringify(state.timers));
      }
    },    
    updateRemainingTimer: (state, action) => {
      const { id } = action.payload;
      const index = state.timers.findIndex(timer => timer.id === id);
  
      if (index !== -1) {
          const timer = state.timers[index];
          if(timer.unit !== "Seconds") {
          const { durationInSec, remainingTimeInSec } = convertToSeconds(timer.duration, timer.remainingTime, timer.unit);
          timer.duration = durationInSec;
          timer.remainingTime = remainingTimeInSec;
          timer.unit = "Seconds"
        }
  
          if (timer.status === "running") {
              if (timer.remainingTime > 0) {
                  timer.remainingTime -= 1;
              }
              if (timer.remainingTime <= 0) {
                  timer.remainingTime = 0;
                  timer.status = "completed",
                  timer.completionTime = (new Date()).toLocaleString()
              }
          }
  
          
          AsyncStorage.setItem("timers", JSON.stringify(state.timers));
      }
  },
    saveTimers: (state, action: PayloadAction<Timer[]>) => {
    state.timers = action.payload.map(timer => {
      if (timer.status === "running") {
        return { ...timer, status: "paused" };
      }
      return timer;
    });
  },
  },
});

export const {
  addTimer,
  saveTimers,
  updateStatus,
  updateRemainingTimer,
  deleteTimer
} = timerSlice.actions;

export default timerSlice.reducer;
