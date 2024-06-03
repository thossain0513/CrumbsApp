import React, { useState, useRef } from 'react';
import { Button, View } from 'react-native';
import { Audio } from 'expo-av';
import { sendAudio } from '../helpers';

const VoiceToTextButton = ({ onTranscription }) => {
    const [recording, setRecording] = useState(null);
    const hasSpokenRef = useRef(false);
    const silenceTimeoutRef = useRef(null);

    const startRecording = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') return;

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

        recording.setOnRecordingStatusUpdate((status) => {
            if (status.metering > -20) { // Adjust the threshold as necessary
                hasSpokenRef.current = true;
                if (silenceTimeoutRef.current) {
                    clearTimeout(silenceTimeoutRef.current);
                    silenceTimeoutRef.current = null;
                }
            } else if (hasSpokenRef.current) {
                if (!silenceTimeoutRef.current) {
                    silenceTimeoutRef.current = setTimeout(() => {
                        stopRecording(recording);
                    }, 1000); // 1 second of silence
                }
            }
        });

        await recording.startAsync();
        setRecording(recording);
        hasSpokenRef.current = false; // Reset hasSpokenRef when starting a new recording
    };

    const stopRecording = async (recording) => {
        if (!recording) return;
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        hasSpokenRef.current = false; // Reset hasSpokenRef after stopping the recording
        sendAudio(uri, onTranscription);
    };

    return (
        <View>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? () => stopRecording(recording) : startRecording}
            />
        </View>
    );
};

export default VoiceToTextButton;
