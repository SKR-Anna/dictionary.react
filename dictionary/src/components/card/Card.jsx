import { useState } from "react"
import Button from "../button/Button"
import "./Card.css"
// import { useRef } from "react"

function Card({ id, english, transcription, russian }) {
    const [turned, setTurned] = useState(false)

    const handleTurnedState = () => {
        setTurned(!turned)
    }

    // вариант без ошибок в консоли, но кнопка не работает
    // const cardRef = useRef(null);
    // const handleTurnedState = () => {
    //     cardRef.current.addEventListener(
    //         'transitioned', () => {
    //             cardRef.current.classList.toggle('turn');
    //         },
    //         { once: true },
    //     );
    // };

    // консоль выдает ошибку, но карточки крутятся
    // const cardRef = useRef(null);
    // const handleTurnedState = () => {
    //     cardRef.current.classList.toggle('turn')(
    //         { once: true },
    //     );
    // };

    return (
        < div id={id} className="word-card" >
            <div className={`card-inner ${turned ? 'turn' : ''}`}>
                {/* <div ref={cardRef} className="card-inner"> */}
                <div className="card-front">
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <Button name="Показать перевод" onClick={handleTurnedState} />
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