import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

function TextPost({ navigation }) {
    const [posts, setPosts] = useState([]);
    const adminAvatarImage = require('../../assets/Images/profile.png');

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const postsSnapshot = await firestore().collection('Post').get(); // Update the collection name
                const postsData = postsSnapshot.docs.map(doc => doc.data());
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {posts.map((post, index) => (
                    <View key={index} style={styles.textPostContainer}>
                        <View style={styles.adminContainer}>
                            <Image source={adminAvatarImage} style={styles.avatar} />
                            <Text style={styles.adminName}>Admin</Text>
                        </View>
                        <Text style={styles.textPost}>{post.Post}</Text>
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    textPostContainer: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ddd', // Border color
        borderRadius: 10,
        overflow: 'hidden',
    },
    textPost: {
        fontSize: 16,
        color: 'black',
        padding: 10,
    },
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

export default TextPost;
