import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Snackbar from 'react-native-snackbar';

function DonateScreen({ navigation }) {

  const [checked, setChecked] = useState('first');
  const [type, setType] = useState('clothing');
  const [namez, Setname] = useState('')
  const [cnic, SetCnic] = useState('')
  const [contact, SetContact] = useState('')
  const [description, setDescription] = useState(''); // Added description state

  const db = firestore(); // Use only Firestore

  const formatCNIC = (input) => {
    // Remove non-numeric characters
    const numericInput = input.replace(/[^\d]/g, '');

    // Format the CNIC as per your requirements
    const formattedCNIC = `${numericInput.slice(0, 5)}-${numericInput.slice(5, 12)}-${numericInput.slice(12, 13)}`;

    return formattedCNIC;
  };
  const formatPhoneNumber = (input) => {
    // Remove non-numeric characters
    const numericInput = input.replace(/[^\d]/g, '');
    const formattedPhoneNumber = `+${numericInput}`;

    return formattedPhoneNumber;
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };
  const handleContactChange = (phoneNumber) => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    SetContact(formattedPhoneNumber);
  };


  const handleCNICChange = (cnic) => {
    const formattedCNIC = formatCNIC(cnic);
    SetCnic(formattedCNIC);
  };

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }

  }, []);

  const submitRequest = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      const name = namez || '';
      const formattedCnic = cnic || '';
      const formattedContact = contact || '';
      const gender = checked === 'first' ? 'Male' : 'Female';  // Get the selected gender
      const donationType = type;  // Get the selected donation type
      const desc = description

      if (currentUser) {
        const userRef = db.collection('User').doc(currentUser.uid);
        const requestRef = userRef.collection('donates').doc();

        Snackbar.show({
          text: 'Form Submitted.',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'Ok',
            textColor: 'white',
          },
        });

        await requestRef.set({
          name,
          cnic: formattedCnic,
          contact: formattedContact,
          gender,
          donationType,
          desc,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        // Handle the case when the user is not logged in
      }
    } catch (error) {
      Snackbar.show({
        text: 'Form submission Failed.',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'white',
        },
      });
      console.error('Error submitting request:', error.message);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          <Text style={styles.title}>Donate Your Goods to Needy One </Text>
          <View style={styles.flex}>
            <View style={styles.label}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={namez}
                onChangeText={(text) => Setname(text)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>

          </View>
          <View style={styles.label}>
            <TextInput
              style={styles.input}
              placeholder="CNIC"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="numeric"
              value={cnic}
              onChangeText={handleCNICChange}
            />
          </View>
          <View style={styles.label}>
            <TextInput
              style={styles.input}
              placeholder="contact"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={contact}
              onChangeText={handleContactChange}
            />

          </View>
          <View style={styles.radiocontainer}>
            <Text style={styles.labelText}>Gender</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text onPress={() => setChecked('first')} style={styles.radioText}>
                  Male
                </Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text onPress={() => setChecked('second')} style={styles.radioText}>
                  Female
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.donationtype}>
            <Text style={styles.labelText}>Donation Type</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="education"
                  status={type === 'education' ? 'checked' : 'unchecked'}
                  onPress={() => setType('education')}
                />
                <Text onPress={() => setType('education')} style={styles.radioText}>
                  Education
                </Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="clothing"
                  status={type === 'clothing' ? 'checked' : 'unchecked'}
                  onPress={() => setType('clothing')}
                />
                <Text onPress={() => setType('clothing')} style={styles.radioText}>
                  Clothing
                </Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="medical"
                  status={checked === 'money' ? 'checked' : 'unchecked'}
                  onPress={() => setType('money')}
                />
                <Text onPress={() => setType('money')} style={styles.radioText}>
                  Money
                </Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value="medical"
                  status={checked === 'medical' ? 'checked' : 'unchecked'}
                  onPress={() => setType('medical')}
                />
                <Text onPress={() => setType('medical')} style={styles.radioText}>
                  Medical
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.label}>
            <TextInput
              style={styles.input}
              placeholder="Description"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={handleDescriptionChange}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>

          <TouchableOpacity style={styles.submit} onPress={submitRequest}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Donatione it </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      {/* </View> */}
    </>
  )

}

export default DonateScreen;
// css
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // marginTop: '4%',
    height: 'auto'

  },
  form: {
    marginLeft: `5%`,
    textAlign: 'center',
    marginTop: `0%`,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 320,
    margin: 'auto',
    padding: 10,
    borderRadius: 20,
    // position: 'relative',
    backgroundColor: '#ade8f4',
    color: '#fff',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 20,
    width: `100%`,
    fontWeight: '600',
    letterSpacing: -1,
    paddingVertical: 20,
    position: 'relative',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    // paddingLeft: 30,
    color: '#0077b6',
  },
  message: {
    fontSize: 14.5,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signin: {
    fontSize: 14.5,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  flex: {
    display: 'flex',
    width: '100%',
    gap: 5,
  },
  label: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    width: '100%',
    padding: 20,
    paddingTop: 3,
    paddingBottom: 3,
    outline: 'none',
    borderWidth: 1,
    borderColor: 'rgba(105, 105, 105, 0.397)',
    borderRadius: 10,
    fontSize: 13,
  },
  submit: {
    border: 'none',
    outline: 'none',
    padding: 8,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,

    backgroundColor: '#00bfff',
    transform: [{ scale: 0.8 }],
  },
  radiocontainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black'
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: 'black',

    justifyContent: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 20,
  },
  radioText: {
    marginLeft: 15,
    color: 'black'
  },
});