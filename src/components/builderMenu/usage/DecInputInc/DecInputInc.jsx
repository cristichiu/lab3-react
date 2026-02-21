import styles from "./DecInputInc.module.css";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function DecInputInc({ label, value, onChange }) {
    return <div className={styles.decInputInc}>
        <span>{label}</span>
        <div className={styles.inputContainer}>
            <Button type="gray" onClick={() => onChange(value - 1)} style={{ width: "40px", height: "40px" }}>-</Button>
            <Input style={{ width: "80px" }} type="number" placeholder="px" value={value} onChange={(e) => onChange(e.target.value)} />
            <Button type="gray" onClick={() => onChange(value + 1)} style={{ width: "40px", height: "40px" }}>+</Button>
        </div>
    </div>
}