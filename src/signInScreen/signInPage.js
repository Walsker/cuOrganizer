// React Native imports
import React, {Component} from 'react';
import {Text, View} from 'react-native';

// Custom imports
import {colors, containerStyle, textStyle} from 'cuOrganizer/src/common/appStyles';
import {AndroidBar, Button, TextField} from 'cuOrganizer/src/common';

export default class SignInPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            fullNameText: ""
        }
    }

    generatePadding()
    {
        return (
            <View style = {{flex: 0.1}}>
                <AndroidBar/>
            </View>
        );
    }
    
    render()
    {
        return (
            <View style = {containerStyle.form}>
                {this.generatePadding()}
                <View style = {containerStyle.formSection}>
                    <Text style = {textStyle.regular(28, 'center')}>Sign In</Text>
                </View>
                <View style = {containerStyle.formSection}>
                    <TextField
						fontSize = {24}
						label = "Full Name"
						textAlign = 'center'
						textColor = {colors.primaryTextColor}
						autoFocus = {true}
						maxLength = {30}
						onChangeText = {(newText) => this.setState({courseName: newText})}
						// onSubmitEditing = {submit}
						placeholder = "Wal Wal"
					/>
                </View>
                <View style = {containerStyle.formSection}>
                    <Button
                        label = "Submit"
                        color = 'white'
                        inverted = {true}
                        action = {() => {}}
                    />
                </View>
            </View>
        );
    }
}