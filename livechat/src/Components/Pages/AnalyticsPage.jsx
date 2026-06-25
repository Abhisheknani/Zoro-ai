import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
  IconButton,
} from "@mui/material";
import {
  Chat as ChatIcon,
  AccessTime as TimeIcon,
  EmojiEmotions as SatisfactionIcon,
  People as AgentsIcon,
  CalendarMonth as CalendarIcon,
  Star as StarIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";

const AnalyticsPage = () => {
  const [period, setPeriod] = React.useState("week");

  const handleChange = (_, newValue) => {
    if (newValue) setPeriod(newValue);
  };

  const stats = [
    {
      title: "Total Conversations",
      value: "1,234",
      change: "+12.5%",
      icon: <ChatIcon />,
      color: "#ff9800",
    },
    {
      title: "Avg Response Time",
      value: "2.3m",
      change: "-8.2%",
      icon: <TimeIcon />,
      color: "#03a9f4",
    },
    {
      title: "Customer Satisfaction",
      value: "94%",
      change: "+3.1%",
      icon: <SatisfactionIcon />,
      color: "#4caf50",
    },
    {
      title: "Active Agents",
      value: "24",
      change: "+2",
      icon: <AgentsIcon />,
      color: "#9c27b0",
    },
  ];

  const responseTrends = [
    { day: "Monday", value: 2.1 },
    { day: "Tuesday", value: 2.5 },
    { day: "Wednesday", value: 1.8 },
    { day: "Thursday", value: 2.3 },
    { day: "Friday", value: 2.8 },
    { day: "Saturday", value: 1.5 },
    { day: "Sunday", value: 1.2 },
  ];

  const performers = [
    { name: "Sarah Johnson", initials: "SJ", resolved: 156, rating: 4.9 },
    { name: "Mike Chen", initials: "MC", resolved: 142, rating: 4.8 },
    { name: "Emma Wilson", initials: "EW", resolved: 138, rating: 4.9 },
    { name: "David Brown", initials: "DB", resolved: 121, rating: 4.7 },
    { name: "Lisa Anderson", initials: "LA", resolved: 115, rating: 4.8 },
  ];

  return (
    <Box sx={{ p: 3,}}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Performance Analytics
          </Typography>
          <Typography color="text.secondary">
            Track team performance and customer satisfaction
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            startIcon={<CalendarIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#ddd",
              color: "#333",
            }}
          >
            Last 7 Days
          </Button>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            sx={{
              borderRadius: 2,
              backgroundColor: "#ff9800",
              "&:hover": { backgroundColor: "#f57c00" },
              textTransform: "none",
            }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Period Toggle */}
      <ToggleButtonGroup
        value={period}
        exclusive
        onChange={handleChange}
        sx={{ mb: 3 }}
      >
        {["today", "week", "month", "year"].map((label) => (
          <ToggleButton
            key={label}
            value={label}
            sx={{
              textTransform: "capitalize",
              px: 3,
              borderRadius: 2,
              "&.Mui-selected": {
                backgroundColor: "#ff9800",
                color: "#fff",
              },
            }}
          >
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Stat Cards */}
      <Grid container spacing={2} mb={4}>
        {stats.map((item, i) => (
          <Grid item key={i} size={{ xs: 12, sm: 6, md: 3 }}>
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
                  <Typography variant="h4" fontWeight={700}>
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
                    bgcolor: `${item.color}1A`,
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

      {/* Trends & Top Performers */}
      <Grid container spacing={3}>
        {/* Response Time Trends */}
        <Grid item size={{xs:12, lg:7}}>
          <Card sx={{ borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
            <CardContent>
              <Typography fontWeight={700} mb={2}>
                Response Time Trends
              </Typography>
              {responseTrends.map((trend, i) => (
                <Box key={i} mb={1.5}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontSize="0.9rem">{trend.day}</Typography>
                    <Typography fontSize="0.9rem" color="text.secondary">
                      {trend.value}m
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(trend.value / 3) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#ff9800",
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Top Performers */}
        <Grid item size={{xs:12, lg:5}}>
          <Card sx={{ borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
            <CardContent>
              <Typography fontWeight={700} mb={2}>
                Top Performers
              </Typography>
              {performers.map((p, i) => (
                <Box key={i} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: "#ff9800", color: "#fff", fontWeight: 600 }}>
                      {p.initials}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={600}>{p.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {p.resolved} resolved
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <StarIcon sx={{ color: "#ff9800", fontSize: 18 }} />
                    <Typography fontWeight={600}>{p.rating}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
