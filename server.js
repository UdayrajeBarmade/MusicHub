const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname, 'public')));

// Serve song files from the 'songs' directory
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// Route to handle serving the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle serving individual songs dynamically
app.get('/play/:song', (req, res) => {
    const songName = req.params.song;
    const songPath = path.join(__dirname, 'songs', songName);
    res.sendFile(songPath);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
