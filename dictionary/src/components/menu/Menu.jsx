import { Link } from "react-router-dom";

export default function Menu({ title = "Dictionary" }) {
    return (
        <div>
            <Link to="/">Logo</Link>
            {/* вместо лого подставить иконку */}
            <h3>Меню || {title}</h3>
            <Link to="/">Главная</Link>
            <Link to="/game">Игра</Link>
        </div>
    );
};