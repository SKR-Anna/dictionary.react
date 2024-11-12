import { useState } from "react";
import data from "../../data";
import Card from "../card/Card";
import Button from "../button/Button";
import './CardSlider.css'

const words = {
    "id": "default-id",
    "english": "Неизвестное слово",
    "transcription": "Неизвестная транскрипция",
    "russian": "Неизвестный перевод"
};




const CardSlider = ({ initialIndex = 0, wordsData = words }) => {


    // Состояние для текущей карточки 
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Состояние для подсчета выученных слов
    const [learnedWords, setLearnedWords] = useState(0);

    const [clickedWords, setClickedWords] = useState(new Set());

    // Функция для переключения на следующую карточку
    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    // Функция для переключения на предыдущую карточку
    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    // Функция для подсчета изученных слов (её мы передадим в дочерний компонент)
    // const handleLearnedWord = () => {
    //     setLearnedWords((prevCount) => prevCount + 1);
    // };

    const handleLearnedWord = (wordId) => {
        if (!clickedWords.has(wordId)) {
            setLearnedWords((prevCount) => prevCount + 1);

            setClickedWords((prevClicked) => new Set(prevClicked).add(wordId));
        }
    };

    return (
        <div className="wrapper">
            <div className="cardSlider-container">
                <Button name="Назад" onClick={prevCard} />
                <Card
                    id={data[currentIndex].id || wordsData[currentIndex].id}
                    english={data[currentIndex].english || wordsData[currentIndex].english}
                    transcription={data[currentIndex].transcription || wordsData[currentIndex].transcription}
                    russian={data[currentIndex].russian || wordsData[currentIndex].russian}
                    wordId={data[currentIndex].id}
                    onLearnedWord={handleLearnedWord} //передали функцию из родительского компонента  (нам также нужно использовать эту функцию в самом компоненте card, когда пользователь нажимает на кнопку "показать перевод")
                />
                <Button name="Вперед" onClick={nextCard} />
            </div>
            <div className="counter">
                {currentIndex + 1}/{data.length} <br />
                <p>Изучено слов: {learnedWords}</p>
            </div>
        </div>
    )
}

export default CardSlider;

