import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import AddTrip from './src/screens/AddTrip';
import TripDetails from './src/screens/TripDetails';
import EditTrip from './src/screens/EditTrip';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddTrip" component={AddTrip} />
        <Stack.Screen name="TripDetails" component={TripDetails} />
        <Stack.Screen name="EditTrip" component={EditTrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
