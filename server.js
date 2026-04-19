import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());
app.use(express.static(distPath));

// API Proxy for candidates
app.get('/candidates', async (req, res) => {
  try {
    const response = await axios.get(
      'https://candicheck-last-agent.onrender.com/candidates'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
});

// API Proxy for analyze
app.post('/analyze', async (req, res) => {
  try {
    console.log('Sending data to analyze endpoint:', req.body);
    
    const response = await axios.post(
      'https://3fy7gs-8080.csb.app/analyze',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Response from analyze endpoint:', response.data);
    res.setHeader('Content-Type', 'application/json');
    res.json(response.data || { success: true, message: 'Analysis completed' });
  } catch (error) {
    console.error('Error analyzing data:', error.message);
    res.status(500).json({ error: 'שגיאה בשרת', details: error.message });
  }
});

// Fallback to index.html for all routes (SPA)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
