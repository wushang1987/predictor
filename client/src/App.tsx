import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { marked } from "marked";

interface Prediction {
  _id: string;
  content: string;
  createdAt: string;
}

const TOPIC = "预测美国2025中期选举";

function App() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get<Prediction[]>("/api/predictions").then((res) => {
      setPredictions(res.data);
    });
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post<Prediction>("/api/predictions");
      setPredictions((prev) => [res.data, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {TOPIC}
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" onClick={handlePredict} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "实时预测"}
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {predictions.map((p) => (
          <Card key={p._id}>
            <CardContent>
              <Typography variant="body1" component="div">
                <span dangerouslySetInnerHTML={{ __html: marked.parse(p.content) }} />
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(p.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default App;
