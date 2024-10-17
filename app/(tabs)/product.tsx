import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 

export interface Product {
  kode: string;
  nama: string;
  kategori: string;
  harga: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

const VITE_BASE_URL = 'http://localhost:4444/api';

export default function ProductListScreen() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/barang`);
        setProductData(response.data.data);
      } catch (err) {
        setError('Gagal mengambil data produk');
        Alert.alert('Error', 'Gagal mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  function handleView(kode: string) {
    console.log(`View clicked for Kode: ${kode}`);
  }

  function handleEdit(kode: string) {
    console.log(`Edit clicked for Kode: ${kode}`);
  }

  function handleDelete(kode: string) {
    console.log(`Delete clicked for Kode: ${kode}`);
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Daftar Produk</Text>
      <Button
        title="Tambah Produk"
        onPress={() => navigation.navigate('addProduct')} 
        color="#1E90FF"
      />
      {productData.map((item, index) => (
        <View key={item.kode} style={styles.card}>
          <Text style={styles.text}>
            No: {index + 1} - Kode: {item.kode}
          </Text>
          <Text style={styles.text}>Nama: {item.nama}</Text>
          <Text style={styles.text}>Kategori: {item.kategori}</Text>
          <Text style={styles.text}>Harga: {item.harga}</Text>
          <View style={styles.buttonContainer}>
            <Button title="View" onPress={() => handleView(item.kode)} color="#1E90FF" />
            <Button title="Edit" onPress={() => handleEdit(item.kode)} color="#FFA500" />
            <Button title="Delete" onPress={() => handleDelete(item.kode)} color="#FF6347" />
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
