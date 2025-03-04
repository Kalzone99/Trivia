import Lottie from "lottie-react";
import lottieOpen from "../assets/lotties/triviaopening.json";
import { useEffect, useState } from "react";
import lottieGo from "../assets/lotties/triviaGO.json";
import lottieThinking from "../assets/lotties/triviathink.json";
import lottieGoing from "../assets/lotties/triviagoing.json";
import { VscSettingsGear } from "react-icons/vsc";
import { PiRankingDuotone } from "react-icons/pi";
import { Settings } from "../components/settings";
import { useNavigate } from "react-router-dom";
import { Rank } from "../components/rank";

export const HomePage = () => {
  const [stepPage, setStepPage] = useState(1);
  const [modalInfo, setModalInfo] = useState(false);
  const [rankModalInfo, setRankModalInfo] = useState(false);
  const navigate = useNavigate();
  const [firstAnimation, setFirstAnimation] = useState(1);

  const [category, setCategory] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("any");
  const [type, setType] = useState("any");

  useEffect(() => {
    const text = document.querySelector(".typing-text");

    if (text) {
      const letters = text.textContent?.split("");

      text.textContent = "";
      letters?.forEach((letter, index) => {
        const span = document.createElement("span");

        span.textContent = letter === " " ? "\u00A0" : letter;
        span.style.animationDelay = `${index * 0.03}s`;
        span.classList.add("fade-in");

        text.appendChild(span);
      });
    }
  }, []);

  const handleStep = () => {
    setStepPage(stepPage + 1);
  };
  const handleModalInfo = () => {
    setModalInfo(true);
  };
  const handleRankModal = () => {
    setRankModalInfo(true);
  };

  const handleStartGame = async () => {
    setFirstAnimation(2);
    const params = new URLSearchParams();
    params.append("amount", numberOfQuestions.toString());

    if (category !== 0) params.append("category", category.toString());

    if (difficulty.toLowerCase() !== "any")
      params.append("difficulty", difficulty);

    if (type !== "any") params.append("type", type);

    const url = `https://opentdb.com/api.php?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.reponse_code === 1) {
        alert("Error in selected settings, please change selection");
      } else {
        navigate("/game", {
          state: {
            questions: data.results,
            settings: {
              category,
              numberOfQuestions,
              difficulty,
              type,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center text-center bg-gradient-to-r from-purple-900 to-blue-400 relative">
      {stepPage === 1 && (
        <div>
          <Lottie animationData={lottieOpen} loop={true} className="w-96" />
          <div
            className="text-4xl font-bold text-center flex flex-col justify-center items-center cursor-pointer"
            onClick={handleStep}>
            <span className="typing-text text-white">
              Let's Play a Trivia Game!
            </span>
            <Lottie animationData={lottieGo} loop={true} className="w-30" />
          </div>
        </div>
      )}
      {stepPage === 2 && (
        <>
          <div className="absolute w-full px-10 top-10 flex flex-rows items-center justify-between text-white ">
            <div
              className="flex flex-col justify-center items-center gap-1 cursor-pointer"
              onClick={handleRankModal}>
              <PiRankingDuotone size={60} />
              <div>Last Played</div>
            </div>
            <div
              className="flex flex-col justify-center items-center gap-1 cursor-pointer"
              onClick={handleModalInfo}>
              <VscSettingsGear size={60} />
              <div>Settings</div>
            </div>
          </div>
          <div className="cursor-pointer" onClick={handleStartGame}>
            {firstAnimation === 1 ? (
              <Lottie
                animationData={lottieThinking}
                loop={true}
                className="w-96"
              />
            ) : (
              <Lottie
                animationData={lottieGoing}
                loop={true}
                className="w-96"
              />
            )}

            <div className="text-4xl font-bold text-white">Click to start</div>
          </div>
        </>
      )}
      <Settings
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        category={category}
        difficulty={difficulty}
        numberOfQuestions={numberOfQuestions}
        setCategory={setCategory}
        setDifficulty={setDifficulty}
        setNumberOfQuestions={setNumberOfQuestions}
        setType={setType}
        type={type}
      />

      <Rank modalInfo={rankModalInfo} setModalInfo={setRankModalInfo} />
    </div>
  );
};
