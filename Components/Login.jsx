import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, TouchableRipple } from 'react-native-paper'
import { TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Snackbar from 'react-native-snackbar';
import { TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon set

function Login({ navigation }) {


    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [secureText, setsecureText] = useState(true)
    const gotoHome = () => {
        navigation.replace("Main")
    }
    const gotoSignUp = () => {
        // 
    }

    const LoginApp = async () => {
        console.log(Email, Password)
        console.log("login")
        if (Email !== "" && Password !== "") {
            await auth().signInWithEmailAndPassword(Email, Password).then(async (res) => {
                console.log(res)
                console.log("User ID", res.user.uid)

                // if (res) {

                // navigation.navigate("Main")


                // await AsyncStorage.setItem('logIn', 'true');
                await AsyncStorage.setItem('userId', res?.user?.uid);
                Snackbar.show({
                    text: 'Login Success',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',
                        textColor: 'green',
                        //   onPress: () => { /* Do something. */ },
                    },
                })
                setTimeout(() => {
                    getLogin()
                }, 2000);
                // }
            }).catch((err) => {

                Snackbar.show({
                    backgroundColor: 'red',
                    text: 'Login Failed',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        text: 'Ok',

                        textColor: 'white',

                        //   onPress: () => { /* Do something. */ },
                    },
                })
            })
        } else {
            Snackbar.show({
                text: "Email & Password Can't be null",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'Ok',
                    textColor: 'white',
                    backgroundColor: 'red'
                    //   onPress: () => { /* Do something. */ },
                },
            })
        }
        // let key = firestore().collection("USER").doc().id;
        // let obj = {
        //     Email: Email,
        //     Password: Password,
        //     key: key
        // }
        // firestore().collection("USER").doc(key).set(obj)
        //     .then((data) => {
        //         console.log("user add")
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

    }
    const getLogin = async () => {
        const loginCheck = await AsyncStorage.getItem("userId");
        console.log("Login Check", loginCheck);


        try {
            // const parsedLoginCheck = JSON.parse(loginCheck);
            if (loginCheck) {
                navigation.navigate("Main");
            } else {
                navigation.navigate("Login");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            // Handle the error, e.g., navigate to the login screen
            // navigation.navigate("login");
        }
    }

    React.useEffect(() => {
        getLogin()
    }, [])


    const googleSigninFunc = async () => {
        try {
            // Ensure Google Play Services are available
            await GoogleSignin.hasPlayServices();

            GoogleSignin.configure({

                webClientId: '593657592722-vvpt5askct264584jr735b4ndcujnpdk.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
                hostedDomain: '', // specifies a hosted domain restriction
                forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
                accountName: '',
            });

            const userInfo = await GoogleSignin.signIn();
            console.log('helo'+userInfo)
            const { idToken, user } = userInfo;
            
            // Save user data to Firestore
            const userDocRef = firestore().collection("User").doc(user.id);
        await userDocRef.set({
            Name: user.name,
            Email: user.email,
            key: user.id,
            authProvider: 'gmail', // Add authProvider field to indicate Gmail authentication
        });

        const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredentials);

        } catch (error) {
            console.error('Google Sign-In Error:', error);

        }
    };
    async function googleSignin() {
        googleSigninFunc().then(data => {
            console.log('users data ', data)
            navigation.navigate('Main')
        })
    }

    return (
        
        <ImageBackground source={require("../assets/Images/login.jpg")} style={{ width: `100%`, height: `100%` }} >

            <View >

                <View style={styles.mainDiv}>
                    <View>
                        <Text style={styles.heading}>
                            LOGIN
                        </Text>
                    </View>

                    <View style={styles.group}>
                        <TextInput
                            style={styles.input}
                            value={Email}
                            onChangeText={text => setEmail(text)}
                            right={<TextInput.Icon icon="email" />}


                        />
                        <Text style={styles.label}> Email </Text>
                        <View style={styles.bar}></View>
                        <View style={styles.highlight}></View>
                    </View>

                    <View style={styles.group}>
                        <TextInput
                            style={styles.input}
                            right={secureText ?
                                <TextInput.Icon icon="eye" onPress={() => setsecureText(false)} /> :
                                <TextInput.Icon icon="eye-off" onPress={() => setsecureText(true)} />
                            }
                            secureTextEntry={secureText}

                            value={Password}
                            onChangeText={text => setPassword(text)}


                        />
                        <Text style={styles.label}> Password</Text>
                        <View style={styles.bar}></View>
                        <View style={styles.highlight}></View>
                    </View>

                </View>

                <View style={styles.container}>
                    <View style={styles.otherLogin}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={googleSignin}
                        >
                            <Icon name="google" size={20} color="#FFF" style={{ marginRight: 8 }} />
                            <Text style={{ color: 'white' }}>Sign in with Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Button
                            icon="login"
                            mode="contained"
                            onPress={LoginApp}
                            style={{ marginTop: 25, color: 'white', backgroundColor: '#2B29A6' }}
                        >
                            Login
                        </Button>
                    </View>
                </View>

                <View style={styles.signUpHere}>
                    <Text style={{ marginRight: 10, color: '#000' }}>
                        Don't have account
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{ color: "#52CFE0", fontWeight: "bold" }}>
                            Sign Up here
                        </Text>
                    </Pressable>
                </View>


            </View>

        </ImageBackground>

    )
}

export default Login


const styles = StyleSheet.create({


    heading: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Outfit-VariableFont_wght",
        // fontWeight: ""
        borderBottomWidth: 1,

        fontSize: 25, textAlign: 'center', fontFamily: "Poppins-Bold", color: '#0077b6',
        marginBottom: 30,
    },
    mainDiv: {
        margin: 'auto',
        alignItems: 'center',
        width: `100%`,
        marginTop: `50%`,
        justifyContent: 'center'
    },

    otherLogin: {

        padding: 10,
        borderRadius: 30,
        marginTop: 20,
        textAlign: 'center',
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
        margin: 20,
        // borderBlockColor: "black",
        // borderWidth: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },



    // 
    group: {
        position: 'relative',
        marginBottom: 50,
    },
    input: {
        fontSize: 16,
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
        fontSize: 18,
        fontWeight: 'normal',
        position: 'absolute',
        pointerEvents: 'none',
        left: 5,
        top: 0,
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