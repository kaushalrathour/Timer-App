import { View, Image} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Container from '../Container/Container';
import { styles } from "./styles"
import Logo from "../../assets/images/logo.png"

export default function LoadingScreen() {
  const dispatch = useDispatch();
  const [indicatoryVisible, setIndicatoryVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndicatoryVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      {indicatoryVisible && (
        <ActivityIndicator
          animating={true}
          color={"white"}
        />
      )}
    </View>
  );
}

