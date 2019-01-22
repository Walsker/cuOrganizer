// React Native imports
import React, {Component} from 'react';
import {View} from 'react-native';

export default class Divider extends Component
{
    render()
    {
        return (
			<View style =
			{{
				height: 1.2,
				marginVertical: 25,
				marginHorizontal: 50,
				backgroundColor: this.props.color
			}}/>
		);
    }
}