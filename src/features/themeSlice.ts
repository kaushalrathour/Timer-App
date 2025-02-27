import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../types/SliceTypes';
import { ColorPalette } from '../types/ColorPalette';

const lightModeColor: ColorPalette = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#E0E0E0',
  
  textPrimary: '#000000',
  textSecondary: '#333333',
  textTertiary: '#666666',
  
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  
  borderPrimary: '#CCCCCC',
  borderSecondary: '#DDDDDD',
  
  iconPrimary: '#000000',
  iconSecondary: '#666666',
  
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  
  accentPrimary: '#6200EE',
  accentSecondary: '#3700B3',
};

const darkModeColor: ColorPalette = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#1E1E1E',
  backgroundTertiary: '#2C2C2C',
  
  textPrimary: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textTertiary: '#B0B0B0',
  
  success: '#66BB6A',
  error: '#EF5350',
  warning: '#FFA726',
  info: '#42A5F5',
  
  borderPrimary: '#444444',
  borderSecondary: '#555555',
  
  iconPrimary: '#FFFFFF',
  iconSecondary: '#B0B0B0',
  
  shadowColor: 'rgba(255, 255, 255, 0.1)',
  
  accentPrimary: '#BB86FC',
  accentSecondary: '#3700B3',
};



const initialState: ThemeState = {
    isDarkMode: false,
    colors: lightModeColor
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeToggle: (state) => {
            const isDarkMode = !state.isDarkMode;
            state.isDarkMode = isDarkMode;
            state.colors= isDarkMode? darkModeColor: lightModeColor

        },
    },
});


export const { themeToggle } = themeSlice.actions;


export default themeSlice.reducer;
