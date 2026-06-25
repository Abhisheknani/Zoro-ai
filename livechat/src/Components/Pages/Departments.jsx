import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ManageAccounts as ManageIcon,
} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
const Departments = () => {
  // --- Static data ---
  const departments = [
    {
      id: 1,
      name: "Sales",
      description: "Handling sales inquiries and product questions",
      members: 5,
      activeChats: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Customer Support",
      description: "Technical support and issue resolution",
      members: 8,
      activeChats: 12,
      status: "Active",
    },
    {
      id: 3,
      name: "Billing",
      description: "Payment and billing related inquiries",
      members: 3,
      activeChats: 2,
      status: "Active",
    },
    {
      id: 4,
      name: "Technical",
      description: "Advanced technical support",
      members: 6,
      activeChats: 5,
      status: "Active",
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 3,}}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        mb={3}
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Departments
          </Typography>
          <Typography color="text.secondary" fontSize="0.9rem">
            Manage departments and assign team members
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#ff9800",
            textTransform: "none",
            "&:hover": { bgcolor: "#f57c00" },
          }}
          onClick={()=>setOpen(true)}
        >
          Add Department
        </Button>
      </Box>

      {/* Search Bar */}
      <TextField
        placeholder="Search departments..."
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          mb: 3,
          backgroundColor: "#fff",
          borderRadius: 1,
        }}
      />

      {/* Department Cards */}
      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item key={dept.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                height: "100%",
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight={700}>
                    {dept.name}
                  </Typography>
                  <Chip
                    label={dept.status}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>

                <Typography color="text.secondary" fontSize="0.9rem" mb={2}>
                  {dept.description}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Members
                    </Typography>
                    <Typography fontWeight={600}>{dept.members}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Active Chats
                    </Typography>
                    <Typography fontWeight={600}>{dept.activeChats}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Status
                    </Typography>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: "#ff9800",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    startIcon={<ManageIcon />}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#ccc",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { borderColor: "#ff9800", color: "#ff9800" },
                    }}
                    fullWidth
                  >
                    Manage
                  </Button>

                  <Box display="flex" gap={1} ml={1}>
                    <IconButton color="default" size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Create New Department
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add a new department to organize your support team
          </Typography>
        </Box>
        <IconButton onClick={() => setOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Form Fields */}
      <DialogContent sx={{ pt: 2 }}>
        <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
          Department Name
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. Sales"
          size="small"
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              "& fieldset": { borderColor: "#f57c00" },
              "&:hover fieldset": { borderColor: "#fb8c00" },
              "&.Mui-focused fieldset": { borderColor: "#f57c00" },
            },
          }}
        />

        <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
          Description
        </Typography>
        <TextField
          fullWidth
          placeholder="Brief description"
          size="small"
          variant="outlined"
          multiline
          rows={2}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
            },
          }}
        />
      </DialogContent>

      {/* Footer Button */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#f57c00",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#ef6c00" },
          }}
        >
          Create Department
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default Departments;
