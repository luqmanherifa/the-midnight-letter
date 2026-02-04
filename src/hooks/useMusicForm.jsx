import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const STEPS = [
  {
    id: "feeling",
    label: "Perasaan kamu saat ini",
    placeholder: "Apa yang kamu rasakan malam ini",
    type: "input",
  },
  {
    id: "lyrics",
    label: "Penggalan lirik yang tertinggal",
    placeholder: "Baris yang terus kembali di kepala",
    type: "auto-expand",
  },
  {
    id: "songTitle",
    label: "Nama lagu itu",
    placeholder: "Judul yang mengiringi perasaan ini",
    type: "input",
  },
  {
    id: "artist",
    label: "Siapa yang menyanyikan",
    placeholder: "Suara siapa yang kamu dengar",
    type: "input",
  },
];

export const useMusicForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    feeling: "",
    lyrics: "",
    songTitle: "",
    artist: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [isFromSuggestion, setIsFromSuggestion] = useState(false);
  const debounceTimer = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        setAudioPlayer(null);
      }
    };
  }, [audioPlayer]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current && currentStep === 1) {
      textareaRef.current.style.height = "50px";
      autoResizeTextarea();
    }
  }, [currentStep]);

  const currentField = STEPS[currentStep].id;
  const isLastStep = currentStep === STEPS.length - 1;
  const canProceed = formData[currentField].trim().length > 0;

  const searchSongs = async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSearchLoading(true);

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=8`,
      );
      const data = await response.json();

      if (data.results) {
        const uniqueSongs = [];
        const seen = new Set();

        for (const item of data.results) {
          const key = `${item.trackName}-${item.artistName}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueSongs.push({
              title: item.trackName,
              artist: item.artistName,
              artwork: item.artworkUrl60,
              previewUrl: item.previewUrl,
            });
          }
        }

        setSuggestions(uniqueSongs);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNext = () => {
    if (canProceed && !isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (value) => {
    setFormData({ ...formData, [currentField]: value });

    if (currentField === "lyrics") {
      setTimeout(autoResizeTextarea, 0);
    }

    if (
      currentField === "lyrics" ||
      currentField === "songTitle" ||
      currentField === "artist"
    ) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        if (value.trim().length >= 3) {
          searchSongs(value);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, 500);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }

    if (currentField === "lyrics") {
      setFormData({
        ...formData,
        lyrics: formData.lyrics,
        songTitle: suggestion.title,
        artist: suggestion.artist,
      });
      setIsFromSuggestion(true);
    } else if (currentField === "songTitle") {
      setFormData({
        ...formData,
        songTitle: suggestion.title,
        artist: suggestion.artist,
      });
      setIsFromSuggestion(true);
    } else if (currentField === "artist") {
      setFormData({
        ...formData,
        songTitle: suggestion.title,
        artist: suggestion.artist,
      });
      setIsFromSuggestion(true);
    }

    if (suggestion.previewUrl) {
      const audio = new Audio(suggestion.previewUrl);
      audio.volume = 0.5;

      let currentLoop = 0;

      audio.onended = () => {
        currentLoop++;
        setLoopCount(currentLoop);

        if (currentLoop < 3) {
          audio.currentTime = 0;
          audio.play().catch((err) => {
            console.log("Replay blocked:", err);
          });
        } else {
          setIsPlaying(false);
          setLoopCount(0);
        }
      };

      audio.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });

      setAudioPlayer(audio);
      setIsPlaying(true);
      setCurrentPreviewUrl(suggestion.previewUrl);
      setLoopCount(0);
    }

    setShowSuggestions(false);
    setSuggestions([]);

    if (currentStep < STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
  };

  const handlePlayPreview = (e, previewUrl) => {
    e.stopPropagation();

    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }

    if (currentPreviewUrl === previewUrl && isPlaying) {
      setAudioPlayer(null);
      setIsPlaying(false);
      setCurrentPreviewUrl(null);
      setLoopCount(0);
      return;
    }

    const audio = new Audio(previewUrl);
    audio.volume = 0.5;

    let currentLoop = 0;

    audio.onended = () => {
      currentLoop++;
      setLoopCount(currentLoop);

      if (currentLoop < 3) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.log("Replay blocked:", err);
        });
      } else {
        setIsPlaying(false);
        setCurrentPreviewUrl(null);
        setLoopCount(0);
      }
    };

    audio.play().catch((err) => {
      console.log("Autoplay blocked:", err);
    });

    setAudioPlayer(audio);
    setIsPlaying(true);
    setCurrentPreviewUrl(previewUrl);
    setLoopCount(0);
  };

  const handleCloseSuggestions = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioPlayer(null);
      setIsPlaying(false);
      setCurrentPreviewUrl(null);
      setLoopCount(0);
    }

    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (STEPS[currentStep].type === "auto-expand" && e.key === "Enter") {
      return;
    }

    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      STEPS[currentStep].type === "input"
    ) {
      e.preventDefault();
      if (canProceed) {
        if (isLastStep) {
          handleSubmit(e);
        } else {
          handleNext();
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canProceed) return;

    setLoading(true);
    setResult("");
    setShowModal(true);

    try {
      const prompt = `
        Tulis suara dari waktu yang pernah dilewati,
        tanpa pernah benar-benar dihuni.

        Seseorang datang malam ini membawa:
        - satu perasaan
        - satu kalimat yang terus kembali

        Keduanya berasal dari fase hidup yang sama,
        meski tidak saling menjelaskan.

        Perasaan:
        "${formData.feeling}"

        Kalimat:
        "${formData.lyrics}"

        Lagu asal kalimat itu:
        Judul: "${formData.songTitle}"
        Penyanyi: "${formData.artist}"

        Gunakan informasi lagu hanya sebagai konteks diam.
        Jangan menyebut lagu, judul, penyanyi, atau musik.

        Tulis sebagai pengakuan yang tenang,
        bukan penjelasan, bukan makna, bukan penghiburan.

        Aturan keras:
        - Bahasa Indonesia
        - 3 paragraf
        - 1–2 kalimat per paragraf
        - Total 55–75 kata
        - Kalimat pendek, langsung, tidak puitik berlapis
        - Hindari metafora berulang
        - Jangan menyimpulkan
        - Jangan bertanya
s
        Akhiri dengan kalimat yang terasa
        seperti suara yang berhenti,
        bukan penutup.
    `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult(
        "Malam ini tidak ada kata. Tapi yang tertinggal tetap berada di sana.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioPlayer(null);
      setIsPlaying(false);
      setCurrentPreviewUrl(null);
      setLoopCount(0);
    }

    setShowModal(false);
    setResult("");
    setCurrentStep(0);
    setFormData({
      feeling: "",
      lyrics: "",
      songTitle: "",
      artist: "",
    });
    setSuggestions([]);
    setShowSuggestions(false);
    setIsFromSuggestion(false);
  };

  return {
    currentStep,
    formData,
    result,
    loading,
    showModal,
    suggestions,
    showSuggestions,
    searchLoading,
    textareaRef,
    audioPlayer,
    isPlaying,
    currentPreviewUrl,
    isFromSuggestion,

    currentField,
    isLastStep,
    canProceed,

    handleNext,
    handleBack,
    handleChange,
    handleSelectSuggestion,
    handlePlayPreview,
    handleCloseSuggestions,
    handleKeyPress,
    handleSubmit,
    handleCloseModal,
  };
};
