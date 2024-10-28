import React from "react";
import { TextFieldClientProps } from "payload";
import "../styles-tailwind.css";
import "../index.css";
type ColorSwatchProps = {
    readonly defaultColors: string[];
    readonly lockDefaultColors: boolean;
    readonly allowNull: boolean;
    readonly allowUserPreferences: boolean;
    readonly useGlobalPreferences: boolean;
    readonly allowTailwindColors: boolean;
    readonly tailwindColorWhitelist: string[];
    readonly allowHexColors: boolean;
} & TextFieldClientProps;
export declare const ColorSwatchComponent: React.FC<ColorSwatchProps>;
export {};
//# sourceMappingURL=ColorSwatchComponent.d.ts.map