from flask import Flask, request, send_file, jsonify
import requests
import io
from flask_cors import CORS
import traceback
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("ELEVENLABS_API_KEY")
#VOICE_ID = "Mmepzv6cBqMI22R2YaXy"
VOICE_ID = "AW5wrnG1jVizOYY7R1Oo"

@app.route("/tts", methods=["POST"])
def generate_tts():
    print("🔥🔥🔥 진짜로 실행되었는지 확인 중!")
    try:
        print("📥 요청 도착!")

        if not request.is_json:
            print("❌ JSON 아님! request.is_json = False")
            return jsonify({"error": "Invalid content type"}), 400

        body = request.get_json()
        print("📄 JSON 본문:", body)

        text = body.get("text")
        print(f"📥 받은 텍스트: '{text}'")

        if not text:
            return jsonify({"error": "text is required"}), 400

        url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": API_KEY
        }

        data = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "speed":1.03,
                "stability": 0.79,
                "similarity": 0.93
            }
        }

        print("📡 ElevenLabs에 요청 중...")
        response = requests.post(url, json=data, headers=headers)
        print(f"🔁 응답 코드: {response.status_code}")
        print(f"📦 응답 길이: {len(response.content)} bytes")
        if response.status_code != 200:
            return jsonify({"error": "TTS failed", "details": response.text}), 500

        return send_file(io.BytesIO(response.content), mimetype='audio/mpeg')

    except Exception as e:
        print("🔥 예외 발생:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 TTS 서버 실행 중: http://localhost:5001/tts")
    app.run(host="0.0.0.0", port=5001)
