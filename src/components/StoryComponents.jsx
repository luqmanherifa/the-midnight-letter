import { motion } from "framer-motion";
import { TypewriterText } from "./TypewriterText";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, toggleLanguage } from "../store/storySlice";
import { UI_TRANSLATIONS, TITLE_TRANSLATIONS } from "../constant/translations";
import { useNavigate } from "react-router-dom";

function SettingsPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, language } = useSelector((state) => state.story);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const t = UI_TRANSLATIONS[language];

  const musicUrl = "/wildflower.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

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

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop />

      <div className="absolute top-6 right-6 z-50 flex items-center gap-0">
        <button
          onClick={() => navigate("/distance")}
          className="w-6 h-6 flex items-center justify-center rounded-full opacity-30 hover:opacity-60 transition-opacity"
          aria-label="Distance"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="14"
            height="14"
            className={theme === "dark" ? "fill-stone-300" : "fill-stone-700"}
          >
            <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" />
          </svg>
        </button>

        <button
          onClick={() => {
            setIsMusicOpen(!isMusicOpen);
            setIsSettingsOpen(false);
          }}
          className="w-6 h-6 flex items-center justify-center rounded-full opacity-30 hover:opacity-60 transition-opacity"
          aria-label="Music"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="14"
            height="14"
            className={theme === "dark" ? "fill-stone-300" : "fill-stone-700"}
          >
            <path d="M532 71C539.6 77.1 544 86.3 544 96L544 400C544 444.2 501 480 448 480C395 480 352 444.2 352 400C352 355.8 395 320 448 320C459.2 320 470 321.6 480 324.6L480 207.9L256 257.7L256 464C256 508.2 213 544 160 544C107 544 64 508.2 64 464C64 419.8 107 384 160 384C171.2 384 182 385.6 192 388.6L192 160C192 145 202.4 132 217.1 128.8L505.1 64.8C514.6 62.7 524.5 65 532.1 71.1z" />
          </svg>
        </button>

        <button
          onClick={() => {
            setIsSettingsOpen(!isSettingsOpen);
            setIsMusicOpen(false);
          }}
          className="w-6 h-6 flex items-center justify-center rounded-full opacity-30 hover:opacity-60 transition-opacity"
          aria-label="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="14"
            height="14"
            className={theme === "dark" ? "fill-stone-300" : "fill-stone-700"}
          >
            <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
          </svg>
        </button>

        {isMusicOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-10 right-0 bg-stone-900/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-stone-700 min-w-[200px]"
          >
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-xs text-stone-400 mb-1">WILDFLOWER</p>
                <p className="text-[10px] text-stone-500">Billie Eilish</p>
              </div>

              <button
                onClick={togglePlay}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-stone-800 hover:bg-stone-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="12"
                  height="12"
                  className="fill-stone-300"
                >
                  {isPlaying ? (
                    <path d="M144 96C144 78.3 129.7 64 112 64C94.3 64 80 78.3 80 96L80 544C80 561.7 94.3 576 112 576C129.7 576 144 561.7 144 544L144 96zM368 96C368 78.3 353.7 64 336 64C318.3 64 304 78.3 304 96L304 544C304 561.7 318.3 576 336 576C353.7 576 368 561.7 368 544L368 96z" />
                  ) : (
                    <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
                  )}
                </svg>
                <span className="text-xs text-stone-300 font-medium">
                  {isPlaying ? "jeda" : "putar"}
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-10 right-0 bg-stone-900/95 backdrop-blur-md rounded-lg p-4 shadow-xl border border-stone-700 min-w-[180px]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">{t.theme}</span>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  <span className="text-xs text-stone-300 font-medium">
                    {t[theme]}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">{t.language}</span>
                <button
                  onClick={() => dispatch(toggleLanguage())}
                  className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  <span className="text-xs text-stone-300 font-medium">
                    {language}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export function TitleScreen() {
  const { language, theme } = useSelector((state) => state.story);
  const title = TITLE_TRANSLATIONS[language];
  const [completedTitle, setCompletedTitle] = useState(false);
  const [completedSubtitle, setCompletedSubtitle] = useState(false);

  const subtitleLines = title.subtitle.split("\n");

  return (
    <>
      <SettingsPanel />
      <div className="text-center">
        <h1
          className={`text-xl tracking-widest mb-6 font-light ${
            theme === "dark" ? "text-stone-200" : "text-stone-700"
          }`}
        >
          <TypewriterText
            text={title.title}
            delay={0}
            speed={0.05}
            onComplete={() => setCompletedTitle(true)}
          />
        </h1>
        <div
          className={`text-sm tracking-wide leading-relaxed ${
            theme === "dark" ? "text-stone-400" : "text-stone-500"
          }`}
        >
          {subtitleLines.map((line, index) => {
            let cumulativeDelay = title.title.length * 0.05 + 0.5;

            for (let i = 0; i < index; i++) {
              cumulativeDelay += subtitleLines[i].length * 0.03 + 0.2;
            }

            const isLastLine = index === subtitleLines.length - 1;

            return (
              <p
                key={index}
                className={index < subtitleLines.length - 1 ? "mb-1" : ""}
              >
                <TypewriterText
                  text={line}
                  delay={cumulativeDelay}
                  speed={0.03}
                  onComplete={() => {
                    if (isLastLine) {
                      setCompletedSubtitle(true);
                    }
                  }}
                />
              </p>
            );
          })}
        </div>

        <div className="w-full pt-6 text-center">
          <p
            className={`text-xs font-normal transition-opacity duration-500 ${
              completedSubtitle ? "opacity-100" : "opacity-0"
            } ${theme === "dark" ? "text-stone-500" : "text-stone-400"}`}
          >
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/luqmanherifa"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                theme === "dark"
                  ? "hover:text-stone-400"
                  : "hover:text-stone-600"
              }`}
            >
              Luqman Herifa
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export function TextContent({ lines, visibleLines, onTypewriterComplete }) {
  const { theme } = useSelector((state) => state.story);
  let cumulativeDelay = 0;
  const [completedLines, setCompletedLines] = useState(0);

  const handleLineComplete = (lineIndex) => {
    const newCompleted = lineIndex + 1;
    setCompletedLines(newCompleted);

    if (newCompleted === visibleLines && onTypewriterComplete) {
      onTypewriterComplete();
    }
  };

  return (
    <div className="text-content">
      {lines.map((line, i) => {
        if (!line) return null;

        const lineDelay = cumulativeDelay;
        cumulativeDelay += line.length * 0.03 + 0.3;

        return (
          <p
            key={i}
            className={`
              leading-relaxed tracking-wide text-sm
              ${theme === "dark" ? "text-stone-300" : "text-stone-600"}
              ${i < visibleLines - 1 ? "mb-4" : ""}
            `}
          >
            <TypewriterText
              text={line}
              delay={lineDelay}
              speed={0.03}
              onComplete={() => handleLineComplete(i)}
            />
          </p>
        );
      })}
    </div>
  );
}

export function ChoiceButtons({ choices, choiceSelected, onChoice, show }) {
  const { theme } = useSelector((state) => state.story);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-2.5 mt-8"
    >
      {choices.map((choice, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: i * 0.08,
            ease: "easeOut",
          }}
          onClick={() => !choiceSelected && onChoice(choice)}
          className={`
            w-full text-left px-4 py-3.5 rounded cursor-pointer
            text-sm tracking-wide border transition-all duration-200
            ${
              theme === "dark"
                ? choiceSelected === choice.label
                  ? "bg-stone-800 border-stone-600 text-stone-300"
                  : choiceSelected
                    ? "bg-transparent border-stone-700 text-stone-300 opacity-40"
                    : "bg-transparent border-stone-700 text-stone-300 hover:bg-stone-900/30 hover:border-stone-600"
                : choiceSelected === choice.label
                  ? "bg-stone-200 border-stone-400 text-stone-700"
                  : choiceSelected
                    ? "bg-transparent border-stone-300 text-stone-600 opacity-40"
                    : "bg-transparent border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400"
            }
          `}
        >
          {choice.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

export function BottomControls({
  showTap,
  isChoice,
  isEnd,
  isTitle,
  currentId,
  showChoices,
  choiceSelected,
  choiceReady,
  onNext,
  onToggleChoices,
}) {
  const { language, theme } = useSelector((state) => state.story);
  const t = UI_TRANSLATIONS[language];

  const buttonClasses =
    theme === "dark"
      ? "text-stone-300 hover:text-stone-100"
      : "text-stone-600 hover:text-stone-800";

  return (
    <div className="absolute inset-x-0 bottom-0 pb-24 flex justify-center z-10">
      {isTitle && showTap && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={onNext}
          className={`cursor-pointer text-sm transition-colors px-6 py-0 ${buttonClasses}`}
        >
          {t.start}
        </motion.button>
      )}

      {showTap && !isChoice && !isEnd && !isTitle && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={onNext}
          className={`cursor-pointer text-sm transition-colors px-6 py-0 ${buttonClasses}`}
        >
          {t.continue}
        </motion.button>
      )}

      {isEnd && currentId === "s13" && showTap && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={onNext}
          className={`cursor-pointer text-sm transition-colors px-6 py-0 ${buttonClasses}`}
        >
          {t.closeLetter}
        </motion.button>
      )}
    </div>
  );
}

export function ProgressIndicator({ currentId }) {
  const { theme } = useSelector((state) => state.story);

  const getProgressStage = (id) => {
    if (id === "title" || id === "entry") return 0;
    if (id.startsWith("s01") || id.startsWith("s02") || id.startsWith("s03"))
      return 1;
    if (id.startsWith("s04") || id.startsWith("s05") || id.startsWith("s06"))
      return 2;
    if (id.startsWith("s07") || id.startsWith("s08") || id.startsWith("s09"))
      return 3;
    if (id.startsWith("s10") || id.startsWith("s11")) return 4;
    if (id.startsWith("s12") || id.startsWith("s13") || id === "end") return 5;
    return 0;
  };

  const totalStages = 6;
  const currentStage = getProgressStage(currentId);

  return (
    <div className="absolute top-0 inset-x-0 pt-24 flex justify-center">
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: totalStages }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? i === currentStage
                  ? "w-2 bg-stone-300"
                  : i < currentStage
                    ? "w-2 bg-stone-600"
                    : "w-2 bg-stone-800"
                : i === currentStage
                  ? "w-2 bg-stone-600"
                  : i < currentStage
                    ? "w-2 bg-stone-400"
                    : "w-2 bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
