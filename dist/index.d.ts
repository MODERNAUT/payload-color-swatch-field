import type { TextField } from "payload";
interface ColorSwatchProps {
    defaultColors?: string[];
    lockDefaultColors?: boolean;
    allowNull?: boolean;
    allowUserPreferences?: boolean;
    useGlobalPreferences?: boolean;
    allowTailwindColors?: boolean;
    tailwindColorWhitelist?: string[];
    allowHexColors?: boolean;
    overrides?: Partial<TextField>;
}
type ColorSwatchField = ({ defaultColors, lockDefaultColors, allowNull, allowUserPreferences, useGlobalPreferences, allowTailwindColors, tailwindColorWhitelist, allowHexColors, overrides, }: ColorSwatchProps) => TextField;
export declare const colorSwatchField: ColorSwatchField;
export {};
//# sourceMappingURL=index.d.ts.map