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
import PersonIcon from "@mui/icons-material/Person";

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
    <Box>
      <IconButton
        variant="plain"
        onClick={() => setOpen(true)}
        sx={{
          color: "white",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "transparent",
            color: "white",
            borderRadius: "50%",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} size="sm">
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
                backgroundColor: "#29328A",
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
              fontSize: "sm",
              "& > div": { justifyContent: "center" },
            }}
          >
            <ListItemButton
              sx={{
                fontWeight: "sm",
                background: "#5554B2",
                color: "white",
                borderRadius: "12px",
                width: "55%",
                alignSelf: "center",
              }}
            >
              <PersonIcon />
              Orbglo User
            </ListItemButton>
            <ListItemButton>Company</ListItemButton>
            <ListItemButton>Company User</ListItemButton>
          </List>

          <Box sx={{ flexGrow: 5 }} />

          <Button
            variant="solid"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              margin: "70px",
              justifyContent: "space-between",
              fontSize: "sm",

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
    </Box>
  );
};
