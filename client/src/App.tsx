import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import axios from "axios";

interface Prediction {
  _id: string;
  content: string;
  createdAt: string;
}

const TOPIC = "预测美国2025中期选举";

function App() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    axios.get<Prediction[]>("/api/predictions").then((res) => {
      setPredictions(res.data);
    });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        {TOPIC}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {predictions.map((p) => (
          <Card key={p._id}>
            <CardContent>
              <Typography variant="body1">{p.content}</Typography>
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
