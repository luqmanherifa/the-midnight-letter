import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function MusicPlayer() {
  const { theme } = useSelector((state) => state.story);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(true);
  const audioRef = useRef(null);

  const musicUrl = "/wildflower.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const isDark = theme === "dark";

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className={`backdrop-blur-md rounded-full border ${
                isDark
                  ? "bg-stone-900/80 border-stone-700"
                  : "bg-stone-100/80 border-stone-300"
              } shadow-lg`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  onClick={togglePlay}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDark
                      ? "bg-stone-800 hover:bg-stone-700 text-stone-300"
                      : "bg-stone-200 hover:bg-stone-300 text-stone-700"
                  }`}
                >
                  {isPlaying ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${
                      isDark ? "text-stone-400" : "text-stone-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className={`w-16 h-1 rounded-full appearance-none cursor-pointer ${
                      isDark ? "bg-stone-700" : "bg-stone-300"
                    }`}
                    style={{
                      background: isDark
                        ? `linear-gradient(to right, #a8a29e 0%, #a8a29e ${volume * 100}%, #44403c ${volume * 100}%, #44403c 100%)`
                        : `linear-gradient(to right, #78716c 0%, #78716c ${volume * 100}%, #d6d3d1 ${volume * 100}%, #d6d3d1 100%)`,
                    }}
                  />
                </div>

                <div
                  className={`text-xs ${
                    isDark ? "text-stone-400" : "text-stone-500"
                  } pl-2 border-l ${
                    isDark ? "border-stone-700" : "border-stone-300"
                  }`}
                >
                  <div className="font-medium">WILDFLOWER</div>
                  <div className="text-[10px]">Billie Eilish</div>
                </div>

                <button
                  onClick={() => setShowControls(false)}
                  className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isDark
                      ? "hover:bg-stone-800 text-stone-500"
                      : "hover:bg-stone-200 text-stone-400"
                  }`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showControls && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowControls(true)}
            className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-md border shadow-lg flex items-center justify-center transition-colors ${
              isDark
                ? "bg-stone-900/80 border-stone-700 hover:bg-stone-800/80 text-stone-300"
                : "bg-stone-100/80 border-stone-300 hover:bg-stone-200/80 text-stone-700"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
