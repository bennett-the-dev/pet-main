class AudioManager {
    constructor() {
        this.isMuted = true;
        this.sounds = {};
        this.backgroundMusic = null;
        
        this.loadSounds();
    }
    
    loadSounds() {
        this.sounds.hit = new Audio('/public/sounds/hit.mp3');
        this.sounds.success = new Audio('/public/sounds/success.mp3');
        this.backgroundMusic = new Audio('/public/sounds/background.mp3');
        
        if (this.backgroundMusic) {
            this.backgroundMusic.loop = true;
            this.backgroundMusic.volume = 0.3;
        }
        
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;
        });
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.stopBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
    }
    
    playBackgroundMusic() {
        if (this.isMuted || !this.backgroundMusic) return;
        
        this.backgroundMusic.play().catch(error => {
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
        
        const soundClone = this.sounds.hit.cloneNode();
        soundClone.volume = 0.3;
        soundClone.play().catch(error => {
        });
    }
    
    playSuccess() {
        if (this.isMuted || !this.sounds.success) return;
        
        this.sounds.success.currentTime = 0;
        this.sounds.success.play().catch(error => {
        });
    }
}
