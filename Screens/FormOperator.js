import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebaseConfig';
import bcrypt from 'bcryptjs';
import { collection, getDocs } from 'firebase/firestore';
import LoadingScreen from '../components/LoadingScreen';
const LoginOperator = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMsg] = React.useState('');
  const { setID, setConductorName, setStatus, setBusNumber, setPort } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const operatorsRef = collection(db, 'credentials');
      const snapshot = await getDocs(operatorsRef);
      let validUser = null;

      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email === email) {
          validUser = { id: doc.id, ...userData };
        }
      });

      if (validUser) {
        const match = await bcrypt.compare(password, validUser.password);
        if (match) {
          setConductorName(`${validUser.firstname} ${validUser.lastname}`);
          setStatus(validUser.active);
          setBusNumber(validUser.bus_number);
          setPort(validUser.port);
          setID(validUser.id);
          navigation.replace('selection');
        } else {
          throw new Error('Invalid email or password');
        }
      } else {
        throw new Error('Invalid email or password');
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('ERROR-Login:', err);
      setErrorMsg(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" style="light" />

      <View style={styles.header}>  
        <Text style={styles.title}>Operator Login</Text>
        <Text style={styles.subtitle}>Access your dashboard</Text>
      </View>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      {loading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 9999
          }}
          color="#F4B446"
          size="large"
        />
      )}

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Pressable>
      </View>

    </View>
  );
};

export default LoginOperator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginTop: 80,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#F4B446',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  errorMessage: {
    color: '#D9534F',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#F4B446',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
  },
});
