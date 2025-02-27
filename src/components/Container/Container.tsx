import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { createStyles } from './styles';
import { ThemeState } from '../../types/SliceTypes';
import Icon from "react-native-vector-icons/MaterialIcons"
import { ms } from 'react-native-size-matters';
import { themeToggle } from '../../features/themeSlice';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigatorProps } from '@react-navigation/stack';
import { StackParamList } from '../../types/StackParamList';

type Prop = {
    children: React.JSX.Element
}
export default function Container({ children }: Prop) {
    const {colors, isDarkMode }: ThemeState = useSelector((state: any) => state.theme);
    const navigation = useNavigation<StackNavigatorProps<StackParamList>>();
    const dispatch = useDispatch()
    const styles = useMemo(()=>{
        return createStyles(colors)
    },[colors,isDarkMode]);

    const themeIcon = useMemo(()=>{
        return isDarkMode? "light-mode": "dark-mode"
    },[isDarkMode])

    const handleThemeToggle = ()=>{
        dispatch(themeToggle())
    }
    return (
        <View style={styles.container}>
            <Toast/>
            {children}
            <View style={styles.themeToggleContainer}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{
                navigation.navigate("Add")
            }}>
            <Icon size={ms(30)} color={colors.textPrimary} name={"add-circle"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} onPressIn={()=>{
                handleThemeToggle()
            }} activeOpacity={1}>
            <Icon size={ms(30)} color={colors.textPrimary} name={themeIcon} />
            </TouchableOpacity>
            </View>
        </View>
    );
}

