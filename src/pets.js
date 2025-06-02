class PetManager {
    constructor() {
        this.petTypes = {
            common: {
                cat: { name: 'Cat', icon: 'bi bi-emoji-smile', basePrice: 5, growthTime: 15, rarity: 'Common' },
                dog: { name: 'Dog', icon: 'bi bi-emoji-laughing', basePrice: 8, growthTime: 15, rarity: 'Common' },
                rabbit: { name: 'Rabbit', icon: 'bi bi-bug', basePrice: 6, growthTime: 15, rarity: 'Common' },
                hamster: { name: 'Hamster', icon: 'bi bi-emoji-smile', basePrice: 4, growthTime: 15, rarity: 'Common' },
                mouse: { name: 'Mouse', icon: 'bi bi-mouse', basePrice: 3, growthTime: 15, rarity: 'Common' },
                chicken: { name: 'Chicken', icon: 'bi bi-egg-fried', basePrice: 7, growthTime: 15, rarity: 'Common' },
                duck: { name: 'Duck', icon: 'bi bi-water', basePrice: 9, growthTime: 15, rarity: 'Common' },
                fish: { name: 'Fish', icon: 'bi bi-fish', basePrice: 5, growthTime: 15, rarity: 'Common' },
                bird: { name: 'Bird', icon: 'bi bi-journal-richtext', basePrice: 6, growthTime: 15, rarity: 'Common' },
                frog: { name: 'Frog', icon: 'bi bi-emoji-smile-upside-down', basePrice: 4, growthTime: 15, rarity: 'Common' }
            },
            uncommon: {
                fox: { name: 'Fox', icon: 'bi bi-patch-question', basePrice: 15, growthTime: 25, rarity: 'Uncommon' },
                owl: { name: 'Owl', icon: 'bi bi-journal', basePrice: 18, growthTime: 25, rarity: 'Uncommon' },
                pig: { name: 'Pig', icon: 'bi bi-basket', basePrice: 12, growthTime: 25, rarity: 'Uncommon' },
                bear: { name: 'Bear', icon: 'bi bi-patch-exclamation', basePrice: 20, growthTime: 25, rarity: 'Uncommon' },
                panda: { name: 'Panda', icon: 'bi bi-emoji-heart-eyes', basePrice: 25, growthTime: 25, rarity: 'Uncommon' },
                koala: { name: 'Koala', icon: 'bi bi-emoji-smile', basePrice: 22, growthTime: 25, rarity: 'Uncommon' },
                monkey: { name: 'Monkey', icon: 'bi bi-emoji-laughing', basePrice: 17, growthTime: 25, rarity: 'Uncommon' },
                cow: { name: 'Cow', icon: 'bi bi-cup', basePrice: 16, growthTime: 25, rarity: 'Uncommon' },
                horse: { name: 'Horse', icon: 'bi bi-bicycle', basePrice: 24, growthTime: 25, rarity: 'Uncommon' },
                sheep: { name: 'Sheep', icon: 'bi bi-brush', basePrice: 14, growthTime: 25, rarity: 'Uncommon' },
                goat: { name: 'Goat', icon: 'bi bi-broadcast', basePrice: 13, growthTime: 25, rarity: 'Uncommon' },
                turtle: { name: 'Turtle', icon: 'bi bi-egg', basePrice: 19, growthTime: 25, rarity: 'Uncommon' }
            },
            rare: {
                lion: { name: 'Lion', icon: 'bi bi-stars', basePrice: 100, growthTime: 25, rarity: 'Rare' },
                tiger: { name: 'Tiger', icon: 'bi bi-star', basePrice: 120, growthTime: 25, rarity: 'Rare' },
                wolf: { name: 'Wolf', icon: 'bi bi-moon', basePrice: 90, growthTime: 25, rarity: 'Rare' },
                elephant: { name: 'Elephant', icon: 'bi bi-bullseye', basePrice: 150, growthTime: 25, rarity: 'Rare' },
                giraffe: { name: 'Giraffe', icon: 'bi bi-tree', basePrice: 130, growthTime: 25, rarity: 'Rare' },
                zebra: { name: 'Zebra', icon: 'bi bi-list', basePrice: 110, growthTime: 25, rarity: 'Rare' },
                rhino: { name: 'Rhino', icon: 'bi bi-hammer', basePrice: 160, growthTime: 25, rarity: 'Rare' },
                hippo: { name: 'Hippo', icon: 'bi bi-droplet', basePrice: 140, growthTime: 25, rarity: 'Rare' },
                leopard: { name: 'Leopard', icon: 'bi bi-patch-check', basePrice: 105, growthTime: 25, rarity: 'Rare' },
                cheetah: { name: 'Cheetah', icon: 'bi bi-lightning-charge', basePrice: 115, growthTime: 25, rarity: 'Rare' },
                camel: { name: 'Camel', icon: 'bi bi-sun', basePrice: 95, growthTime: 25, rarity: 'Rare' },
                deer: { name: 'Deer', icon: 'bi bi-heart', basePrice: 85, growthTime: 25, rarity: 'Rare' },
                kangaroo: { name: 'Kangaroo', icon: 'bi bi-arrow-up-right', basePrice: 125, growthTime: 25, rarity: 'Rare' },
                eagle: { name: 'Eagle', icon: 'bi bi-airplane', basePrice: 135, growthTime: 25, rarity: 'Rare' },
                shark: { name: 'Shark', icon: 'bi bi-triangle', basePrice: 155, growthTime: 25, rarity: 'Rare' }
            },
            epic: {
                dragon: { name: 'Dragon', icon: 'bi bi-fire', basePrice: 1000, growthTime: 40, rarity: 'Epic' },
                unicorn: { name: 'Unicorn', icon: 'bi bi-stars', basePrice: 1500, growthTime: 40, rarity: 'Epic' },
                phoenix: { name: 'Phoenix', icon: 'bi bi-lightning-charge', basePrice: 2000, growthTime: 40, rarity: 'Epic' },
                griffin: { name: 'Griffin', icon: 'bi bi-flag', basePrice: 1200, growthTime: 40, rarity: 'Epic' },
                pegasus: { name: 'Pegasus', icon: 'bi bi-wind', basePrice: 1800, growthTime: 40, rarity: 'Epic' },
                kraken: { name: 'Kraken', icon: 'bi bi-octagon', basePrice: 2500, growthTime: 40, rarity: 'Epic' },
                sphinx: { name: 'Sphinx', icon: 'bi bi-puzzle', basePrice: 1300, growthTime: 40, rarity: 'Epic' },
                cerberus: { name: 'Cerberus', icon: 'bi bi-shield', basePrice: 1100, growthTime: 40, rarity: 'Epic' },
                hydra: { name: 'Hydra', icon: 'bi bi-droplet', basePrice: 2200, growthTime: 40, rarity: 'Epic' },
                basilisk: { name: 'Basilisk', icon: 'bi bi-eye', basePrice: 1700, growthTime: 40, rarity: 'Epic' }
            },
            legendary: {
                crystal: { name: 'Crystal Beast', icon: 'bi bi-gem', basePrice: 10000, growthTime: 60, rarity: 'Legendary' },
                void: { name: 'Void Walker', icon: 'bi bi-stars', basePrice: 15000, growthTime: 60, rarity: 'Legendary' },
                cosmic: { name: 'Cosmic Entity', icon: 'bi bi-globe', basePrice: 25000, growthTime: 60, rarity: 'Legendary' },
                shadow: { name: 'Shadow Lord', icon: 'bi bi-moon-stars', basePrice: 20000, growthTime: 60, rarity: 'Legendary' },
                time: { name: 'Time Keeper', icon: 'bi bi-clock', basePrice: 35000, growthTime: 60, rarity: 'Legendary' },
                chaos: { name: 'Chaos Spawn', icon: 'bi bi-arrow-repeat', basePrice: 30000, growthTime: 60, rarity: 'Legendary' },
                light: { name: 'Light Bearer', icon: 'bi bi-sun', basePrice: 50000, growthTime: 60, rarity: 'Legendary' },
                dark: { name: 'Dark Essence', icon: 'bi bi-moon', basePrice: 45000, growthTime: 60, rarity: 'Legendary' },
                ancient: { name: 'Ancient One', icon: 'bi bi-hourglass-split', basePrice: 75000, growthTime: 60, rarity: 'Legendary' },
                divine: { name: 'Divine Spirit', icon: 'bi bi-gem', basePrice: 100000, growthTime: 60, rarity: 'Legendary' }
            },
            mythical: {
                omnipotent: { name: 'Omnipotent Being', icon: 'bi bi-globe2', basePrice: 1000000, growthTime: 80, rarity: 'Mythical' },
                transcendent: { name: 'Transcendent Soul', icon: 'bi bi-eye', basePrice: 2500000, growthTime: 80, rarity: 'Mythical' },
                primordial: { name: 'Primordial Force', icon: 'bi bi-cloud-lightning', basePrice: 5000000, growthTime: 80, rarity: 'Mythical' },
                eternal: { name: 'Eternal Essence', icon: 'bi bi-infinity', basePrice: 7500000, growthTime: 80, rarity: 'Mythical' },
                absolute: { name: 'Absolute Zero', icon: 'bi bi-snow', basePrice: 10000000, growthTime: 80, rarity: 'Mythical' }
            },
            divine: {
                seraph: { name: 'Seraph Guardian', icon: 'bi bi-star', basePrice: 15000000, growthTime: 105, rarity: 'Divine' },
                archangel: { name: 'Angel', icon: 'bi bi-sun', basePrice: 25000000, growthTime: 105, rarity: 'Divine' },
                cherub: { name: 'Cherub Lord', icon: 'bi bi-person', basePrice: 40000000, growthTime: 105, rarity: 'Divine' },
                throne: { name: 'Throne Bearer', icon: 'bi bi-gem', basePrice: 60000000, growthTime: 105, rarity: 'Divine' },
                dominion: { name: 'Dominion Master', icon: 'bi bi-lightning-charge', basePrice: 80000000, growthTime: 105, rarity: 'Divine' },
                virtue: { name: 'Virtue Spirit', icon: 'bi bi-stars', basePrice: 100000000, growthTime: 105, rarity: 'Divine' }
            },
            cosmic: {
                nebula: { name: 'Nebula Entity', icon: 'bi bi-globe2', basePrice: 250000000, growthTime: 130, rarity: 'Cosmic' },
                quasar: { name: 'Quasar Being', icon: 'bi bi-stars', basePrice: 500000000, growthTime: 130, rarity: 'Cosmic' },
                pulsar: { name: 'Pulsar Lord', icon: 'bi bi-lightning-charge', basePrice: 750000000, growthTime: 130, rarity: 'Cosmic' },
                blackhole: { name: 'Black Hole', icon: 'bi bi-circle-fill', basePrice: 1000000000, growthTime: 130, rarity: 'Cosmic' },
                galaxy: { name: 'Galaxy Core', icon: 'bi bi-stars', basePrice: 1250000000, growthTime: 130, rarity: 'Cosmic' },
                universe: { name: 'Universe Seed', icon: 'bi bi-globe', basePrice: 1500000000, growthTime: 130, rarity: 'Cosmic' }
            }
        };
    }
    
    getAllPetTypes() {
        const allTypes = [];
        Object.values(this.petTypes).forEach(rarityGroup => {
            Object.entries(rarityGroup).forEach(([key, pet]) => {
                allTypes.push({ ...pet, id: key });
            });
        });
        return allTypes;
    }
    
    getPetTypeById(id) {
        for (const rarityGroup of Object.values(this.petTypes)) {
            if (rarityGroup[id]) {
                return { ...rarityGroup[id], id };
            }
        }
        return null;
    }
    
    createPet(typeId) {
        const petType = this.getPetTypeById(typeId);
        if (!petType) return null;
        
        return {
            id: this.generateId(),
            type: typeId,
            age: 0,
            isGolden: false,
            isRainbow: false,
            placedAt: Date.now(),
            lastUpdate: Date.now(),
            buffs: {
                foodMultiplier: 1,
                speedMultiplier: 1
            }
        };
    }
    
    calculatePetValue(pet) {
        const petType = this.getPetTypeById(pet.type);
        if (!petType) return 0;
        
        let baseValue = petType.basePrice;
        
        // Age additive bonus (adds value per year instead of multiplying)
        if (pet.age >= 5) {
            baseValue += petType.basePrice * 0.3 * (pet.age - 4); // 30% of base price per year after maturity
        } else {
            baseValue *= 0.5; // Young pets are worth less
        }
        
        // Apply food buffs
        if (pet.buffs && pet.buffs.foodMultiplier) {
            baseValue *= pet.buffs.foodMultiplier;
        }
        
        // Special transformations
        if (pet.isRainbow) {
            baseValue *= 150;
        } else if (pet.isGolden) {
            baseValue *= 50;
        }
        
        return Math.floor(baseValue);
    }
    
    updatePetAge(pet, secondsElapsed) {
        const petType = this.getPetTypeById(pet.type);
        if (!petType) return;
        
        // Initialize buffs if not present
        if (!pet.buffs) {
            pet.buffs = { foodMultiplier: 1, speedMultiplier: 1 };
        }
        
        // Apply speed buffs to growth
        const buffedSecondsElapsed = secondsElapsed * (pet.buffs.speedMultiplier || 1);
        
        // Make all pets grow 5x faster (1/5th the time)
        const currentYear = Math.floor(pet.age);
        const agingSlowdown = Math.pow(1.5, currentYear);
        const adjustedGrowthTime = (petType.growthTime * agingSlowdown) * 0.2; // 1/5th the time
        const ageGrowthRate = 1 / adjustedGrowthTime;
        const ageIncrease = buffedSecondsElapsed * ageGrowthRate;
        pet.age += ageIncrease;
        
        // Check for transformations (only if not already transformed)
        if (!pet.isRainbow && !pet.isGolden) {
            // Rainbow transformation (rarer, but better)
            if (Math.random() < (secondsElapsed / 60) / 750) {
                pet.isRainbow = true;
                return 'rainbow';
            }
            // Golden transformation
            else if (Math.random() < (secondsElapsed / 60) / 250) {
                pet.isGolden = true;
                return 'golden';
            }
        }
        
        return null; // No transformation
    }
    
    getPetDisplayInfo(pet) {
        const petType = this.getPetTypeById(pet.type);
        if (!petType) return null;
        
        let icon = petType.icon;
        let name = petType.name;
        
        if (pet.isRainbow) {
            name = `🌈 ${name}`;
        } else if (pet.isGolden) {
            name = `✨ ${name}`;
        }
        
        return {
            icon,
            name,
            age: Math.floor(pet.age),
            value: this.calculatePetValue(pet),
            canSell: pet.age >= 5,
            rarity: petType.rarity,
            isGolden: pet.isGolden,
            isRainbow: pet.isRainbow
        };
    }
    
    // Remove pet from ownedPets by id
    removePetFromOwned(petId) {
        this.game.gameData.ownedPets = this.game.gameData.ownedPets.filter(p => p.id !== petId);
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}
