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
            {turned ? (
                <>
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <p className="word-card p">{russian}</p>
                </>
            ) : (
                <>
                    <h2 className="word-card h2">{english}</h2>
                    <p className="word-card p"> {transcription}</p>
                    <Button name="Показать перевод" onClick={handleTurnedState} />
                </>
            )}
        </div>
    )
}

export default Card