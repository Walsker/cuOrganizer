// React imports
import React from 'react';

// React Navigation imports
import {createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';

// Routes
import SignInPage from './signInScreen/signInPage';

const RootNavigator = createSwitchNavigator(
{
	"SignIn": {screen: SignInPage}
},
{
	initialRouteName: "SignIn"
});

export default createAppContainer(RootNavigator);