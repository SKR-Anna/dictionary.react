import Button from "../button/Button";
import "./Footer.css"


function Footer() {
    return (
        <footer className="footer">
            <Button name="настройки" />
            <Button name="поделиться" />
            <Button name="сообщить об ошибке" />
        </footer>
    )
}

export default Footer