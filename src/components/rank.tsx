import { SetStateAction, useEffect, useState } from "react";
import { Modal } from "./modal";
import { ModalHeader } from "./modalHeader";

interface RankProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
}

type PlayInformation = {
  timestamp: string;
  score: number;
  totalQuestions: number;
  difficulty: string;
  category: number;
};

export function Rank({ modalInfo, setModalInfo }: RankProps) {
  const [lastGames, setLastGames] = useState<PlayInformation[]>([]);

  useEffect(() => {
    if (modalInfo) {
      const storedHistory = JSON.parse(
        localStorage.getItem("quizHistory") || []
      );
      setLastGames(storedHistory);
    }
  }, [modalInfo]);

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getCategoryName(categoryId: number): string {
    const categories: { [key: number]: string } = {
      0: "Any",
      9: "General Knowledge",
      10: "Entertainment: Books",
      11: "Entertainment: Film",
      12: "Entertainment: Music",
      13: "Entertainment: Musicals & Theatres",
      14: "Entertainment: Television",
      15: "Entertainment: Video Games",
      16: "Entertainment: Board Games",
      17: "Science & Nature",
      18: "Science: Computers",
      19: "Science: Mathematics",
      20: "Mythology",
      21: "Sports",
      22: "Geography",
      23: "History",
      24: "Politics",
      25: "Art",
      26: "Celebrities",
      27: "Animals",
      28: "Vehicles",
      29: "Entertainment: Comics",
      30: "Science: Gadgets",
      31: "Entertainment: Japanese Anime & Manga",
      32: "Entertainment: Cartoon & Animations",
    };
    return categories[categoryId] || "Unknown Category";
  }
  console.log(lastGames);

  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <ModalHeader title={"Last Played"} onClose={() => setModalInfo(false)} />
      <div className="w-full min-w-96 flex flex-col items-center gap-5">
        {lastGames.length === 0 ? (
          "No Games Played"
        ) : (
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Points/Q</th>
                <th className="p-2">Points avg</th>
                <th className="p-2">Cat</th>
                <th className="p-2">Diff</th>
              </tr>
            </thead>
            <tbody className="text-center" key="index">
              {lastGames
                .slice()
                .reverse() // Show most recent first
                .slice(0, 10) // Limit to 10 entries
                .map((lastGame, index) => (
                  <tr key={index}>
                    {" "}
                    {/* Ensure each row has a unique key */}
                    <td className="p-2">
                      {new Date(lastGame.timestamp).toLocaleString()}
                    </td>
                    <td className="p-2">
                      {lastGame.score} / {lastGame.totalQuestions}{" "}
                      {/* Score out of total questions */}
                    </td>
                    <td className="p-2">
                      {(lastGame.score / lastGame.totalQuestions).toFixed(2)}{" "}
                      {/* Points per question */}
                    </td>
                    <td className="p-2">
                      {getCategoryName(lastGame.category)}
                    </td>
                    <td className="p-2">
                      {capitalizeFirstLetter(lastGame.difficulty)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Modal>
  );
}
