import React from 'react';
import { Button, Text } from 'react-native-paper';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';

function GetStartedScreen({ navigation }) {
    const gotomain = () => {
        navigation.navigate("Login");
    };

    return (
        <ImageBackground source={require("../assets/Images/getstarted-bg.jpg")} style={{ height: `100%`, width: `100%` }}>
            <View
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View>
                    <LottieView
                        style={{ width: 200, height: 200 }}
                        source={require('../Components/AnimationSplash/sidebar-hello-animation.json')}
                        autoPlay
                    />
                </View>
                <View style={{ width: '90%' }}>
                    <Text style={{ fontSize: 18, textAlign: 'center',fontFamily:"Poppins-Bold",color:'#0077b6' }}>
                        Share the Blessings, Share the Love
                    </Text>
                </View>
                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 10, textAlign: 'center',fontFamily:"Poppins-Medium",color:'#0077b6' }}>
                        Connect Needy Hearts with Generous Hands in Our Donation Hub! Together, Let's Make a World of Difference
                    </Text>
                </View>

                <View >

                    <TouchableOpacity
                        onPress={gotomain}
                        activeOpacity={0.7} // Adjust as needed
                        style={{
                            backgroundColor: '#48cae4', // Replace with your desired background color
                            height: 64,
                            width: 250,
                            borderWidth: 2,
                            borderColor: '#0096c7', // Replace with your desired border color
                            padding: 12,
                            marginTop: 30,
                            borderRadius: 8,
                            overflow: 'hidden',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFF', // Replace with your desired text color
                                fontSize: 16,
                                fontWeight: 'bold',
                                textAlign: 'left',
                            }}
                        >
                            Get Started
                        </Text>
                        <View
                            style={{
                                position: 'absolute',
                                right: 12,
                                top: 10,
                            }}
                        >
                            <View
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    backgroundColor: '#0077b6', // Replace with your desired background color for before pseudo-element
                                    shadowColor: '#A21CAF', // Replace with your desired shadow color
                                    shadowOffset: { width: 20, height: 20 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 30,
                                    elevation: 5, // Add elevation for Android shadow
                                }}
                            />
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: '#90e0ef', // Replace with your desired background color for after pseudo-element
                                    position: 'absolute',
                                    right: 8,
                                    top: 3,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );
}

export default GetStartedScreen;
const styles = StyleSheet.create({
    btn: {
        borderRadius: 20,
        // width: 200,
        padding: 10,
        paddingHorizontal: 30, // horizontal padding
        backgroundColor: '#8ecae6',
        fontWeight: 700,
        color: "white",
        marginTop: 50,
        // height: 100,
    }
});
