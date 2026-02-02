import { useState, useEffect, useCallback } from "react";
import { SCREENS, SHADOW_KEY_MAP, PERSONA_KEY_MAP } from "./screenData";

export function useStoryNavigation() {
  const [currentId, setCurrentId] = useState("title");
  const [personaKey, setPersonaKey] = useState(null);
  const [shadowKey, setShadowKey] = useState(null);
  const [screenKey, setScreenKey] = useState(0);
  const [choiceSelected, setChoiceSelected] = useState(null);
  const [showTap, setShowTap] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [choiceReady, setChoiceReady] = useState(false);

  const screen = SCREENS[currentId];
  const isChoice = screen?.type === "choice";
  const isReveal = screen?.type === "reveal";
  const isEnd = screen?.type === "end";
  const isTitle = screen?.type === "title";
  const visibleLines = screen?.lines.filter(Boolean).length ?? 0;

  useEffect(() => {
    setShowTap(false);
    setChoiceSelected(null);
    setShowChoices(false);
    setChoiceReady(false);

    if (isTitle) {
      setShowTap(true);
    } else if (isChoice) {
      setShowChoices(true);
      setChoiceReady(true);
    } else if (isEnd && currentId === "end") {
      setCurrentId("title");
      setPersonaKey(null);
      setShadowKey(null);
      setScreenKey((k) => k + 1);
    } else if (!isEnd) {
      setShowTap(true);
    }
  }, [currentId, screenKey, isChoice, isEnd, isTitle]);

  const navigate = useCallback((nextId) => {
    if (!nextId) return;
    setCurrentId(nextId);
    setScreenKey((k) => k + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (!screen) return;
    let next = screen.next;
    if (next === "__DYNAMIC_S07__") {
      next = `s07_${personaKey}${shadowKey}`;
    }
    navigate(next);
  }, [screen, personaKey, shadowKey, navigate]);

  const handleChoice = useCallback(
    (choice) => {
      setChoiceSelected(choice.label);
      if (choice.next in PERSONA_KEY_MAP)
        setPersonaKey(PERSONA_KEY_MAP[choice.next]);
      if (choice.next in SHADOW_KEY_MAP)
        setShadowKey(SHADOW_KEY_MAP[choice.next]);
      navigate(choice.next);
    },
    [navigate],
  );

  const toggleChoices = useCallback(() => {
    setShowChoices((v) => !v);
  }, []);

  return {
    screen,
    screenKey,
    isChoice,
    isReveal,
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
  };
}
