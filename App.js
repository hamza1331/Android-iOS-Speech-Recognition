import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Voice from 'react-native-voice';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
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
        {this.state.results.map((result, index) => <Text key={index} style={styles.transcript}> {result}</Text>
        )}
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