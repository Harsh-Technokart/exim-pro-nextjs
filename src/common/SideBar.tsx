"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ModalClose from "@mui/joy/ModalClose";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import { logout } from "@/api";

export const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status) {
        console.log("Logged out successfully");
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.error);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="side" style={{ width: "15%" }}>
      <IconButton variant="plain" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mb: 2,
            }}
          >
            <ModalClose id="close-icon" />
          </Box>

          {/* User Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                backgroundColor: "#4a90e2",
                color: "#fff",
                fontSize: 24,
              }}
            ></Avatar>
            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
              {user.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {user.email}
            </Typography>
          </Box>
          <List
            size="sm"
            component="nav"
            sx={{
              flex: "none",
              fontSize: "xl",
              "& > div": { justifyContent: "center" },
            }}
          >
            <ListItemButton sx={{ fontWeight: "lg" }}>Home</ListItemButton>
            <ListItemButton>About</ListItemButton>
            <ListItemButton>Contact</ListItemButton>
          </List>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="solid"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              "&:hover": {
                backgroundColor: "#888",
              },
            }}
            onClick={handleLogout}
          >
            <LogoutIcon />
            Logout
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};
