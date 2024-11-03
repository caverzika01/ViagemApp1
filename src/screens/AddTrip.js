import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = '@trips';

export default function AddTrip() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigation = useNavigation();

  const saveTrip = async () => {
    const newTrip = {
      id: Date.now(),
      destination,
      date,
    };

    try {
      const existingTrips = await AsyncStorage.getItem(STORAGE_KEY);
      const trips = existingTrips ? JSON.parse(existingTrips) : [];
      trips.push(newTrip);
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
      <Button title="Salvar Viagem" onPress={saveTrip} />
    </View>
  );
}
