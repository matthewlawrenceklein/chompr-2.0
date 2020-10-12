import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

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
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5}}><Text style={{fontSize: 24, fontWeight: 'bold', color: "rgb(45, 48, 71)"}} onPress={this.state.removed ? null : this.handlePress}> { this.state.removed ? <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: "#CC8B8C"}}>{this.props.name}</Text> : <Text>{this.props.name}</Text> }</Text></Card>
            </View>
        );
    }
}

export default ChoiceCard;
