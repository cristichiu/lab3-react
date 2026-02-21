import defaultJson from "../data/default.json";
import { useState } from "react";

import { Margin } from "@components/builderMenu/edit/style/Margin";
import { TreeItem } from "@components/builderMenu/sections/TreeItem";
import { PriceCards } from "@components/sections/PriceCards";

function Preview() {
    const [profile, setProfile] = useState(defaultJson.profile);
    const [selectedPath, setSelectedPath] = useState([]);
    const [preview, setPreview] = useState(false);

    const updateNested = (obj, path, value) => {
        if (path.length === 0) return value;
        const [key, ...rest] = path;
        return {
            ...obj,
            [key]: updateNested(obj[key] ?? {}, rest, value)
        };
    };
    const updateByPath = (obj, path, value) => {
        if (path.length === 0) return value;

        const [key, ...rest] = path;

        if (Array.isArray(obj)) {
            const newArr = [...obj];
            newArr[key] = updateByPath(obj[key], rest, value);
            return newArr;
        }

        return {
            ...obj,
            [key]: updateByPath(obj?.[key], rest, value)
        };
    };
    const updateProfile = (path, value) => {
        setProfile(prev => updateByPath(prev, path, value));
    };
    const parseMargin = (marginStr) => {
        const parts = marginStr.split(" ");
        const [top, right, bottom, left] = [
            parts[0],
            parts[1] || parts[0],
            parts[2] || parts[0],
            parts[3] || parts[1] || parts[0]
        ];
        return { top, right, bottom, left };
    };

    const buildStyleTree = (obj, path = []) => {
        if (!obj || typeof obj !== "object") return [];

        return Object.entries(obj).flatMap(([key, value]) => {
            const currentPath = [...path, key];

            if (!value || typeof value !== "object") return [];

            const children = buildStyleTree(value, currentPath);

            if (value.style || children.length > 0) {
                return [{
                    key,
                    path: currentPath,
                    selectable: !!value.style,
                    children
                }];
            }

            return [];
        });
    };
    const tree = buildStyleTree(profile);

    return (
        <>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: 16, borderBottom: "1px solid #ddd" }}>
            <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => setPreview(true)}>preview</span>
            <span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => setPreview(false)}>edit</span>
        </div>
        {
            !preview ?
                <div style={{ display: "flex", overflow: "hidden", justifyContent: "space-between", height: "calc(100vh - 51px)" }}>
                    <div style={{ width: "300px", height: "100%", borderRight: "1px solid #ddd" }}>
                        {tree.map((node, i) => (
                            <TreeItem
                                key={i}
                                node={node}
                                onSelect={setSelectedPath}
                                selectedPath={selectedPath}
                            />
                        ))}
                    </div>
                    <div style={{ width: `calc(100vw - 300px - 300px - 32px)`, border: "3px solid #ddd", margin: "16px", overflowY: "auto" }}>
                        {profile.sections.map(section => {
                            switch(section.id){
                                case "priceCards":
                                    return <PriceCards key={section.id} {...section.data} />
                            }
                        })}
                    </div>
                    <div style={{ width: "300px", height: "100%", borderLeft: "1px solid #ddd", padding: "16px", overflowY: "auto" }}>
                        <Margin
                            values={parseMargin(
                                selectedPath.reduce((acc,k)=>acc?.[k], profile)?.style?.margin || "0"
                            )}
                            onChange={(val)=>
                                updateProfile([...selectedPath,"style","margin"], val)
                            }
                        />
                    </div>
                </div>
                :
                profile.sections.map(section => {
                    switch(section.id){
                        case "priceCards":
                            return <PriceCards key={section.id} {...section.data} />
                    }
                })
            }
        </>
    );
}

export default Preview;