import { useState } from "react"
import Button from "../button/Button"
import "./Card.css"

function Card({ id, english, transcription, russian }) {
    const [turned, setTurned] = useState(false)

    const handleTurnedState = () => {
        setTurned(!turned)
    }

    return (
        < div id={id} className="word-card" >
            <div className={`card-inner ${turned ? 'turn' : ''}`}>
                <div className="card-front">
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <p className="word-card p">{russian}</p>
                    <Button name="Скрыть перевод" onClick={handleTurnedState} />
                </div>

                <div className="card-back">
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <Button name="Показать перевод" onClick={handleTurnedState} />
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