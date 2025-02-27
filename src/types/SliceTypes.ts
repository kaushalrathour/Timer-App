import { ColorPalette } from "./ColorPalette";
import { Timer } from "./Timer";

  
export interface ThemeState {
    isDarkMode: boolean;
    colors: ColorPalette
}

export interface TimerState {
  timers: Timer[];
}

