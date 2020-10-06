import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';

class ChoosieFinish extends Component {

    componentDidMount(){
    const { choiceSet, delivery, lat, lng } = this.props.route.params.data 
    console.log(choiceSet, delivery, lat, lng)

    // TODO do fetch req here
    // TODO render out a final option card  
    }
    render() {
        return (
            <View>
                <Text>we did it</Text>
            </View>
        );
    }
}

export default ChoosieFinish;
