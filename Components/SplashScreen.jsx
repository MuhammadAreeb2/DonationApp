import React from 'react';
import { View, Text ,ImageBackground} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

function SplashScreen({ navigation }) {
    const progress = useSharedValue(0);

    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace('GetStartedScreen');
        }, 3000);

        // Animate the text and LottieView opacity
        progress.value = withTiming(1, { duration: 1000, easing: Easing.ease });
    }, []);

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            transform: [{ translateY: progress.value * 20 }],
        };
    });

    const animatedLottieStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
        };
    });

    return (
        <>
            <ImageBackground source={require("../assets/Images/splash.jpg")} style={{ width: `100%`, height: `100%`, }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.Text style={[{ fontSize: 25, marginBottom: 5, color: '#48cae4' }, animatedTextStyle]}>
                        Donation
                    </Animated.Text>
                    <Animated.Text style={[{ fontSize: 22, marginBottom: 5, color: 'green' }, animatedTextStyle]}>
                        Hub
                    </Animated.Text>
                    <Animated.View style={[animatedLottieStyle]}>
                        <LottieView
                            style={{ width: 500, height: 200 }}  // Adjust the width and height as needed
                            source={require('./AnimationSplash/SplashAnimation.json')}
                            autoPlay
                        />
                    </Animated.View>
                </View>
                </ImageBackground>
            </>
            );
}

            export default SplashScreen;
