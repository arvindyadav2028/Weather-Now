import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import './FunCard.css'

export default function FunCard() {
  const [tab, setTab] = useState(0);

  // Meme
  const [meme, setMeme] = useState(null);
  const [loadingMeme, setLoadingMeme] = useState(false);

  // Spotify (placeholder playlists)
  const playlists = [
    {
      id: 1,
      title: "🌞 Morning Vibes",
      url: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    },
    {
      id: 2,
      title: "🔥 Workout Pump",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP",
    },
    {
      id: 3,
      title: "😌 Chill Hits",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6",
    },
  ];

  // Fetch Meme
  const fetchMeme = async () => {
    try {
      setLoadingMeme(true);
      const res = await axios.get(import.meta.env.VITE_MEME_API);
      setMeme(res.data); // Adjust here if API returns {title, url} differently
    } catch (err) {
      console.error("Error fetching meme:", err);
      setMeme(null);
    } finally {
      setLoadingMeme(false);
    }
  };


  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className="FunCard">
        <Card sx={{ margin: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
            🎉 Fun Corner
            </Typography>

            {/* Tabs */}
            <Tabs
            className="Tabs"
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ mb: 2 }}
            >
            <Tab label="🎶 Spotify" />
            <Tab label="😂 Meme" />
            </Tabs>

            {/* Spotify Section */}
            {tab === 0 && (
            <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                Here are some playlists for you:
                </Typography>
                {playlists.map((p) => (
                <div key={p.id}>
                    <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    >
                    <Button sx={{ my: 1 }} variant="outlined">
                        {p.title}
                    </Button>
                    </a>
                </div>
                ))}
            </Box>
            )}

            {/* Meme Section */}
            {tab === 1 && (
            <Box>
                {loadingMeme ? (
                <Typography>Loading Meme...</Typography>
                ) : meme ? (
                <>
                    {meme.title && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        {meme.title}
                    </Typography>
                    )}
                    <img
                    src={meme.url || meme.image || meme.preview}
                    alt="Random Meme"
                    style={{ maxWidth: "100%", borderRadius: "12px" }}
                    />
                </>
                ) : (
                <Typography>No meme available</Typography>
                )}
                <Button onClick={fetchMeme} sx={{ mt: 2 }} variant="outlined">
                Next Meme 😂
                </Button>
            </Box>
            )}
        </CardContent>
        </Card>
    </div>
  );
}
