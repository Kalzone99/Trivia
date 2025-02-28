import Lottie from "lottie-react";
import lottieOpen from "./assets/lotties/triviaopening.json";
import { useEffect, useState } from "react";
import lottieGo from "./assets/lotties/triviaGO.json";
import lottieThinking from "./assets/lotties/triviathink.json";
import { VscSettingsGear } from "react-icons/vsc";
import { PiRankingDuotone } from "react-icons/pi";
import { Settings } from "./components/settings";

function App() {
  const [stepPage, setStepPage] = useState(1);
  const [modalInfo, setModalInfo] = useState(false);

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
            <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
              <PiRankingDuotone size={60} />
              <div>Rankings</div>
            </div>
            <div
              className="flex flex-col justify-center items-center gap-1 cursor-pointer"
              onClick={handleModalInfo}>
              <VscSettingsGear size={60} />
              <div>Settings</div>
            </div>
          </div>
          <div className="cursor-pointer">
            <Lottie
              animationData={lottieThinking}
              loop={true}
              className="w-96"
            />
            <div className="text-4xl font-bold text-white">Click to start</div>
          </div>
        </>
      )}
      <Settings modalInfo={modalInfo} setModalInfo={setModalInfo} />
    </div>
  );
}

export default App;
