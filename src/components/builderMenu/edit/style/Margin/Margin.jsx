import styles from "./Margin.module.css";

import { DecInputInc } from "@components/builderMenu/usage/DecInputInc";

export function Margin({ values: { top, right, bottom, left }, onChange }) {
    function handleChange(value, side) {
        if(side === "all") {
            onChange(`${value} ${value} ${value} ${value}`);
            return;
        }
        const newValues = { left, top, right, bottom, [side]: value ? value + "px" : "0px" };
        onChange(`${newValues.top} ${newValues.right} ${newValues.bottom} ${newValues.left}`);
    }
    return <div className={styles.container}>
        <span>Margin</span>
        <DecInputInc label="Top" value={parseInt(top) || ""} onChange={(value) => handleChange(value, "top")} />
        <DecInputInc label="Right" value={parseInt(right) || ""} onChange={(value) => handleChange(value, "right")} />
        <DecInputInc label="Bottom" value={parseInt(bottom) || ""} onChange={(value) => handleChange(value, "bottom")} />
        <DecInputInc label="Left" value={parseInt(left) || ""} onChange={(value) => handleChange(value, "left")} />
    </div>
}