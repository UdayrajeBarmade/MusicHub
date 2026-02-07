let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemContainer = document.getElementById('songItemContainer');
let trendingSongsContainer = document.getElementById('trendingSongsContainer');
let artistContainer = document.getElementById('artistContainer');
let bannerImage = document.getElementById('bannerImage');
let profileSection = document.getElementById('profileSection');
let userDetails = document.getElementById('userDetails');
let toggleDetailsButton = document.getElementById('toggleDetailsButton');
let descriptionText = document.getElementById('descriptionText');
let toggleDescriptionButton = document.getElementById('toggleDescriptionButton');

let songs = [
    { songName: "On & On", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Invincible", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Mortals", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Shine", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Why We Lose", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Sky High", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Symbolism", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Heroes Tonight", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Feel Good", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "My Heart", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

let artists = [
    "Cartoon",
    "Daniel Levi",
    "NCS Release",
    "Tobu",
    "Elektronomia"
];

// Play song function
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateUIOnPlay();
};

// Update UI when playing
const updateUIOnPlay = () => {
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    highlightCurrentSong();
    updateNowPlaying();
    bannerImage.classList.add('rotate'); // Start rotating the album art
};

// Update UI when paused
const updateUIOnPause = () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    bannerImage.classList.remove('rotate'); // Stop rotating the album art
};

// Toggle play/pause button
const togglePlayPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if (audioElement.src === '' || audioElement.currentTime === 0) {
            playSong();
        } else {
            audioElement.play();
            updateUIOnPlay();
        }
    } else {
        audioElement.pause();
        updateUIOnPause();
    }
};

// Update Now Playing banner
const updateNowPlaying = () => {
    const songBannerName = document.getElementById('songBannerName');
    songBannerName.innerText = songs[songIndex].songName;
    bannerImage.src = songs[songIndex].coverPath;
};

// Highlight the current song in the list
const highlightCurrentSong = () => {
    const allSongItems = document.querySelectorAll('.songItem');
    allSongItems.forEach((item) => {
        item.classList.remove('active-song');
    });
    const currentSongItem = songItemContainer.children[songIndex];
    if (currentSongItem) {
        currentSongItem.classList.add('active-song');
    }
};

// Play next song
const playNextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
};

// Play previous song
const playPreviousSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
};

// Stop song
const stopSong = () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    updateUIOnPause();
};

masterPlay.addEventListener('click', togglePlayPause);

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Sync progress bar with audio current time
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next/Previous song buttons
document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPreviousSong);

// Now Playing controls
document.getElementById('nextNow').addEventListener('click', playNextSong);
document.getElementById('previousNow').addEventListener('click', playPreviousSong);
document.getElementById('stopNow').addEventListener('click', stopSong);

// Render all songs in the song list
const renderSongs = () => {
    songs.forEach((song, i) => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}" />
            <span class="songName">${song.songName}</span>
            <span class="songlistplay">
                <span class="timestamp">02:50
                    <i class="far songItemPlay fa-play-circle"></i>
                </span>
            </span>
        `;
        songItemContainer.appendChild(songItem);

        songItem.querySelector('.songItemPlay').addEventListener('click', (e) => {
            songIndex = i;
            playSong();
        });
    });
};

// Render trending songs
const renderTrendingSongs = () => {
    songs.forEach((song, i) => {
        const trendingItem = document.createElement('span');
        trendingItem.classList.add('trendingItem');
        trendingItem.innerText = song.songName;
        trendingItem.addEventListener('click', () => {
            songIndex = i;
            playSong();
        });
        trendingSongsContainer.appendChild(trendingItem);
    });
};

// Render artist list
const renderArtists = () => {
    artists.forEach((artist) => {
        const artistItem = document.createElement('div');
        artistItem.classList.add('artistItem');
        artistItem.innerText = artist;
        artistContainer.appendChild(artistItem);
    });
};

// Render social media links
const renderSocialMediaLinks = () => {
    const instagramLink = document.querySelector('.socialMediaLinks a[href*="instagram"]');
    const twitterLink = document.querySelector('.socialMediaLinks a[href*="twitter"]');

    instagramLink.href = 'https://www.instagram.com/_.udayraje.b07._';
    twitterLink.href = 'https://twitter.com/yourprofile';
};

renderSongs();
renderTrendingSongs();
renderArtists();
renderSocialMediaLinks();

// Play next song when current one ends
audioElement.addEventListener('ended', playNextSong);

// Handle autoplay on page load
window.addEventListener('load', () => {
    audioElement.play().then(() => {
        updateUIOnPlay();
    }).catch(error => {
        console.log('Autoplay blocked by browser:', error);
    });
});

// Start music when the user clicks start button
document.getElementById('startButton').addEventListener('click', () => {
    playSong();
    document.getElementById('startOverlay').style.display = 'none';
});

// Profile Section Toggle Animation
let isDetailsVisible = false;
toggleDetailsButton.addEventListener('click', () => {
    if (!isDetailsVisible) {
        userDetails.classList.remove('hidden');
        userDetails.classList.add('visible');
        toggleDetailsButton.innerText = 'Hide Details';
    } else {
        userDetails.classList.remove('visible');
        userDetails.classList.add('hidden');
        toggleDetailsButton.innerText = 'Show Details';
    }
    isDetailsVisible = !isDetailsVisible;
});

// Description Toggle for user profile
let isDescriptionVisible = false;
toggleDescriptionButton.addEventListener('click', () => {
    if (!isDescriptionVisible) {
        descriptionText.classList.remove('hidden');
        descriptionText.classList.add('visible');
        toggleDescriptionButton.innerText = 'Hide Description';
    } else {
        descriptionText.classList.remove('visible');
        descriptionText.classList.add('hidden');
        toggleDescriptionButton.innerText = 'Show Description';
    }
    isDescriptionVisible = !isDescriptionVisible;
});
