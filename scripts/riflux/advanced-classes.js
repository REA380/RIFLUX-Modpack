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
      stats: { health: 1.5, damage: 1.8, defense: 1.3, speed: 0.9, mana: 0.5 },
      expModifier: 1.2,
      abilities: [
        { id: 'power_strike', name: 'Power Strike', desc: 'Deal 2x damage', cooldown: 10, manaCost: 20, requiredLevel: 1 },
        { id: 'whirlwind', name: 'Whirlwind Attack', desc: 'Hit all nearby', cooldown: 20, manaCost: 40, requiredLevel: 10 }
      ]
    },
    MAGE: {
      name: 'Mage',
      color: '#4ECDC4',
      description: '✨ Master of arcane magic',
      icon: '🧙',
      stats: { health: 0.8, damage: 1.0, defense: 0.6, speed: 1.1, mana: 2.5 },
      expModifier: 1.1,
      abilities: [
        { id: 'fireball', name: 'Fireball', desc: 'AoE fire damage', cooldown: 8, manaCost: 50, requiredLevel: 1 },
        { id: 'teleport', name: 'Teleport', desc: 'Instant movement', cooldown: 10, manaCost: 60, requiredLevel: 15 }
      ]
    },
    ARCHER: {
      name: 'Archer',
      color: '#95E1D3',
      description: '🏹 Swift and deadly with bow',
      icon: '🏹',
      stats: { health: 1.0, damage: 1.4, defense: 0.9, speed: 1.4, mana: 0.8 },
      expModifier: 1.15,
      abilities: [
        { id: 'power_shot', name: 'Power Shot', desc: '3x damage arrow', cooldown: 6, manaCost: 25, requiredLevel: 1 },
        { id: 'multi_shot', name: 'Multi Shot', desc: 'Multiple arrows', cooldown: 10, manaCost: 35, requiredLevel: 8 }
      ]
    },
    ROGUE: {
      name: 'Rogue',
      color: '#AA96DA',
      description: '🗡️ Master of stealth',
      icon: '🗡️',
      stats: { health: 1.1, damage: 1.5, defense: 0.7, speed: 1.6, mana: 0.6 },
      expModifier: 1.25,
      abilities: [
        { id: 'backstab', name: 'Backstab', desc: 'Critical from behind', cooldown: 8, manaCost: 15, requiredLevel: 1 },
        { id: 'vanish', name: 'Vanish', desc: 'Become invisible', cooldown: 20, manaCost: 45, requiredLevel: 35 }
      ]
    },
    PALADIN: {
      name: 'Paladin',
      color: '#FCBAD3',
      description: '✨ Holy warrior combining magic and melee',
      icon: '⚔️',
      stats: { health: 1.4, damage: 1.2, defense: 1.6, speed: 0.95, mana: 1.2 },
      expModifier: 1.1,
      abilities: [
        { id: 'holy_strike', name: 'Holy Strike', desc: 'Heal while attacking', cooldown: 8, manaCost: 30, requiredLevel: 1 },
        { id: 'healing_aura', name: 'Healing Aura', desc: 'Heal allies', cooldown: 12, manaCost: 40, requiredLevel: 10 }
      ]
    },
    DRUID: {
      name: 'Druid',
      color: '#A8D8EA',
      description: '🌿 Master of nature magic',
      icon: '🌿',
      stats: { health: 1.2, damage: 1.0, defense: 1.0, speed: 1.1, mana: 1.8 },
      expModifier: 1.15,
      abilities: [
        { id: 'nature_bolt', name: 'Nature Bolt', desc: 'Nature energy strike', cooldown: 7, manaCost: 35, requiredLevel: 1 },
        { id: 'forest_regeneration', name: 'Forest Regen', desc: 'Heal over time', cooldown: 15, manaCost: 50, requiredLevel: 15 }
      ]
    }
  },
  
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
      stats: { ...classConfig.stats },
      abilities: classConfig.abilities.map(a => ({ ...a, cooldownUntil: 0 })),
      spellbook: [],
      equipment: {},
      skillPoints: 0
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
    player.tell('§6╚════════════════════════════════════════════════╝');
    player.tell('§f');
    
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
    player.tell('§b║ §7────────────────────────────────────────────§b');
    player.tell(`§b║ §aAbilities Known: §f${playerClass.spellbook.length}§b`);
    playerClass.spellbook.forEach(abilityId => {
      const ability = playerClass.abilities.find(a => a.id === abilityId);
      if (ability) {
        player.tell(`§b║   §e${ability.name} (Lvl. ${ability.requiredLevel})§b`);
      }
    });
    player.tell('§b╚════════════════════════════════════════════════╝');
    player.tell('§f');
  }
};

Logger.SUCCESS('✅ Advanced Class System loaded');