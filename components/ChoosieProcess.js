import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; 
import { Card } from 'react-native-elements';
import Slider from '@react-native-community/slider';

class ChoosieProcess extends Component {

    state={
        lat : '', 
        lng : '', 
        numChoosers : 1,
        delivery : true,
        choiceSet : [], 
        cuisines : [],
        takeoutDistanceMiles : 1
    }

    componentDidMount(){
        this.getCuisines()
    }

    handleNumChange = (change) => {
        this.setState({
            numChoosers : this.state.numChoosers + change 
        })
    }

    handleChangeName = (name, idx) => {
        this.setState({
            chooserNames : {...this.state.chooserNames, [idx] : name} 
        })
        console.log(this.state.chooserNames)
    }

    renderNameFields = () => {
        let arr = []
        for(let i = 0; i < this.state.numChoosers; i++){
            arr.push('hi')
        }
        return arr.map((chooser, idx) => {
            return <TextInput style={{fontSize: 29, alignContent: "center", justifyContent: "center", textAlign: "center"}} placeholder='hey everyone ok' defaultValue={`chooser ${idx + 1}'s name`} key={idx} id={idx} onChangeText={(text) => this.handleChangeName(text, idx) } />
        })
    }

    handleDelivery = () => {
        this.setState({
            delivery : !this.state.delivery
        })    
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

    getCuisines = () => {
        let arrayOfCuisineTypes = []
        const cuisines = [
             {
                name : 'Vietnamese', 
                id : 99,
                image : ''
            }, 
           {
               name : 'Vegetarian', 
               id:  308,
               image : ''
            },
            {
                name : 'Turkish',
                id : 142,
                image : ''
            }, 
            {
                name : 'Thai',
                id : 95,
                image : ''
            },
            {
                name : "Sushi",
                id :177, 
                image : ''
            },
            {
                name : 'Steak',
                id : 141, 
                image : ''
            },
            {
                name : 'Spanish',
                id : 89, 
                image : ''
            },
            {
                name : 'Sandwich',
                id : 304, 
                image : ''
            },
            // "Southern" : 471, 
            // "South American" : 972, 
            // "Seafood" : 83, 
            // "Salad" : 998, 
            // "Ramen" : 320,
            // "Pub Food" : 983,
            // "Pizza" : 82
            // TODO implement user input distance in meters (or convert to meters)
        ]
        let shuffled = this.shuffle(cuisines)
        for(let i = 0; i < 8; i++){
            arrayOfCuisineTypes.push(shuffled[i])
        }
        this.setState({
            choiceSet : arrayOfCuisineTypes,
            cuisines : arrayOfCuisineTypes
        })
    }

    handleMoveToStart = () => {
        this.props.navigation.navigate('ChoosieStart', { data : this.state})
    }

    render() {
        return (
            <View style={{width: "100%", height: "100%", backgroundColor: "rgb(98, 131, 149)" }}>
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5 }}>
                <ScrollView  keyboardShouldPersistTaps='always'>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details) => {
                            this.setState({
                                lat : details.geometry.location.lat, 
                                lng: details.geometry.location.lng
                            })
                            }
                        }

                        query={{
                            key: '',
                            language: 'en',
                            types: 'geocode'
                        }}
                        currentLocation={false}
                        currentLocationLabel='Current location'
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                    />
                </ScrollView>
                </Card>
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5, justifyContent: "center", textAlign: "center", alignItems: "center"}}>
                    <Text style={{justifyContent: "center", textAlign: "center", fontSize: 16, paddingBottom: 6 }}> {this.state.delivery ? 'Delivery' : 'Takeout'}</Text>
                    <View style={{justifyContent: "center", textAlign: "center", alignItems: 'center'}}>
                        <Switch 
                            trackColor={{ true: "#767577", false: "rgb(98, 131, 149)" }}
                            thumbColor={this.state.delivery ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={this.handleDelivery}
                            value={this.state.delivery}
                        />
                    </View>
                       { !this.state.delivery ? 
                        <View containerStyle={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            <Slider
                                style={{width: 200, height: 40, }}
                                value={5}
                                step={1}
                                minimumValue={1}
                                maximumValue={15}
                                minimumTrackTintColor="rgb(98, 131, 149)"
                                maximumTrackTintColor="#FFFFFF"
                                // onSlidingComplete={value => this.setState({takeoutDistanceMiles: value})}
                                onValueChange={value => this.setState({takeoutDistanceMiles: value})}
                            /> 
                            <Text>Takeout Distance : {this.state.takeoutDistanceMiles} miles</Text>
                        </View>
                        :
                        null 
                    }
                </Card>
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5}}>
                    <Card containerStyle={{backgroundColor: "rgb(45, 48, 71)", borderRadius: 10, padding: 0}}><Button title='-' onPress={ this.state.numChoosers === 1 ? null : () => this.handleNumChange(-1)}></Button></Card>
                    <Card containerStyle={{backgroundColor: "#EDD9A3",  borderWidth: 0, shadowColor: 'rgba(0,0,0, 0.0)', padding: 0, paddingBottom: -5, marginBottom: -8}}><Card.Title h4>{this.state.numChoosers}</Card.Title></Card>
                    <Card containerStyle={{backgroundColor: "rgb(45, 48, 71)", borderRadius: 10, padding: 0}}><Button title='+' onPress={this.state.numChoosers === 4 ? null : () => this.handleNumChange(1)}></Button></Card>
                </Card>

                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5}}>
                    {this.renderNameFields()}
                </Card>
                <Card containerStyle={{backgroundColor: "#EDD9A3", borderRadius:10, borderColor: "#CC8B8C", borderWidth: 5}}>
                <Card containerStyle={{backgroundColor: "rgb(45, 48, 71)", borderRadius: 10}}>
                    <Button 
                        title='LETS GO'
                        onPress={ this.state.lng && this.state.chooserNames ? () => this.props.navigation.navigate('ChoosieStart', { data : this.state}) : null}
                    />
                    </Card>
                </Card>
            </View>
        );
    }
}


export default ChoosieProcess
