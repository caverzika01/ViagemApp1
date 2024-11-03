import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@trips';

export default function TripDetails({ route, navigation }) {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);

  const fetchTrip = async () => {
    const storedTrips = await AsyncStorage.getItem(STORAGE_KEY);
    const trips = storedTrips ? JSON.parse(storedTrips) : [];
    const selectedTrip = trips.find(t => t.id === tripId);
    setTrip(selectedTrip);
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  const editTrip = () => {
    navigation.navigate('EditTrip', { trip });
  };

  if (!trip) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Destino: {trip.destination}</Text>
      <Text>Data: {trip.date}</Text>
      <Button title="Editar Viagem" onPress={editTrip} />
    </View>
  );
}
