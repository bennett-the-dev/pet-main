// Farm management system
class FarmManager {
    constructor(game) {
        this.game = game;
        this.plotCount = 6; // Default number of plots
        this.maxPlots = 10; // Maximum with expansions (6 base + 4 expansions)
        this.expansionsPurchased = 0;
        this.maxExpansions = 4;
        this.initializeFarm();
    }

    initializeFarm() {
        // Create farm grid
        const farmGrid = document.getElementById('farmGrid');
        farmGrid.innerHTML = '';

        // Create 2x5 grid layout
        for (let i = 0; i < this.maxPlots; i++) {
            const plot = document.createElement('div');
            
            if (i < this.plotCount) {
                plot.className = 'farm-plot empty';
                plot.addEventListener('click', () => this.handlePlotClick(i));
            } else {
                plot.className = 'farm-plot locked';
                plot.innerHTML = `
                    <div class="locked-content">
                        <div class="lock-icon">🔒</div>
                        <div class="lock-text">Buy Expansion</div>
                    </div>
                `;
                plot.addEventListener('click', () => this.showExpansionBuyPrompt());
            }
            
            plot.dataset.plotId = i;
            farmGrid.appendChild(plot);
        }
    }

    handlePlotClick(plotId) {
        const plot = document.querySelector(`[data-plot-id="${plotId}"]`);

        if (this.game.gameData.farmPets[plotId]) {
            // Plot has a pet - show pet info or sell option
            this.showPetOptions(plotId);
        } else {
            // Empty plot - show pet selection
            this.showPetSelection(plotId);
        }
    }

    showPetSelection(plotId) {
        // Only show pets that are not on the farm AND still exist in ownedPets (in case a pet was just sold)
        const availablePets = this.game.gameData.ownedPets.filter(pet => 
            !Object.values(this.game.gameData.farmPets).some(farmPet => farmPet.id === pet.id)
        );

        if (availablePets.length === 0) {
            this.game.showNotification('No pets available! Buy some from the store.', 'warning');
            return;
        }

        const modal = document.getElementById('petSelectionModal');
        const petList = document.getElementById('petSelectionList');

        petList.innerHTML = '';

        availablePets.forEach(pet => {
            const petInfo = this.game.petManager.getPetDisplayInfo(pet);
            if (!petInfo) return;

            const option = document.createElement('div');
            option.className = 'pet-option';

            // Render icon as a Bootstrap icon, colored by rarity
            let iconColor = '#888';
            switch ((pet.rarity||'').toLowerCase()) {
                case 'common': iconColor = '#444'; break; // dark grey
                case 'uncommon': iconColor = '#388e3c'; break; // darker green
                case 'rare': iconColor = '#2196F3'; break;
                case 'epic': iconColor = '#9C27B0'; break;
                case 'legendary': iconColor = '#FFC107'; break;
                case 'mythical': iconColor = '#E91E63'; break;
                case 'divine': iconColor = '#00B8D4'; break;
                case 'cosmic': iconColor = '#FF5722'; break;
            }
            let iconHtml = pet.icon && pet.icon.startsWith('bi')
                ? `<i class='${pet.icon}' style='color:${iconColor};font-size:2.5rem;'></i>`
                : `<i class='bi bi-question-circle' style='color:#888;font-size:2.5rem;'></i>`;
            option.innerHTML = `
                <div class='d-flex justify-content-center align-items-center mb-2'>${iconHtml}</div>
                <div>${pet.name}</div>
                <div style='font-size: 12px;'>Age: ${pet.age}</div>
            `;

            option.addEventListener('click', () => {
                this.placePet(plotId, pet);
                modal.classList.add('hidden');
            });

            petList.appendChild(option);
        });

        modal.classList.remove('hidden');
        this.selectedPlot = plotId;
    }

    placePet(plotId, pet) {
        // Remove from ownedPets when placing on the farm
        this.game.gameData.ownedPets = this.game.gameData.ownedPets.filter(p => p.id !== pet.id);
        this.game.gameData.farmPets[plotId] = pet;
        pet.placedAt = Date.now();
        pet.lastUpdate = Date.now();
        this.updateDisplay();
        if (this.game.inventoryManager && this.game.inventoryManager.updateDisplay) {
            this.game.inventoryManager.updateDisplay();
        }
        this.game.showNotification(`${this.game.petManager.getPetDisplayInfo(pet).name} placed on farm!`);
    }

    showPetOptions(plotId) {
        const pet = this.game.gameData.farmPets[plotId];
        const petInfo = this.game.petManager.getPetDisplayInfo(pet);

        if (petInfo.canSell) {
            const sell = confirm(`Sell ${petInfo.name} (Age ${petInfo.age}) for $${petInfo.value}?`);
            if (sell) {
                this.sellPet(plotId);
            }
        } else {
            this.game.showNotification(`${petInfo.name} is too young to sell (Age ${petInfo.age}/5)`, 'warning');
        }
    }

    showExpansionBuyPrompt() {
        if (this.expansionsPurchased >= this.maxExpansions) {
            this.game.showNotification('Maximum expansions reached!', 'warning');
            return;
        }

        const expansionCost = this.generateExpansionCost();
        const confirmed = confirm(`Buy farm expansion for $${expansionCost.toLocaleString()}?`);
        
        if (confirmed) {
            if (this.game.spendMoney(expansionCost)) {
                this.addExpansionSlot();
                this.game.showNotification(`Farm expanded! (${this.expansionsPurchased}/${this.maxExpansions})`);
            } else {
                this.game.showNotification('Not enough money!', 'error');
            }
        }
    }

    generateExpansionCost() {
        // Generate a consistent price per user using a seed
        if (!this.userExpansionCost) {
            // Create a simple seed from user's initial money and some constant
            const userSeed = this.game.gameData.money * 13 + 42;
            const seededRandom = (seed) => {
                const x = Math.sin(seed) * 10000;
                return x - Math.floor(x);
            };
            
            // Generate random price between 5M-45M, consistent for this user
            const rand = seededRandom(userSeed);
            const exponentialRand = Math.pow(rand, 0.4); // Makes higher values more likely
            this.userExpansionCost = Math.floor(5000000 + (exponentialRand * 40000000));
        }
        
        return this.userExpansionCost;
    }

    addExpansionSlot() {
        if (this.plotCount < this.maxPlots && this.expansionsPurchased < this.maxExpansions) {
            this.plotCount++;
            this.expansionsPurchased++;
            this.initializeFarm(); // Regenerate farm grid
            this.updateDisplay();
        }
    }

    sellPet(plotId) {
        const pet = this.game.gameData.farmPets[plotId];
        if (!pet) return;

        const petInfo = this.game.petManager.getPetDisplayInfo(pet);
        if (!petInfo.canSell) {
            this.game.showNotification('Pet too young to sell!', 'error');
            return;
        }

        this.game.addMoney(petInfo.value);
        delete this.game.gameData.farmPets[plotId];
        // Remove from ownedPets as well
        if (this.game.petManager.removePetFromOwned) {
            this.game.petManager.removePetFromOwned(pet.id);
        } else {
            this.game.gameData.ownedPets = this.game.gameData.ownedPets.filter(p => p.id !== pet.id);
        }
        this.updateDisplay();
        this.game.showNotification(`Sold ${petInfo.name} for $${petInfo.value}!`);
    }

    updatePets() {
        const currentTime = Date.now();

        Object.entries(this.game.gameData.farmPets).forEach(([plotId, pet]) => {
            if (!pet.lastUpdate) pet.lastUpdate = currentTime;

            const secondsElapsed = (currentTime - pet.lastUpdate) / 1000;
            const transformation = this.game.petManager.updatePetAge(pet, secondsElapsed);

            if (transformation) {
                const petInfo = this.game.petManager.getPetDisplayInfo(pet);
                this.game.showNotification(`${petInfo.name} became ${transformation}! 🎉`);
                this.game.audioManager.playSuccess();
            }

            pet.lastUpdate = currentTime;
        });

        // Update display if on farm screen
        if (this.game.currentScreen === 'farm') {
            this.updateDisplay();
        }
    }

    applyOfflineGrowth(offlineSeconds) {
        console.log(`Applying ${offlineSeconds} seconds of offline growth`);

        Object.values(this.game.gameData.farmPets).forEach(pet => {
            this.game.petManager.updatePetAge(pet, offlineSeconds);
        });

        if (offlineSeconds > 60) {
            this.game.showNotification(`Welcome back! Your pets grew while you were away.`);
        }
    }

    updateDisplay() {
        Object.entries(this.game.gameData.farmPets).forEach(([plotId, pet]) => {
            const plot = document.querySelector(`[data-plot-id="${plotId}"]`);
            if (!plot) return;

            const petInfo = this.game.petManager.getPetDisplayInfo(pet);
            if (!petInfo) return;

            plot.className = 'farm-plot';
            if (petInfo.isRainbow) {
                plot.classList.add('pet-rainbow');
            } else if (petInfo.isGolden) {
                plot.classList.add('pet-golden');
            }

            const petType = this.game.petManager.getPetTypeById(pet.type);
            const currentLevel = Math.floor(pet.age);
            const nextLevel = currentLevel + 1;
            const progressToNext = (pet.age - currentLevel) * 100;

            let iconColor = '#888';
            switch ((petInfo.rarity||'').toLowerCase()) {
                case 'common': iconColor = '#8BC34A'; break;
                case 'uncommon': iconColor = '#4CAF50'; break;
                case 'rare': iconColor = '#2196F3'; break;
                case 'epic': iconColor = '#9C27B0'; break;
                case 'legendary': iconColor = '#FFC107'; break;
                case 'mythical': iconColor = '#E91E63'; break;
                case 'divine': iconColor = '#00B8D4'; break;
                case 'cosmic': iconColor = '#FF5722'; break;
            }
            // Fallback for missing/placeholder icons
            let iconHtml = petInfo.icon && petInfo.icon.startsWith('bi')
                ? `<i class="${petInfo.icon}" style="color:${iconColor}"></i>`
                : `<i class="bi bi-question-circle" style="color:#888"></i>`;

            plot.innerHTML = `
                <div class="pet-sprite d-flex justify-content-center align-items-center" style="font-size:2.5rem;">${iconHtml}</div>
                <div class="pet-info">
                    Lvl ${currentLevel} | $${petInfo.value}
                </div>
                <div class="growth-bar">
                    <div class="growth-progress" style="width: ${progressToNext}%"></div>
                </div>
            `;
        });

        // Update empty plots
        for (let i = 0; i < this.plotCount; i++) {
            if (!this.game.gameData.farmPets[i]) {
                const plot = document.querySelector(`[data-plot-id="${i}"]`);
                if (plot) {
                    plot.className = 'farm-plot empty';
                    // Show a placeholder icon for empty plots
                    plot.innerHTML = `<div class="pet-sprite d-flex justify-content-center align-items-center" style="font-size:2.5rem;"><i class='bi bi-plus-circle' style='color:#bbb'></i></div>`;
                }
            }
        }
    }
}