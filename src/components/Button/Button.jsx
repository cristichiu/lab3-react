import styles from "./Button.module.css";

export function Button({ type = "default", children, style, onClick }) {
    return <button className={`${styles[type]} ${styles.button}`} style={style} onClick={onClick}>{children}</button>
}