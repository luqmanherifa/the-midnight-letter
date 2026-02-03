import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default function Music() {
  const [lyrics, setLyrics] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [feeling, setFeeling] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [theme] = useState("dark");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !lyrics.trim() ||
      !songTitle.trim() ||
      !artist.trim() ||
      !feeling.trim()
    ) {
      return;
    }

    setLoading(true);
    setResult("");
    setShowModal(true);

    try {
      const prompt = `
Kamu adalah bagian dari diri seseorang yang mengamati dari dalam.
Kamu tidak memberi saran. Kamu hanya melihat dan menyambungkan.

Penggalan lirik yang ia ingat:
"${lyrics}"

Dari lagu:
"${songTitle}" oleh ${artist}

Perasaan yang ia bawa saat mendengarnya:
"${feeling}"

Tugas kamu:
Temukan jarak antara lirik itu dan perasaan yang ia bawa.
Bukan menganalisis musik. Bukan memberi solusi.
Hanya menunjukkan apa yang mungkin tidak ia sadari dari hubungan keduanya.

Tulis 1 paragraf pendek (80–120 kata).
Bahasa Indonesia. Tenang. Jujur. Langsung.
Jangan gunakan kata "mungkin", "sepertinya", atau ragu-ragu.
Paksa hubungan itu muncul dengan yakin.
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
  };

  const themeClasses = {
    dark: {
      bg: "bg-stone-950",
      text: "text-stone-300",
      label: "text-stone-400",
      input:
        "bg-transparent border-stone-700 text-stone-300 focus:border-stone-600",
      button:
        "bg-transparent border-stone-700 text-stone-300 hover:bg-stone-900/30 hover:border-stone-600",
      modal: "bg-stone-950/98 backdrop-blur-md",
      modalContent: "bg-stone-900/95 border-stone-700",
    },
    light: {
      bg: "bg-gradient-to-b from-stone-50 to-stone-100",
      text: "text-stone-700",
      label: "text-stone-500",
      input:
        "bg-transparent border-stone-300 text-stone-700 focus:border-stone-400",
      button:
        "bg-transparent border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400",
      modal: "bg-stone-100/98 backdrop-blur-md",
      modalContent: "bg-stone-50 border-stone-300",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500 flex items-center justify-center`}
    >
      <div className="w-full max-w-[428px] min-h-screen relative">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm">
            <div className="text-center mb-12">
              <h1
                className={`text-xl tracking-widest mb-3 font-light ${
                  theme === "dark" ? "text-stone-200" : "text-stone-700"
                }`}
              >
                JARAK
              </h1>
              <p
                className={`text-sm tracking-wide leading-relaxed px-4 ${
                  theme === "dark" ? "text-stone-400" : "text-stone-500"
                }`}
              >
                Antara lirik yang kamu ingat dan perasaan yang kamu bawa
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className={`block text-xs tracking-wide mb-2.5 ${currentTheme.label}`}
                >
                  Penggalan lirik yang kamu ingat
                </label>
                <textarea
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  rows={3}
                  maxLength={300}
                  className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide leading-relaxed ${currentTheme.input} focus:outline-none resize-none`}
                  placeholder="Baris atau kalimat yang tersangkut di kepala"
                />
              </div>

              <div>
                <label
                  className={`block text-xs tracking-wide mb-2.5 ${currentTheme.label}`}
                >
                  Judul lagu
                </label>
                <input
                  type="text"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.input} focus:outline-none`}
                  placeholder="Lagu apa yang sedang kamu dengar"
                />
              </div>

              <div>
                <label
                  className={`block text-xs tracking-wide mb-2.5 ${currentTheme.label}`}
                >
                  Penyanyi
                </label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.input} focus:outline-none`}
                  placeholder="Siapa yang menyanyikannya"
                />
              </div>

              <div>
                <label
                  className={`block text-xs tracking-wide mb-2.5 ${currentTheme.label}`}
                >
                  Perasaan yang kamu bawa saat mendengarnya
                </label>
                <input
                  type="text"
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  maxLength={150}
                  className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.input} focus:outline-none`}
                  placeholder="Dalam satu kalimat"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.button} disabled:opacity-40 disabled:cursor-not-allowed mt-8`}
              >
                Lihat jaraknya
              </button>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${currentTheme.modal}`}
            onClick={!loading ? handleCloseModal : undefined}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-[428px] px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`rounded-lg border p-8 ${currentTheme.modalContent}`}
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-6"
                    >
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                            className={`w-2 h-2 rounded-full ${
                              theme === "dark" ? "bg-stone-400" : "bg-stone-600"
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                    <p
                      className={`text-sm tracking-wide ${
                        theme === "dark" ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      Sedang melihat...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <p
                        className={`text-sm tracking-wide leading-relaxed ${
                          theme === "dark" ? "text-stone-300" : "text-stone-600"
                        }`}
                      >
                        {result}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={handleCloseModal}
                        className={`px-6 py-2 text-sm tracking-wide transition-colors ${
                          theme === "dark"
                            ? "text-stone-400 hover:text-stone-200"
                            : "text-stone-500 hover:text-stone-700"
                        }`}
                      >
                        tutup
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
