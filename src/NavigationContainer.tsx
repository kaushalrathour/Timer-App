import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer as Navigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home/Home";
import LoadingScreen from "./components/Loading/Loading"
import { useDispatch, useSelector } from 'react-redux';
import { StackParamList } from "./types/StackParamList";
import { ThemeState } from "./types/SliceTypes";
import AddTimerScreen from "./screens/AddTimer/AddTimer";
import loadTimersFromAsync from "./helpers/loadTimers";
import {saveTimers} from "./features/timerSlice"
import { Timer } from "./types/Timer";
import HistoryScreen from "./screens/History/History";


const Stack = createStackNavigator<StackParamList>();
const { Screen, Navigator } = Stack;

const options = {
    headerShown: false,
}

export default function NavigationContainer() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { colors }: ThemeState = useSelector((state: any) => state.theme);
    const [initialRoute, setInitialRoute] = useState<keyof StackParamList>('Home');
    const dispatch = useDispatch();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsLoading(false);
        },3000)
        return ()=> clearTimeout(timer)
    },[])

    useEffect(()=>{
      (async ()=>{
        const timers : Timer[] =  await loadTimersFromAsync();
        console.log(timers);
        dispatch(saveTimers(timers))
      })()
    },[])

    if (isLoading) {
        return <LoadingScreen />;
    } else {
        return (
            
            <Navigation>
                <StatusBar backgroundColor={colors.backgroundPrimary}/>
                <Navigator initialRouteName={initialRoute}>
                    <Screen name="Home" component={HomeScreen} options={options} />
                    <Screen name="Add" component={AddTimerScreen} options={options} />
                    <Screen name="History" component={HistoryScreen} options={options} />
                </Navigator>
            </Navigation>
           
        );
    }
}
