import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

const VoiceToTextButton = ({ onTranscription }) => {
    const [recording, setRecording] = useState(null);
    console.log("got called");

    const startRecording = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') return;

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setRecording(recording);
    };

    const stopRecording = async () => {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        sendAudio(uri);
    };

    const sendAudio = async (uri) => {
        const formData = new FormData();
        formData.append('file', {
          uri,
          type: 'audio/wav',
          name: 'speech.wav'
        });

        try {
            const response = await axios.post('http://10.0.0.5:8080/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.transcript);
            onTranscription(response.data.transcript);
        } catch (error) {
            console.error('Error sending audio file:', error);
        }
    };

    return (
        <View>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
        </View>
    );
};

export default VoiceToTextButton;
