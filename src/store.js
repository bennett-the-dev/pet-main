// Store management system
class StoreManager {
    constructor(game) {
        this.game = game;
        this.refreshInterval = 5 * 60;
        this.timeUntilRefresh = 0;
        
        this.rarityWeights = {
            common: 0.35,
            uncommon: 0.25,
            rare: 0.2,
            epic: 0.1,
            legendary: 0.05,
            mythical: 0.03,
            divine: 0.015,
            cosmic: 0.005
        };
        
        this.stockProbabilities = {
            common: 1.0,
            uncommon: 1.0,
            rare: 1.0,
            epic: 0.85,
            legendary: 0.6,
            mythical: 0.15,
            divine: 0.1,
            cosmic: 0.01
        };
        
        this.initialize();
    }
    
    initialize() {
        this.updateTimer();
        this.generateGlobalInventory();
    }
    
    generateGlobalInventory() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        // Create cycle based on 5-minute intervals (minute ending in 0 or 5)
        const minuteSlot = Math.floor(currentMinute / 5) * 5;
        const cycleNumber = currentHour * 12 + (minuteSlot / 5);
        
        const seededRandom = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };
        
        this.game.gameData.storeInventory = [];
        const petTypes = this.game.petManager.getAllPetTypes();
        
        // Show all pet types in store
        petTypes.forEach((pet, i) => {
            const rarity = pet.rarity.toLowerCase();
            let stockChance = this.stockProbabilities[rarity];

            // Decrease chances for expensive pets
            if (pet.basePrice >= 5000000) {
                // Heavily decrease: divide by 10 (was previously +0.5)
                stockChance = stockChance / 10;
            } else if (pet.basePrice >= 30000) {
                // Lightly decrease: divide by 2 (was previously +0.2)
                stockChance = stockChance / 2;
            }

            const stockRand = seededRandom(cycleNumber * 3000 + i);
            const inStock = stockRand < stockChance;
            const quantity = inStock ? (1 + Math.floor(seededRandom(cycleNumber * 4000 + i) * 3)) : 0;

            this.game.gameData.storeInventory.push({
                ...pet,
                inStock: inStock,
                quantity: quantity
            });
        });
        
        this.game.gameData.storeLastRefresh = Date.now();
    }
    
    loadGlobalInventory() {
        if (this.game.gameData.storeInventory.length === 0) {
            this.generateGlobalInventory();
        }
    }
    
    selectRarityWeighted(random = Math.random()) {
        let cumulative = 0;
        
        for (const [rarity, weight] of Object.entries(this.rarityWeights)) {
            cumulative += weight;
            if (random <= cumulative) {
                return rarity;
            }
        }
        
        return 'common';
    }
    
    buyPet(petId) {
        const storeItem = this.game.gameData.storeInventory.find(item => item.id === petId);
        if (!storeItem || !storeItem.inStock || storeItem.quantity <= 0) {
            this.game.showNotification('Item not available!', 'error');
            return false;
        }
        
        if (!this.game.spendMoney(storeItem.basePrice)) {
            this.game.showNotification('Not enough money!', 'error');
            return false;
        }
        
        // Add pet to owned pets
        const newPet = this.game.petManager.createPet(petId);
        this.game.gameData.ownedPets.push(newPet);
        
        // Reduce store quantity
        storeItem.quantity--;
        if (storeItem.quantity <= 0) {
            storeItem.inStock = false;
        }
        
        this.game.showNotification(`Bought ${storeItem.name}!`);
        this.updateDisplay();
        
        return true;
    }
    
    forceRefresh() {
        this.generateGlobalInventory();
        this.updateDisplay();
    }
    
    updateTimer() {
        const now = new Date();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();
        
        let secondsUntilNext;
        const currentMinuteLastDigit = currentMinute % 10;
        
        if (currentMinuteLastDigit < 5) {
            // Next refresh is at minute ending in 5
            const minutesUntilRefresh = 5 - currentMinuteLastDigit;
            secondsUntilNext = (minutesUntilRefresh * 60) - currentSecond;
        } else {
            // Next refresh is at minute ending in 0 (next 10-minute mark)
            const minutesUntilRefresh = 10 - currentMinuteLastDigit;
            secondsUntilNext = (minutesUntilRefresh * 60) - currentSecond;
        }
        
        this.timeUntilRefresh = secondsUntilNext;
        
        if (currentSecond === 0 && (currentMinuteLastDigit === 0 || currentMinuteLastDigit === 5)) {
            this.generateGlobalInventory();
            this.updateDisplay();
        }
        
        const minutes = Math.floor(this.timeUntilRefresh / 60);
        const seconds = this.timeUntilRefresh % 60;
        const timerElement = document.getElementById('refreshTimer');
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    updateDisplay() {
        const inventory = document.getElementById('storeInventory');
        if (!inventory) return;
        
        inventory.innerHTML = '';
        
        this.game.gameData.storeInventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `store-item ${!item.inStock ? 'out-of-stock' : ''}`;
            
            itemElement.innerHTML = `
                <div class="pet-icon">${item.icon}</div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-rarity">${item.rarity}</div>
                <div class="pet-price">$${item.basePrice}</div>
                <div class="pet-stock">${item.inStock ? `Stock: ${item.quantity}` : 'Out of Stock'}</div>
                <button class="buy-btn" ${!item.inStock || this.game.money < item.basePrice ? 'disabled' : ''}>
                    Buy
                </button>
            `;
            
            const buyBtn = itemElement.querySelector('.buy-btn');
            buyBtn.addEventListener('click', () => this.buyPet(item.id));
            
            inventory.appendChild(itemElement);
        });
    }
}
