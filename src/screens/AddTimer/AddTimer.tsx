import React, { useMemo } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Container from "../../components/Container/Container";
import { createStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ThemeState } from "../../types/SliceTypes";
import { AddTimerScreenProp } from "../../types/ScreenProps";
import * as Yup from "yup";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native-paper";
import uuid from "react-native-uuid"
import { addTimer } from "../../features/timerSlice";
import convertToSeconds from "../../helpers/convertToSeconds";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .positive("Duration must be positive")
    .integer("Duration must be an integer")
    .required("Duration is required"),
  unit: Yup.string().required("Unit is required"),
  category: Yup.string().required("Category is required"),
  halfwayAlert: Yup.boolean(),
});

export default function AddTimerScreen({ navigation }: AddTimerScreenProp): React.JSX.Element {
  const { colors, isDarkMode }: ThemeState = useSelector((state: any) => state.theme);
  const styles = useMemo(() => createStyles(colors), [colors, isDarkMode]);
  const dispatch = useDispatch()

  const handleAddTimer = (values) => {
    try {
        let duration = values.duration;
        let remainingTime = values.duration;

        
        if (values.unit !== "Seconds") {
            const inSeconds = convertToSeconds(duration, remainingTime, values.unit);
            duration = inSeconds.durationInSec;
            remainingTime = inSeconds.remainingTimeInSec;
            console.log(inSeconds);
        }
        const updatedValues = {
            ...values,
            id: uuid.v4(),
            status: "paused",
            remainingTime,
            unit: "Seconds",
            duration,
        };

        console.log("Updated Values", updatedValues);
        dispatch(addTimer(updatedValues));
        navigation.navigate("Home");
    } catch (error) {
        console.error("Error adding timer:", error);
    }
};

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Add Timer</Text>

        <Formik
          initialValues={{
            name: "",
            duration: "",
            unit: "Seconds",
            category: "Study",
            halfwayAlert: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted Values:", values);
            handleAddTimer(values)
          }}
        >
          {({ values, handleChange, setFieldValue, handleSubmit, errors, touched }) => (
            <View style={styles.formContainer}>

             
             <TextInput
                placeholder="Enter name"
                placeholderTextColor={colors.textSecondary}
                value={values.name}
                onChangeText={handleChange("name")}
                style={[
                  styles.input,
                  touched.duration && errors.duration ? styles.inputError : null,
                ]}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
              
              {/* Duration Input */}
              <TextInput
                placeholder="Enter duration"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={values.duration}
                onChangeText={handleChange("duration")}
                style={[
                  styles.input,
                  touched.duration && errors.duration ? styles.inputError : null,
                ]}
              />
              {touched.duration && errors.duration && (
                <Text style={styles.errorText}>{errors.duration}</Text>
              )}

              
              <Text style={styles.label}>Unit:</Text>
              <Picker
                selectedValue={values.unit}
                onValueChange={(value) => setFieldValue("unit", value)}
                style={styles.picker}
                dropdownIconColor={colors.accentPrimary}
              >
                {["Seconds", "Minutes", "Hours"].map((item, index) => (
                  <Picker.Item
                    label={item}
                    value={item}
                    key={index}
                    color={colors.accentPrimary}
                  />
                ))}
              </Picker>

              
              <Text style={styles.label}>Category:</Text>
              <Picker
        selectedValue={values.category}
        onValueChange={(value) => setFieldValue("category", value)}
        style={styles.picker}
        dropdownIconColor={colors.accentPrimary}
      >
        {["Workout", "Study", "Break", "Cooking"].map((item, index) => (
          <Picker.Item
            label={item}
            value={item}
            key={index}
            
            color={colors.accentPrimary}
          />
        ))}
      </Picker>

              
              <View style={styles.toggleContainer}>
                <Text style={styles.label}>Halfway Alert:</Text>
                <Switch
                  value={values.halfwayAlert}
                  onValueChange={(value) => setFieldValue("halfwayAlert", value)}
                  color={colors.accentPrimary}
                />
              </View>

              
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Save Timer</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
}

