import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Send, Delete } from "@mui/icons-material";
import axios from "axios";
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

async function* streamChat(convId, msg) {
  const token = Cookies.get('token');
  const API_URL = import.meta.env.VITE_API_URL;
  const resp = await fetch(`${API_URL}api/V1/chat/stream/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ conversation: convId, role: 'user', content: msg }),
  });
  if (!resp.ok) throw new Error(`Stream error: ${resp.status}`);

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      const raw = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed;
      try {
        const { content } = JSON.parse(raw);
        if (content) yield content;
      } catch { /* skip malformed lines */ }
    }
  }
}

const Chat = () => {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [activeChats, setActiveChat] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [selectedChatID, setSelectedChatID] = useState(null);
  const [newConvoTitle, setNewConvoTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    getconvos(searchTerm);
  }, [searchTerm])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages])

  const getconvos = async (searchTerm) => {
    try {

      const resp = await axios.get(`/api/V1/chat/conversations/?search=${searchTerm}`)

      if(resp.status === 200 || resp.data){
        setActiveChat(resp.data.conversations.results);
        setUserInfo(resp.data.user);
      }

    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }

  }

  const handleChatClick = async (id)=>{
    try{

      const resp = await axios.get(`/api/V1/chat/conversations/${id}/`)

      if(resp.status === 200 || resp.data){

        console.log("Conversation details:", resp.data);
        setChatMessages(resp.data.messages);
        setSelectedChatID(id);
      }
    }
    catch(error){
      console.error("Failed to fetch conversation details:", error);
    }
  }

const sendMessage = async (data) => {
    const userMsg = { id: 'temp-user', role: 'user', content: data.content, created_at: new Date().toISOString() };
    const botTyping = { id: 'temp-bot', role: 'bot', content: '' };
    setChatMessages(prev => [...prev, userMsg, botTyping]);
    reset({ content: '' });
    setIsStreaming(true);
    try {
      for await (const chunk of streamChat(selectedChatID, data.content)) {
        setChatMessages(prev => {
          const msgs = [...prev];
          const last = msgs[msgs.length - 1];
          if (last?.id === 'temp-bot') {
            msgs[msgs.length - 1] = { ...last, content: last.content + chunk };
          }
          return msgs;
        });
      }
      await handleChatClick(selectedChatID);
    } catch (error) {
      console.error("Failed to send message:", error);
      setChatMessages(prev => prev.filter(m => m.id !== 'temp-bot'));
    } finally {
      setIsStreaming(false);
    }
  }


  const handleAddConvo = async () => {
    try {

      const payload = {
        "user": userInfo.id,
        "title": newConvoTitle,
      }
      const resp = await axios.post(`/api/V1/chat/conversations/`, payload)

      if(resp.status === 201  || resp.data){
        console.log("Message sent successfully:", resp.data);
        setIsModalOpen(false);
        setNewConvoTitle("");
        getconvos(searchTerm);
        setSelectedChatID(resp.data.id);
        handleChatClick(resp.data.id);
      }

    } catch (error) {
      console.error("Failed to send message:", error);
    }

  }

  const handleDeleteChat = async (id) => {
    try {
      const resp = await axios.delete(`/api/V1/chat/conversations/${id}/`)
      if (resp.status === 204) {
        console.log("Conversation deleted successfully:", resp.data);
        getconvos(searchTerm);
        if (selectedChatID === id) {
          setSelectedChatID(null);
          setChatMessages([]);
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#fafafa", p: 2 }}>
      <Grid container spacing={2}>
        {/* Left Sidebar */}
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <Card sx={{ p: 2, height: "85vh", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Active Chats
            </Typography>
            <TextField
              size="small"
              placeholder="Search chats..."
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />

            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              {activeChats.map((chat) => (
                <Box
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  sx={{
                    bgcolor: chat.id === selectedChatID ? "#ffb30033" : "transparent",
                    borderRadius: 2,
                    p: 1.5,
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#fff3e0" },
                  }}

                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ bgcolor: "#ffa000" }}>
                      {chat.title.charAt(0)}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography fontWeight={600} fontSize="0.9rem">{chat.title}</Typography>
                      <Typography fontSize="0.7rem" color="text.secondary">
                        {dayjs(chat.created_at).format('MMM DD, YYYY hh:mm A')}
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ bgcolor: "#ff000022", "&:hover": { bgcolor: "#ff000044" } }} onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(chat.id);
                    }}>
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                 
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Chat Window */}
        <Grid item size={{ xs: 12, md: 9, lg: 9 }}>
          <Card sx={{ p: 2, height: "85vh", display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 2, borderBottom: "1px solid #eee", pb: 1 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: "#ffa000" }}>{userInfo.first_name?.charAt(0) || 'Z'}</Avatar>
                  <Box>
                    <Typography fontWeight={600}> {userInfo.first_name} {userInfo.last_name} </Typography>
                  </Box>
                </Box>
                <Button variant="contained" size="small" onClick={()=>setIsModalOpen(true)}>
                  + New Chat
                </Button>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2 }}>
              {chatMessages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: msg.role === "user" ? "#87898e" : "#dff7ff",
                      color: msg.role === "user" ? "#fff" : "#000",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      maxWidth: "70%",
                    }}
                  >
                    {msg.content === null ? (
                      <Typography fontSize="1.2rem" letterSpacing={2}>···</Typography>
                    ) : (
                      <>
                        <Typography fontSize="0.9rem">
                          {msg.content}
                          {isStreaming && msg.id === 'temp-bot' && (
                            <Box component="span" sx={{
                              display: 'inline-block',
                              width: '2px',
                              height: '1em',
                              bgcolor: 'currentColor',
                              ml: '2px',
                              verticalAlign: 'text-bottom',
                              animation: 'blink 1s step-start infinite',
                              '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
                            }} />
                          )}
                        </Typography>
                        <Typography fontSize="0.7rem" textAlign="right" mt={0.5}>
                          {dayjs(msg.created_at).format('MMM DD, YYYY hh:mm A')}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              ))}
              <Box ref={bottomRef} />
            </Box>

            <Divider sx={{ my: 1 }} />
            <form onSubmit={handleSubmit(sendMessage)}>
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                fullWidth
                disabled={!selectedChatID}
                placeholder="Type a message..."
                {...register("content", { required: "Message cannot be empty" })}
              />
              <IconButton type="submit" color="warning" disabled={!selectedChatID}>
                <Send />
              </IconButton>
            </Box>
            </form>
          </Card>
        </Grid>

        {/* Right Sidebar */}
        {/* <Grid item size={{ xs: 12, md: 2, lg: 3 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Card sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ bgcolor: "#ffa000" }}>JD</Avatar>
                <Box>
                  <Typography fontWeight={600}>John Doe</Typography>
                  <Chip label="returning" color="success" size="small" />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography fontSize="0.85rem" color="text.secondary">
                  Email
                </Typography>
                <Typography>john.doe@example.com</Typography>

                <Typography fontSize="0.85rem" color="text.secondary" mt={1}>
                  Phone
                </Typography>
                <Typography>+1 (555) 123-4567</Typography>

                <Typography fontSize="0.85rem" color="text.secondary" mt={1}>
                  Member Since
                </Typography>
                <Typography>Mar 15, 2024</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography fontSize="0.8rem" color="text.secondary">
                    Total Chats
                  </Typography>
                  <Typography fontWeight={600}>12</Typography>
                </Box>
                <Box>
                  <Typography fontSize="0.8rem" color="text.secondary">
                    Status
                  </Typography>
                  <Typography color="success.main" fontWeight={600}>
                    Active
                  </Typography>
                </Box>
              </Box>
            </Card>

            <Card sx={{ p: 2 }}>
              <Typography fontWeight={700}>Assignment Info</Typography>
              <Box mt={2} p={1.5} borderRadius={2} bgcolor="#fff3e0">
                <Typography fontSize="0.8rem" color="text.secondary">
                  Currently Assigned To
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <Avatar sx={{ bgcolor: "#ffa000" }}>SJ</Avatar>
                  <Box>
                    <Typography fontWeight={600}>Sarah Johnson</Typography>
                    <Typography fontSize="0.8rem" color="text.secondary">
                      Sales Department
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box mt={2}>
                <Typography fontSize="0.85rem" fontWeight={600}>
                  Assignment History
                </Typography>
                <Box mt={1.5} display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ bgcolor: "#ffa000" }}>SJ</Avatar>
                      <Box>
                        <Typography fontSize="0.85rem" fontWeight={600}>Sarah Johnson</Typography>
                        <Typography fontSize="0.75rem" color="text.secondary">10:15 AM • 21 min</Typography>
                      </Box>
                    </Box>
                    <Chip label="assigned" size="small" color="default" />
                  </Box>

                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ bgcolor: "#ffa000" }}>MC</Avatar>
                      <Box>
                        <Typography fontSize="0.85rem" fontWeight={600}>Mike Chen</Typography>
                        <Typography fontSize="0.75rem" color="text.secondary">9:45 AM • 30 min</Typography>
                      </Box>
                    </Box>
                    <Chip label="transferred" size="small" color="warning" />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid> */}
      </Grid>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogTitle>Delete Conversation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this conversation? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => {
            handleDeleteChat(confirmDeleteId);
            setConfirmDeleteId(null);
          }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* New Conversation Modal */}
      <Dialog open={isModalOpen} onClose={()=>setIsModalOpen(false)}>
        <DialogTitle>Start New Conversation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Conversation Title"
            type="text"
            fullWidth
            value={newConvoTitle}
            onChange={(e) => setNewConvoTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddConvo} variant="contained">
            Start Chat
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Chat;
