//импортирую классы
import "./Card.css"

function Card({ id, english, transcription, russian }) {
    return (
        <div id={id} className="word-card">
            <h2 className="word-card h2">{english}</h2>
            <p className="word-card p"> {transcription}</p>
            <p className="word-card p">{russian}</p>
        </div>
    )
}

export default Card