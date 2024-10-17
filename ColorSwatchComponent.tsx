"use client";

import React, { useEffect, useState, useCallback, Fragment } from "react";

import {
  Button,
  FieldLabel, // Re-use the built in Label component directly from Payload
  useField,
  useFieldProps,
  usePreferences,
} from "@payloadcms/ui";

import { TextFieldClientProps } from "payload";

// Import the SCSS stylesheet
import "./index.scss";

// A list of default colors to choose from (TO DO: Pull from DB, env or tailwind)
const defaultColors = [
  null,
  "#0F0F0F",
  "#9A9A9A",
  "#F3F3F3",
  "#FF6F76",
  "#FDFFA4",
  "#B2FFD6",
  "#F3DDF3",
];

const baseClass = "color-swatch-field";

const preferenceKey = "color-swatch-colors";

type ColorSwatchComponentProps = TextFieldClientProps;

export const ColorSwatchComponent: React.FC<ColorSwatchComponentProps> = ({
  field,
  // fieldToUse,
  // checkboxFieldPath: checkboxFieldPathFromProps,
}) => {
  const { label } = field;
  const { path, readOnly: readOnlyFromProps } = useFieldProps();

  const { value = "", setValue } = useField({
    path,
  });

  const { getPreference, setPreference } = usePreferences();
  const [colorOptions, setColorOptions] = useState(defaultColors);
  const [isAdding, setIsAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState("");

  useEffect(() => {
    const mergeColorsFromPreferences = async () => {
      const colorPreferences = await getPreference<string[]>(preferenceKey);
      if (
        colorPreferences &&
        colorPreferences !== undefined &&
        colorPreferences.length != 0
      ) {
        // Add some checking to ensure at least the default colors are presented
        setColorOptions(colorPreferences);
      }
    };
    mergeColorsFromPreferences();
  }, [getPreference, setColorOptions]);

  const handleAddColor = useCallback(() => {
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
  }, [colorOptions, setPreference, colorToAdd, setIsAdding, setValue]);

  // TO DO: Implement a handleRemoveColor option

  return (
    <div className={baseClass}>
      <FieldLabel field={field} htmlFor={path} label={label} />

      {isAdding && (
        <div>
          <input
            className={`${baseClass}__input`}
            type="text"
            placeholder="#000000"
            onChange={(e) => setColorToAdd(e.target.value)}
            value={colorToAdd}
          />
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="primary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={handleAddColor}
          >
            Add
          </Button>
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="secondary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      {!isAdding && (
        <Fragment>
          <ul className={`${baseClass}__colors`}>
            {colorOptions.map((color, i) => (
              <li key={i}>
                <button
                  type="button"
                  key={color ? color : "transparent"}
                  className={`chip ${!color ? "no-color" : ""} ${color === value ? "chip--selected" : ""} chip--clickable`}
                  style={{ backgroundColor: color ? color : "white" }}
                  onClick={() => setValue(color)}
                />
              </li>
            ))}
          </ul>
          <Button
            className="add-color"
            icon="plus"
            buttonStyle="icon-label"
            iconPosition="left"
            iconStyle="with-border"
            onClick={() => {
              setIsAdding(true);
              setValue("");
            }}
          />
        </Fragment>
      )}
    </div>
  );
};
