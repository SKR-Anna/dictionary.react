import { useState, useEffect, useRef } from "react"
import Button from "../button/Button"
import "./Card.css"

function Card({ id, english, transcription, russian, onLearnedWord }) { // убрала из пропсов index, learnedWords
    const [turned, setTurned] = useState(false);
    const buttonRef = useRef(null); // создаем реф для кнопки

    //const [isLearned, setIsLearned] = useState(false); // состояние для отслеживания перевода

    // const handleTurnedState = () => {
    //     setTurned(!turned);
    //     if (!turned && !isLearned) { // Увеличиваем счетчик только при первом переводе
    //         onLearnedWord(); // Вызываем функцию для увеличения счетчика (функция пришла из родительского компонента - кард слайдер)
    //         setIsLearned(true); // Отмечаем, что слово было переведено
    //     }
    // };



    const handleTurnedState = () => {
        setTurned((prevTurned) => {
            const newTurned = !prevTurned; // новое состояние переворота
            if (newTurned) {
                // Увеличиваем счетчик только если слово еще не изучено
                onLearnedWord(); // Вызываем функцию для увеличения счетчика (функция пришла из родительского компонента - кард слайдер)
                // learnedWords[index] = true; // Отмечаем, что слово было переведено
            }
            return newTurned;
        });
    };

    useEffect(() => {
        // Устанавливаем фокус на кнопку, когда компонент монтируется
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    }, []); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз после первого рендера



    return (
        < div id={id} className="word-card" >
            <div className={`card-inner ${turned ? 'turn' : ''}`}>
                {/* <div ref={cardRef} className="card-inner"> */}
                <div className="card-front">
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <Button name="Показать перевод" onClick={handleTurnedState}
                        ref={buttonRef} />
                    {/* применили реф к кнопке */}
                </div>

                <div className="card-back">
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <p className="word-card p">{russian}</p>
                    <Button name="Скрыть перевод" onClick={handleTurnedState} />
                </div>
            </div>
        </div>
    );
}

export default Card

// версия с тернарным оператором, но без анимации
// return (
//     < div id={id} className="word-card" >
//         {turned ? (
//             <>
//                 <h2 className="word-card h2">{english}</h2>
//                 <p className="word-card p"> {transcription}</p>
//                 <p className="word-card p">{russian}</p>
//             </>
//         ) : (
//             <>
//                 <h2 className="word-card h2">{english}</h2>
//                 <p className="word-card p"> {transcription}</p>
//                 <Button name="Показать перевод" onClick={handleTurnedState} />
//             </>
//         )}
//     </div>
// )