class MarketManager {
    constructor(game) {
        this.game = game;
    }
    
    updateDisplay() {
        const marketInventory = document.getElementById('marketInventory');
        if (!marketInventory) return;
        
        marketInventory.innerHTML = '';
        
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
            
            let iconColor = '#000';
            switch (petInfo.rarity) {
                case 'common': iconColor = '#888'; break;
                case 'uncommon': iconColor = '#0c0'; break;
                case 'rare': iconColor = '#00f'; break;
                case 'epic': iconColor = '#a0f'; break;
                case 'legendary': iconColor = '#ff0'; break;
                default: iconColor = '#000'; break;
            }
            
            let iconHtml = petInfo.icon && petInfo.icon.startsWith('bi')
                ? `<i class='${petInfo.icon}' style='color:${iconColor};font-size:2.5rem;'></i>`
                : (() => {
                    switch ((petInfo.id||petInfo.type||'').toLowerCase()) {
                        case 'cat': return `<i class='bi bi-emoji-smile' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        case 'dog': return `<i class='bi bi-emoji-laughing' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        case 'fish': return `<i class='bi bi-fish' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        case 'ancient': return `<i class='bi bi-hourglass-split' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        case 'throne': return `<i class='bi bi-gem' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        case 'angel': return `<i class='bi bi-sun' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        case 'sun': return `<i class='bi bi-sun' style='color:${iconColor};font-size:2.5rem;'></i>`;
                        default: return `<i class='bi bi-question-circle' style='color:#888;font-size:2.5rem;'></i>`;
                    }
                })();
            
            petElement.innerHTML = `
                <div class="pet-icon ${specialClass} d-flex justify-content-center align-items-center mb-2" style="font-size:2.5rem;">${iconHtml}</div>
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
        
        const confirmed = confirm(`Sell ${petInfo.name} (Age ${petInfo.age}) for $${petInfo.value}?`);
        if (!confirmed) return;
        
        this.game.addMoney(petInfo.value);
        
        delete this.game.gameData.farmPets[plotId];
        if (this.game.petManager.removePetFromOwned) {
            this.game.petManager.removePetFromOwned(pet.id);
        } else {
            this.game.gameData.ownedPets = this.game.gameData.ownedPets.filter(p => p.id !== pet.id);
        }
        
        this.updateDisplay();
        this.game.farmManager.updateDisplay();
        this.game.inventoryManager.updateDisplay();
        
        this.game.showNotification(`Sold ${petInfo.name} for $${petInfo.value}!`);
    }
}
