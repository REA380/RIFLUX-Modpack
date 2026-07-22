// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║              RIFLUX ADVANCED CLASS SYSTEM (v2.0)                          ║
// ║         6 Unique Classes | Specializations | Skill Trees                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const AdvancedClassSystem = {
  // Configuration for all classes
  CLASSES: {
    WARRIOR: {
      name: 'Warrior',
      color: '#FF6B6B',
      description: '⚔️ Master of melee combat and physical strength',
      icon: '🗡️',
      
      // Base multipliers
      stats: {
        health: 1.5,
        damage: 1.8,
        defense: 1.3,
        speed: 0.9,
        mana: 0.5,
        luck: 1.0
      },
      
      // Experience gain modifier
      expModifier: 1.2,
      
      // Special abilities
      abilities: [
        {
          id: 'power_strike',
          name: 'Power Strike',
          description: 'Deal 2x damage with next hit',
          cooldown: 10,
          manaCost: 20,
          requiredLevel: 1
        },
        {
          id: 'whirlwind',
          name: 'Whirlwind Attack',
          description: 'Hit all nearby enemies',
          cooldown: 20,
          manaCost: 40,
          requiredLevel: 10
        },
        {
          id: 'shield_bash',
          name: 'Shield Bash',
          description: 'Stun enemies around you',
          cooldown: 15,
          manaCost: 30,
          requiredLevel: 20
        },
        {
          id: 'last_stand',
          name: 'Last Stand',
          description: 'Reduce damage taken by 50% for 10 seconds',
          cooldown: 30,
          manaCost: 50,
          requiredLevel: 50
        }
      ],
      
      // Armor & equipment bonuses
      equipmentBonus: {
        sword: 0.3,
        axe: 0.4,
        shield: 0.35,
        plateArmor: 0.25
      },
      
      // Passive skills
      passives: [
        { name: 'Iron Skin', bonus: '+2% defense per level' },
        { name: 'Fury', bonus: '+1% damage per level' },
        { name: 'Berserker', bonus: '+3% damage when health < 50%' }
      ]
    },
    
    MAGE: {
      name: 'Mage',
      color: '#4ECDC4',
      description: '✨ Master of arcane magic and spellcasting',
      icon: '🧙',
      
      stats: {
        health: 0.8,
        damage: 1.0,
        defense: 0.6,
        speed: 1.1,
        mana: 2.5,
        luck: 1.2
      },
      
      expModifier: 1.1,
      
      abilities: [
        {
          id: 'fireball',
          name: 'Fireball',
          description: 'Launch a fireball dealing AoE damage',
          cooldown: 8,
          manaCost: 50,
          requiredLevel: 1
        },
        {
          id: 'frost_nova',
          name: 'Frost Nova',
          description: 'Freeze enemies in place',
          cooldown: 12,
          manaCost: 45,
          requiredLevel: 5
        },
        {
          id: 'teleport',
          name: 'Teleport',
          description: 'Instantly move to target location',
          cooldown: 10,
          manaCost: 60,
          requiredLevel: 15
        },
        {
          id: 'meteor_storm',
          name: 'Meteor Storm',
          description: 'Call down meteors on enemies',
          cooldown: 40,
          manaCost: 150,
          requiredLevel: 60
        }
      ],
      
      equipmentBonus: {
        staff: 0.5,
        wand: 0.4,
        spellbook: 0.45,
        clothArmor: 0.15
      },
      
      passives: [
        { name: 'Mana Regeneration', bonus: '+5% mana regen per level' },
        { name: 'Spell Power', bonus: '+2% spell damage per level' },
        { name: 'Arcane Mastery', bonus: '+1% spell cooldown reduction per level' }
      ]
    },
    
    ARCHER: {
      name: 'Archer',
      color: '#95E1D3',
      description: '🏹 Swift and deadly with bow and arrow',
      icon: '🏹',
      
      stats: {
        health: 1.0,
        damage: 1.4,
        defense: 0.9,
        speed: 1.4,
        mana: 0.8,
        luck: 1.3
      },
      
      expModifier: 1.15,
      
      abilities: [
        {
          id: 'power_shot',
          name: 'Power Shot',
          description: 'Fire an arrow with 3x damage',
          cooldown: 6,
          manaCost: 25,
          requiredLevel: 1
        },
        {
          id: 'multi_shot',
          name: 'Multi Shot',
          description: 'Fire multiple arrows at once',
          cooldown: 10,
          manaCost: 35,
          requiredLevel: 8
        },
        {
          id: 'rain_arrows',
          name: 'Rain of Arrows',
          description: 'Rain arrows on a large area',
          cooldown: 15,
          manaCost: 50,
          requiredLevel: 20
        },
        {
          id: 'headshot',
          name: 'Headshot',
          description: 'Deal critical damage to single target',
          cooldown: 12,
          manaCost: 40,
          requiredLevel: 40
        }
      ],
      
      equipmentBonus: {
        bow: 0.6,
        arrow: 0.2,
        leather: 0.2,
        quiver: 0.3
      },
      
      passives: [
        { name: 'Critical Strike', bonus: '+2% crit chance per level' },
        { name: 'Swift Feet', bonus: '+3% movement speed per level' },
        { name: 'Precise Aim', bonus: '+1% accuracy per level' }
      ]
    },
    
    ROGUE: {
      name: 'Rogue',
      color: '#AA96DA',
      description: '🗡️ Master of stealth and assassination',
      icon: '🗡️',
      
      stats: {
        health: 1.1,
        damage: 1.5,
        defense: 0.7,
        speed: 1.6,
        mana: 0.6,
        luck: 1.5
      },
      
      expModifier: 1.25,
      
      abilities: [
        {
          id: 'backstab',
          name: 'Backstab',
          description: 'Deal critical damage from behind',
          cooldown: 8,
          manaCost: 15,
          requiredLevel: 1
        },
        {
          id: 'shadow_clone',
          name: 'Shadow Clone',
          description: 'Create a decoy to confuse enemies',
          cooldown: 12,
          manaCost: 30,
          requiredLevel: 10
        },
        {
          id: 'poison_strike',
          name: 'Poison Strike',
          description: 'Apply poison to your blade',
          cooldown: 10,
          manaCost: 25,
          requiredLevel: 15
        },
        {
          id: 'vanish',
          name: 'Vanish',
          description: 'Become invisible temporarily',
          cooldown: 20,
          manaCost: 45,
          requiredLevel: 35
        }
      ],
      
      equipmentBonus: {
        dagger: 0.5,
        shortSword: 0.4,
        leatherArmor: 0.3,
        cloak: 0.35
      },
      
      passives: [
        { name: 'Evasion', bonus: '+2% dodge chance per level' },
        { name: 'Shadow Step', bonus: '+4% movement speed per level' },
        { name: 'Assassination', bonus: '+3% backstab damage per level' }
      ]
    },
    
    PALADIN: {
      name: 'Paladin',
      color: '#FCBAD3',
      description: '✨ Holy warrior combining magic and melee',
      icon: '⚔️',
      
      stats: {
        health: 1.4,
        damage: 1.2,
        defense: 1.6,
        speed: 0.95,
        mana: 1.2,
        luck: 1.1
      },
      
      expModifier: 1.1,
      
      abilities: [
        {
          id: 'holy_strike',
          name: 'Holy Strike',
          description: 'Deal holy damage and heal',
          cooldown: 8,
          manaCost: 30,
          requiredLevel: 1
        },
        {
          id: 'divine_shield',
          name: 'Divine Shield',
          description: 'Shield yourself and allies',
          cooldown: 15,
          manaCost: 50,
          requiredLevel: 5
        },
        {
          id: 'healing_aura',
          name: 'Healing Aura',
          description: 'Heal nearby allies',
          cooldown: 12,
          manaCost: 40,
          requiredLevel: 10
        },
        {
          id: 'judgment',
          name: 'Judgment',
          description: 'Deal massive holy damage',
          cooldown: 25,
          manaCost: 80,
          requiredLevel: 50
        }
      ],
      
      equipmentBonus: {
        mace: 0.35,
        hammer: 0.4,
        plateArmor: 0.35,
        shield: 0.4
      },
      
      passives: [
        { name: 'Holy Protection', bonus: '+3% defense per level' },
        { name: 'Redemption', bonus: '+2% health regen per level' },
        { name: 'Divine Blessing', bonus: '+1% healing received per level' }
      ]
    },
    
    DRUID: {
      name: 'Druid',
      color: '#A8D8EA',
      description: '🌿 Master of nature magic and transformation',
      icon: '🌿',
      
      stats: {
        health: 1.2,
        damage: 1.0,
        defense: 1.0,
        speed: 1.1,
        mana: 1.8,
        luck: 1.2
      },
      
      expModifier: 1.15,
      
      abilities: [
        {
          id: 'nature_bolt',
          name: 'Nature Bolt',
          description: 'Strike with nature energy',
          cooldown: 7,
          manaCost: 35,
          requiredLevel: 1
        },
        {
          id: 'entangle',
          name: 'Entangle',
          description: 'Bind enemies with vines',
          cooldown: 10,
          manaCost: 40,
          requiredLevel: 8
        },
        {
          id: 'forest_regeneration',
          name: 'Forest Regeneration',
          description: 'Heal over time in nature',
          cooldown: 15,
          manaCost: 50,
          requiredLevel: 15
        },
        {
          id: 'animal_form',
          name: 'Animal Form',
          description: 'Transform into a bear or wolf',
          cooldown: 20,
          manaCost: 70,
          requiredLevel: 40
        }
      ],
      
      equipmentBonus: {
        staff: 0.4,
        dagger: 0.25,
        leatherArmor: 0.3,
        boots: 0.25
      },
      
      passives: [
        { name: 'Nature Affinity', bonus: '+2% nature damage per level' },
        { name: 'Regeneration', bonus: '+3% health regen per level' },
        { name: 'Resilience', bonus: '+2% damage reduction per level' }
      ]
    }
  },
  
  // Player class data
  playerClasses: {},
  
  // Initialize class for player
  initializeClass(player, className) {
    const playerName = player.username;
    const classConfig = this.CLASSES[className.toUpperCase()];
    
    if (!classConfig) {
      player.tell('§c❌ Class not found!');
      return false;
    }
    
    if (this.playerClasses[playerName]) {
      player.tell('§c❌ You already have a class!');
      return false;
    }
    
    this.playerClasses[playerName] = {
      name: className.toUpperCase(),
      level: 1,
      experience: 0,
      
      // Stats
      stats: { ...classConfig.stats },
      
      // Abilities
      abilities: classConfig.abilities.map(ability => ({
        ...ability,
        cooldownUntil: 0,
        usedCount: 0
      })),
      
      // Inventory
      spellbook: [],
      equipment: {},
      
      // Progress
      skillPoints: 0,
      passiveBonuses: {}
    };
    
    player.tell('§f');
    player.tell('§6╔════════════════════════════════════════════════╗');
    player.tell(`§6║ §a✓ Class Selected: §b${classConfig.name}§a!§6        ║`);
    player.tell('§6╠════════════════════════════════════════════════╣');
    player.tell(`§6║ §e${classConfig.description}§6`);
    player.tell('§6║ §7────────────────────────────────────────────§6');
    player.tell('§6║ §aBase Stats:');
    Object.entries(classConfig.stats).forEach(([stat, value]) => {
      player.tell(`§6║   §e${stat.toUpperCase()}: §f${(value * 100).toFixed(0)}%§6`);
    });
    player.tell('§6║ §7────────────────────────────────────────────§6');
    player.tell(`§6║ §aExp Gain Modifier: §f${classConfig.expModifier}x§6`);
    player.tell('§6╚════════════════════════════════════════════════╝');
    player.tell('§f');
    
    return true;
  },
  
  // Get player class
  getPlayerClass(playerName) {
    return this.playerClasses[playerName] || null;
  },
  
  // Get class info
  getClassInfo(className) {
    return this.CLASSES[className.toUpperCase()] || null;
  },
  
  // Learn ability
  learnAbility(player, abilityId) {
    const playerName = player.username;
    const playerClass = this.playerClasses[playerName];
    
    if (!playerClass) {
      player.tell('§c❌ You must choose a class first!');
      return false;
    }
    
    const ability = playerClass.abilities.find(a => a.id === abilityId);
    
    if (!ability) {
      player.tell('§c❌ Ability not found!');
      return false;
    }
    
    if (playerClass.level < ability.requiredLevel) {
      player.tell(`§c❌ Requires level ${ability.requiredLevel}! You are level ${playerClass.level}`);
      return false;
    }
    
    if (playerClass.spellbook.includes(abilityId)) {
      player.tell('§c❌ You already know this ability!');
      return false;
    }
    
    playerClass.spellbook.push(abilityId);
    
    player.tell(`§a✓ Learned ability: §b${ability.name}§a!`);
    player.tell(`§7Description: ${ability.description}`);
    player.tell(`§7Mana Cost: §c${ability.manaCost}§7 | Cooldown: §c${ability.cooldown}s`);
    
    return true;
  },
  
  // Display class info
  displayClassInfo(player) {
    const playerName = player.username;
    const playerClass = this.playerClasses[playerName];
    
    if (!playerClass) {
      player.tell('§c❌ No class selected!');
      return;
    }
    
    const classConfig = this.CLASSES[playerClass.name];
    
    player.tell('§f');
    player.tell('§b╔════════════════════════════════════════════════╗');
    player.tell(`§b║ §e${classConfig.icon} ${playerClass.name}§b - Level ${playerClass.level}§e${classConfig.icon}§b        ║`);
    player.tell('§b╠════════════════════════════════════════════════╣');
    player.tell('§b║ §aStats:');
    Object.entries(playerClass.stats).forEach(([stat, value]) => {
      player.tell(`§b║   §e${stat.toUpperCase()}: §f${(value * 100).toFixed(0)}%§b`);
    });
    player.tell('§b╠════════════════════════════════════════════════╣');
    player.tell(`§b║ §aAbilities Known: §f${playerClass.spellbook.length}§b`);
    playerClass.spellbook.forEach(abilityId => {
      const ability = playerClass.abilities.find(a => a.id === abilityId);
      if (ability) {
        player.tell(`§b║   §e${ability.name} (Lvl. ${ability.requiredLevel})§b`);
      }
    });
    player.tell('§b║ §a────────────────────────────────────────────');
    player.tell('§b║ §aPassive Skills:');
    classConfig.passives.forEach(passive => {
      player.tell(`§b║   §e${passive.name}: ${passive.bonus}§b`);
    });
    player.tell('§b╚════════════════════════════════════════════════╝');
    player.tell('§f');
  },
  
  // Display all classes
  displayAllClasses(player) {
    player.tell('§f');
    player.tell('§6╔════════════════════════════════════════════════╗');
    player.tell('§6║ §e            AVAILABLE CLASSES§6             ║');
    player.tell('§6╠════════════════════════════════════════════════╣');
    
    Object.entries(this.CLASSES).forEach(([key, classConfig]) => {
      player.tell(`§6║ §e${classConfig.icon} ${classConfig.name.toUpperCase()}§6`);
      player.tell(`§6║    §7${classConfig.description}§6`);
      player.tell('§6║ §7────────────────────────────────────────────§6');
    });
    
    player.tell('§6╚════════════════════════════════════════════════╝');
    player.tell('§f');
  }
};

// Export for other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedClassSystem;
}

Logger.SUCCESS('✅ Advanced Class System loaded');
