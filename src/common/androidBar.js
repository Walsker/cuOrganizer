import React, {Component} from 'react';
import {View, StatusBar, Platform} from 'react-native';

export default class AndroidBar extends Component
{
	render()
	{
		return(
			<View style =
			{{
				backgroundColor: this.props.color,
				height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
			}}/>
		);
	}
}