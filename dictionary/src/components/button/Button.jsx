//импортирую стили
import styles from "./Button.module.css"


function Button(props) {
    return (
        < button className={styles.button} onClick={props.onClick}> {props.name}</ button >
    )
}

export default Button;