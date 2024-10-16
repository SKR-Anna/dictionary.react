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

    // Функция для переключения на следующую карточку
    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    // Функция для переключения на предыдущую карточку
    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
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
                />
                <Button name="Вперед" onClick={nextCard} />
            </div>
            <div className="counter">
                {currentIndex}/{data.length}
            </div>
        </div>
    )
}

export default CardSlider;

