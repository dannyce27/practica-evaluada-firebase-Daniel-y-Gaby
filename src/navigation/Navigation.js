import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Add from '../screens/Add';
import Register from '../screens/Register';
import login from '../screens/login';  // mayúscula inicial
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators, // Slide animation
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="Home" component={Home} />
        {/* Si necesitas Add, agrega aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
