// React imports
import React from 'react';

// React Navigation imports
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

// Routes
import LoadingPage from './loadingScreen/loadingPage';
import SignInPage from './signInScreen/signInPage';
import MenuPage from './menuScreen/menuPage';

const RootNavigator = createSwitchNavigator(
{
	"Loading": {screen: LoadingPage},
	"SignIn": {screen: SignInPage},
	"Menu": {screen: MenuPage}
},
{
	initialRouteName: "Loading"
});

export default createAppContainer(RootNavigator);