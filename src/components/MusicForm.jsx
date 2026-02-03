import { motion, AnimatePresence } from "framer-motion";
import { useMusicForm, STEPS } from "../hooks/useMusicForm";

export default function MusicForm() {
  const {
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
  } = useMusicForm();

  const theme = "dark";

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
      stepInactive: "bg-stone-800",
      stepActive: "bg-stone-400",
      stepCompleted: "bg-stone-500",
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
                Antara perasaan yang kamu bawa
              </p>
              <p
                className={`text-sm tracking-wide leading-relaxed px-4 ${
                  theme === "dark" ? "text-stone-400" : "text-stone-500"
                }`}
              >
                dan lirik yang terngiang.
              </p>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-center gap-2">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: index === currentStep ? 1 : 0.8,
                      }}
                      className="relative"
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index < currentStep
                            ? currentTheme.stepCompleted
                            : index === currentStep
                              ? currentTheme.stepActive
                              : currentTheme.stepInactive
                        }`}
                      />
                      {index === currentStep && (
                        <motion.div
                          layoutId="activeRing"
                          className={`absolute inset-0 -m-1 rounded-full border ${
                            theme === "dark"
                              ? "border-stone-400"
                              : "border-stone-600"
                          }`}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                          index < currentStep
                            ? currentTheme.stepCompleted
                            : currentTheme.stepInactive
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <p
                  className={`text-xs tracking-wide ${
                    theme === "dark" ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  {currentStep + 1} dari {STEPS.length}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <label
                    className={`block text-xs tracking-wide mb-2.5 ${currentTheme.label}`}
                  >
                    {STEPS[currentStep].label}
                  </label>
                  {STEPS[currentStep].type === "auto-expand" ? (
                    <textarea
                      ref={textareaRef}
                      value={formData[currentField]}
                      onChange={(e) => handleChange(e.target.value)}
                      onKeyDown={handleKeyPress}
                      maxLength={300}
                      autoFocus
                      rows={2}
                      className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide leading-relaxed ${currentTheme.input} focus:outline-none resize-none overflow-hidden`}
                      placeholder={STEPS[currentStep].placeholder}
                      style={{ minHeight: "50px" }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[currentField]}
                      onChange={(e) => handleChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      maxLength={currentField === "feeling" ? 150 : undefined}
                      autoFocus
                      className={`w-full px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.input} focus:outline-none`}
                      placeholder={STEPS[currentStep].placeholder}
                    />
                  )}

                  {currentField === "lyrics" &&
                    showSuggestions &&
                    suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute z-50 w-full mt-2 rounded-lg border overflow-hidden ${
                          theme === "dark"
                            ? "bg-stone-900/98 border-stone-700 backdrop-blur-md"
                            : "bg-stone-50/98 border-stone-300 backdrop-blur-md"
                        }`}
                      >
                        <div className="max-h-80 overflow-y-auto">
                          {searchLoading ? (
                            <div className="px-4 py-6 text-center">
                              <div className="flex justify-center gap-1.5">
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
                                    }}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      theme === "dark"
                                        ? "bg-stone-400"
                                        : "bg-stone-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            <>
                              <div
                                className={`px-3 py-0 text-xs border-b ${
                                  theme === "dark"
                                    ? "text-stone-500 border-stone-700"
                                    : "text-stone-400 border-stone-300"
                                }`}
                              >
                                Atau pilih dari hasil pencarian
                              </div>
                              {suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    handleSelectSuggestion(suggestion)
                                  }
                                  className={`w-full px-3 py-3 text-left transition-colors border-b last:border-b-0 ${
                                    theme === "dark"
                                      ? "hover:bg-stone-800/50 border-stone-800"
                                      : "hover:bg-stone-100/50 border-stone-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {suggestion.artwork && (
                                      <img
                                        src={suggestion.artwork}
                                        alt=""
                                        className="w-10 h-10 rounded"
                                      />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm font-medium truncate ${
                                          theme === "dark"
                                            ? "text-stone-300"
                                            : "text-stone-700"
                                        }`}
                                      >
                                        {suggestion.title}
                                      </p>
                                      <p
                                        className={`text-xs truncate ${
                                          theme === "dark"
                                            ? "text-stone-500"
                                            : "text-stone-400"
                                        }`}
                                      >
                                        {suggestion.artist}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 pt-4">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`px-6 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.button}`}
                  >
                    Kembali
                  </button>
                )}
                {!isLastStep ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`flex-1 px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.button} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    Lanjut
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canProceed || loading}
                    className={`flex-1 px-4 py-3.5 rounded border transition-all duration-200 text-sm tracking-wide ${currentTheme.button} disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    Lihat jaraknya
                  </button>
                )}
              </div>
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
                      Mendengarkan...
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
                        className={`px-6 py-0 text-sm tracking-wide transition-colors ${
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
