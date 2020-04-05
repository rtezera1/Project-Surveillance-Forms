import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Switch,
  Checkbox,
} from "@material-ui/core";
import { isEmpty, cloneDeep } from "lodash";

const StatefulTextField = ({ field, clear }) => {
  // fullWidth
  const {
    label,
    property,
    onChange,
    disabled,
    onValidate,
    validationErrorMsg,
    focus,
  } = field;

  const [value, setValue] = useState(field.value || "");
  const [isValid, setIsValid] = useState(true);

  const firstUpdate = useRef(true); // dont run on mount
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    handleValidation();
  }, [value]);

  useEffect(() => {
    if (clear === 0) {
      return;
    }
    firstUpdate.current = true;
    setValue(field.value || "");
  }, [clear]);


  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleValidation = () => {
    if (onValidate) {
      const result = onValidate(value);
      setIsValid(result);
    }
  };

  const props = {};
  if (!isValid) {
    props["error"] = true;
    props["helperText"] = !isEmpty(validationErrorMsg)
      ? validationErrorMsg
      : "Incorrect Input";
  } else {
    props["error"] = undefined;
    props["helperText"] = undefined;
  }

  if (focus) {
    props["autoFocus"] = true;
  }

  return (
    <Box>
      <Typography>{label}</Typography>
      <TextField
        id={`${property}-outlined`}
        value={value}
        onChange={handleChange}
        disabled={!!disabled}
        fullWidth={true}
        autoComplete="false"
        size="small"
        variant="outlined"
        {...props}
      />
    </Box>
  );
};
const StatefulDateField = ({ field }) => {
  // fullWidth
  const {
    label,
    property,
    onChange,
    disabled,
    onValidate,
    validationErrorMsg,
    focus,
  } = field;

  const [value, setValue] = useState(field.value || "");
  const [isValid, setIsValid] = useState(true);

  const firstUpdate = useRef(true); // dont run on mount
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    handleValidation();
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleValidation = () => {
    if (onValidate) {
      const result = onValidate(value);
      setIsValid(result);
    }
  };

  const props = {};
  if (!isValid) {
    props["error"] = true;
    props["helperText"] = !isEmpty(validationErrorMsg)
      ? validationErrorMsg
      : "Incorrect Input";
  } else {
    props["error"] = undefined;
    props["helperText"] = undefined;
  }

  if (focus) {
    props["autoFocus"] = true;
  }

  return (
    <Box>
      <Typography>{label}</Typography>
      <TextField
        id={`${property}-outlined`}
        value={value}
        onChange={handleChange}
        disabled={!!disabled}
        fullWidth={true}
        autoComplete="false"
        size="small"
        type="date"
        variant="outlined"
        {...props}
      />
    </Box>
  );
};
export const renderTextField = (field, clear) => {
  return <StatefulTextField field={field} clear={clear} />;
};

export const renderDateField = (field) => {
  return <StatefulDateField field={field} />;
};

const StatefulSelectField = ({ field }) => {
  const { label, property, onChange, choices } = field;

  const [value, setValue] = useState(field.value || choices[0].value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <Typography>{label}</Typography>
      <FormControl
        style={{
          width: "100%",
        }}
        variant="outlined"
        size="small"
      >
        <Select
          labelId={`label-${property}`}
          id={`select-${property}`}
          value={value}
          onChange={handleChange}
        >
          {choices.map((c, index) => (
            <MenuItem key={index} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export const renderSelectField = (field) => {
  return <StatefulSelectField field={field} />;
};

const StatefulSwitch = ({ field }) => {
  const { label, onChange } = field;
  const [value, setValue] = useState(field.value || false);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const switchLabel = value ? field.onLabel : field.offLabel;

  return (
    <Box display="flex" alignItems="center">
      <Typography>{label}</Typography>
      <Switch
        checked={value}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <Typography variant="caption">{switchLabel}</Typography>
    </Box>
  );
};

export const renderSwitch = (field) => {
  return <StatefulSwitch field={field} />;
};

const StatefulCheckbox = ({ field }) => {
  const { label, onChange } = field;

  const [value, setValue] = useState(field.value || false);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Checkbox
        checked={value}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <Typography>{label}</Typography>
    </Box>
  );
};

export const renderCheckbox = (field) => {
  return <StatefulCheckbox field={field} />;
};

export const renderField = (field, clear) => {
  switch (field.type) {
    case "text":
      return renderTextField(field, clear);
    case "select":
      return renderSelectField(field);
    case "date":
      return renderDateField(field);
    case "check":
      return renderCheckbox(field);
    case "switch":
      return renderSwitch(field);
    default:
      return null;
  }
};
