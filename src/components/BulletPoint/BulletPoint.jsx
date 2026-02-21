import styles from "./BulletPoint.module.css";
import GreenCheckMark from "../../assets/icons/GreenCheckMark.svg";

export function BulletPoint({ text, style }) {
    return <div className={styles.bulletpoint} style={style}>
        <img src={GreenCheckMark} alt="green check mark" />
        <div>{text}</div>
    </div>
}