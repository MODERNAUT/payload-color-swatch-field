"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Button, FieldLabel, useField, useFieldProps, usePreferences } from "@payloadcms/ui";
import "../styles-tailwind.css"; // TO DO: Only load this if tailwind is enabled?
import "../index.css";
const baseClass = "color-swatch-field";
const isTailwindColor = (color, tailwindColorWhitelist)=>{
    return color && // Check to ensure it isn't null
    tailwindColorWhitelist.includes(color);
};
export const ColorSwatchComponent = ({ defaultColors, lockDefaultColors, allowNull, allowUserPreferences, useGlobalPreferences, allowTailwindColors, tailwindColorWhitelist, allowHexColors, field })=>{
    const { label } = field;
    const { path, readOnly: readOnlyFromProps } = useFieldProps();
    const { value = "", setValue } = useField({
        path
    });
    const defaultPreferenceKey = useGlobalPreferences ? "default-color-swatch-colors" : field.name + "-default-color-swatch-colors";
    const customPreferenceKey = useGlobalPreferences ? "custom-color-swatch-colors" : field.name + "-custom-color-swatch-colors";
    const { getPreference, setPreference } = usePreferences();
    const [defaultColorOptions, setDefaultColorOptions] = useState([
        allowNull && null,
        ...defaultColors.filter((element)=>{
            // Filter any user input to ensure they're proper values
            return allowHexColors && element.startsWith("#") || // If hex value
            allowTailwindColors && isTailwindColor(element, tailwindColorWhitelist) // If a tailwind color
            ;
        })
    ]);
    const [customColorOptions, setCustomColorOptions] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [colorToAdd, setColorToAdd] = useState("");
    const [selectedTailwindColor, setSelectedTailwindColor] = useState("");
    useEffect(()=>{
        if (allowUserPreferences) {
            // If custom colors are allowed, then get the user's color preferences
            const getColorPreferences = async ()=>{
                if (!lockDefaultColors) {
                    const defaultColorPreferences = await getPreference(defaultPreferenceKey);
                    if (defaultColorPreferences && defaultColorPreferences !== undefined && defaultColorPreferences.length != 0) {
                        setDefaultColorOptions(defaultColorPreferences);
                    }
                }
                const customColorPreferences = await getPreference(customPreferenceKey);
                if (customColorPreferences && customColorPreferences !== undefined && customColorPreferences.length != 0) {
                    setCustomColorOptions(customColorPreferences);
                }
            };
            getColorPreferences();
        }
    }, []);
    const handleAddColor = useCallback(()=>{
        // This can only run when 'allowUserPreferences' is true
        setIsAdding(false);
        setValue(colorToAdd);
        // Prevent adding duplicates
        if (customColorOptions.indexOf(colorToAdd) > -1) return;
        // Add the color
        let newOptions = customColorOptions;
        newOptions.push(colorToAdd);
        // Update state with new colors
        setCustomColorOptions(newOptions);
        // Store the user color preferences for future use
        setPreference(customPreferenceKey, newOptions);
    }, [
        value,
        colorToAdd,
        customColorOptions,
        setPreference
    ]);
    const handleRemoveColor = useCallback(()=>{
        if (!lockDefaultColors && defaultColorOptions.includes(value)) {
            // Remove the color
            let newOptions = defaultColorOptions.filter((color)=>{
                return color !== value;
            });
            // Update state with new colors
            setDefaultColorOptions(newOptions);
            // Store the user color preferences for future use
            setPreference(defaultPreferenceKey, newOptions);
        } else {
            // Remove the color
            let newOptions = customColorOptions.filter((color)=>{
                return color !== value;
            });
            // Update state with new colors
            setCustomColorOptions(newOptions);
            // Store the user color preferences for future use
            setPreference(customPreferenceKey, newOptions);
        }
        setValue("");
    }, [
        value,
        defaultColorOptions,
        customColorOptions,
        setPreference
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(FieldLabel, {
                field: field,
                htmlFor: path,
                label: label
            }),
            isAdding && /*#__PURE__*/ _jsxs("div", {
                children: [
                    allowTailwindColors && /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                            /*#__PURE__*/ _jsxs("select", {
                                value: selectedTailwindColor,
                                onChange: (e)=>{
                                    setSelectedTailwindColor(e.target.value);
                                    setColorToAdd(e.target.value);
                                },
                                children: [
                                    /*#__PURE__*/ _jsx("option", {
                                        value: "",
                                        children: "Tailwind color"
                                    }, "tailwind-colors-all"),
                                    tailwindColorWhitelist.map((color, i)=>/*#__PURE__*/ _jsx("option", {
                                            value: color,
                                            className: color,
                                            children: color
                                        }, i))
                                ]
                            }),
                            " "
                        ]
                    }),
                    allowHexColors && /*#__PURE__*/ _jsx("input", {
                        className: `${baseClass}__input`,
                        type: "text",
                        placeholder: "#000000",
                        onChange: (e)=>{
                            setSelectedTailwindColor("");
                            setColorToAdd(e.target.value);
                        },
                        value: colorToAdd
                    }),
                    /*#__PURE__*/ _jsx("br", {}),
                    /*#__PURE__*/ _jsx(Button, {
                        className: `${baseClass}__btn`,
                        buttonStyle: "primary",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        size: "small",
                        onClick: handleAddColor,
                        children: "Add"
                    }),
                    " ",
                    /*#__PURE__*/ _jsx(Button, {
                        className: `${baseClass}__btn`,
                        buttonStyle: "secondary",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        size: "small",
                        onClick: ()=>setIsAdding(false),
                        children: "Cancel"
                    })
                ]
            }),
            !isAdding && /*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    /*#__PURE__*/ _jsxs("ul", {
                        className: `${baseClass}__colors`,
                        children: [
                            defaultColorOptions.map((color, i)=>/*#__PURE__*/ _jsx("li", {
                                    className: `${baseClass}__color-default`,
                                    children: /*#__PURE__*/ _jsx("button", {
                                        type: "button",
                                        className: `chip ${!color ? "no-color" : ""} ${color === value ? "chip--selected" : ""} ${color && isTailwindColor(color, tailwindColorWhitelist) && color} chip--clickable`,
                                        style: // Hex values should be inline background
                                        {
                                            backgroundColor: color && color.startsWith("#") && color
                                        },
                                        onClick: ()=>setValue(color),
                                        title: color && color,
                                        children: color && !color.startsWith("#") && String.fromCharCode(65 + i) + String.fromCharCode(97 + i) // Generate Alphanumeric text
                                    }, color ? color : "transparent")
                                }, i)),
                            allowUserPreferences && customColorOptions.length > 0 && /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx("li", {
                                        className: `${baseClass}__color-custom-separator`
                                    }),
                                    customColorOptions.map((color, i)=>/*#__PURE__*/ _jsx("li", {
                                            className: `${baseClass}__color-custom`,
                                            children: /*#__PURE__*/ _jsx("button", {
                                                type: "button",
                                                className: `chip ${!color ? "no-color" : ""} ${color === value ? "chip--selected" : ""} ${color && isTailwindColor(color, tailwindColorWhitelist) && color} chip--clickable`,
                                                style: // Hex values should be inline background
                                                {
                                                    backgroundColor: color && color.startsWith("#") && color
                                                },
                                                onClick: ()=>setValue(color),
                                                title: color && color,
                                                children: color && !color.startsWith("#") && String.fromCharCode(// Generate Alphanumeric text
                                                65 + i + defaultColorOptions.length + 1) + String.fromCharCode(97 + i + defaultColorOptions.length + 1)
                                            }, color ? color : "transparent")
                                        }, i))
                                ]
                            })
                        ]
                    }),
                    allowUserPreferences && /*#__PURE__*/ _jsx(Button, {
                        className: "add-color",
                        icon: "plus",
                        tooltip: "Add color",
                        buttonStyle: "icon-label",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        onClick: ()=>{
                            setIsAdding(true);
                            setValue("");
                        }
                    }),
                    value && // Display remove color button
                    allowUserPreferences && // If custom colors are allowed
                    (lockDefaultColors && !defaultColors.includes(value) || // If value isn't in default colors, and default colors are locked
                    !lockDefaultColors) && /*#__PURE__*/ _jsx(Button, {
                        className: "remove-color",
                        icon: "x",
                        tooltip: "Remove color",
                        buttonStyle: "icon-label",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        onClick: handleRemoveColor
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=ColorSwatchComponent.js.map