import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { dates,events,weekdays,keywords, months,dayNames } from "./Data";
import Voice from 'react-native-voice';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      fragments:''
    };
Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
    var fragments = e.value.join()
    this.setState({
      fragments
    })
    let frag = fragments.trim().split(/\s+/)
    let valid = keywords.find((word)=>{
      return frag.includes(word)?true:false
    })
    console.log(valid)
    if(valid){
      let cmd = {}
      frag.forEach(word=>{

        let weekday = weekdays.find((week)=>word.toLowerCase()===week)
        if(weekday){
          cmd.weekday=weekday
        }
        let date = dates.find(date=>date==word)
        if(date){
          cmd.date = date
        }
        let month = months.find(m=>m===word.toLowerCase())
        if(month){
          cmd.month = month
        }
        let indexOfFor = word.indexOf("for")
        let persons = word[+indexOfFor]
        if(persons){
          cmd.persons = persons
        }
        let event = events.find(e=>e===word.toLowerCase())
        if(event){
          cmd.event = event
        }
        else{
          cmd.event = "general"
        }
        let dayName = dayNames.find(day=>day===word.toLowerCase())
        if(dayName){
          cmd.dayName = dayName
        }
      })
      console.log(cmd)
      }
      else{
        Alert.alert('Failed',"Couldn't Recognize Commmand")
      }
  }
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
render () {
    return (
      <View style={{flex:1,alignContent:'center',alignItems:'center'}}>

        <Text style={styles.transcript}>
            Transcripts
        </Text>
        {/* {this.state.results.map((result, index) => <Text key={index} style={styles.transcript}> {result}</Text>
        )} */}
        {this.state.fragments.length>0&&<Text style={styles.transcript}>{this.state.fragments}</Text>}
        <TouchableOpacity
       style={{
         borderWidth:1,
         borderColor:'rgba(1,0,0,0.2)',
         alignItems:'center',
         justifyContent:'center',
         width:70,
         position: 'relative',                                          
         height:70,
         backgroundColor:'lightblue',
         borderRadius:100,
         
        }}
        onLongPress={this._startRecognition.bind(this)}
        >
 <Text>Listen</Text>
  </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: 'darkblue',
    marginBottom: 10,
    top: '40%',
    fontSize:22
  },
});