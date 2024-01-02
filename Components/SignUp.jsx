import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Pressable, Image, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { TextInput } from 'react-native-paper';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
// import { AsyncStorage } from "react-native"
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
function SignUp({ navigation }) {


    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const [secureText, setsecureText] = useState(false)

    const Sign_Up = async () => {
        console.log(Name, Email, Password);
        if (Email !== "" && Password !== "" && Name !== "") {
            try {
                const res = await auth().createUserWithEmailAndPassword(Email, Password);
                console.log(res);
                console.log("User Id", res.user.uid);

                await firestore().collection("User").doc(res.user.uid).set({
                    Name: Name,
                    Email: Email,
                    Password: Password,
                    key: res.user.uid,
                });

                await AsyncStorage.setItem('userId', JSON.stringify(res.user.uid));

                Snackbar.show({

                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "green",
                    action: {
                        text: 'Successfully Signup the User',
                        textColor: 'white',
                        backgroundColor: "green",
                    },
                });

                // Navigate to the login screen after successful sign-up
                navigation.navigate('Login');
            } catch (err) {
                console.log(err);
                Snackbar.show({
                    text: 'Already SignUp',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: "grey",
                    action: {
                        text: 'Ok',
                        backgroundColor: "grey",
                        textColor: 'white',
                    },
                });
            }
        } else {
            Snackbar.show({
                text: "Email & Password can't be null",
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: "red",
                action: {
                    text: 'Ok',

                    backgroundColor: "red",
                    textColor: 'white',
                },
            });
        }
    };


    React.useEffect(() => {
        getLogin()
    }, [])
    const getLogin = async () => {
        const loginCheck = await AsyncStorage.getItem("logIn")
        console.log("signIn Check", loginCheck)
        if (loginCheck) {
            navigation.navigate("Login")
        } else {
            navigation.navigate("SignUp")
        }
    }


    return (
        <ImageBackground source={require("../assets/Images/login.jpg")} style={{ width: `100%`, height: `100%`, }} >
            {/* <ImageBackground source={require("../assets/Images/signUpImg.png")} style={{ width: `100%`, height: `100%`, }} > */}

            {/* <Image source={require("./rm222-mind-20.jpg")} style={{ width: `100%`, height: `100%` }} /> */}
            <View style={styles.mainDiv}>
                <View>
                    <Text style={styles.heading}>
                        SignUp
                    </Text>
                </View>
                <View >

                    <View style={styles.group}>
                        <TextInput
                            style={styles.input}
                            value={Name}
                            onChangeText={text => setName(text)}
                            right={<TextInput.Icon icon="account" color='#00b4d8' />}
                        />
                        <Text style={styles.label}> UserName </Text>
                        <View style={styles.bar}></View>
                        <View style={styles.highlight}></View>
                    </View>
                    <View style={styles.group}>
                        <TextInput
                            style={styles.input}
                            value={Email}
                            onChangeText={text => setEmail(text)}
                            right={<TextInput.Icon color='#DB4437' icon="email" />}

                        />
                        <Text style={styles.label}> Email </Text>
                        <View style={styles.bar}></View>
                        <View style={styles.highlight}></View>
                    </View>



                    <View style={styles.group}>
                        <TextInput
                            style={styles.input}
                            right={secureText ?
                                <TextInput.Icon icon="eye-off" color='red' onPress={() => setsecureText(false)} /> :
                                <TextInput.Icon icon="eye" color='#0077b6' onPress={() => setsecureText(true)} />
                            }
                            secureTextEntry={secureText}

                            value={Password}
                            onChangeText={text => setPassword(text)}
                        />
                        <Text style={styles.label}> Password </Text>
                        <View style={styles.bar}></View>
                        <View style={styles.highlight}></View>
                    </View>

                </View>

                <View style={styles.signUpHere}>
                    <Text style={{ marginRight: 10 }}>
                        Don't have account
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{ color: "#BC69E2", fontWeight: "bold" }}>
                            login here
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.container}>

                    <View>
                        <Button icon="login" mode="contained"
                            onPress={Sign_Up}
                            style={{ color: "white", backgroundColor: "#2B29A6" }}>
                            Sign Up
                        </Button>
                    </View>
                </View>
            </View>


        </ImageBackground >

    )
}

export default SignUp

const styles = StyleSheet.create({


    heading: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Outfit-VariableFont_wght",
        // fontWeight: ""
        borderBottomWidth: 1,

        fontSize: 25, textAlign: 'center', fontFamily: "Poppins-Bold", color: '#0077b6',
        marginBottom: 50,
    },
    mainDiv: {
        margin: 'auto',
        alignItems: 'center',
        width: `100%`,
        marginTop: `35%`,
        justifyContent: 'center'
    },
    otherLogin: {

        padding: 10,
        borderRadius: 30,
        marginTop: 0,
        textAlign: 'center',
        marginRight: 20,
        margin: 'auto',
        backgroundColor: "#DB4437"

    },
    otherLoginImg: {
        width: 40,
        height: 40,
        display: "flex",
        margin: 15
    }
    , signUpHere: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        // borderBlockColor: "black",
        // borderWidth: 1,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    // 


    group: {
        position: 'relative',
        marginBottom: 50,
    },
    input: {
        fontSize: 15,
        padding: 5,
        paddingLeft: 5,
        width: 200,
        borderBottomWidth: 1,
        borderBottomColor: '#0077b6',
        backgroundColor: 'transparent',
        outline: 'none',
    },
    label: {
        color: '#999',
        fontSize: 15,
        fontWeight: 'normal',
        position: 'absolute',
        pointerEvents: 'none',
        left: 5,
        top: -15,
        transition: '0.2s ease',
    },
    bar: {
        position: 'relative',
        display: 'block',
        width: 200,
    },
    highlight: {
        position: 'absolute',
        height: '60%',
        width: 100,
        top: '25%',
        left: 0,
        pointerEvents: 'none',
        opacity: 0.5,
    },
})