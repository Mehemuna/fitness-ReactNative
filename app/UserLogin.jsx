import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const UserLogin = () => {
  const router = useRouter(); // Initialize router for navigation
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (value, namee) => {
    setUser({ ...user, [namee]: value });
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const UserLogin = async () => {
    try {
      let data = await AsyncStorage.getItem('userregister');
      data = JSON.parse(data);

      let check = data.find((item) => item.namee === user.namee && item.password === user.password);

      if (check) {
        // Set isLoggedIn to false for all users
        const updatedUsers = data.map((item) => ({ ...item, isLoggedIn: false }));
  
        // Update the isLoggedIn property for the logged-in user
        const currentUserIndex = updatedUsers.findIndex((item) => item.namee === user.namee);
        updatedUsers[currentUserIndex].isLoggedIn = true;
  
        // Save the updated users array back to AsyncStorage
        await AsyncStorage.setItem('userregister', JSON.stringify(updatedUsers));
        showModal('Login Successful');
        router.push('home');
      } else {
        showModal('Login Unsuccessful');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <ImageBackground source={{uri:"https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2t8ZW58MHx8MHx8fDA%3D"}} style={styles.image}>
      <View style={styles.sub_container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={hideModal}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => router.push('UserRegister')} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Login</Text>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" size={20} color="white" style={styles.inputIcon} />
          <TextInput onChangeText={(value) => handleChange(value, 'namee')} style={styles.Input} placeholder="Username" placeholderTextColor="grey"/>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="lock" size={20} color="white" style={styles.inputIcon} />
          <TextInput
            onChangeText={(value) => handleChange(value, 'password')}
            style={styles.Input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
          />
        </View>

  
        <TouchableOpacity onPress={UserLogin} style={styles.p}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  Input: {
    borderColor: '#F43F5E',
    height: 50,
    width: 230,
    color:"white",
    padding: 5,
    borderRadius: 4,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 50,
    marginBottom: 10,
    color:"white",
  },
  backButton: {
    marginBottom: 10,
  },
  sub_container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent:'center',
    alignItems:'center',
  },
  button: {
    color: 'white',
  },
  p: {
    alignSelf: 'center',
    backgroundColor: 'rgb(244, 63, 94)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100,
    elevation: 10,
    shadowOffset: { width: -6, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
    margin: 10,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#F43F5E',
    padding:10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 2,
    margin: 10,
    height: 50,
    width: 230,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    color: 'white',
    borderRadius: 50,
  },
  inputIcon: {
    marginRight: 10,
    marginLeft:53,
  },
});

export default UserLogin;

