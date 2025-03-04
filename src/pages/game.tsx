import { useEffect, useState } from "react";
import { PiRankingDuotone } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import he from "he";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import succesAnimation from "../assets/lotties/triviasuccess.json";
import failureAnimation from "../assets/lotties/triviafailure.json";

export function GamePage() {
  const location = useLocation();
  const { questions, settings } = location.state || {};
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerResult, setAnswerResult] = useState<
    "success" | "failure" | null
  >(null);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const decodedQuestion = decodeAndShuffleAnswers(currentQuestion);
      setAnswers(decodedQuestion);
    }
  }, [currentQuestionIndex, questions]);

  const decodeAndShuffleAnswers = (question: {
    correct_answer: string;
    incorrect_answers: string[];
    type: string;
  }) => {
    const correctAnswer = he.decode(question.correct_answer);
    const incorrectAnswer = question.incorrect_answers.map((answer) =>
      he.decode(answer)
    );

    const answersArray =
      question.type === "boolean"
        ? ["True", "False"]
        : [correctAnswer, ...incorrectAnswer];

    return shuffleArray(answersArray);
  };
  const handleSelectedAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };
  console.log(selectedAnswer);
  const currentQuestion = questions[currentQuestionIndex];
  const questionText = he.decode(currentQuestion.question);
  const correctAnswer = he.decode(currentQuestion.correct_answer);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() * 0.5);
  };
  const handleConfirmAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = he.decode(currentQuestion.correct_answer);

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setAnswerResult("success");
    } else {
      setAnswerResult("failure");
    }
    setTimeout(() => {
      setAnswerResult(null);
      handleNextQuestion();
    }, 1800);
  };
  const handleNextQuestion = () => {
    setSelectedAnswer("");

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      saveQuizHistory();
      navigate("/", { state: { finalScore: score } });
    }
  };
  const saveQuizHistory = () => {
    const existingHistory = JSON.parse(
      localStorage.getItem("quizHistory") || "[]"
    );
    const currentPlay = {
      timestamp: new Date().toISOString(),
      score: score,
      totalQuestions: questions.length,
      category: settings.category,
      difficulty: settings.difficulty,
      questionType: settings.questionType,
    };
    const updatedHistory = [...existingHistory, currentPlay];

    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
  };

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex w-full flex-col items-center justify-center text-center bg-gradient-to-r from-purple-900 to-blue-400 relative">
      <div className="absolute w-full px-10 top-10 flex flex-rows items-center justify-between text-white ">
        <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
          <PiRankingDuotone size={60} />
          <div>Last Played</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
          <div className="text-2xl flex flex-row gap-2 font-bold">
            <div>Score:</div>
            <div>{score}</div>
          </div>
          <button
            onClick={handleRestart}
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-900 cursor-pointer">
            Restart
          </button>
        </div>
      </div>

      <div className="text-white text-3xl font-bold mt-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <div className="text-white text-2xl font-bold mt-5">
        {he.decode(currentQuestion.category)}
      </div>
      <div className="bg-white px-20 py-5 rounded-lg mt-5 text-xl">
        {questionText}
      </div>
      <div className="w-full px-4 py-5 rounded-lg mt-5 text-xl flex flex-col max-w-2xl gap-3 ">
        {answers.map((answer, index) => {
          let buttonClass = "bg-white text-gray-800";

          if (selectedAnswer == answer) {
            buttonClass = "bg-gray-600 text-white";
          }
          if (answerResult && answer === correctAnswer) {
            buttonClass = "bg-green-600 text-white";
          } else if (
            answerResult &&
            answer === selectedAnswer &&
            selectedAnswer !== correctAnswer
          ) {
            buttonClass = "bg-red-600 text-white";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectedAnswer(answer)}
              className={`rounded-lg py-3 cursor-pointer ${buttonClass}`}>
              {answer}
            </button>
          );
        })}
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 cursor-pointer"
        onClick={handleConfirmAnswer}>
        Confirm
      </button>

      {answerResult === "success" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Lottie
            animationData={succesAnimation}
            loop={true}
            className="w-30"
          />
        </div>
      )}

      {answerResult === "failure" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Lottie
            animationData={failureAnimation}
            loop={true}
            className="w-30"
          />
        </div>
      )}
    </div>
  );
}
