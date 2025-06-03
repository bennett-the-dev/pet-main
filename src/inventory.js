class InventoryManager {
    constructor(game) {
        this.game = game;
    }

    updateDisplay() {
        const inventoryContainer = document.getElementById('inventoryContainer');
        if (!inventoryContainer) return;

        inventoryContainer.innerHTML = '';

        if (this.game.gameData.ownedPets.length === 0) {
            inventoryContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <h3>No pets in inventory</h3>
                    <p>Buy pets from the store to add them to your inventory!</p>
                </div>
            `;
            return;
        }

        this.game.gameData.ownedPets.forEach(pet => {
            const petType = this.game.petManager.getPetTypeById(pet.type);
            if (!petType) return;

            const isOnFarm = Object.values(this.game.gameData.farmPets).some(farmPet => farmPet.id === pet.id);

            const petElement = document.createElement('div');
            petElement.className = 'inventory-pet';

            let specialClass = '';
            if (pet.isRainbow) {
                specialClass = 'pet-rainbow';
            } else if (pet.isGolden) {
                specialClass = 'pet-golden';
            }

            let iconColor = '#888';
            switch ((petType.rarity||'').toLowerCase()) {
                case 'common': iconColor = '#8BC34A'; break;
                case 'uncommon': iconColor = '#4CAF50'; break;
                case 'rare': iconColor = '#2196F3'; break;
                case 'epic': iconColor = '#9C27B0'; break;
                case 'legendary': iconColor = '#FFC107'; break;
                case 'mythical': iconColor = '#E91E63'; break;
                case 'divine': iconColor = '#00B8D4'; break;
                case 'cosmic': iconColor = '#FF5722'; break;
            }
            let iconHtml = petType.icon && petType.icon.startsWith('bi')
                ? `<i class='${petType.icon}' style='color:${iconColor};font-size:2.5rem;'></i>`
                : (() => {
                    switch ((petType.id||petType.type||'').toLowerCase()) {
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
                <div class='pet-icon d-flex justify-content-center align-items-center mb-2'>${iconHtml}</div>
                <div class='pet-name'>${petType.name}</div>
                <div class='pet-rarity'>${petType.rarity}</div>
                <div class='pet-status'>${isOnFarm ? 'On Farm' : 'In Storage'}</div>
            `;

            inventoryContainer.appendChild(petElement);
        });
    }
}
