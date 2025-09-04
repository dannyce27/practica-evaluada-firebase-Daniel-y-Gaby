import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../Hooks/useAut.js';

export default function HomeScreen({ navigation }) {
  const { user, loading: authLoading, logout, subscribeToUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsubscribe = subscribeToUserData((data) => {
      setUserData(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              navigation.reset({ index: 0, routes: [{ name: 'login' }] });
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  if (authLoading || loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Cargando tu perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Hola{userData?.nombre ? `, ${userData.nombre.split(' ')[0]}` : ''}
      </Text>

      {userData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mi Perfil</Text>
          <Text style={styles.cardText}>Correo: {userData.email}</Text>
          {userData.nombre && <Text style={styles.cardText}>Nombre: {userData.nombre}</Text>}
          {userData.titulo && <Text style={styles.cardText}>Titulo: {userData.titulo}</Text>}
          {userData.graduacion && <Text style={styles.cardText}>Año de graduacion: {userData.graduacion}</Text>}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit')}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 60, backgroundColor: '#f5f5f5', flexGrow: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#555' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 24, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12, color: '#333' },
  cardText: { fontSize: 16, color: '#444', marginBottom: 6 },
  button: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonDanger: { backgroundColor: '#444', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
