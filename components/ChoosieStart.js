import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';
import ChoiceCard from './ChoiceCard'
import TurnMechanism from './TurnMechanism'
import { Card } from 'react-native-elements';

class ChoosieStart extends Component {

    state = {
        choiceSet : [], 
        cuisines : [], 
        chooserNames : [],
        delivery : true, 
        numChoosers : 0, 
        lat : '', 
        lng : '', 
    }

    componentDidMount(){
        const { choiceSet, cuisines, chooserNames, delivery, numChoosers, lat, lng } = this.props.route.params.data 
        const nameArray = Object.values(chooserNames).filter(name => name.length > 0)

        this.setState({
            choiceSet : choiceSet, 
            cuisines : cuisines, 
            chooserNames : nameArray, 
            delivery : delivery, 
            numChoosers : numChoosers, 
            lat : lat, 
            lng : lng,
            turnCount : 0
        })
    }

    renderChoices = () => {
        return this.state.cuisines.map((choice, idx) => {
            return (<View>
                <ChoiceCard key={idx} name={choice.name} whenPressed={() => this.handleChoiceSelect(choice.name)}/>
                </View> 
            )
        })
    }

    handleChoiceSelect = (cuisineName) => {
        this.setState({
            choiceSet : this.state.choiceSet.filter(choice => choice.name !== cuisineName),
            turnCount : this.state.turnCount + 1 
        })
    }

    moveForward = () => {
        this.props.navigation.navigate('ChoosieFinish', { data : this.state})    
    }

    render() {
        return (
           <View style={{width: "100%", height: "100%", backgroundColor: "rgb(45, 48, 71)" }}>
               <Card containerStyle={{backgroundColor: "#EBF5FF", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5}}>
               <TurnMechanism
                    chooserNames={this.state.chooserNames}
                    turnCount={this.state.turnCount}
               />
               </Card>
               { this.renderChoices() }
               { this.state.turnCount === 7 ? this.moveForward() : null }
           </View>
        );
    }
}

export default ChoosieStart;
