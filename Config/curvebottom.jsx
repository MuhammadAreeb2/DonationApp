import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/AntDesign';
import RequestScreen from '../Components/Donate-Request/RequestScreen';
import DonateScreen from '../Components/Donate-Request/DonateScreen';
import Videopost from '../Components/HomeScreen/Videopost';
import TextPost from '../Components/HomeScreen/TextPost';

const CustomBar = ({ navigation }) => {

    const _renderIcon = (routeName, selectedTab) => {
        let icon = '';
        let text = '';

        switch (routeName) {

            case 'Post':
                icon = 'heart';
                text = 'Post';
                break;
            case 'Video':
                icon = 'inbox';
                text = 'Video';
                break;

        }

        return (
            <View style={styles.iconContainer}>
                <Ionicons
                    name={icon}
                    size={25}
                    color={routeName === selectedTab ? 'red' : 'blue'}
                />
                <Text style={{ color: routeName === selectedTab ? 'red' : 'blue' }}>{text}</Text>
            </View>
        );
    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => {


                    navigate(routeName);

                }}
                style={styles.tabbarItem}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        );
    };

    return (
        <CurvedBottomBarExpo.Navigator
            type="DOWN"
            style={styles.bottomBar}
            shadowStyle={styles.shawdow}
            height={55}
            circleWidth={50}
            bgColor="#caf0f8"
            initialRouteName="home"
            borderTopLeftRight
            renderCircle={({ selectedTab, navigate }) => (
                <Animated.View style={styles.btnCircleUp}>
                    <TouchableOpacity
                        style={styles.button}

                    >
                        <Ionicons name={'pluscircle'} color="gray" size={25} />
                    </TouchableOpacity>
                </Animated.View>


            )}
            tabBar={renderTabBar}
        >

            <CurvedBottomBarExpo.Screen
                name="Video"
                component={Videopost}
                options={{ headerShown: false }}
                position="RIGHT"
            />
            <CurvedBottomBarExpo.Screen
                name="Post"
                component={TextPost}
                position="LEFT"
                options={{ headerShown: false }}
            />

        </CurvedBottomBarExpo.Navigator>
    );
};

export default CustomBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    shawdow: {
        shadowColor: '#DDDDDD',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {},
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 30,
        height: 30,
    },
    screen1: {
        flex: 1,
        backgroundColor: '#BFEFFF',
    },
    screen2: {
        flex: 1,
        backgroundColor: '#FFEBCD',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
