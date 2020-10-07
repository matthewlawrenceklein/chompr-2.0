import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';


class TurnMechanism extends Component {

    state = {
        currentShuffle : [],
        counter : 15, 
    }

    shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    countdown = () => {
        this.interval = setInterval(() => {
            this.setState({
                counter : this.state.counter - 1
            })
        }, 1000)
     }

    componentDidMount(){
        const shuffledChoosers = this.shuffle(this.props.chooserNames)
        this.setState({
            currentShuffle : shuffledChoosers,
            counter : 15,
        })
        this.countdown()
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.turnCount !== this.props.turnCount || this.state.counter === 0){
            clearInterval(this.interval)
            this.componentDidMount()
        } 
    }

    render() {
        return (
            <View>
                <Text> YOU HAVE {this.state.counter} SECONDS </Text>
                <Text> {this.state.currentShuffle[0]}'s TURN</Text>
            </View>
        );
    }
}

export default TurnMechanism;
