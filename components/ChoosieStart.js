import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';
import ChoiceCard from './ChoiceCard'

class ChoosieStart extends Component {

    state = {
        choiceSet : [], 
        cuisines : [], 
        chooserNames : {},
        delivery : true, 
        numChoosers : 0, 
        lat : '', 
        lng : '', 
    }

    componentDidMount(){
        const { choiceSet, cuisines, chooserNames, delivery, numChoosers, lat, lng } = this.props.route.params.data 
        this.setState({
            choiceSet : choiceSet, 
            cuisines : cuisines, 
            chooserNames : chooserNames, 
            delivery : delivery, 
            numChoosers : numChoosers, 
            lat : lat, 
            lng : lng,
            turnCount : 0
        })
    }

    renderChoices = () => {
        return this.state.cuisines.map((choice, idx) => {
            return ( 
                <ChoiceCard key={idx} name={choice.name} whenPressed={() => this.handleChoiceSelect(choice.name)}/> 
            )
        })
    }

    handleChoiceSelect = (cuisineName) => {
        this.setState({
            choiceSet : this.state.choiceSet.filter(choice => choice.name !== cuisineName),
            turnCount : this.state.turnCount + 1 
        })
        // <Text style={{ textDecorationLine: 'line-through' }}>    Strike Through the Text</Text>
    }

    moveForward = () => {
        this.props.navigation.navigate('ChoosieFinish', { data : this.state})    
    }

    // render out 8 cards 
    // render out a 'turn watcher container' that displays current chooser and a time clock 

    render() {
        return (
           <View>
               { this.renderChoices() }
               { this.state.turnCount === 7 ? this.moveForward() : null }
           </View>
        );
    }
}

export default ChoosieStart;
