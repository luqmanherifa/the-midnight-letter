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
  const debounceTimer = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

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

    if (currentField === "lyrics") {
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
    setFormData({
      ...formData,
      lyrics: formData.lyrics,
      songTitle: suggestion.title,
      artist: suggestion.artist,
    });
    setShowSuggestions(false);
    setSuggestions([]);

    if (currentStep < STEPS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
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
        Kamu adalah pengamat yang hidup di dalam diri seseorang.
        Kamu tidak memberi saran, tidak menenangkan, dan tidak membantu menyelesaikan apa pun.

        Seseorang datang membawa satu perasaan saat ini,
        dan satu potongan lirik yang terus tertinggal di kepalanya.
        Lagu hanya menjadi asal dari lirik itu, bukan topik utama.

        Perasaan yang ia rasakan saat ini:
        "${formData.feeling}"

        Potongan lirik yang tertinggal:
        "${formData.lyrics}"

        Lirik ini berasal dari lagu:
        "${formData.songTitle}" oleh ${formData.artist}

        Aturan keras:
        - Jangan membahas lagu, musik, genre, atau artis.
        - Jangan menjelaskan arti lirik.
        - Jangan mengaitkan emosi dengan suasana lagu.
        - Jangan bertanya.
        - Jangan memberi solusi atau arah.

        Tugasmu:
        Paksa hubungan antara perasaan saat ini dan potongan lirik yang tertinggal,
        bukan sebagai penjelasan, tapi sebagai keberadaan yang saling menempel.
        Tunjukkan keterkaitan itu dengan yakin, meskipun tidak nyaman dan tidak diminta.

        Tulis tepat 3 paragraf pendek.
        Setiap paragraf maksimal 2 kalimat.
        Bahasa Indonesia.
        Nada tenang, datar, dan pasti.
        Tanpa metafora berlebihan.
        Tanpa kata: "mungkin", "sepertinya", "seolah".

        Akhiri tanpa kesimpulan dan tanpa penutup manis.
    `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setResult(response.text);
    } catch (error) {
      console.error(error);
      setResult(
        "Tidak ada jawaban malam ini. Tapi lagu itu tetap bermakna, dan kamu tahu itu.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
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

    currentField,
    isLastStep,
    canProceed,

    handleNext,
    handleBack,
    handleChange,
    handleSelectSuggestion,
    handleKeyPress,
    handleSubmit,
    handleCloseModal,
  };
};
