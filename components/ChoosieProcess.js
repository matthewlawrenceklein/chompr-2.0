import React, { Component } from 'react';
import { ScrollView, FlatList, View, Button, Text, TextInput, Switch, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; 
import Slider from '@react-native-community/slider';


class ChoosieProcess extends Component {

    state={
        lat : '', 
        lng : '', 
        numChoosers : 1,
        // chooserNames : {},
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
            return <TextInput placeholder='hey everyone ok' defaultValue={`Chooser ${idx + 1}'s name`} key={idx} id={idx} onChangeText={(text) => this.handleChangeName(text, idx) } />
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
            <View>
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
                            key: 'AIzaSyDH44dKqH6vI3l222pyIXtWOi9aCqfLSRU',
                            language: 'en',
                            types: 'geocode'
                        }}
                        currentLocation={false}
                        currentLocationLabel='Current location'
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                    />
                </ScrollView>
                <View style={styles.container}>
                    <Button title='-' onPress={ this.state.numChoosers === 1 ? null : () => this.handleNumChange(-1)}></Button>
                    <Text>{this.state.numChoosers}</Text>
                    <Button title='+' onPress={this.state.numChoosers === 4 ? null : () => this.handleNumChange(1)}></Button>
                </View>
                <View style={styles.container}>
                    {this.renderNameFields()}
                </View>
                <View style={styles.container}>
                    <Switch
                         trackColor={{ false: "#767577", true: "#81b0ff" }}
                         thumbColor={this.state.delivery ? "#f5dd4b" : "#f4f3f4"}
                         onValueChange={this.handleDelivery}
                         value={this.state.delivery}
                    />

                    { !this.state.delivery ? 
                        <View>
                            <Slider
                                style={{width: 200, height: 40}}
                                value={5}
                                step={1}
                                minimumValue={1}
                                maximumValue={15}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                // onSlidingComplete={value => this.setState({takeoutDistanceMiles: value})}
                                onValueChange={value => this.setState({takeoutDistanceMiles: value})}
                            /> 
                            <Text>Takeout Distance : {this.state.takeoutDistanceMiles} miles</Text>
                        </View>
                        :
                        null 
                    }
                </View>
                <View> 
                    <Button 
                        title='LETS GO'
                        onPress={ this.state.lng && this.state.chooserNames ? () => this.props.navigation.navigate('ChoosieStart', { data : this.state}) : null}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 20
    }
  });




export default ChoosieProcess
