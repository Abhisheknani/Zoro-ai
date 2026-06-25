import React, { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
    Tooltip,
    Popover,
    Divider,
} from "@mui/material";
import {
    GridView as DashboardIcon,
    AnalyticsOutlined as AnalyticsIcon,
    ChatOutlined as ChatIcon,
    WorkspacesOutlined as TeamIcon,
    Notifications as NotificationsIcon,
    SettingsOutlined as SettingsIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useLocation, useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import logo from "../../assets/Images/last-logo.png";
// import logosm from "../../assets/Images/logo-rel.png";
import logo from "../../assets/Images/logo.svg";
import logosm from "../../assets/Images/logosm.jpg";
import Cookies from "js-cookie";

const Sidebar = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(true); // <-- toggle state

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setOpen(!open); // <-- toggle handler
const notifications = [
  {
    id: 1,
    name: "Cody Edwards",
    action: "commented on your latest story.",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Jean Reeves",
    action: "loved your latest Photo you posted.",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Tyler Warren",
    action: "loved your latest Story you posted.",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Cody Edwards",
    action: "commented on your latest story.",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "Jean Reeves",
    action: "loved your latest Photo you posted.",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
];
const [opennotifications, setOpenNotifications] = useState(false);

const handleOpen = (event) => {
  setOpenNotifications(true);
};
    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
        { text: "Chat", icon: <ChatIcon />, path: "/chat" },
        { text: "Departments", icon: <PeopleOutlineIcon />, path: "/departments" },
        { text: "Team Members", icon: <TeamIcon />, path: "/team-members" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    const drawerWidth = open ? 240 : 70;

    const handlelogout = () => {
        Cookies.remove('token');
        navigate("/login");
    }

    return (
        <Box sx={{ display: "flex" }}>
            {/* -------- Sidebar Drawer -------- */}
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#f6f5f1",
                        borderRight: "1px solid #f0f0f0",
                        transition: "width 0.3s ease",
                        overflowX: "hidden",
                    },
                }}
            >
                {/* Logo + Title */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:  "center",
                        // px: 2,
                        py: 2,
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    {open
                        ? <img src={logo} alt="logo" style={{ width: "180px", height: "auto", objectFit: "contain" }} />
                        : <img src={logosm} alt="logo" style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: "6px" }} />}

                    {/* <Tooltip title={open ? "Collapse sidebar" : "Expand sidebar"}>
                        <IconButton onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip> */}
                </Box>

                {/* Menu List */}
                <List sx={{ px: 1, pt: 2 }}>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem
                                key={index}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    backgroundColor: isActive ? "#ff8b00" : "transparent",
                                    color: isActive ? "#fff" : "#555",
                                    "&:hover": {
                                        backgroundColor: isActive ? "#ff8b00" : "#f8ddb1ff",
                                    },
                                    justifyContent: open ? "flex-start" : "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? "#fff" : "#555",
                                        minWidth: 40,
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {open && (
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 600 : 500,
                                            fontSize: "0.95rem",
                                        }}
                                    />
                                )}
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>

            {/* -------- Main Content + Header -------- */}
            <Box sx={{ flexGrow: 1 ,p:2}}>
                {/* Header / AppBar */}
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        background: "linear-gradient(to right, #fff1dd, #fffbeb)",
                        color: "#000",
                        borderBottom: "1px solid #f0f0f0",
                        width: `calc(100% - ${drawerWidth}px)`,
                        ml: `${drawerWidth}px`,
                        transition: "all 0.3s ease",
                        boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
                    }}
                >

                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        {/* Left side: Title */}
                        {/* <Typography variant="h6" fontWeight={600} color="text.primary">
                            {menuItems.find((i) => location.pathname === i.path)?.text ||
                                "Dashboard"}
                        </Typography> */}
                        <Tooltip title={open ? "Collapse sidebar" : "Expand sidebar"}>
                            <IconButton onClick={handleDrawerToggle} sx={{p:0}}>
                                <MenuIcon  sx={{ fill: "#ff8b00" }}/>
                            </IconButton>
                        </Tooltip>
                        {/* Right side: Icons */}
                        <Box display="flex" alignItems="center" gap={1}>
                            <Tooltip title="Notifications">
                                <IconButton onClick={handleOpen}>
                                    <Badge badgeContent={3} color="warning" size="small">
                                        <NotificationsNoneIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Popover
  open={opennotifications}
  onClose={() => setOpenNotifications(false)}
  anchorReference="anchorPosition"
  anchorPosition={{ top: 70, left: window.innerWidth - 20 }} // adjust top & left as needed
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  PaperProps={{
    sx: {
      width: 350,
      borderRadius: 2,
      boxShadow: 3,
      overflow: "hidden",
      position: "absolute",
    },
  }}
>
                                {/* Header */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        bgcolor: "#ff8b00",
                                        color: "#fff",
                                        px: 2,
                                        py: 1.2,
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        Notifications
                                    </Typography>
                                    <Badge
                                        badgeContent={3}
                                        color="success"
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                backgroundColor: "#2ecc71",
                                                color: "#fff",
                                                fontSize: "0.75rem",
                                                minWidth: 20,
                                                height: 20,
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Notifications List */}
                                <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                                    {notifications.map((item, index) => (
                                        <Box key={item.id}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    px: 2,
                                                    py: 1.5,
                                                    "&:hover": { bgcolor: "#f9f9f9", cursor: "pointer" },
                                                }}
                                            >
                                                <Avatar src={item.avatar} alt={item.name} sx={{ mr: 2 }} />
                                                <Typography variant="body2">
                                                    <Typography
                                                        component="span"
                                                        sx={{ fontWeight: 600, color: "#000" }}
                                                    >
                                                        {item.name}
                                                    </Typography>{" "}
                                                    {item.action}
                                                </Typography>
                                            </Box>
                                            {index < notifications.length - 1 && <Divider />}
                                        </Box>
                                    ))}
                                </Box>
                            </Popover>
                            <Tooltip title="Profile Menu">
                                <IconButton onClick={handleMenuOpen}>
                                   <PersonOutlineIcon />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                PaperProps={{
                                    sx: {
                                        width: 130,
                                    },
                                }}
                            >
                                <MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
                                <MenuItem onClick={() => navigate("/billing")}>Billing</MenuItem>
                                <MenuItem onClick={handlelogout}>Logout</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        mt: 8,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
