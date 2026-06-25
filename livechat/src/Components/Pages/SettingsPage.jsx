import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Switch,
  Select,
  MenuItem,
  FormControlLabel,
  Paper,
  Divider,
} from "@mui/material";

const tabList = [
  "System",
  "Team",
  "Integrations",
  "Notifications",
  "Appearance",
  "Security",
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3}}>
      <Box sx={{mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Settings
        </Typography>
        <Typography color="text.secondary">
          Manage your account settings and preferences
        </Typography>
      </Box>
      <Paper elevation={1} sx={{ borderRadius: 2, boxShadow: 0, border: "1px solid #eee" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: "#fff",
            "& .MuiTab-root": { fontWeight: 600 },
            "& .Mui-selected": { color: "#ff8b00 !important" },
            borderBottom: "1px solid #eee",
            borderRadius: "8px 8px 0 0",
          }}
          TabIndicatorProps={{
            style: { backgroundColor: "#ff8b00" }, 
          }}
        >
          {tabList.map((tab, index) => (
            <Tab key={index} label={tab} />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <SystemTab />}
          {activeTab === 1 && <TeamTab />}
          {activeTab === 2 && <IntegrationsTab />}
          {activeTab === 3 && <NotificationsTab />}
          {activeTab === 4 && <AppearanceTab />}
          {activeTab === 5 && <SecurityTab />}
        </Box>
      </Paper>
    </Box>
  );
};

// ------------------- INDIVIDUAL TAB COMPONENTS -------------------

const Section = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const SystemTab = () => (
  <>
    <Section title="Company Information">
      <TextField label="Company Name" size="small"fullWidth sx={{ mb: 2 }} />
      <TextField label="Email" type="email" size="small" fullWidth sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField label="Timezone" size="small" fullWidth />
        <TextField label="Language" size="small" fullWidth />
      </Box>
      <Button variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Section>
  </>
);

const TeamTab = () => (
  <Typography variant="body1">Manage your team members here.</Typography>
);

const IntegrationsTab = () => (
  <>
    {["Slack", "Gmail", "Salesforce", "Zendesk", "WhatsApp"].map((service) => (
      <Paper
        key={service}
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="600">
            {service}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your {service} integration
          </Typography>
        </Box>
        <Button variant="outlined">Manage</Button>
      </Paper>
    ))}
  </>
);

const NotificationsTab = () => (
  <>
    <Section title="Notification Preferences">
      {["Email Notifications", "Chat Alerts", "Daily Reports", "Transfer Notifications"].map(
        (item) => (
          <FormControlLabel
            key={item}
            control={<Switch defaultChecked />}
            label={item}
            sx={{ display: "block", mb: 1 }}
          />
        )
      )}
      <Button variant="contained" sx={{ mt: 2 }}>
        Save Preferences
      </Button>
    </Section>
  </>
);

const AppearanceTab = () => (
  <>
    <Section title="Appearance">
      <FormControlLabel control={<Switch />} label="Dark Mode" />
      <FormControlLabel control={<Switch />} label="Compact Mode" />
    </Section>

    <Divider sx={{ my: 2 }} />

    <Section title="Display">
      <Typography>Messages per Page</Typography>
      <Select defaultValue="50" sx={{ mb: 2, width: 200 }} size="small">
        <MenuItem value="25">25 messages</MenuItem>
        <MenuItem value="50">50 messages</MenuItem>
        <MenuItem value="100">100 messages</MenuItem>
      </Select>
      <Typography>Default View</Typography>
      <Select defaultValue="Dashboard" sx={{ width: 200 }}size="small">
        <MenuItem value="Dashboard">Dashboard</MenuItem>
        <MenuItem value="Inbox">Inbox</MenuItem>
      </Select>
    </Section>
      <Button variant="contained">
        Save Preferences
      </Button>
  </>
);

const SecurityTab = () => (
  <>
    <Section title="Change Password">
      <TextField label="Current Password" type="password"  size="small" fullWidth sx={{ mb: 2 }} />
      <TextField label="New Password" type="password" size="small" fullWidth sx={{ mb: 2 }} />
      <TextField label="Confirm Password" type="password" size="small" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained">Update Password</Button>
    </Section>

    <Divider sx={{ my: 3 }} />

    <Section title="Two-Factor Authentication">
      <FormControlLabel control={<Switch />} label="Enable 2FA" />
    </Section>

    <Section title="Active Sessions">
      <Button variant="outlined" color="error">
        Sign Out All Devices
      </Button>
    </Section>
  </>
);

export default SettingsPage;
