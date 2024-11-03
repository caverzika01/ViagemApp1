import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Alert } from 'react-native';
import TripItem from '../components/TripItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = '@trips';

export default function Dashboard() {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const storedTrips = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTrips) {
        setTrips(JSON.parse(storedTrips));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrip = async (id) => {
    const updatedTrips = trips.filter(trip => trip.id !== id);
    setTrips(updatedTrips);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
  };

  const confirmDelete = (id) => {
    Alert.alert("Confirmar exclusão", "Tem certeza que deseja excluir esta viagem?", [
      { text: "Cancelar", style: "cancel" },
      { text: "OK", onPress: () => deleteTrip(id) }
    ]);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Adicionar Viagem" onPress={() => navigation.navigate('AddTrip')} />
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TripItem
            trip={item}
            onPress={() => navigation.navigate('TripDetails', { tripId: item.id })}
            onLongPress={() => confirmDelete(item.id)}
          />
        )}
      />
    </View>
  );
}
