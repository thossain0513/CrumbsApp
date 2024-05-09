from flask import Flask, request, jsonify
import whisper
import os

app = Flask(__name__)

# Load the Whisper model; you can choose 'tiny', 'base', 'small', 'medium', or 'large'
model = whisper.load_model("base")

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the audio file temporarily
    audio_path = "/tmp/audio_to_transcribe.wav"
    file.save(audio_path)

    try:
        # Use Whisper to transcribe the audio
        result = model.transcribe(audio_path)
        transcript = result['text']

        # Return the transcription
        return jsonify({'transcript': transcript})
    finally:
        # Ensure the file is deleted after processing
        if os.path.exists(audio_path):
            os.remove(audio_path)
            
        # Return the transcription
        return jsonify({'transcript': transcript})

if __name__ == '__main__':
    print('app running')
    app.run(host='0.0.0.0', port=8080, debug=True)
