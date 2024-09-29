import Button from "../button/Button"
import MakeCardButton from "../button/MakeCardButton"
import "./Header.css"


function Header() {
    return (
        <header className="header">
            <Button name="карточки" />
            <MakeCardButton name="создать карточку" />
        </header>
    )
}

export default Header