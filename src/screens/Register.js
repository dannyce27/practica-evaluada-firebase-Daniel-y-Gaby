import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useAuth } from '../../Hooks/useAut';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    especialidad: ''
  });

  const handleRegister = async () => {
    if (!formData.nombre || !formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      Alert.alert('Éxito', 'Cuenta creada correctamente');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 60 }}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Completa los datos para registrarte</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo *"
          value={formData.nombre}
          onChangeText={(text) => updateFormData('nombre', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico *"
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text.toLowerCase())}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña *"
          value={formData.password}
          onChangeText={(text) => updateFormData('password', text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Titulo Univerditario"
          value={formData.edad}
          onChangeText={(text) => updateFormData('titulo', text)}
          
        />

        <TextInput
          style={styles.input}
          placeholder="Año de grduacion"
          value={formData.especialidad}
          onChangeText={(text) => updateFormData('graduacion', text)}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
});
