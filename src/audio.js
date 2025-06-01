// Audio management system
class AudioManager {
    constructor() {
        this.isMuted = true; // Start muted by default
        this.sounds = {};
        this.backgroundMusic = null;
        
        this.loadSounds();
    }
    
    loadSounds() {
        // Load sound files
        this.sounds.hit = new Audio('/public/sounds/hit.mp3');
        this.sounds.success = new Audio('/public/sounds/success.mp3');
        this.backgroundMusic = new Audio('/public/sounds/background.mp3');
        
        // Configure background music
        if (this.backgroundMusic) {
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = 0.3;
        }
        
        // Configure sound effects
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;
        });
        
        console.log('Audio manager initialized');
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.stopBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
        
        console.log(`Audio ${this.isMuted ? 'muted' : 'unmuted'}`);
    }
    
    playBackgroundMusic() {
        if (this.isMuted || !this.backgroundMusic) return;
        
        this.backgroundMusic.play().catch(error => {
            console.log('Background music play prevented:', error);
        });
    }
    
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }
    
    playHit() {
        if (this.isMuted || !this.sounds.hit) return;
        
        // Clone the sound to allow overlapping playback
        const soundClone = this.sounds.hit.cloneNode();
        soundClone.volume = 0.3;
        soundClone.play().catch(error => {
            console.log('Hit sound play prevented:', error);
        });
    }
    
    playSuccess() {
        if (this.isMuted || !this.sounds.success) return;
        
        this.sounds.success.currentTime = 0;
        this.sounds.success.play().catch(error => {
            console.log('Success sound play prevented:', error);
        });
    }
}
