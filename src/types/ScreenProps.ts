import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./StackParamList";


export type AddTimerScreenProp = StackScreenProps<StackParamList, "Add">
export type HomeScreenProp = StackScreenProps<StackParamList, "Home">
export type HistoryScreenProp = StackScreenProps<StackParamList, "History">