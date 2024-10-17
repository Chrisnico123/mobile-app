import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

type SaleItem = {
  id_nota: string;
  nama: string;
  subtotal: string;
  created_at: string;
};

interface ApiResponse {
  message: string;
  data: SaleItem[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const VITE_BASE_URL = 'http://localhost:4444/api'; // Ganti dengan URL API yang sesuai
const DEFAULT_LIMIT = 10;

export default function SaleListScreen() {
  const [saleData, setSaleData] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchSaleData(page);
  }, [page]);

  const fetchSaleData = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(`${VITE_BASE_URL}/penjualan`, {
        params: { page: pageNumber, limit: DEFAULT_LIMIT }
      });
      const newData = response.data.data;
      setSaleData((prevData) => [...prevData, ...newData]);
      setHasMore(newData.length === DEFAULT_LIMIT);
    } catch (err: any) {
      setError('Gagal mengambil data penjualan');
      Alert.alert('Error', `Gagal mengambil data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event: any) => {
    const bottom = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - 50;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  function handleView(id: string) {
    console.log(`View clicked for ID Nota: ${id}`);
  }

  function handleEdit(id: string) {
    console.log(`Edit clicked for ID Nota: ${id}`);
  }

  function handleDelete(id: string) {
    console.log(`Delete clicked for ID Nota: ${id}`);
  }

  if (loading && saleData.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll} scrollEventThrottle={400}>
      <Text style={styles.header}>Daftar Penjualan</Text>
      {saleData.map((item, index) => (
        <View key={item.id_nota} style={styles.card}>
          <Text style={styles.text}>
            No: {index + 1} - ID Nota: {item.id_nota}
          </Text>
          <Text style={styles.text}>Nama: {item.nama}</Text>
          <Text style={styles.text}>Sub Total: {item.subtotal}</Text>
          <Text style={styles.text}>Tanggal: {item.created_at}</Text>
          <View style={styles.buttonContainer}>
            <Button title="View" onPress={() => handleView(item.id_nota)} color="#1E90FF" />
            <Button title="Edit" onPress={() => handleEdit(item.id_nota)} color="#FFA500" />
            <Button title="Delete" onPress={() => handleDelete(item.id_nota)} color="#FF6347" />
          </View>
        </View>
      ))}
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
