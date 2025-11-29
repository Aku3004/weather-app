import React, { useEffect } from "react";

const VoiceSearch = ({ onSearch }) => {
  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const city = event.results[0][0].transcript;
      onSearch(city);
    };
  };

  return (
    <button
      onClick={handleVoice}
      className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md"
    >
      🎤 Voice
    </button>
  );
};

export default VoiceSearch;
