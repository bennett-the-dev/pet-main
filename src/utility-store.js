
class UtilityStoreManager {
    constructor(game) {
        this.game = game;
        
        this.utilityItems = {
            food: { 
                name: 'Pet Food', 
                icon: '🍖', 
                price: 300000, 
                description: 'Pets worth 1.5x more money (1 use)',
                multiplier: 1.5,
                type: 'food',
                stockChance: 1.0,
                baseStock: 3
            },
            water: { 
                name: 'Speed Water', 
                icon: '💧', 
                price: 450000, 
                description: '2x faster growth (1 use)',
                multiplier: 2,
                type: 'speed',
                stockChance: 1.0,
                baseStock: 3
            },
            goldenFood: { 
                name: 'Golden Food', 
                icon: '🥇', 
                price: 33300000, 
                description: 'Pets worth 3x more money (1 use)',
                multiplier: 3,
                type: 'food',
                stockChance: 0.25,
                baseStock: 1
            },
            goldenWater: { 
                name: 'Golden Water', 
                icon: '✨', 
                price: 50100000, 
                description: '5x faster growth (1 use)',
                multiplier: 5,
                type: 'speed',
                stockChance: 0.25,
                baseStock: 1
            },
            diamondFood: { 
                name: 'Diamond Enhancer', 
                icon: '💎', 
                price: 100000000, 
                description: '13x both money and speed (1 use)',
                moneyMultiplier: 13,
                speedMultiplier: 13,
                type: 'both',
                stockChance: 0.05,
                baseStock: 1
            },
            
        };
        
        this.expansionsPurchased = 0;
        this.maxExpansions = 3;
        this.generateUtilityStock();
    }
    
    showUtilityStore() {
        const utilityScreen = document.getElementById('utilityScreen');
        if (utilityScreen) {
            utilityScreen.classList.remove('hidden');
        }
        this.updateDisplay();
    }
    
    hideUtilityStore() {
        const utilityScreen = document.getElementById('utilityScreen');
        if (utilityScreen) {
            utilityScreen.classList.add('hidden');
        }
    }
    
    generateUtilityStock() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const minuteSlot = Math.floor(currentMinute / 5) * 5;
        const cycleNumber = currentHour * 12 + (minuteSlot / 5);
        
        const seededRandom = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };
        
        Object.entries(this.utilityItems).forEach(([key, item], i) => {
            const stockRand = seededRandom(cycleNumber * 5000 + i);
            const inStock = stockRand < item.stockChance;
            
            item.inStock = inStock;
            item.quantity = inStock ? item.baseStock : 0;
            
            
        });
    }
    
    updateDisplay() {
        const inventory = document.getElementById('utilityInventory');
        if (!inventory) return;
        
        inventory.innerHTML = '';
        
        Object.entries(this.utilityItems).forEach(([key, item]) => {
            const itemElement = document.createElement('div');
            itemElement.className = `utility-item ${!item.inStock ? 'out-of-stock' : ''}`;
            
            const canAfford = this.game.money >= item.price && item.inStock && item.quantity > 0;
            
            const buttonText = 'Buy';
            const buttonDisabled = !canAfford;
            
            itemElement.innerHTML = `
                <div class="utility-icon">${item.icon}</div>
                <div class="utility-name">${item.name}</div>
                <div class="utility-description">${item.description}</div>
                <div class="utility-price">$${item.price.toLocaleString()}</div>
                <div class="utility-stock">${item.inStock ? `Stock: ${item.quantity}` : 'Out of Stock'}</div>
                <button class="buy-utility-btn" ${buttonDisabled ? 'disabled' : ''}>
                    ${buttonText}
                </button>
            `;
            
            const buyBtn = itemElement.querySelector('.buy-utility-btn');
            buyBtn.addEventListener('click', () => this.buyUtilityItem(key));
            
            inventory.appendChild(itemElement);
        });
    }
    
    buyUtilityItem(itemKey) {
        const item = this.utilityItems[itemKey];
        if (!item || !item.inStock || item.quantity <= 0) {
            this.game.showNotification('Item not available!', 'error');
            return;
        }
        
        if (!this.game.spendMoney(item.price)) {
            this.game.showNotification('Not enough money!', 'error');
            return;
        }
        
        // Reduce stock
        item.quantity--;
        if (item.quantity <= 0) {
            item.inStock = false;
        }
        
        // Show pet selection modal for utility items
        this.showPetSelection(item);
        this.game.showNotification(`Purchased ${item.name}! Select a pet to use it on.`);
        
        this.updateDisplay();
    }
    
    showPetSelection(item) {
        const modal = document.createElement('div');
        modal.className = 'pet-selection-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Select a pet to use ${item.name} on:</h3>
                <div class="pet-selection-grid" id="petSelectionGrid"></div>
                <button id="cancelSelection">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Populate with farm pets
        const grid = modal.querySelector('#petSelectionGrid');
        Object.entries(this.game.gameData.farmPets).forEach(([plotId, pet]) => {
            const petInfo = this.game.petManager.getPetDisplayInfo(pet);
            const petElement = document.createElement('div');
            petElement.className = 'selectable-pet';
            petElement.innerHTML = `
                <div class="pet-icon">${petInfo.icon}</div>
                <div class="pet-name">${petInfo.name}</div>
                <div class="pet-level">Level ${petInfo.age}</div>
            `;
            
            petElement.addEventListener('click', () => {
                this.applyUtilityToPet(pet, item);
                document.body.removeChild(modal);
            });
            
            grid.appendChild(petElement);
        });
        
        modal.querySelector('#cancelSelection').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    applyUtilityToPet(pet, item) {
        if (!pet.buffs) {
            pet.buffs = { foodMultiplier: 1, speedMultiplier: 1 };
        }
        
        if (item.type === 'food') {
            pet.buffs.foodMultiplier *= item.multiplier;
        } else if (item.type === 'speed') {
            pet.buffs.speedMultiplier *= item.multiplier;
        } else if (item.type === 'both') {
            pet.buffs.foodMultiplier *= item.moneyMultiplier;
            pet.buffs.speedMultiplier *= item.speedMultiplier;
        }
        
        // Update farm display
        this.game.farmManager.updateDisplay();
        this.game.showNotification(`Applied ${item.name} to your pet!`);
    }
}
