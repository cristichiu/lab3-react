import styles from "./PriceCard.module.css";
import { Button } from "@components/Button";
import { BulletPoint } from "@components/BulletPoint";

export function PriceCard({ title, price, button, bulletPoints, offert, style, tag = null }) {
    return (<>
        <div className={styles.card} style={style}>
            <div className={styles.cardContent}>
                <div>
                    { tag && !tag.hidden && <div className={styles.tag} style={tag.style}>{tag.content}</div> }
                    { !title.hidden && <h3 className={styles.title} style={title.style}>{title.content}</h3> }
                    <p className={styles.price} style={style?.price}>
                        <span className={styles.amount} style={style?.amount}>{price.content}</span>
                        <span className={styles.offert} style={style?.offert}>/{offert.content}</span>
                    </p>
                </div>
                <div>
                    {bulletPoints.content.map((point) => (
                         <BulletPoint key={point} text={point} style={bulletPoints.style} />
                    ))}
                </div>
            </div>
            <Button type={tag ? "default" : "gray"} style={button.style}>{button.content}</Button>
        </div>
    </>
    );
}