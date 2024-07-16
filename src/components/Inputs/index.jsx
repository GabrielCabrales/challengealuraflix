import { useState, useEffect } from "react";
import { buscar } from "../../api/api";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "./style.css";

export function ValidarDatos(data) {
  if (data.length >= 4 || data.length === 0) {
    return { datos: { error: false, message: "" } };
  } else {
    return { datos: { error: true, message: "Debe ser almenos 4 caracteres" } };
  }
}

export function InputTexto(props) {
  const [errors, setErrors] = useState({
    datos: {
      error: false,
      message: "Debe ser almenos 4 caracteres",
    },
  });

  const { label, value, onChange, id } = props;

  return (
    <TextField
      label={label}
      variant="filled"
      value={value}
      onChange={onChange}
      id={id}
      className="input__form"
      error={errors.datos.error}
      helperText={errors.datos.error && errors.datos.message}
      onBlur={(e) => setErrors(ValidarDatos(e.target.value))}
      autoComplete="off"
    />
  );
}

export function InputColor(props) {
  const { label, value, onChange, id, type } = props;

  return (
    <TextField
      variant="filled"
      value={value}
      onChange={onChange}
      id={id}
      className="input__form-color"
      type={type}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export function TextArea(props) {
  const [errors, setErrors] = useState({
    datos: {
      error: false,
      message: "Debe ser almenos 4 caracteres",
    },
  });

  const { label, id, value, onChange } = props;

  return (
    <TextField
      label={label}
      variant="filled"
      multiline
      rows={4}
      id={id}
      value={value}
      onChange={onChange}
      className="input__form"
      error={errors.datos.error}
      helperText={errors.datos.error && errors.datos.message}
      onBlur={(e) => setErrors(ValidarDatos(e.target.value))}
    />
  );
}

export function SelectCategory(props) {
  const { value, onChange } = props;

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    buscar(`/categorias`, setCategories);
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 150, //Altura en pixeles
      },
    },
  };

  return (
    <FormControl variant="filled" className="input__form">
      <InputLabel>Escoja una categoría</InputLabel>
      <Select value={value} onChange={onChange} MenuProps={MenuProps}>
        {categories.map((category) => (
          <MenuItem key={category.name} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
