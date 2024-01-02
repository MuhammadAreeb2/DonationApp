import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

function Videopost({ navigation }) {
    const [videos, setVideos] = useState([]);
    const adminAvatarImage = require('../../assets/Images/profile.png');
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videosSnapshot = await firestore().collection('Video').get(); // Update the collection name
                const videosData = videosSnapshot.docs.map(doc => doc.data());
                setVideos(videosData);
            } catch (error) {
                console.error('Error fetching videos:', error.message);
            }
        };

        fetchVideos();
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {videos.map((video, index) => (
                    <View key={index} style={styles.videoContainer}>
                        <View style={styles.adminContainer}>
                            <Image source={adminAvatarImage} style={styles.avatar} />
                            <Text style={styles.adminName}>{video.username}</Text>
                        </View>

                        <Video
                            source={{ uri: video.uploadURL }}
                            style={styles.videoPlayer}
                            controls={true}
                            resizeMode="contain"
                            autoplay={false}
                        />
                        <View style={styles.videoFooter}>
                            <TouchableOpacity style={styles.iconContainer}>
                                <Icon name="heart-outline" size={30} color="red" />
                                {/* You can add functionality for liking the video */}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer}>
                                <Icon name="share-social-outline" size={30} color="black" />
                                {/* You can add functionality for sharing the video */}
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    videoContainer: {
        marginBottom: 0,
        borderWidth: 2,
        borderColor: '#ddd', // Border color
        borderRadius: 10,
        overflow: 'hidden',
    },
    videoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    adminContainer: {
        flexDirection: 'row', // Set flexDirection to 'row' to align items horizontally
        alignItems: 'center', // Align items vertically in the center
        marginBottom: 8, // Add margin to separate from the video
        padding: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    adminName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },

    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
        padding: 10,
    },
    videoPlayer: {
        height: 200,
    },
    videoFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Videopost;
