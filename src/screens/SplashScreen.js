import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, StatusBar } from "react-native";

const SplashScreen = ({ navigation }) => {
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const text1Opacity = useRef(new Animated.Value(1)).current;
  const text2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Transición del fondo (gris oscuro → negro)
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Transición cruzada entre textos
    Animated.timing(text1Opacity, {
      toValue: 0,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(text2Opacity, {
      toValue: 1,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Navegar al login después de la animación
    setTimeout(() => {
      navigation.replace('login');
    }, 3000);
  }, [navigation]);

  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#333333', '#000000'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar hidden />
      
      <Animated.Text style={[styles.text, { opacity: text1Opacity }]}>
        Bienvenido
      </Animated.Text>

      <Animated.Text style={[styles.text, styles.textSecondary, { opacity: text2Opacity }]}>
        A tu App React Native
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 48,
    fontWeight: "900",
    color: "#ccc",
    position: "absolute",
    textAlign: "center",
  },
  textSecondary: {
    fontSize: 24,
    fontWeight: "600",
    color: "#888",
  },
});

export default SplashScreen;
