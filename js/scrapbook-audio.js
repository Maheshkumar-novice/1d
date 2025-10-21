// Scrapbook Audio Experience
class ScrapbookAudio {
    constructor() {
        this.audioPlayer = null;
        this.playlist = [];
        this.currentTrack = 0;
        this.ambientSound = null;
        this.init();
    }
    
    init() {
        // Create audio controls
        this.createAudioControls();
        this.bindEvents();
        
        // Add hover sounds to interactive elements
        this.addHoverSounds();
    }
    
    createAudioControls() {
        // Add toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'audio-toggle';
        toggleBtn.innerHTML = '🎵';
        toggleBtn.title = 'Music Controls';
        document.body.appendChild(toggleBtn);
        
        // Add audio controls panel
        const controlsHTML = `
    <!-- Scrapbook Audio Controls -->
    <div class="audio-controls" id="audioControls">
        <div class="music-player scrapbook-style">
            <h4 class="handwritten">🎵 Play Your Favorite 1D Songs 🎵</h4>
            <p class="audio-note handwritten">Upload your own One Direction music to play while browsing!</p>
            
            <div class="file-input-wrapper">
                <input type="file" id="musicUpload" accept="audio/*" multiple class="hidden-input">
                <label for="musicUpload" class="upload-btn scrapbook-btn">
                    📁 Choose Songs
                </label>
            </div>
            
            <div class="current-playlist" id="playlist">
                <!-- Uploaded songs will appear here -->
            </div>
            
            <audio id="audioPlayer" controls class="scrapbook-audio">
                Your browser doesn't support audio playback.
            </audio>
        </div>
        
        <div class="ambient-controls">
            <h5 class="handwritten">Background Vibes</h5>
            <div class="ambient-options">
                <button class="ambient-btn" data-sound="soft-piano">🎹 Soft Piano</button>
                <button class="ambient-btn" data-sound="acoustic">🎸 Acoustic</button>
                <button class="ambient-btn" data-sound="rain">🌧️ Rain</button>
                <button class="ambient-btn" id="muteAll">🔇 Quiet</button>
            </div>
        </div>
    </div>
    `;
        const controlsDiv = document.createElement('div');
        controlsDiv.innerHTML = controlsHTML;
        document.body.appendChild(controlsDiv.firstElementChild);
        
        this.audioPlayer = document.getElementById('audioPlayer');
        
        // Toggle controls visibility
        toggleBtn.addEventListener('click', () => {
            const controls = document.getElementById('audioControls');
            controls.classList.toggle('show');
        });
    }
    
    bindEvents() {
        // File upload for user music
        const upload = document.getElementById('musicUpload');
        upload.addEventListener('change', (e) => this.handleFileUpload(e));
        
        // Ambient sound buttons
        document.querySelectorAll('.ambient-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAmbientSound(e));
        });
        
        // Audio player events
        if (this.audioPlayer) {
            this.audioPlayer.addEventListener('ended', () => this.nextTrack());
        }
    }
    
    handleFileUpload(event) {
        const files = Array.from(event.target.files);
        const playlist = document.getElementById('playlist');
        
        files.forEach((file, index) => {
            if (file.type.startsWith('audio/')) {
                const url = URL.createObjectURL(file);
                this.playlist.push({
                    name: file.name,
                    url: url,
                    file: file
                });
                
                // Add to playlist display
                const item = document.createElement('div');
                item.className = 'playlist-item';
                // Remove file extension for display
                const displayName = file.name.replace(/\.[^/.]+$/, "");
                item.textContent = displayName;
                item.addEventListener('click', () => this.playTrack(this.playlist.length - 1));
                playlist.appendChild(item);
            }
        });
        
        // Play first track if this is the first upload
        if (this.playlist.length > 0 && !this.audioPlayer.src) {
            this.playTrack(0);
        }
    }
    
    playTrack(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentTrack = index;
            this.audioPlayer.src = this.playlist[index].url;
            this.audioPlayer.play();
            
            // Highlight current track
            document.querySelectorAll('.playlist-item').forEach((item, i) => {
                item.style.background = i === index ? 'var(--highlight-yellow)' : 'rgba(255,255,255,0.5)';
            });
        }
    }
    
    nextTrack() {
        if (this.playlist.length > 0) {
            this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
            this.playTrack(this.currentTrack);
        }
    }
    
    handleAmbientSound(event) {
        const soundType = event.target.dataset.sound;
        
        // Remove active class from all buttons
        document.querySelectorAll('.ambient-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (soundType === undefined) { // Mute button
            if (this.ambientSound) {
                this.ambientSound.pause();
                this.ambientSound = null;
            }
        } else {
            event.target.classList.add('active');
            this.playAmbientSound(soundType);
        }
    }
    
    playAmbientSound(type) {
        // Stop current ambient sound
        if (this.ambientSound) {
            this.ambientSound.pause();
        }
        
        // Note: In a real implementation, you'd have actual ambient sound files
        console.log(`Playing ambient sound: ${type}`);
        // This would play subtle background sounds like soft piano, rain, etc.
    }
    
    addHoverSounds() {
        // Add subtle audio cues to interactive elements
        const interactiveElements = document.querySelectorAll('.member-card, .polaroid, .lyrics-page, .sticky-note');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                // Play a subtle paper rustling sound
                this.playInteractionSound('hover');
            });
            
            element.addEventListener('click', () => {
                // Play a subtle click/tap sound
                this.playInteractionSound('click');
            });
        });
    }
    
    playInteractionSound(type) {
        // Create subtle audio feedback for interactions
        // In a full implementation, these would be very quiet sound effects
        console.log(`Interaction sound: ${type}`);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const scrapbookAudio = new ScrapbookAudio();
});