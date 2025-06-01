// Pet inventory management system
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

            petElement.innerHTML = `
                <div class="pet-icon ${specialClass}">${petType.icon}</div>
                <div class="pet-name">${petType.name}</div>
                <div class="pet-rarity">${petType.rarity}</div>
                <div class="pet-status">${isOnFarm ? 'On Farm' : 'In Storage'}</div>
            `;

            inventoryContainer.appendChild(petElement);
        });
    }

    // Note: The placePetOnFarm method and any related functionality are removed now.
}