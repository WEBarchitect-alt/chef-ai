import { getImage } from "../utils/getImage";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const navigate = useNavigate();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🎤 Voice
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech not supported ❌");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();
    setListening(true);

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setListening(false);

      setTimeout(() => handleSend(text), 500);
    };

    recognition.onerror = () => setListening(false);
  };

  const handleSend = async (voiceInput) => {
    const finalInput = voiceInput || input;
    if (!finalInput.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: finalInput },
    ]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ prompt: finalInput }),
      });

      const data = await res.json();

      let parsed;

      try {
        parsed = JSON.parse(data.reply);
      } catch (e) {
        console.error("Bad JSON:", data.reply);

        parsed = {
          recipes: [
            {
              title: "Fallback Recipe",
              time: "10 mins",
              servings: "1 person",
              difficulty: "Easy",
              calories: "200 kcal",
              ingredients: ["Try again"],
              steps: ["AI failed"],
            },
          ],
        };
      }

      setMessages((prev) => [
        ...prev,
        { type: "bot", data: parsed.recipes },
      ]);
    } catch (err) {
      console.error(err);
      alert("AI error ❌");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Chef</h1>

      {/* CHAT */}
      <div className="h-[70vh] overflow-y-auto space-y-6 mb-4">
        {messages.map((msg, i) => {
          if (msg.type === "user") {
            return (
              <div key={i} className="text-right">
                <div className="bg-red-600 inline-block px-4 py-2 rounded-lg">
                  {msg.text}
                </div>
              </div>
            );
          }

          if (msg.type === "bot") {
            return (
              <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {msg.data.map((recipe, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() =>
                      navigate(`/recipe/${encodeURIComponent(recipe.title)}`, {
                        state: recipe,
                      })
                    }
                  >
                    <img
                      src={getImage(recipe.title)}
                      alt={recipe.title}
                      className="h-[140px] w-full object-cover"
                      onError={(e) =>
                        (e.target.src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000")
                      }
                    />

                    <div className="p-3">
                      <h3 className="text-sm font-semibold">
                        {recipe.title}
                      </h3>

                      <div className="text-xs text-gray-400 mt-2 space-y-1">
                        <p>⏱ {recipe.time}</p>
                        <p>🍽 {recipe.servings}</p>
                        <p>🔥 {recipe.calories}</p>
                        <p>⚡ {recipe.difficulty}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          }

          return null;
        })}

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: paneer, bread..."
          className="flex-1 p-3 rounded bg-white text-black"
        />

        <button
          onClick={startListening}
          className={`px-4 py-2 rounded ${
            listening ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          🎤
        </button>

        <button
          onClick={() => handleSend()}
          className="bg-red-600 px-6 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}