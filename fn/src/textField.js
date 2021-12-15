import { withStyles } from "@material-ui/core/styles";
import { TextField } from  "@mui/material";

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      backgroundColor: "#FFF",
        width:'750px',
        height:'10px'
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF",
      },
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  },
})(TextField);

const CssDateField = withStyles({
    root: {
      "& .MuiInputBase-input": {
        backgroundColor: "#FFF",
          width:'200px',
          height:'10px'
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#FFF",
        },
        "&:hover fieldset": {
          borderColor: "#FFF",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FFF",
        },
      },
    },
  })(TextField);

  const CssIntField = withStyles({
    root: {
      "& .MuiInputBase-input": {
        backgroundColor: "#FFF",
          width:'200px',
          height:'10px'
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#FFF",
        },
        "&:hover fieldset": {
          borderColor: "#FFF",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FFF",
        },
      },
    },
  })(TextField);
