import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Components/Home';
import About from '../Components/SettingScreen/About';
import DrawerContent from './DrawerContent';
import Privacy from '../Components/SettingScreen/Privacy';
import TermsAndCondition from '../Components/SettingScreen/TermsAndCondition';
import RequestScreen from '../Components/Donate-Request/RequestScreen';
import DonateScreen from '../Components/Donate-Request/DonateScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigation({ navigation }) {


    return (

        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Donation" component={DonateScreen} />
            <Drawer.Screen name="Request" component={RequestScreen} />
            <Drawer.Screen name="privacy" component={Privacy} />
            <Drawer.Screen name="terms" component={TermsAndCondition} />
        </Drawer.Navigator>


    );
}