import { PriceCard } from "@components/PriceCard";

export function PriceCards({ title, subtitle, paragraph, cards }) {
    return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {!title.hidden && <h1 style={title.style} >{ title.content }</h1>}
        {!subtitle.hidden && <h3 style={subtitle.style}>{ subtitle.content}</h3>}
        {!paragraph.hidden && <p style={paragraph.style}>{ paragraph.content}</p>}
        <div style={{ display: "flex", gap: "24px", padding: "20px", width: "100%", justifyContent: "center", flexWrap: "wrap", ...cards.style }}>
            {cards.content.map((card, index) => (
                <PriceCard key={index} {...card} />
            ))}
        </div>
    </div>
    )
}