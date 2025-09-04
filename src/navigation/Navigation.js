import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Add from '../screens/Add';
import Register from '../screens/Register';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;