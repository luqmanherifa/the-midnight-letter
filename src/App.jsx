import { useStoryNavigation } from "./useStoryNavigation";
import {
  TitleScreen,
  TextContent,
  ChoiceButtons,
  BottomControls,
  TapOverlay,
  ProgressIndicator,
} from "./StoryComponents";

export default function App() {
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
    handleNext,
    handleChoice,
    toggleChoices,
  } = useStoryNavigation();

  if (!screen) return null;

  return (
    <div className="min-h-screen bg-stone-950 relative">
      {!isTitle && <ProgressIndicator currentId={currentId} />}

      <div className="min-h-screen flex flex-col items-center justify-center px-6 pointer-events-none">
        <div key={screenKey} className="w-full max-w-sm text-center">
          {isTitle && <TitleScreen />}

          {!isTitle && (!isChoice || !showChoices) && (
            <TextContent lines={screen.lines} visibleLines={visibleLines} />
          )}

          {isChoice && showChoices && (
            <ChoiceButtons
              choices={screen.choices}
              choiceSelected={choiceSelected}
              onChoice={handleChoice}
            />
          )}
        </div>
      </div>

      <BottomControls
        showTap={showTap}
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

      {!isChoice && !isEnd && !isTitle && showTap && (
        <TapOverlay onNext={handleNext} />
      )}
      {isTitle && <TapOverlay onNext={handleNext} />}
    </div>
  );
}
