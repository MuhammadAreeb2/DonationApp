import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { View, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './css';

function formatDate(timestamp) {
  const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
  const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleString('en-US', options);
} function TermsAndCondition() {
  const [termData, setTermData] = useState('');
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    GetTAndC();
  }, []);

  const GetTAndC = async () => {
    try {
      const aboutUsSnapshot = await firestore()
        .collection('TermsAndCondition')
        .orderBy(firestore.FieldPath.documentId())
        .limit(1)
        .get();

      if (!aboutUsSnapshot.empty) {
        const termDocument = aboutUsSnapshot.docs[0].data();
        const dataField = termDocument.data;

        // Check the structure of aboutUsDocument.timestamp
        console.log('Timestamp:', termDocument.timestamp);

        // If it's already a JavaScript Date, you can use it directly
        setTimestamp(termDocument.timestamp);

        setTermData(dataField);
      } else {
        console.log('No documents found in Terms and condition available collection.');
      }
    } catch (error) {
      console.error('Error fetching Condition and terms data:', error.message);
    }
  };

  return (
    <View>
      <View style={styles.task}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={styles.tags}>
            <Text style={styles.tag}>From Admin</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.viewer}>
              {/* Display an image here */}
              <Image
                source={require('../../assets/Images/profile.png')}
                style={styles.viewerImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.taskText}>{termData}</Text>
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Text>{timestamp ? formatDate(timestamp) : ''}</Text>
          </View>

        </View>
      </View>
    </View>
  );
}

export default TermsAndCondition;
