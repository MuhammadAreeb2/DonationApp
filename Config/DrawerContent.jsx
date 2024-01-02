import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Text, Drawer, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DrawerContentMain = [
    { name: 'home', title: 'Home', color: 'white', path: 'Home', subMenus: ['Videopost', 'Post'] },
    { name: 'cash', title: 'Donation Form', color: 'white', path: 'Donation' },
    { name: 'gesture-tap', title: 'Request Form', color: 'white', path: 'Request' },

];

const SettingSubMenu = [
    { title: 'Terms', path: 'terms', name: 'file-document', icon: 'file-document' },
    { title: 'About Us', path: 'About', name: 'about', icon: 'information' },
    { title: 'Privacy Policy', path: 'privacy', name: 'privacy', icon: 'shield' },
];

function DrawerContent(props) {
    const [Data, setData] = useState();
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        GetData();
    }, []);

    const GetData = async () => {
        try {
            const loginCheck = await AsyncStorage.getItem('userId');
            console.log('Check ', loginCheck);

            if (loginCheck) {
                const userDocument = await firestore().collection('User').doc(loginCheck).get();
                const userData = userDocument.data(); // Access data using data() method
                console.log(userData);

                if (userData) {
                    setData(userData);
                    console.log(userData);

                    console.log(userData);
                }
            } else {
                // Handle the case when there is no user data or user is not logged in
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };


    const Logout = async () => {
        try {
            await AsyncStorage.setItem('userId', '');
            // You may need to implement the actual sign-out logic here based on your authentication method

            navigation.navigate('Login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    const handleDrawerItemPress = (path) => {
        setIsSettingOpen(false); // Close the submenu if open
        props.navigation.closeDrawer(); // Close the drawer
        props.navigation.navigate(path); // Navigate to the selected screen
    };

    const toggleSettingSubMenu = () => {
        setIsSettingOpen(!isSettingOpen);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <DrawerContentScrollView {...props}>
                    <ImageBackground
                        source={{
                            uri:
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMGxfpI1Xx_KApN8u-gOQg91QOV5tcgUa25w&usqp=CAU',
                        }}
                        style={styles.imageBackground}
                    >
                        <View style={styles.avatarContainer}>
                            <Avatar.Image
                                size={80}
                                color="white"
                                source={{
                                    uri: !Data?.Img
                                        ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspS_ukYMLvsWX4vPkC7PcTiCqJYIASaWapw&usqp=CAU'
                                        : Data?.Img,
                                }}
                                style={styles.avatarImage}
                            />
                            <View style={styles.userInfo}>
                                <Title style={styles.title}>{Data?.Name ? Data?.Name : ' '} </Title>
                                <Caption style={styles.caption}>{Data ? Data?.Email : ''}</Caption>
                            </View>
                        </View>
                    </ImageBackground>

                    <Drawer.Section style={styles.drawerSection}>
                        {DrawerContentMain.map((item, index) => (
                            <Drawer.Item
                                key={index}
                                icon={item.name}
                                label={item.title}
                                onPress={() => props.navigation.navigate(item.path)}
                            />
                        ))}
                    </Drawer.Section>
                    <Drawer.Section title="Setting" onPress={toggleSettingSubMenu}>
                        {SettingSubMenu.map((item, index) => (
                            <Drawer.Item
                                key={index}

                                label={item.title}
                                icon={item.icon}

                                onPress={() => handleDrawerItemPress(item.path)}
                                style={{ display: 'flex', marginLeft: '10%' }}
                            />
                        ))}
                    </Drawer.Section>

                </DrawerContentScrollView>

                <Drawer.Section style={styles.bottomDrawerSection}>
                    <Drawer.Item
                        label="Logout"
                        style={{ color: 'red' }}
                        icon="logout"
                        onPress={() => Logout()}
                    />
                </Drawer.Section>
            </View>
        </ScrollView>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: 220,
        marginTop: '-2%',
        padding: 0,
    },
    avatarContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '12%',
        marginLeft: '10%',
    },
    avatarImage: {
        resizeMode: 'contain',
    },
    userInfo: {
        marginLeft: 15,
        marginTop: 25,
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '-15%',
    },
    caption: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    drawerSection: {
        marginTop: 10,
        backgroundColor: "#9dca33",

        color: 'white'
    },
    bottomDrawerSection: {
        position: 'relative',
        bottom: 0,
      
    },
});
