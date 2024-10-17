// product/addProduct.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const VITE_BASE_URL = 'http://localhost:4444/api';

export default function AddProduct() {
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('');
  const [harga, setHarga] = useState('');

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`${VITE_BASE_URL}/barang`, {
        nama,
        kategori,
        harga: parseFloat(harga),
      });
      Alert.alert('Success', 'Produk berhasil ditambahkan');
      navigation.goBack(); // Kembali ke halaman sebelumnya setelah berhasil menambahkan
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan produk');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama Produk:</Text>
      <TextInput
        style={styles.input}
        value={nama}
        onChangeText={setNama}
        placeholder="Masukkan nama produk"
      />
      <Text style={styles.label}>Kategori:</Text>
      <TextInput
        style={styles.input}
        value={kategori}
        onChangeText={setKategori}
        placeholder="Masukkan kategori produk"
      />
      <Text style={styles.label}>Harga:</Text>
      <TextInput
        style={styles.input}
        value={harga}
        onChangeText={setHarga}
        placeholder="Masukkan harga produk"
        keyboardType="numeric"
      />
      <Button title="Tambah Produk" onPress={handleAddProduct} color="#1E90FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});
