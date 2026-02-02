import { TypewriterText } from "./TypewriterText";

export function TitleScreen() {
  return (
    <div className="text-center">
      <h1 className="text-2xl text-stone-200 tracking-widest mb-6 font-light">
        The Midnight Letter
      </h1>
      <p className="text-sm text-stone-400 tracking-wide leading-relaxed">
        Surat untuk bagian dirimu
        <br />
        yang terus berjalan di kegelapan
      </p>
    </div>
  );
}

export function TextContent({ lines, visibleLines }) {
  let cumulativeDelay = 0;

  return (
    <>
      {lines.map((line, i) => {
        if (!line) return null;

        const lineDelay = cumulativeDelay;
        cumulativeDelay += line.length * 0.03 + 0.3;

        return (
          <p
            key={i}
            className={`
              leading-relaxed tracking-wide
              text-sm text-stone-300
              ${i < visibleLines - 1 ? "mb-4" : ""}
            `}
          >
            <TypewriterText text={line} delay={lineDelay} speed={0.03} />
          </p>
        );
      })}
    </>
  );
}

export function ChoiceButtons({ choices, choiceSelected, onChoice }) {
  return (
    <div className="flex flex-col gap-2.5 pointer-events-auto">
      {choices.map((choice, i) => (
        <button
          key={i}
          onClick={() => !choiceSelected && onChoice(choice)}
          className={`
            w-full text-left px-4 py-3.5 rounded cursor-pointer
            text-sm tracking-wide border
            ${
              choiceSelected === choice.label
                ? "bg-stone-800 border-stone-600 text-stone-300"
                : choiceSelected
                  ? "bg-transparent border-stone-700 text-stone-300 opacity-40"
                  : "bg-transparent border-stone-700 text-stone-300"
            }
          `}
        >
          {choice.label}
        </button>
      ))}
    </div>
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
  return (
    <div className="fixed inset-x-0 bottom-0 pb-24 flex justify-center pointer-events-auto">
      {isTitle && (
        <button
          onClick={onNext}
          className="cursor-pointer text-sm text-stone-300"
        >
          mulai
        </button>
      )}

      {showTap && !isChoice && !isEnd && !isTitle && (
        <button
          onClick={onNext}
          className="cursor-pointer text-sm text-stone-300"
        >
          lanjut
        </button>
      )}

      {isChoice && showChoices && !choiceSelected && (
        <button
          onClick={onToggleChoices}
          className="cursor-pointer text-stone-300 w-8 h-8 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 640 640" fill="currentColor">
            <path d="M320 144C254.8 144 201.2 173.6 160.1 211.7C121.6 247.5 95 290 81.4 320C95 350 121.6 392.5 160.1 428.3C201.2 466.4 254.8 496 320 496C385.2 496 438.8 466.4 479.9 428.3C518.4 392.5 545 350 558.6 320C545 290 518.4 247.5 479.9 211.7C438.8 173.6 385.2 144 320 144zM127.4 176.6C174.5 132.8 239.2 96 320 96C400.8 96 465.5 132.8 512.6 176.6C559.4 220.1 590.7 272 605.6 307.7C608.9 315.6 608.9 324.4 605.6 332.3C590.7 368 559.4 420 512.6 463.4C465.5 507.1 400.8 544 320 544C239.2 544 174.5 507.2 127.4 463.4C80.6 419.9 49.3 368 34.4 332.3C31.1 324.4 31.1 315.6 34.4 307.7C49.3 272 80.6 220 127.4 176.6zM320 400C364.2 400 400 364.2 400 320C400 290.4 383.9 264.5 360 250.7C358.6 310.4 310.4 358.6 250.7 360C264.5 383.9 290.4 400 320 400zM240.4 311.6C242.9 311.9 245.4 312 248 312C283.3 312 312 283.3 312 248C312 245.4 311.8 242.9 311.6 240.4C274.2 244.3 244.4 274.1 240.5 311.5zM286 196.6C296.8 193.6 308.2 192.1 319.9 192.1C328.7 192.1 337.4 193 345.7 194.7C346 194.8 346.2 194.8 346.5 194.9C404.4 207.1 447.9 258.6 447.9 320.1C447.9 390.8 390.6 448.1 319.9 448.1C258.3 448.1 206.9 404.6 194.7 346.7C192.9 338.1 191.9 329.2 191.9 320.1C191.9 309.1 193.3 298.3 195.9 288.1C196.1 287.4 196.2 286.8 196.4 286.2C208.3 242.8 242.5 208.6 285.9 196.7z" />
          </svg>
        </button>
      )}

      {isChoice && !showChoices && choiceReady && (
        <button
          onClick={onToggleChoices}
          className="cursor-pointer text-stone-300 w-8 h-8 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 640 640" fill="currentColor">
            <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM208.9 175.1C241 156.2 278.1 144 320 144C385.2 144 438.8 173.6 479.9 211.7C518.4 247.4 545 290 558.5 320C544.9 350 518.3 392.5 479.9 428.3C476.8 431.1 473.7 433.9 470.5 436.7L425.8 392C439.8 371.5 448 346.7 448 320C448 249.3 390.7 192 320 192C293.3 192 268.5 200.2 248 214.2L208.9 175.1zM390.9 357.1L282.9 249.1C294 243.3 306.6 240 320 240C364.2 240 400 275.8 400 320C400 333.4 396.7 346 390.9 357.1zM135.4 237.2L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L384.2 486C364.2 492.4 342.8 496 320 496C254.8 496 201.2 466.4 160.1 428.3C121.6 392.6 95 350 81.5 320C91.9 296.9 110.1 266.4 135.5 237.2z" />
          </svg>
        </button>
      )}

      {isEnd && currentId === "s13" && (
        <button
          onClick={onNext}
          className="cursor-pointer text-sm text-stone-300"
        >
          tap untuk menutup surat
        </button>
      )}
    </div>
  );
}

export function TapOverlay({ onNext }) {
  return <div className="fixed inset-0 z-0 cursor-pointer" onClick={onNext} />;
}

export function ProgressIndicator({ currentId }) {
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
    <div className="fixed top-0 inset-x-0 pt-24 flex justify-center">
      <div className="flex gap-2 items-center">
        {Array.from({ length: totalStages }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === currentStage
                ? "w-8 bg-stone-300"
                : i < currentStage
                  ? "w-4 bg-stone-600"
                  : "w-4 bg-stone-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
