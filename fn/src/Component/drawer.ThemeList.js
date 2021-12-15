import { withStyles } from "@material-ui/core/styles";
import { ListItem } from "@mui/material";

const ThemeListItem = withStyles({
    root: {
      "&:hover": {
        width: 280,
        backgroundColor: "#353a82",
        borderRadius: "10px",
        "& .MuiListItemIcon-root": {
          color: "#00d9a6",
        },
        "& .MuiListItemText-root": {
          color: "#00d9a6",
        },
      },
    },
  })(ListItem);

  export default ThemeListItem