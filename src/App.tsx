import React, { useState, useEffect } from "react";
import "./styles.css";
import { Challenge, Feedback, Difficulty } from "./types";
import ChallengeList from "./components/ChallengeList";
import ChallengeDetails from "./components/ChallengeDetails";
import CodeEditor from "./components/CodeEditor";
import FeedbackDisplay from "./components/FeedbackDisplay";
import TabNav from "./components/TabNav";
import ThemeToggler from "./components/ThemeToggler";
import DifficultyFilter from "./components/DifficultyFilter";
import { CHALLENGES } from "./data/challenges";
import { ThemeProvider } from "./contexts";
import { analyzeCode } from "./utils/codeAnalyzer";

const CodeMentorPlatformContent = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    CHALLENGES[0]
  );
  const [userCode, setUserCode] = useState<string>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"challenge" | "code">("challenge");
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    "all"
  );

  useEffect(() => {
    if (selectedChallenge) {
      setUserCode(selectedChallenge.initialCode);
      setFeedback(null);
      setShowSolution(false);
    }
  }, [selectedChallenge]);

  const analyzeCodes = (): void => {
    setIsAnalyzing(true);
    setFeedback(null);

    setTimeout(() => {
      const feedbackResult = analyzeCode(userCode, selectedChallenge);

      setFeedback(feedbackResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const resetChallenge = (): void => {
    setUserCode(selectedChallenge.initialCode);
    setFeedback(null);
    setShowSolution(false);
  };

  const handleDifficultyChange = (difficulty: Difficulty | "all"): void => {
    setDifficultyFilter(difficulty);

    if (difficulty !== "all" && selectedChallenge.difficulty !== difficulty) {
      const filteredChallenges = CHALLENGES.filter(
        (c) => c.difficulty === difficulty
      );
      if (filteredChallenges.length > 0) {
        setSelectedChallenge(filteredChallenges[0]);
      }
    }
  };

  return (
    <div className="mentor-platform">
      <header className="mentor-header">
        <div className="header-content">
          <h1>AI Code Mentor</h1>
          <p>Improve your coding skills with AI-powered feedback</p>
        </div>
        <ThemeToggler />
      </header>

      <div className="mentor-content">
        <ChallengeList
          challenges={CHALLENGES}
          selectedChallenge={selectedChallenge}
          onSelectChallenge={setSelectedChallenge}
          filterDifficulty={difficultyFilter}
        />

        <div className="mentor-main">
          <DifficultyFilter
            selectedDifficulty={difficultyFilter}
            onSelectDifficulty={handleDifficultyChange}
          />

          <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="tab-content">
            {activeTab === "challenge" && (
              <ChallengeDetails challenge={selectedChallenge} />
            )}

            {activeTab === "code" && (
              <CodeEditor
                userCode={userCode}
                setUserCode={setUserCode}
                onAnalyze={analyzeCodes}
                onReset={resetChallenge}
                isAnalyzing={isAnalyzing}
                showSolution={showSolution}
                toggleSolution={() => setShowSolution(!showSolution)}
                solution={selectedChallenge.solution}
              />
            )}

            {feedback && activeTab === "code" && (
              <FeedbackDisplay feedback={feedback} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CodeMentorPlatform = () => {
  return (
    <ThemeProvider>
      <CodeMentorPlatformContent />
    </ThemeProvider>
  );
};

export default CodeMentorPlatform;
