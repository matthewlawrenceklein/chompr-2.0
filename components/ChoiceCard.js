import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';


class ChoiceCard extends Component {

    state = {
        removed : false 
    }

    handlePress = () => {
        this.props.whenPressed()
        this.setState({
            removed : true 
        })
    }


    render() {
        return (
            <View>
                <Text onPress={this.state.removed ? null : this.handlePress}>{ this.state.removed ? 'IVE BEEN REMOVED' : this.props.name }</Text>
            </View>
        );
    }
}

export default ChoiceCard;
