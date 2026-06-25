import React from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Avatar,
  Grid,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";

const users = [
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    dept: "Customer Support",
    role: "supervisor",
    status: "online",
    joined: "2024-01-15",
    active: 2,
  },
  {
    name: "Mike Chen",
    email: "mike@example.com",
    dept: "Sales",
    role: "agent",
    status: "busy",
    joined: "2024-02-20",
    active: 5,
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    dept: "Customer Support",
    role: "agent",
    status: "online",
    joined: "2024-03-10",
    active: 3,
  },
  {
    name: "James Rodriguez",
    email: "james@example.com",
    dept: "Technical",
    role: "admin",
    status: "online",
    joined: "2024-01-05",
    active: 1,
  },
];

const stats = [
  { title: "Total Users", value: 4 },
  { title: "Available", value: 3, color: "green" },
  { title: "Busy", value: 1, color: "orange" },
  { title: "Admins", value: 1, color: "orange" },
];

const TeamMembers = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Team Members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage users and assign roles
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#f97316",
            textTransform: "none",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Search Bar */}
      <Box mt={2} mb={3}>
        <TextField
          fullWidth
          placeholder="Search by name or email..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <IconButton edge="start">
                <Search />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Active Users List */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Active Users
        </Typography>

        {users.map((user, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1.5}
            sx={{
              borderBottom:
                index !== users.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            {/* Left: Avatar + Info */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#fb923c" }}>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor:
                    user.status === "online" ? "green" : "orange",
                  ml: 1,
                }}
              />
            </Box>

            {/* Center: Department + Role */}
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={user.dept}
                size="small"
                variant="outlined"
                sx={{ fontSize: 12 }}
              />
              <Chip
                label={user.role}
                size="small"
                sx={{
                  fontSize: 12,
                  backgroundColor:
                    user.role === "admin"
                      ? "#fecaca"
                      : user.role === "supervisor"
                      ? "#bfdbfe"
                      : "#e5e7eb",
                  textTransform: "capitalize",
                }}
              />
            </Box>

            {/* Right: Activity + Actions */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body2" color="text.secondary">
                {user.active} active <br />
                <span style={{ fontSize: 12 }}>Joined {user.joined}</span>
              </Typography>
              <Box display="flex" gap={1}>
                <Tooltip title="Edit">
                  <IconButton size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        ))}
      </Paper>

      {/* Stats Summary */}
      <Grid container spacing={2} mt={3}>
        {stats.map((stat, i) => (
          <Grid item key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                color={stat.color || "black"}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamMembers;
