import React, { useState } from "react";


//mui
import { Box, Button, Drawer, Divider, Typography } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

//mui icon
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadIcon from "@mui/icons-material/Upload";
import InputIcon from "@mui/icons-material/Input";
import PageviewIcon from "@mui/icons-material/Pageview";

//custom mui item
import ThemeListItem from './drawer.ThemeList';

export default function TemporaryDrawer() {
  const [drawer, setDrawer] = useState(false);


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(!drawer);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 350,
        backgroundColor: "#131332",
        color: "#FFF",
        height: "120vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ margin: "30px", paddingTop: 8 }}
          component="div"
        >
          Welcome <br /> So Gon Deasnus
        </Typography>
        <Typography sx={{ pl: 4, pb: 2 }}>User</Typography>
        <Divider sx={{ bgcolor: "#FFFFFF" }} />
        <List>
          {[
            { text: "Configuration", icon: <SettingsIcon /> },
            { text: "Upload", icon: <UploadIcon /> },
            { text: "Validate", icon: <InputIcon /> },
            { text: "Visualise", icon: <PageviewIcon /> },
          ].map((text, i) => (
            <Box key={i}>
              <ListItem button sx={{ pt: 2 }}>
                <ThemeListItem>
                  <ListItemIcon sx={{ color: "#919191" }}>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#919191" }}>
                    <Typography variant="h6" >{text.text}</Typography>
                  </ListItemText>
                </ThemeListItem>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
      <Box key={5}>
        <Box sx={{ paddingLeft: 3, mb: 5 }}>
          <Button variant="contained">Logout</Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{ minHeight:'1080px', minWidth: 75, bgcolor:'#131332', overflow:'hidden', position:'fixed', boxShadow: 3}}
        onClick={toggleDrawer(drawer, true)}
      >
        <ListIcon sx={{color:"#FFF", width:50, height:50, mt:2, ml:1}}/>
      </Box>
      <Drawer
        anchor={"left"}
        open={drawer}
       
        onClose={toggleDrawer(drawer, false)}
      >
        {list(drawer)}
      </Drawer>
    </>
  );
}
