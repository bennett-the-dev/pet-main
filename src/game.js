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
        document.getElementById('storeBtn').addEventListener('click', () => this.showScreen('store'));
        document.getElementById('farmBtn').addEventListener('click', () => this.showScreen('farm'));
        document.getElementById('inventoryBtn').addEventListener('click', () => this.showScreen('inventory'));
        document.getElementById('utilityBtn').addEventListener('click', () => this.showScreen('utility'));
        document.getElementById('muteBtn').addEventListener('click', () => this.audioManager.toggleMute());

        document.getElementById('closePetModal').addEventListener('click', () => {
            document.getElementById('petSelectionModal').classList.add('hidden');
        });

        setInterval(() => this.saveGame(), 30000);

        window.addEventListener('beforeunload', () => this.saveGame());
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

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

        const muteBtn = document.getElementById('muteBtn');
        muteBtn.textContent = this.audioManager.isMuted ? '🔇' : '🔊';
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.getElementById('notifications').appendChild(notification);

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
        }, 1000);
    }

    saveGame() {
        const saveData = {
            money: this.money,
            ownedPets: this.gameData.ownedPets,
            farmPets: this.gameData.farmPets,
            lastSave: Date.now(),
            storeLastRefresh: this.gameData.storeLastRefresh,
            storeInventory: this.gameData.storeInventory,
            version: '1.0'
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

window.addEventListener('DOMContentLoaded', () => {
    window.game = new PetFarmGame();
});

document.getElementById('inventoryBtn').style.display = 'none';
document.getElementById('inventoryScreen').style.display = 'none';

document.getElementById('inventoryBtn').style.display = '';
document.getElementById('inventoryScreen').style.display = '';