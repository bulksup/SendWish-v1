import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Signin, Signup, Profile, Collection} from '../screens';

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: theme.background},
      }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Collection" component={Collection} />
      {/* <Stack.Screen name="Test" component={Test} /> */}
    </Stack.Navigator>
  );
};

export default Auth;
