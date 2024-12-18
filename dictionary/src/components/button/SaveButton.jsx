import { forwardRef } from "react";
import styles from "./Button.module.css"


const SaveButton = forwardRef(function Button(props, ref) {
    return (
        < button
            ref={ref}
            className={styles.button}
            onClick={props.onClick}
        // disabled={props.disabled} не помогает сделать кнопку не активной
        >
            {props.name}
        </ button >
    );
});

export default SaveButton;