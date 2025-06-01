// Main game state and initialization
class PetFarmGame {
    constructor() {
        this.money = 20;
        this.currentScreen = 'farm';
        this.gameData = {
            money: this.money,
            ownedPets: [],
            farmPets: {},
            lastSave: Date.now(),
            storeLastRefresh: 0,
            storeInventory: []
        };

        this.audioManager = new AudioManager();
        this.petManager = new PetManager();
        this.farmManager = new FarmManager(this);
        this.inventoryManager = new InventoryManager(this);
        this.storeManager = new StoreManager(this);
        this.utilityStoreManager = new UtilityStoreManager(this);

        this.init();
    }

    init() {
        this.loadGame();
        this.setupEventListeners();
        this.startGameLoop();
        this.updateDisplay();
        this.showScreen('farm');
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('storeBtn').addEventListener('click', () => this.showScreen('store'));
        document.getElementById('farmBtn').addEventListener('click', () => this.showScreen('farm'));
        document.getElementById('inventoryBtn').addEventListener('click', () => this.showScreen('inventory'));
        document.getElementById('utilityBtn').addEventListener('click', () => this.showScreen('utility'));
        document.getElementById('muteBtn').addEventListener('click', () => this.audioManager.toggleMute());



        // Pet selection modal
        document.getElementById('closePetModal').addEventListener('click', () => {
            document.getElementById('petSelectionModal').classList.add('hidden');
        });

        // Auto-save every 30 seconds
        setInterval(() => this.saveGame(), 30000);

        // Save on page unload
        window.addEventListener('beforeunload', () => this.saveGame());
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });

        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected screen and set active button
        if (screenName === 'store') {
            document.getElementById('storeScreen').classList.remove('hidden');
            this.storeManager.updateDisplay();
            document.getElementById('storeBtn').classList.add('active');
        } else if (screenName === 'farm') {
            document.getElementById('farmScreen').classList.remove('hidden');
            this.farmManager.updateDisplay();
            document.getElementById('farmBtn').classList.add('active');
        } else if (screenName === 'inventory') {
            document.getElementById('inventoryScreen').classList.remove('hidden');
            this.inventoryManager.updateDisplay();
            document.getElementById('inventoryBtn').classList.add('active');
        } else if (screenName === 'utility') {
            this.utilityStoreManager.showUtilityStore();
            document.getElementById('utilityBtn').classList.add('active');
        }

        this.currentScreen = screenName;
    }

    addMoney(amount) {
        this.money += amount;
        this.updateDisplay();
        this.audioManager.playSuccess();
    }

    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    updateDisplay() {
        document.getElementById('money').textContent = this.money;

        // Update mute button
        const muteBtn = document.getElementById('muteBtn');
        muteBtn.textContent = this.audioManager.isMuted ? '🔇' : '🔊';
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.getElementById('notifications').appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    startGameLoop() {
        setInterval(() => {
            this.farmManager.updatePets();
            this.storeManager.updateTimer();
            this.updateDisplay();
        }, 1000); // Update every second
    }

    saveGame() {
        const saveData = {
            money: this.money,
            ownedPets: this.gameData.ownedPets,
            farmPets: this.gameData.farmPets,
            lastSave: Date.now(),
            storeLastRefresh: this.gameData.storeLastRefresh,
            storeInventory: this.gameData.storeInventory,
            version: '1.0' // Add version for future compatibility
        };

        try {
            localStorage.setItem('petFarmSave', JSON.stringify(saveData));
            console.log('Game saved successfully');
        } catch (error) {
            console.error('Failed to save game:', error);
            this.showNotification('Failed to save game!', 'error');
        }
    }

    loadGame() {
        const savedData = localStorage.getItem('petFarmSave');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.money = data.money || 20;
                this.gameData.ownedPets = data.ownedPets || [];
                this.gameData.farmPets = data.farmPets || {};
                this.gameData.storeLastRefresh = data.storeLastRefresh || 0;
                this.gameData.storeInventory = data.storeInventory || [];

                // Calculate offline time and apply growth
                if (data.lastSave) {
                    const offlineTime = Math.floor((Date.now() - data.lastSave) / 1000);
                    this.farmManager.applyOfflineGrowth(offlineTime);
                }
                
                console.log('Game loaded successfully');
                this.showNotification('Game loaded!', 'success');
            } catch (e) {
                console.error('Failed to load save data:', e);
                this.showNotification('Failed to load save data. Starting fresh.', 'warning');
            }
        } else {
            console.log('No save data found, starting new game');
        }
    }
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.game = new PetFarmGame();
});

// Remove inventory tab and button
document.getElementById('inventoryBtn').style.display = 'none';
document.getElementById('inventoryScreen').style.display = 'none';

// Restore inventory tab and button if previously hidden
document.getElementById('inventoryBtn').style.display = '';
document.getElementById('inventoryScreen').style.display = '';