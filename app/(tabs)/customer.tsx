import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const VITE_BASE_URL = 'http://localhost:4444/api';

interface Pelanggan {
  id_pelanggan: string;
  nama: string;
  domisili: string;
  jenis_kelamin: string;
}

interface ApiResponse {
  message: string;
  data: Pelanggan[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function SalesListScreen() {
  const [salesData, setSalesData] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${VITE_BASE_URL}/pelanggan`); // Ganti dengan endpoint yang sesuai
        setSalesData(response.data.data);
      } catch (err) {
        setError('Gagal mengambil data penjualan');
        Alert.alert('Error', `Gagal mengambil data:`);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  function handleView(id: string) {
    console.log(`View clicked for ID Pelanggan: ${id}`);
  }

  function handleEdit(id: string) {
    console.log(`Edit clicked for ID Pelanggan: ${id}`);
  }

  function handleDelete(id: string) {
    console.log(`Delete clicked for ID Pelanggan: ${id}`);
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Daftar Pelanggan</Text>
      {salesData.map((item, index) => (
        <View key={item.id_pelanggan} style={styles.card}>
          <Text style={styles.text}>
            No: {index + 1} - ID Pelanggan: {item.id_pelanggan}
          </Text>
          <Text style={styles.text}>Nama: {item.nama}</Text>
          <Text style={styles.text}>Domisili: {item.domisili}</Text>
          <Text style={styles.text}>Jenis Kelamin: {item.jenis_kelamin}</Text>
          <View style={styles.buttonContainer}>
            <Button title="View" onPress={() => handleView(item.id_pelanggan)} color="#1E90FF" />
            <Button title="Edit" onPress={() => handleEdit(item.id_pelanggan)} color="#FFA500" />
            <Button title="Delete" onPress={() => handleDelete(item.id_pelanggan)} color="#FF6347" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2, // untuk shadow di Android
    shadowColor: '#000', // untuk shadow di iOS
    shadowOffset: { width: 0, height: 2 }, // untuk shadow di iOS
    shadowOpacity: 0.2, // untuk shadow di iOS
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
