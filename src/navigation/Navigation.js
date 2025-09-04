import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Add from '../screens/Add';
import Register from '../screens/Register';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="login" component={Login}/>
                <Stack.Screen name="home" component={Home}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;