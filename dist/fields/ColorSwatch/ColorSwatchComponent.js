"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Button, FieldLabel, useField, useFieldProps, usePreferences } from "@payloadcms/ui";
// Import the SCSS stylesheet
import "../index.scss";
// A list of default colors to choose from (TO DO: Pull from DB, env or tailwind)
const defaultColors = [
    null,
    "#0F0F0F",
    "#9A9A9A",
    "#F3F3F3",
    "#FF6F76",
    "#FDFFA4",
    "#B2FFD6",
    "#F3DDF3"
];
const baseClass = "color-swatch-field";
const preferenceKey = "color-swatch-colors";
export const ColorSwatchComponent = ({ field })=>{
    const { label } = field;
    const { path, readOnly: readOnlyFromProps } = useFieldProps();
    const { value = "", setValue } = useField({
        path
    });
    const { getPreference, setPreference } = usePreferences();
    const [colorOptions, setColorOptions] = useState(defaultColors);
    const [isAdding, setIsAdding] = useState(false);
    const [colorToAdd, setColorToAdd] = useState("");
    useEffect(()=>{
        const mergeColorsFromPreferences = async ()=>{
            const colorPreferences = await getPreference(preferenceKey);
            if (colorPreferences && colorPreferences !== undefined && colorPreferences.length != 0) {
                // Add some checking to ensure at least the default colors are presented
                setColorOptions(colorPreferences);
            }
        };
        mergeColorsFromPreferences();
    }, [
        getPreference,
        setColorOptions
    ]);
    const handleAddColor = useCallback(()=>{
        setIsAdding(false);
        setValue(colorToAdd);
        // prevent adding duplicates
        if (colorOptions.indexOf(colorToAdd) > -1) return;
        // Add the color
        let newOptions = colorOptions;
        newOptions.push(colorToAdd);
        // Resetting the options (debugging)
        // let newOptions = []
        // update state with new colors
        setColorOptions(newOptions);
        // store the user color preferences for future use
        setPreference(preferenceKey, newOptions);
    }, [
        colorOptions,
        setPreference,
        colorToAdd,
        setIsAdding,
        setValue
    ]);
    // TO DO: Implement a handleRemoveColor option
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
                    /*#__PURE__*/ _jsx("input", {
                        className: `${baseClass}__input`,
                        type: "text",
                        placeholder: "#000000",
                        onChange: (e)=>setColorToAdd(e.target.value),
                        value: colorToAdd
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        className: `${baseClass}__btn`,
                        buttonStyle: "primary",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        size: "small",
                        onClick: handleAddColor,
                        children: "Add"
                    }),
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
                    /*#__PURE__*/ _jsx("ul", {
                        className: `${baseClass}__colors`,
                        children: colorOptions.map((color, i)=>/*#__PURE__*/ _jsx("li", {
                                children: /*#__PURE__*/ _jsx("button", {
                                    type: "button",
                                    className: `chip ${!color ? "no-color" : ""} ${color === value ? "chip--selected" : ""} chip--clickable`,
                                    style: {
                                        backgroundColor: color ? color : "white"
                                    },
                                    onClick: ()=>setValue(color)
                                }, color ? color : "transparent")
                            }, i))
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        className: "add-color",
                        icon: "plus",
                        buttonStyle: "icon-label",
                        iconPosition: "left",
                        iconStyle: "with-border",
                        onClick: ()=>{
                            setIsAdding(true);
                            setValue("");
                        }
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=ColorSwatchComponent.js.map