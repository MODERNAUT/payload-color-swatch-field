// TO DO: Add Cell support for column sorting by color
export const colorSwatchField = (overrides = {})=>{
    return {
        name: "color",
        type: "text",
        index: true,
        label: "Color",
        required: false,
        validate: (value)=>value == null || value?.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)?.length === 1 || "This field is required",
        ...overrides ?? {},
        admin: {
            position: "sidebar",
            ..."admin" in overrides ? overrides.admin : {},
            components: {
                Field: {
                    path: "@modernaut/payload-color-swatch-field/client#ColorSwatchComponent"
                }
            }
        }
    };
};

//# sourceMappingURL=index.js.map