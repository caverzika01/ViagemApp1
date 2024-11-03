import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function TripItem({ trip, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>{trip.destination}</Text>
      <Text>{trip.date}</Text>
    </TouchableOpacity>
  );
}
