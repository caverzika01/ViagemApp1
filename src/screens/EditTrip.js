import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@trips';

export default function EditTrip({ route, navigation }) {
  const { trip } = route.params;
  const [destination, setDestination] = useState(trip.destination);
  const [date, setDate] = useState(trip.date);

  const updateTrip = async () => {
    const updatedTrip = { ...trip, destination, date };

    try {
      const storedTrips = await AsyncStorage.getItem(STORAGE_KEY);
      const trips = storedTrips ? JSON.parse(storedTrips) : [];
      const tripIndex = trips.findIndex(t => t.id === trip.id);
      trips[tripIndex] = updatedTrip;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Destino" value={destination} onChangeText={setDestination} />
      <TextInput placeholder="Data" value={date} onChangeText={setDate} />
      <Button title="Atualizar Viagem" onPress={updateTrip} />
    </View>
  );
}
