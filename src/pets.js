// Pet data and management
class PetManager {
    constructor() {
        this.petTypes = {
            common: {
                cat: { name: 'Cat', icon: '🐱', basePrice: 5, growthTime: 15, rarity: 'Common' },
                dog: { name: 'Dog', icon: '🐶', basePrice: 8, growthTime: 18, rarity: 'Common' },
                rabbit: { name: 'Rabbit', icon: '🐰', basePrice: 6, growthTime: 15, rarity: 'Common' },
                hamster: { name: 'Hamster', icon: '🐹', basePrice: 4, growthTime: 12, rarity: 'Common' },
                mouse: { name: 'Mouse', icon: '🐭', basePrice: 3, growthTime: 10, rarity: 'Common' },
                chicken: { name: 'Chicken', icon: '🐔', basePrice: 7, growthTime: 15, rarity: 'Common' },
                duck: { name: 'Duck', icon: '🦆', basePrice: 9, growthTime: 18, rarity: 'Common' },
                fish: { name: 'Fish', icon: '🐟', basePrice: 5, growthTime: 12, rarity: 'Common' },
                bird: { name: 'Bird', icon: '🐦', basePrice: 6, growthTime: 12, rarity: 'Common' },
                frog: { name: 'Frog', icon: '🐸', basePrice: 4, growthTime: 10, rarity: 'Common' }
            },
            uncommon: {
                fox: { name: 'Fox', icon: '🦊', basePrice: 15, growthTime: 25, rarity: 'Uncommon' },
                owl: { name: 'Owl', icon: '🦉', basePrice: 18, growthTime: 30, rarity: 'Uncommon' },
                pig: { name: 'Pig', icon: '🐷', basePrice: 12, growthTime: 22, rarity: 'Uncommon' },
                bear: { name: 'Bear', icon: '🐻', basePrice: 20, growthTime: 35, rarity: 'Uncommon' },
                panda: { name: 'Panda', icon: '🐼', basePrice: 25, growthTime: 40, rarity: 'Uncommon' },
                koala: { name: 'Koala', icon: '🐨', basePrice: 22, growthTime: 35, rarity: 'Uncommon' },
                monkey: { name: 'Monkey', icon: '🐵', basePrice: 17, growthTime: 30, rarity: 'Uncommon' },
                cow: { name: 'Cow', icon: '🐄', basePrice: 16, growthTime: 25, rarity: 'Uncommon' },
                horse: { name: 'Horse', icon: '🐴', basePrice: 24, growthTime: 40, rarity: 'Uncommon' },
                sheep: { name: 'Sheep', icon: '🐑', basePrice: 14, growthTime: 25, rarity: 'Uncommon' },
                goat: { name: 'Goat', icon: '🐐', basePrice: 13, growthTime: 22, rarity: 'Uncommon' },
                turtle: { name: 'Turtle', icon: '🐢', basePrice: 19, growthTime: 30, rarity: 'Uncommon' }
            },
            rare: {
                lion: { name: 'Lion', icon: '🦁', basePrice: 100, growthTime: 90, rarity: 'Rare' },
                tiger: { name: 'Tiger', icon: '🐯', basePrice: 120, growthTime: 105, rarity: 'Rare' },
                wolf: { name: 'Wolf', icon: '🐺', basePrice: 90, growthTime: 80, rarity: 'Rare' },
                elephant: { name: 'Elephant', icon: '🐘', basePrice: 150, growthTime: 120, rarity: 'Rare' },
                giraffe: { name: 'Giraffe', icon: '🦒', basePrice: 130, growthTime: 110, rarity: 'Rare' },
                zebra: { name: 'Zebra', icon: '🦓', basePrice: 110, growthTime: 95, rarity: 'Rare' },
                rhino: { name: 'Rhino', icon: '🦏', basePrice: 160, growthTime: 125, rarity: 'Rare' },
                hippo: { name: 'Hippo', icon: '🦛', basePrice: 140, growthTime: 115, rarity: 'Rare' },
                leopard: { name: 'Leopard', icon: '🐆', basePrice: 105, growthTime: 90, rarity: 'Rare' },
                cheetah: { name: 'Cheetah', icon: '🐆', basePrice: 115, growthTime: 100, rarity: 'Rare' },
                camel: { name: 'Camel', icon: '🐪', basePrice: 95, growthTime: 85, rarity: 'Rare' },
                deer: { name: 'Deer', icon: '🦌', basePrice: 85, growthTime: 75, rarity: 'Rare' },
                kangaroo: { name: 'Kangaroo', icon: '🦘', basePrice: 125, growthTime: 105, rarity: 'Rare' },
                eagle: { name: 'Eagle', icon: '🦅', basePrice: 135, growthTime: 110, rarity: 'Rare' },
                shark: { name: 'Shark', icon: '🦈', basePrice: 155, growthTime: 120, rarity: 'Rare' }
            },
            epic: {
                dragon: { name: 'Dragon', icon: '🐲', basePrice: 1000, growthTime: 180, rarity: 'Epic' },
                unicorn: { name: 'Unicorn', icon: '🦄', basePrice: 1500, growthTime: 180, rarity: 'Epic' },
                phoenix: { name: 'Phoenix', icon: '🔥', basePrice: 2000, growthTime: 180, rarity: 'Epic' },
                griffin: { name: 'Griffin', icon: '🦅', basePrice: 1200, growthTime: 180, rarity: 'Epic' },
                pegasus: { name: 'Pegasus', icon: '🐴', basePrice: 1800, growthTime: 180, rarity: 'Epic' },
                kraken: { name: 'Kraken', icon: '🐙', basePrice: 2500, growthTime: 180, rarity: 'Epic' },
                sphinx: { name: 'Sphinx', icon: '🦁', basePrice: 1300, growthTime: 180, rarity: 'Epic' },
                cerberus: { name: 'Cerberus', icon: '🐺', basePrice: 1100, growthTime: 180, rarity: 'Epic' },
                hydra: { name: 'Hydra', icon: '🐍', basePrice: 2200, growthTime: 180, rarity: 'Epic' },
                basilisk: { name: 'Basilisk', icon: '🐍', basePrice: 1700, growthTime: 180, rarity: 'Epic' }
            },
            legendary: {
                crystal: { name: 'Crystal Beast', icon: '💎', basePrice: 10000, growthTime: 270, rarity: 'Legendary' },
                void: { name: 'Void Walker', icon: '🌌', basePrice: 15000, growthTime: 270, rarity: 'Legendary' },
                cosmic: { name: 'Cosmic Entity', icon: '🌟', basePrice: 25000, growthTime: 270, rarity: 'Legendary' },
                shadow: { name: 'Shadow Lord', icon: '👻', basePrice: 20000, growthTime: 270, rarity: 'Legendary' },
                time: { name: 'Time Keeper', icon: '⏰', basePrice: 35000, growthTime: 270, rarity: 'Legendary' },
                chaos: { name: 'Chaos Spawn', icon: '🌀', basePrice: 30000, growthTime: 270, rarity: 'Legendary' },
                light: { name: 'Light Bearer', icon: '☀️', basePrice: 50000, growthTime: 270, rarity: 'Legendary' },
                dark: { name: 'Dark Essence', icon: '🖤', basePrice: 45000, growthTime: 270, rarity: 'Legendary' },
                ancient: { name: 'Ancient One', icon: '👑', basePrice: 75000, growthTime: 270, rarity: 'Legendary' },
                divine: { name: 'Divine Spirit', icon: '✨', basePrice: 100000, growthTime: 270, rarity: 'Legendary' }
            },
            mythical: {
                omnipotent: { name: 'Omnipotent Being', icon: '🌌', basePrice: 1000000, growthTime: 300, rarity: 'Mythical' },
                transcendent: { name: 'Transcendent Soul', icon: '👁️', basePrice: 165, growthTime: 15, rarity: 'Mythical' },
                primordial: { name: 'Primordial Force', icon: '💫', basePrice: 5000000, growthTime: 290, rarity: 'Mythical' },
                eternal: { name: 'Eternal Essence', icon: '♾️', basePrice: 7500000, growthTime: 310, rarity: 'Mythical' },
                absolute: { name: 'Absolute Zero', icon: '❄️', basePrice: 10000000, growthTime: 320, rarity: 'Mythical' }
            },
            divine: {
                seraph: { name: 'Seraph Guardian', icon: '😇', basePrice: 15000000, growthTime: 320, rarity: 'Divine' },
                archangel: { name: 'Archangel', icon: '👼', basePrice: 25000000, growthTime: 325, rarity: 'Divine' },
                cherub: { name: 'Cherub Lord', icon: '👶', basePrice: 40000000, growthTime: 328, rarity: 'Divine' },
                throne: { name: 'Throne Bearer', icon: '👑', basePrice: 60000000, growthTime: 329, rarity: 'Divine' },
                dominion: { name: 'Dominion Master', icon: '⚡', basePrice: 80000000, growthTime: 329, rarity: 'Divine' },
                virtue: { name: 'Virtue Spirit', icon: '✨', basePrice: 100000000, growthTime: 330, rarity: 'Divine' }
            },
            cosmic: {
                nebula: { name: 'Nebula Entity', icon: '🌌', basePrice: 250000000, growthTime: 330, rarity: 'Cosmic' },
                quasar: { name: 'Quasar Being', icon: '💫', basePrice: 500000000, growthTime: 330, rarity: 'Cosmic' },
                pulsar: { name: 'Pulsar Lord', icon: '⭐', basePrice: 750000000, growthTime: 330, rarity: 'Cosmic' },
                blackhole: { name: 'Black Hole', icon: '⚫', basePrice: 1000000000, growthTime: 330, rarity: 'Cosmic' },
                galaxy: { name: 'Galaxy Core', icon: '🌠', basePrice: 1250000000, growthTime: 330, rarity: 'Cosmic' },
                universe: { name: 'Universe Seed', icon: '🌐', basePrice: 1500000000, growthTime: 330, rarity: 'Cosmic' }
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
