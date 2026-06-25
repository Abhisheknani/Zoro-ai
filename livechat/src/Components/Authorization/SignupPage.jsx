import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, InputAdornment,
  IconButton, Avatar, Grid, Dialog, DialogContent,
} from "@mui/material";
import {
  Visibility, VisibilityOff, Email, Lock, Person, Phone,
  CheckCircle, ErrorOutline,
} from "@mui/icons-material";
import logo from "../../assets/Images/logo-rel.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const HERO_IMG = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80";

const floatAnim = `
  @keyframes floatY  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
  @keyframes floatY2 { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-16px) rotate(2deg)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(237,108,2,0.45)} 50%{box-shadow:0 0 0 10px rgba(237,108,2,0)} }
`;

const features = [
  "Instant live chat across all channels",
  "Smart AI-powered auto-replies",
  "Real-time team collaboration",
  "Deep analytics & reporting",
];

const FeedbackModal = ({ open, type, message, onClose }) => {
  const isSuccess = type === "success";
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: "20px", minWidth: 340, overflow: "hidden" } }}>
      <DialogContent sx={{ textAlign: "center", py: 5, px: 4 }}>
        <Box sx={{
          width: 72, height: 72, borderRadius: "50%", mx: "auto", mb: 2.5,
          bgcolor: isSuccess ? "#e8f5e9" : "#fdecea",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {isSuccess
            ? <CheckCircle sx={{ fontSize: 40, color: "#2e7d32" }} />
            : <ErrorOutline sx={{ fontSize: 40, color: "#c62828" }} />}
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: "1.15rem", color: "#1a1d2e", mb: 1 }}>
          {isSuccess ? "Account Created!" : "Registration Failed"}
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.7 }}>
          {message}
        </Typography>
        <Button onClick={onClose} sx={{
          mt: 3, borderRadius: "10px", px: 4,
          background: isSuccess
            ? "linear-gradient(135deg, #2e7d32, #1b5e20)"
            : "linear-gradient(135deg, #ed6c02, #c45200)",
          color: "#fff", fontWeight: 600, fontSize: "0.9rem",
          "&:hover": { opacity: 0.9 },
        }}>
          {isSuccess ? "Go to Sign In" : "Try Again"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const passwordValue = watch("password");

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("api/auth/register/", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      if (response.status === 201 || response.data.success) {
        setModal({ open: true, type: "success", message: "Your account has been created successfully. You can now sign in." });
      }
    } catch (err) {
      setModal({ open: true, type: "error", message: err.response?.data?.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    if (modal.type === "success") navigate("/login");
    else setModal({ ...modal, open: false });
  };

  const inputSx = (err) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px", background: "#f8f9ff", fontSize: "0.9rem",
      "& fieldset": { borderColor: err ? "#d32f2f" : "#e0e3ef" },
      "&:hover fieldset": { borderColor: err ? "#d32f2f" : "#ed6c02" },
      "&.Mui-focused fieldset": { borderColor: err ? "#d32f2f" : "#ed6c02", borderWidth: "1.5px" },
    },
    "& .MuiFormHelperText-root": { mx: 0, mt: "4px" },
  });

  const Label = ({ text }) => (
    <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151", mb: 0.6 }}>{text}</Typography>
  );

  return (
    <>
      <style>{floatAnim}</style>

      <FeedbackModal
        open={modal.open}
        type={modal.type}
        message={modal.message}
        onClose={handleModalClose}
      />

      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f0f2ff" }}>

        {/* ── Left Panel ── */}
        <Box sx={{
          flex: 1, display: { xs: "none", md: "flex" },
          flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end",
          position: "relative", overflow: "hidden", p: 6,
        }}>
          <Box sx={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transition: "transform 8s ease", "&:hover": { transform: "scale(1.04)" },
          }} />
          <Box sx={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.82) 100%)",
          }} />

          <Box sx={{ position: "relative", zIndex: 2, mb: 3, animation: "fadeUp 0.8s ease both" }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, mb: 1 }}>
              Start your journey.<br />Delight every customer.
            </Typography>
            <Typography sx={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 380, mb: 2.5 }}>
              Join thousands of high-growth teams using LiveChat to deliver world-class customer experiences.
            </Typography>
            {features.map((f) => (
              <Box key={f} sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.2 }}>
                <CheckCircle sx={{ fontSize: 18, color: "#ed6c02" }} />
                <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem" }}>{f}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ position: "relative", zIndex: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {[
              { emoji: "🚀", value: "3× faster", label: "Response time avg", color: "#ed6c02", anim: "floatY 4s ease-in-out infinite", pulse: true },
              { emoji: "🎯", value: "40% more", label: "Conversions from chat", color: "#1565c0", anim: "floatY2 5.5s ease-in-out infinite" },
            ].map((c) => (
              <Box key={c.label} sx={{
                display: "flex", alignItems: "center", gap: 1.5,
                bgcolor: "rgba(255,255,255,0.12)", backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.22)", borderRadius: "14px",
                px: 2.5, py: 1.5, animation: c.anim,
              }}>
                <Box sx={{
                  width: 38, height: 38, borderRadius: "10px", bgcolor: c.color,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
                  ...(c.pulse ? { animation: "pulse 2.5s ease-in-out infinite" } : {}),
                }}>{c.emoji}</Box>
                <Box>
                  <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{c.value}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.62)", fontSize: "0.73rem" }}>{c.label}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 1, mt: 2.5, animation: "floatY 7s ease-in-out infinite 0.6s" }}>
            {["T", "K", "L", "N"].map((l, i) => (
              <Avatar key={i} sx={{
                width: 32, height: 32, fontSize: "0.75rem", fontWeight: 700,
                bgcolor: ["#ed6c02", "#6a1b9a", "#1565c0", "#2e7d32"][i],
                border: "2px solid rgba(255,255,255,0.5)", ml: i > 0 ? -1 : 0,
              }}>{l}</Avatar>
            ))}
            <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", ml: 1.5 }}>
              Join 500+ teams already onboard
            </Typography>
          </Box>
        </Box>

        {/* ── Right Form Panel ── */}
        <Box sx={{
          flex: { xs: 1, md: "0 0 580px" },
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          p: { xs: 3, md: 6 }, bgcolor: "#fff", overflowY: "auto",
        }}>
          <Box sx={{ width: "100%", maxWidth: 460 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <img src={logo} alt="Logo" style={{ width: 160, height: "auto", objectFit: "contain" }} />
            </Box>

            <Typography sx={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1d2e", mb: 0.5 }}>
              Create your account
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#6b7280", mb: 3 }}>
              Start your free trial — no credit card required
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* First + Last in one row */}
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <Label text="First name" />
                  <TextField
                    fullWidth size="small" placeholder="John"
                    error={!!errors.first_name} helperText={errors.first_name?.message}
                    sx={inputSx(!!errors.first_name)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ fontSize: 18, color: errors.first_name ? "#d32f2f" : "#9ca3af" }} /></InputAdornment> }}
                    {...register("first_name", { required: "Required", minLength: { value: 2, message: "Min 2 chars" } })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Label text="Last name" />
                  <TextField
                    fullWidth size="small" placeholder="Doe"
                    error={!!errors.last_name} helperText={errors.last_name?.message}
                    sx={inputSx(!!errors.last_name)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ fontSize: 18, color: errors.last_name ? "#d32f2f" : "#9ca3af" }} /></InputAdornment> }}
                    {...register("last_name", { required: "Required", minLength: { value: 2, message: "Min 2 chars" } })}
                  />
                </Grid>
              </Grid>

              <Box>
                <Label text="Work email" />
                <TextField
                  fullWidth size="small" placeholder="you@company.com"
                  error={!!errors.email} helperText={errors.email?.message}
                  sx={inputSx(!!errors.email)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ fontSize: 18, color: errors.email ? "#d32f2f" : "#9ca3af" }} /></InputAdornment> }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                  })}
                />
              </Box>

              <Box>
                <Label text="Phone number" />
                <TextField
                  fullWidth size="small" placeholder="+1 (555) 000-0000" type="tel"
                  error={!!errors.phone} helperText={errors.phone?.message}
                  sx={inputSx(!!errors.phone)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ fontSize: 18, color: errors.phone ? "#d32f2f" : "#9ca3af" }} /></InputAdornment> }}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^[+\d\s\-()]{7,15}$/, message: "Enter a valid phone number" },
                  })}
                />
              </Box>

              <Box>
                <Label text="Password" />
                <TextField
                  fullWidth size="small" placeholder="Min. 8 characters"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password} helperText={errors.password?.message}
                  sx={inputSx(!!errors.password)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 18, color: errors.password ? "#d32f2f" : "#9ca3af" }} /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <VisibilityOff sx={{ fontSize: 18, color: "#9ca3af" }} /> : <Visibility sx={{ fontSize: 18, color: "#9ca3af" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: "Must include uppercase, lowercase, and a number" },
                  })}
                />
              </Box>

              <Box>
                <Label text="Confirm password" />
                <TextField
                  fullWidth size="small" placeholder="Re-enter your password"
                  type={showConfirm ? "text" : "password"}
                  error={!!errors.confirm_password} helperText={errors.confirm_password?.message}
                  sx={inputSx(!!errors.confirm_password)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Lock sx={{ fontSize: 18, color: errors.confirm_password ? "#d32f2f" : "#9ca3af" }} /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" size="small">
                          {showConfirm ? <VisibilityOff sx={{ fontSize: 18, color: "#9ca3af" }} /> : <Visibility sx={{ fontSize: 18, color: "#9ca3af" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (val) => val === passwordValue || "Passwords do not match",
                  })}
                />
              </Box>
            </Box>

            <Button
              fullWidth variant="contained" disabled={loading}
              onClick={handleSubmit(handleRegister)}
              sx={{
                mt: 3.5, py: 1.4, borderRadius: "10px",
                background: "linear-gradient(135deg, #ed6c02, #c45200)",
                fontSize: "0.95rem", fontWeight: 600,
                boxShadow: "0 4px 15px rgba(237,108,2,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #c45200, #8b3500)", boxShadow: "0 6px 20px rgba(237,108,2,0.45)" },
                "&:disabled": { opacity: 0.65 },
              }}
            >
              {loading ? "Creating account…" : "Create Account"}
            </Button>

            <Typography sx={{ textAlign: "center", color: "#6b7280", fontSize: "0.87rem", mt: 3 }}>
              Already have an account?{" "}
              <Box component="span" onClick={() => navigate("/login")}
                sx={{ color: "#ed6c02", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Sign in
              </Box>
            </Typography>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default SignupPage;
