// Market management system
class MarketManager {
    constructor(game) {
        this.game = game;
    }
    
    updateDisplay() {
        const marketInventory = document.getElementById('marketInventory');
        if (!marketInventory) return;
        
        marketInventory.innerHTML = '';
        
        // Get all farm pets that can be sold (age 5+)
        const sellablePets = [];
        Object.entries(this.game.gameData.farmPets).forEach(([plotId, pet]) => {
            const petInfo = this.game.petManager.getPetDisplayInfo(pet);
            if (petInfo && petInfo.canSell) {
                sellablePets.push({ ...petInfo, pet, plotId });
            }
        });
        
        if (sellablePets.length === 0) {
            marketInventory.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <h3>No pets ready for sale</h3>
                    <p>Pets must be age 5 or older to sell. Keep growing your pets on the farm!</p>
                </div>
            `;
            return;
        }
        
        sellablePets.forEach(({ pet, plotId, ...petInfo }) => {
            const petElement = document.createElement('div');
            petElement.className = 'market-pet';
            
            let specialClass = '';
            if (petInfo.isRainbow) {
                specialClass = 'pet-rainbow';
            } else if (petInfo.isGolden) {
                specialClass = 'pet-golden';
            }
            
            petElement.innerHTML = `
                <div class="pet-icon ${specialClass}">${petInfo.icon}</div>
                <div class="pet-name">${petInfo.name}</div>
                <div class="pet-rarity">${petInfo.rarity}</div>
                <div class="pet-age">Age: ${petInfo.age}</div>
                <div class="pet-price">Value: $${petInfo.value}</div>
                <button class="sell-btn">
                    Sell for $${petInfo.value}
                </button>
            `;
            
            const sellBtn = petElement.querySelector('.sell-btn');
            sellBtn.addEventListener('click', () => this.sellPet(plotId));
            
            marketInventory.appendChild(petElement);
        });
    }
    
    sellPet(plotId) {
        const pet = this.game.gameData.farmPets[plotId];
        if (!pet) return;
        
        const petInfo = this.game.petManager.getPetDisplayInfo(pet);
        if (!petInfo || !petInfo.canSell) {
            this.game.showNotification('This pet cannot be sold yet!', 'error');
            return;
        }
        
        // Confirm sale
        const confirmed = confirm(`Sell ${petInfo.name} (Age ${petInfo.age}) for $${petInfo.value}?`);
        if (!confirmed) return;
        
        // Add money
        this.game.addMoney(petInfo.value);
        
        // Remove from farm and owned pets (use helper for ownedPets)
        delete this.game.gameData.farmPets[plotId];
        if (this.game.petManager.removePetFromOwned) {
            this.game.petManager.removePetFromOwned(pet.id);
        } else {
            this.game.gameData.ownedPets = this.game.gameData.ownedPets.filter(p => p.id !== pet.id);
        }
        
        // Update displays
        this.updateDisplay();
        this.game.farmManager.updateDisplay();
        this.game.inventoryManager.updateDisplay();
        
        this.game.showNotification(`Sold ${petInfo.name} for $${petInfo.value}!`);
    }
}
