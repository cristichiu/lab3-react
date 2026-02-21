import { useState, useEffect } from "react";

export function TreeItem({ node, selectedPath, onSelect }) {
    const [open, setOpen] = useState(false);

    const isSelected =
        JSON.stringify(node.path) === JSON.stringify(selectedPath);

    const toggle = () => setOpen(o => !o);

    const formatKey = (key) => {
        if (!isNaN(key)) {
            return `Item ${Number(key) + 1}`;
        }

        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase())
            .trim();
    };

    return (
        <div style={{ marginLeft: 12 }}>
            <div
                onClick={() => {
                    toggle();
                    onSelect(node.path);
                }}
                style={{
                    cursor: "pointer",
                    padding: "5px 8px",
                    borderRadius: 6,
                    background: isSelected ? "#c7d2fe" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                }}
            >
                {node.children?.length > 0 && (
                    <span
                        style={{
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "0.15s"
                        }}
                    >
                        ▶
                    </span>
                )}

                {formatKey(node.key)}
            </div>

            {open && node.children?.map((child, i) => (
                <TreeItem
                    key={i}
                    node={child}
                    selectedPath={selectedPath}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}