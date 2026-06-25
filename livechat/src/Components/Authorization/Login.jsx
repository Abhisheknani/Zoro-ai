import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, InputAdornment,
  IconButton, Avatar, Dialog, DialogContent,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, CheckCircle, ErrorOutline } from "@mui/icons-material";
// import logo from "../../assets/Images/logo-rel.png";
import logo from "../../assets/Images/last-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const HERO_IMG = "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80";

const floatAnim = `
  @keyframes floatY  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
  @keyframes floatY2 { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-16px) rotate(2deg)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(237,108,2,0.45)} 50%{box-shadow:0 0 0 10px rgba(237,108,2,0)} }
`;

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
          {isSuccess ? "Welcome back!" : "Login Failed"}
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", color: "#6b7280", lineHeight: 1.7 }}>
          {message}
        </Typography>
        {!isSuccess && (
          <Button onClick={onClose} sx={{
            mt: 3, borderRadius: "10px", px: 4,
            background: "linear-gradient(135deg, #ed6c02, #c45200)", color: "#fff",
            fontWeight: 600, fontSize: "0.9rem",
            "&:hover": { background: "linear-gradient(135deg, #c45200, #8b3500)" },
          }}>Try Again</Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });
  const { register, handleSubmit, formState: { errors } } = useForm();

  const token = Cookies.get("token");
  if (token) navigate("/dashboard");

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios.post("api/auth/login/", { email: data.email, password: data.password });
      if (response.status === 200) {
        Cookies.set("token", response.data.access);
        axios.defaults.headers.common = { Authorization: `Bearer ${response.data.access}` };
        setModal({ open: true, type: "success", message: "Login successful! Redirecting you to your dashboard…" });
        setTimeout(() => navigate("/dashboard"), 1800);
      }
    } catch {
      setModal({ open: true, type: "error", message: "Invalid email or password. Please check your credentials and try again." });
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      <style>{floatAnim}</style>

      <FeedbackModal
        open={modal.open}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, open: false })}
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
            backgroundSize: "cover", backgroundPosition: "center top",
            transition: "transform 8s ease", "&:hover": { transform: "scale(1.04)" },
          }} />
          <Box sx={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.78) 100%)",
          }} />

          <Box sx={{ position: "relative", zIndex: 2, mb: 3, animation: "fadeUp 0.8s ease both" }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, mb: 1 }}>
              Support smarter.<br />Grow faster.
            </Typography>
            <Typography sx={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 380 }}>
              Unify your customer conversations across every channel — live chat, email, and more — in one intelligent platform.
            </Typography>
          </Box>

          <Box sx={{ position: "relative", zIndex: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {[
              { emoji: "💬", value: "2,400+", label: "Live chats today", color: "#ed6c02", anim: "floatY 4s ease-in-out infinite", pulse: true },
              { emoji: "⚡", value: "98.5%", label: "Satisfaction rate", color: "#1b5e20", anim: "floatY2 5s ease-in-out infinite" },
              { emoji: "🏢", value: "500+", label: "Companies onboard", color: "#1565c0", anim: "floatY 6s ease-in-out infinite 0.8s" },
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

          <Box sx={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 1, mt: 2.5, animation: "floatY 7s ease-in-out infinite 0.4s" }}>
            {["S", "A", "M", "J", "R"].map((l, i) => (
              <Avatar key={i} sx={{
                width: 32, height: 32, fontSize: "0.75rem", fontWeight: 700,
                bgcolor: ["#ed6c02", "#1565c0", "#6a1b9a", "#2e7d32", "#c62828"][i],
                border: "2px solid rgba(255,255,255,0.5)", ml: i > 0 ? -1 : 0,
              }}>{l}</Avatar>
            ))}
            <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", ml: 1.5 }}>
              Trusted by 500+ support teams
            </Typography>
          </Box>
        </Box>

        {/* ── Right Form Panel ── */}
        <Box sx={{
          flex: { xs: 1, md: "0 0 560px" },
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          p: { xs: 3, md: 7 }, bgcolor: "#fff",
        }}>
          <Box sx={{ width: "100%", maxWidth: 440 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <img src={logo} alt="Logo" style={{ width: 200, height: "auto", objectFit: "contain" }} />
            </Box>

            <Typography sx={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1d2e", mb: 0.5 }}>
              Welcome back
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#6b7280", mb: 3.5 }}>
              Sign in to your account to continue
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151", mb: 0.6 }}>Email address</Typography>
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.6 }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151" }}>Password</Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "#ed6c02", cursor: "pointer", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}>
                  Forgot password?
                </Typography>
              </Box>
              <TextField
                fullWidth size="small" placeholder="Enter your password"
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
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
            </Box>

            <Button
              fullWidth variant="contained" disabled={loading}
              onClick={handleSubmit(handleLogin)}
              sx={{
                mt: 3.5, py: 1.4, borderRadius: "10px",
                background: "linear-gradient(135deg, #ed6c02, #c45200)",
                fontSize: "0.95rem", fontWeight: 600,
                boxShadow: "0 4px 15px rgba(237,108,2,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #c45200, #8b3500)", boxShadow: "0 6px 20px rgba(237,108,2,0.45)" },
                "&:disabled": { opacity: 0.65 },
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>

            <Typography sx={{ textAlign: "center", color: "#6b7280", fontSize: "0.87rem", mt: 3 }}>
              Don't have an account?{" "}
              <Box component="span" onClick={() => navigate("/signup")}
                sx={{ color: "#ed6c02", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Create account
              </Box>
            </Typography>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default LoginPage;
