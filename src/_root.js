// React Native imports
import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Redux imports
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './_rootReducer';

// Redux Persist imports
// import {persistStore} from 'redux-persist';
// import {PersistGate} from 'redux-persist/integration/react'

// Firebase imports
import firebase from '@firebase/app';
import firebaseConfig from 'cuOrganizer/firebaseConfig';

// Custom imports
import {colors, containerStyle} from 'cuOrganizer/src/common/appStyles';
import RootNavigator from './_rootNavigator';

export default class Root extends Component
{
	componentDidMount()
	{
		SplashScreen.hide();
		firebase.initializeApp(firebaseConfig);
	}

	render()
	{
		const store = createStore(rootReducer);
		// const persistor = persistStore(store);
		// persistor.purge();

		return (
			<SafeAreaView style = {localStyle.background}>
				<StatusBar
					translucent
					animated = {true}
					barStyle = 'light-content'
					backgroundColor = 'transparent'
				/>
				<Provider store = {store}>
					{/* <PersistGate loading = {<View style = {localStyle.background}/>} persistor = {persistor}> */}
						<View style = {containerStyle.default}>
							<RootNavigator/>
						</View>
					{/* </PersistGate> */}
				</Provider>
			</SafeAreaView>
		);
	}
}

const localStyle = StyleSheet.create(
{
	background: {flex: 1, backgroundColor: colors.primaryColor}
});

// This disables the timer warning as a result of using the web sdk of firebase. Keep checking for a fix for this
console.ignoredYellowBox = ["Setting a timer"];