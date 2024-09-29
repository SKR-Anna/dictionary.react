import styles from "./MakeCardButton.module.css"


function MakeCardButton(props) {
    return (
        < button className={styles.button}> {props.name}</ button >
    )
}

export default MakeCardButton