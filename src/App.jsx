import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useStoryNavigation } from "./hooks/useStoryNavigation";
import { TITLE_TRANSLATIONS } from "./constant/translations";
import {
  TitleScreen,
  TextContent,
  ChoiceButtons,
  BottomControls,
  ProgressIndicator,
} from "./components/StoryComponents";
import AnimatedBackground from "./components/AnimatedBackground";

export default function App() {
  const { theme } = useSelector((state) => state.story);
  const {
    screen,
    screenKey,
    isChoice,
    isEnd,
    isTitle,
    visibleLines,
    choiceSelected,
    showTap,
    showChoices,
    choiceReady,
    currentId,
    language,
    handleNext,
    handleChoice,
    toggleChoices,
  } = useStoryNavigation();

  const [showButtons, setShowButtons] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setShowButtons(false);

    if (isTitle) {
      const titleText = TITLE_TRANSLATIONS[language || "id"].title;
      const subtitleText = TITLE_TRANSLATIONS[language || "id"].subtitle;
      const subtitleLines = subtitleText.split("\n");

      let totalDelay = titleText.length * 0.05 + 0.5;
      subtitleLines.forEach((line, index) => {
        totalDelay += line.length * 0.03;
        if (index < subtitleLines.length - 1) {
          totalDelay += 0.2;
        }
      });
      totalDelay += 0.8;

      const timer = setTimeout(() => {
        setShowButtons(true);
      }, totalDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [screenKey, isTitle, language]);

  const handleTypewriterComplete = () => {
    setShowButtons(true);
  };

  const themeClasses = {
    dark: {
      bg: "bg-stone-950",
      text: "text-stone-300",
    },
    light: {
      bg: "bg-gradient-to-b from-stone-50 to-stone-100",
      text: "text-stone-700",
    },
  };

  const currentTheme = themeClasses[theme];

  if (!screen) return null;

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500 flex items-center justify-center relative`}
    >
      <AnimatedBackground theme={theme} />
      <div className="w-full max-w-[428px] min-h-screen relative z-10">
        {!isTitle && <ProgressIndicator currentId={currentId} />}
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div
            key={screenKey}
            ref={contentRef}
            className="w-full max-w-sm"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isTitle && <TitleScreen />}
            {!isTitle && (
              <div className="w-full text-center">
                <TextContent
                  lines={screen.lines}
                  visibleLines={visibleLines}
                  onTypewriterComplete={handleTypewriterComplete}
                />
                {isChoice && showChoices && (
                  <ChoiceButtons
                    choices={screen.choices}
                    choiceSelected={choiceSelected}
                    onChoice={handleChoice}
                    show={showButtons}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <BottomControls
          showTap={showButtons}
          isChoice={isChoice}
          isEnd={isEnd}
          isTitle={isTitle}
          currentId={currentId}
          showChoices={showChoices}
          choiceSelected={choiceSelected}
          choiceReady={choiceReady}
          onNext={handleNext}
          onToggleChoices={toggleChoices}
        />
      </div>
    </div>
  );
}
