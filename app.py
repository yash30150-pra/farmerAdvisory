from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to call backend

# 🔑 Apna OpenAI API key yahan daalein
openai.api_key = "YOUR_OPENAI_API_KEY"

# ---------------- Text Question Endpoint ----------------
@app.route("/ask", methods=["POST"])
def ask():
    text = request.form.get("text")
    if not text:
        return jsonify({"answer": "❌ Please ask something!"})

    try:
        # GPT model se answer generate
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Ya gpt-4 agar available ho
            messages=[{"role": "user", "content": text}],
            temperature=0.7
        )
        answer = response['choices'][0]['message']['content']
        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"answer": f"❌ Error: {str(e)}"})

# ---------------- Image Upload Endpoint (Optional) ----------------
@app.route("/image", methods=["POST"])
def analyze_image():
    # Placeholder, tum apna model ya analysis code yahan add kar sakte ho
    return jsonify({"disease_prediction": "Sample analysis (replace with your model)"})

if __name__ == "__main__":
    app.run(debug=True)
