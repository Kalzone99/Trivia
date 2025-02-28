import { SetStateAction, useState } from "react";
import { Modal } from "./modal";
import { ModalHeader } from "./modalHeader";
import { categories } from "../utils/categories";

type SettingsProps = {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
};
export const Settings = ({ modalInfo, setModalInfo }: SettingsProps) => {
  const [category, setCategory] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("Any Difficulty");
  const [type, setType] = useState("any");

  const totalOfQuestions = [5, 10, 15, 20, 25, 30, 40, 50];
  const difficulties = ["Easy", "Medium", "Hard"];

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <ModalHeader
        title={"Game Settings"}
        onClose={() => setModalInfo(false)}
      />
      <div className="w-full flex flex-col items-center gap-5">
        <label className="w-full">
          <span className="block mb-2 text-gray-700">Category</span>

          <select
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="w-full">
          <span className="block mb-2 text-gray-700">Number of Questions</span>

          <select
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md">
            {totalOfQuestions.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
        <label className="w-full">
          <span className="block mb-2 text-gray-700">Difficulty</span>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md">
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {capitalizeFirstLetter(difficulty)}
              </option>
            ))}
          </select>
        </label>
        <label className="w-full">
          <span className="block mb-2 text-gray-700">Type</span>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md">
            <option value={"any"}>Any</option>
            <option value={"multiple"}>Multiple Choice</option>
            <option value={"boolean"}>True Or False</option>
          </select>
        </label>
        <button className="bg-blue-600 w-full py-2 rounded-lg text-white cursor-pointer hover:bg-blue-900">
          Save Settings
        </button>
      </div>
    </Modal>
  );
};
