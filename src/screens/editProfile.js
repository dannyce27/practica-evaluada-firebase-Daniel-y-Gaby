import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../Hooks/useAut.js';

export default function EditProfileScreen({ navigation }) {
  const { user, subscribeToUserData, updateUserData } = useAuth();
  const [formData, setFormData] = useState({ nombre: '', titulo: '', graduacion: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToUserData((data) => {
      setFormData({
        nombre: data.nombre || '',
        titulo: data.titulo || '',
        graduacion: data.graduacion || '',
      });
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const handleUpdate = async () => {
    if (!formData.nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    setSaving(true);
    const result = await updateUserData(formData);
    setSaving(false);

    if (result.success) {
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 16, fontSize: 16 }}>Cargando tu perfil...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
        <Text style={styles.title}>Editar Perfil</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={formData.nombre} onChangeText={(text) => updateField('nombre', text)} editable={!saving} />
        <TextInput style={styles.input} placeholder="titulo" value={formData.titulo} onChangeText={(text) => updateField('titulo', text)} editable={!saving} />
        <TextInput style={styles.input} placeholder="Año de graduacion" value={formData.graduacion} onChangeText={(text) => updateField('graduacion', text)} editable={!saving} />


        <TouchableOpacity style={[styles.button, saving && { opacity: 0.7 }]} onPress={handleUpdate} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? 'Guardando...' : 'Actualizar Perfil'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.goBack()} disabled={saving}>
          <Text style={styles.buttonTextSecondary}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#000', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  buttonSecondary: { backgroundColor: '#ccc', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonTextSecondary: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
