// React imports
import React from 'react';

// React Navigation imports
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

// Routes
import LoadingPage from './loadingScreen/loadingPage';
import SignInPage from './signInScreen/signInPage';
import MenuPage from './menuScreen/menuPage';
import ScannerPage from './scannerScreen/scannerPage';

const MainNavigator = createStackNavigator(
{
	"Menu": {screen: MenuPage},
	"Scanner": {screen: ScannerPage}
},
{
	headerMode: 'none',
	initialRouteName: "Menu"
});

const RootNavigator = createSwitchNavigator(
{
	"Loading": {screen: LoadingPage},
	"SignIn": {screen: SignInPage},
	"Main": MainNavigator
},
{
	initialRouteName: "Loading"
});

export default createAppContainer(RootNavigator);