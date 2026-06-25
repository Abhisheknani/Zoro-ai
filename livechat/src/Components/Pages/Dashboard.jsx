import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  ChatBubbleOutline as ChatIcon,
  PendingActions as PendingIcon,
  PeopleAlt as UsersIcon,
  TrendingUp as TrendingIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

// === Top Stat Cards ===
const statCards = [
  { title: "Active Chats", value: "12", change: "+2 today", icon: <ChatIcon />, color: "#FFB74D" },
  { title: "Pending Chats", value: "3", change: "-1 today", icon: <PendingIcon />, color: "#FFB74D" },
  { title: "Online Users", value: "24", change: "+4 users", icon: <UsersIcon />, color: "#FFB74D" },
  { title: "Avg Response", value: "2.3m", change: "-0.5m faster", icon: <TrendingIcon />, color: "#FFB74D" },
];

// === Departments ===
const departments = [
  { name: "Sales", pending: 1, active: 2, available: 3 },
  { name: "Support", pending: 0, active: 3, available: 2 },
  { name: "Billing", pending: 2, active: 1, available: 1 },
  { name: "Technical", pending: 0, active: 0, available: 2 },
];

// === Online Users ===
const users = [
  { name: "Sarah Johnson", dept: "Sales", chats: 2 },
  { name: "Mike Chen", dept: "Support", chats: 5 },
  { name: "Lisa Garcia", dept: "Billing", chats: 1 },
  // { name: "David Brown", dept: "Technical", chats: 4 },
  // { name: "Emma Wilson", dept: "Sales", chats: 3 },
];

// === Chats Data ===
const pendingChats = [
  { name: "John Doe", message: "I need help with my order", time: "2 min" },
  { name: "Jane Smith", message: "Question about pricing", time: "5 min" },
  // { name: "Bob Wilson", message: "Can't login to my account", time: "8 min" },
];

const activeChats = [
  { name: "Alice Brown", message: "Thank you for helping!", time: "now" },
  { name: "Bob Wilson", message: "Can't login to my account", time: "8 min" },

];

const unreadMessages = [
  { name: "Emily Johnson", message: "I have another question", time: "1 min" },
  { name: "Chris Lee", message: "Product inquiry", time: "4 min" },
];

const Dashboard = () => {
  return (
    <>
      {/* === Top Stats === */}
      <Grid container spacing={2} mb={3}>
        {statCards.map((item, i) => (
          <Grid item  key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                border: "1px solid #eee",
              }}
            >
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography color="text.secondary" fontSize="0.9rem" fontWeight={500}>
                    {item.title}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} mt={0.5}>
                    {item.value}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    fontWeight={500}
                    color={item.change.startsWith("+") ? "success.main" : "error.main"}
                  >
                    {item.change}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: `${item.color}30`,
                    color: item.color,
                    width: 48,
                    height: 48,
                  }}
                >
                  {item.icon}
                </Avatar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* === Middle Section === */}
      <Grid container spacing={3}>
        {/* Departments */}
        <Grid item  size={{ xs: 12, lg: 7 }}>
  <Card
    sx={{
      borderRadius: 2,
      border: "1px solid #eee",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Department Status
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select defaultValue="All Departments">
            <MenuItem value="All Departments">All Departments</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Support">Support</MenuItem>
            <MenuItem value="Billing">Billing</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table size="medium">
          <TableHead sx={{backgroundColor:"#fff1de"}}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Pending</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Active</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept, i) => (
              <TableRow key={i}>
                <TableCell sx={{ fontWeight: 500 }}>{dept.name}</TableCell>
                <TableCell>
                   <b>{dept.pending}</b>
                </TableCell>
                <TableCell>
                  <b>{dept.active}</b>
                </TableCell>
                <TableCell>
                  
                  <b style={{ color: "#f57c00" }}>{dept.available}</b>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
</Grid>


        {/* Online Users */}
        <Grid item size={{ xs: 12, lg: 5 }}>
          <Card
            sx={{
              borderRadius: 2,
              border: "1px solid #eee",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600}>
                  Online Users
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#fff3e0",
                    color: "#f57c00",
                    px: 1.2,
                    py: 0.3,
                    borderRadius: 2,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  {users.length}
                </Typography>
              </Box>

              <TextField
                size="small"
                placeholder="Search users..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#fafafa",
                  },
                }}
              />

              {users.map((user, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1.2,
                    borderTop: i !== 0 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#f57c00",
                      color: "#fff",
                      mr: 2,
                      width: 36,
                      height: 36,
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={500}>{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.dept}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {user.chats} chats
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* === Chat Summary Cards (Below Online Users) === */}
      <Grid container spacing={3} mt={2}>
        {/* Pending Chats */}
        <Grid item  size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Pending Chats
              </Typography>
              <TextField
                size="small"
                placeholder="Search conversations..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                  },
                }}
              />
              {pendingChats.map((chat, i) => (
                <Box key={i} display="flex" justifyContent="space-between" py={1}>
                  <Box>
                    <Typography fontWeight={600}>{chat.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {chat.message}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {chat.time}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Active Chats */}
        <Grid item  size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Active Chats
              </Typography>
              <TextField
                size="small"
                placeholder="Search conversations..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                  },
                }}
              />
              {activeChats.map((chat, i) => (
                <Box key={i} display="flex" justifyContent="space-between" py={1}>
                  <Box>
                    <Typography fontWeight={600}>{chat.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {chat.message}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {chat.time}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Unread Messages */}
        <Grid item  size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Unread Messages
              </Typography>
              <TextField
                size="small"
                placeholder="Search conversations..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                  },
                }}
              />
              {unreadMessages.map((chat, i) => (
                <Box key={i} display="flex" justifyContent="space-between" py={1}>
                  <Box>
                    <Typography fontWeight={600}>{chat.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {chat.message}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {chat.time}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
