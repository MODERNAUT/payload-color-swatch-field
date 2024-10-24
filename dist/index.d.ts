import type { TextField } from "payload";
interface FieldFunctionProps {
    overrides?: Partial<TextField>;
}
type FieldFunction = ({ overrides }: FieldFunctionProps) => TextField;
export declare const colorSwatchField: FieldFunction;
export {};
//# sourceMappingURL=index.d.ts.map