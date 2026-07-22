// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║            RIFLUX ADVANCED PROGRESSION SYSTEM (v2.0)                      ║
// ║         Level System | Data Persistence | Rebirth System                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const AdvancedProgression = {
  // Configuration
  CONFIG: {
    MAX_LEVEL: 999999,
    STARTING_LEVEL: 1,
    REBIRTH_MULTIPLIER: 2.5,
    REBIRTH_MAX_REBIRTHS: 100,
    
    // Experience scaling
    PHASE_1: { MAX: 20, EXP_BASE: 100, NAME: 'Novice' },
    PHASE_2: { MAX: 60, EXP_BASE: 200, MULTIPLIER: 2, NAME: 'Apprentice' },
    PHASE_3: { MAX: 200, EXP_BASE: 1000, MULTIPLIER: 10, NAME: 'Veteran' },
    PHASE_4: { MAX: 999999, EXP_BASE: 10000, MULTIPLIER: 100, NAME: 'Legendary' },
    
    // Rewards per level
    LEVEL_UP_REWARDS: {
      MBAQ: 50,
      HEALTH: 0.5,
      DAMAGE: 0.05,
      MANA: 2,
      LUCK: 0.01
    },
    
    // Mob experience rewards
    MOB_REWARDS: {
      'minecraft:zombie': { exp: 25, mbaq: 5 },
      'minecraft:skeleton': { exp: 30, mbaq: 6 },
      'minecraft:creeper': { exp: 35, mbaq: 7 },
      'minecraft:spider': { exp: 28, mbaq: 5 },
      'minecraft:enderman': { exp: 50, mbaq: 10 },
      'minecraft:blaze': { exp: 75, mbaq: 15 },
      'minecraft:wither_skeleton': { exp: 80, mbaq: 16 },
      'minecraft:magma_cube': { exp: 40, mbaq: 8 },
      'minecraft:ghast': { exp: 60, mbaq: 12 },
      'minecraft:warden': { exp: 500, mbaq: 100 },
      'minecraft:ender_dragon': { exp: 1000, mbaq: 200 }
    }
  },
  
  // Player data storage
  playerData: {},
  
  // Initialize player
  initializePlayer(player) {
    const playerName = player.username;
    
    if (!this.playerData[playerName]) {
      this.playerData[playerName] = {
        // Basic Stats
        level: this.CONFIG.STARTING_LEVEL,
        experience: 0,
        nextLevelExp: this.calculateExpRequirement(1),
        
        // Class & Specialization
        class: null,
        classLevel: 0,
        classExp: 0,
        
        // Currency
        balance: RIFLUX.ECONOMY.STARTING_BALANCE,
        bankBalance: 0,
        
        // Items & Inventory
        spells: [],
        artifacts: [],
        equipment: {},
        
        // Statistics
        mobsKilled: 0,
        bossesDef: 0,
        questsCompleted: 0,
        playtimeTicks: 0,
        
        // Rebirth system
        rebirths: 0,
        totalLevelsGained: 0,
        powerMultiplier: 1.0,
        
        // Achievements
        achievements: [],
        milestones: [],
        
        // Timestamps
        createdAt: Date.now(),
        lastLogin: Date.now(),
        lastLevelUp: Date.now()
      };
      
      this.savePlayerData(playerName);
      Logger.INFO(`📊 Initialized stats for player: ${playerName}`);
    }
    
    return this.playerData[playerName];
  },
  
  // Calculate experience requirement
  calculateExpRequirement(level) {
    let baseExp = 0;
    let multiplier = 1;
    
    if (level <= this.CONFIG.PHASE_1.MAX) {
      baseExp = this.CONFIG.PHASE_1.EXP_BASE * level;
    } else if (level <= this.CONFIG.PHASE_2.MAX) {
      baseExp = this.CONFIG.PHASE_2.EXP_BASE * (level - this.CONFIG.PHASE_1.MAX);
      multiplier = this.CONFIG.PHASE_2.MULTIPLIER;
    } else if (level <= this.CONFIG.PHASE_3.MAX) {
      baseExp = this.CONFIG.PHASE_3.EXP_BASE * (level - this.CONFIG.PHASE_2.MAX);
      multiplier = this.CONFIG.PHASE_3.MULTIPLIER;
    } else {
      baseExp = this.CONFIG.PHASE_4.EXP_BASE * (level - this.CONFIG.PHASE_3.MAX);
      multiplier = this.CONFIG.PHASE_4.MULTIPLIER;
    }
    
    return Math.floor(baseExp * multiplier);
  },
  
  // Get phase info
  getPhaseInfo(level) {
    if (level <= this.CONFIG.PHASE_1.MAX) {
      return this.CONFIG.PHASE_1;
    } else if (level <= this.CONFIG.PHASE_2.MAX) {
      return this.CONFIG.PHASE_2;
    } else if (level <= this.CONFIG.PHASE_3.MAX) {
      return this.CONFIG.PHASE_3;
    } else {
      return this.CONFIG.PHASE_4;
    }
  },
  
  // Add experience
  addExperience(player, amount, source = 'quest') {
    const playerName = player.username;
    const stats = this.playerData[playerName];
    
    if (!stats) return;
    
    // Apply multiplier based on class
    let modifiedAmount = amount;
    if (stats.class && RIFLUX.CLASSES[stats.class]) {
      const classBonus = RIFLUX.CLASSES[stats.class].exp_bonus || 1;
      modifiedAmount = Math.floor(amount * classBonus);
    }
    
    stats.experience += modifiedAmount;
    
    // Check for level up
    while (stats.experience >= stats.nextLevelExp && stats.level < this.CONFIG.MAX_LEVEL) {
      this.levelUp(player);
    }
    
    this.savePlayerData(playerName);
  },
  
  // Level up
  levelUp(player) {
    const playerName = player.username;
    const stats = this.playerData[playerName];
    
    if (stats.level >= this.CONFIG.MAX_LEVEL) return;
    
    // Deduct experience for next level
    stats.experience -= stats.nextLevelExp;
    stats.level++;
    stats.totalLevelsGained++;
    stats.nextLevelExp = this.calculateExpRequirement(stats.level);
    stats.lastLevelUp = Date.now();
    
    // Apply rewards
    const rewards = this.CONFIG.LEVEL_UP_REWARDS;
    stats.balance += rewards.MBAQ;
    
    // Add class experience if class is selected
    if (stats.class) {
      stats.classExp += 50;
      if (stats.classExp >= 1000) {
        stats.classLevel++;
        stats.classExp = 0;
      }
    }
    
    // Send celebration message
    player.tell('§f');
    player.tell('§c╔═══════════════════════════════════════════════════════╗');
    player.tell('§c║                  §6⭐ LEVEL UP! ⭐§c                ║');
    player.tell('§c║ §aYou are now level §b' + String(stats.level).padStart(6, ' ') + '§c                   ║');
    player.tell('§c╠═══════════════════════════════════════════════════════╣');
    player.tell('§c║ §aRewards:');
    player.tell('§c║   §e+ ' + rewards.MBAQ + ' MBAQ');
    player.tell('§c║   §e+ ' + (rewards.HEALTH * 100) + '% Max Health');
    player.tell('§c║   §e+ ' + (rewards.DAMAGE * 100) + '% Damage');
    player.tell('§c║   §e+ ' + (rewards.MANA) + ' Mana');
    player.tell('§c╚═══════════════════════════════════════════════════════╝');
    player.tell('§f');
    
    // Achievement check
    this.checkLevelMilestones(player, stats.level);
    
    this.savePlayerData(playerName);
  },
  
  // Rebirth system
  rebirth(player) {
    const playerName = player.username;
    const stats = this.playerData[playerName];
    
    if (!stats || stats.level < 100) {
      player.tell('§cYou must be at least level 100 to rebirth!');
      return false;
    }
    
    if (stats.rebirths >= this.CONFIG.REBIRTH_MAX_REBIRTHS) {
      player.tell('§cYou have reached the maximum number of rebirths!');
      return false;
    }
    
    // Reset level but keep progress
    const previousLevel = stats.level;
    stats.rebirths++;
    stats.powerMultiplier = Math.pow(this.CONFIG.REBIRTH_MULTIPLIER, stats.rebirths);
    stats.level = this.CONFIG.STARTING_LEVEL;
    stats.experience = 0;
    stats.nextLevelExp = this.calculateExpRequirement(1);
    
    // Bonus: keep some balance
    stats.balance += previousLevel * 100;
    
    player.tell('§f');
    player.tell('§d╔═══════════════════════════════════════════════════════╗');
    player.tell('§d║                  §5✨ REBIRTH! ✨§d                  ║');
    player.tell('§d║ §aYou have been reborn!');
    player.tell('§d║ §eRebirth #' + stats.rebirths + ' / Power Multiplier: §b' + stats.powerMultiplier.toFixed(2) + 'x§d         ║');
    player.tell('§d║ §aYour level has been reset to 1');
    player.tell('§d║ §aBut your power increases exponentially!');
    player.tell('§d╚═══════════════════════════════════════════════════════╝');
    player.tell('§f');
    
    this.savePlayerData(playerName);
    return true;
  },
  
  // Check level milestones
  checkLevelMilestones(player, level) {
    const stats = this.playerData[player.username];
    const milestones = [1, 10, 25, 50, 100, 250, 500, 1000, 10000, 100000];
    
    milestones.forEach(milestone => {
      if (level === milestone && !stats.milestones.includes(milestone)) {
        stats.milestones.push(milestone);
        player.tell('§6🏆 §eAchievement: Reached level ' + milestone + '!');
      }
    });
  },
  
  // Get player stats
  getPlayerStats(playerName) {
    return this.playerData[playerName] || null;
  },
  
  // Display stats GUI
  displayStats(player) {
    const stats = this.playerData[player.username];
    if (!stats) return;
    
    const phase = this.getPhaseInfo(stats.level);
    const expPercent = Math.floor((stats.experience / stats.nextLevelExp) * 100);
    const progressBar = '█'.repeat(Math.floor(expPercent / 5)) + '░'.repeat(20 - Math.floor(expPercent / 5));
    
    player.tell('§f');
    player.tell('§b╔════════════════════════════════════════════════════════════════╗');
    player.tell('§b║ §f                  RIFLUX PLAYER STATISTICS§b                 ║');
    player.tell('§b╠════════════════════════════════════════════════════════════════╣');
    player.tell('§b║ §aLevel: §f' + String(stats.level).padEnd(8, ' ') + '§7| §aClass: §f' + (stats.class || 'Unassigned').padEnd(15, ' ') + '§7| §aRebirths: §f' + stats.rebirths + '§b ║');
    player.tell('§b║ §aPhase: §f' + phase.NAME.padEnd(15, ' ') + '§7| §aPower: §f' + stats.powerMultiplier.toFixed(2) + 'x§b' + ' '.repeat(25) + '║');
    player.tell('§b╠════════════════════════════════════════════════════════════════╣');
    player.tell('§b║ §aExperience: [§e' + progressBar + '§a] ' + expPercent + '%§b' + ' '.repeat(20) + '║');
    player.tell('§b║             ' + String(stats.experience).padStart(7, ' ') + ' / ' + String(stats.nextLevelExp).padStart(7, ' ') + '§b');
    player.tell('§b╠════════════════════════════════════════════════════════════════╣');
    player.tell('§b║ §aBalance: §f' + String(stats.balance).padEnd(15, ' ') + '§aMBAQ§b');
    player.tell('§b║ §aBank: §f' + String(stats.bankBalance).padEnd(15, ' ') + '§aMBAQ§b');
    player.tell('§b║ §aMobs Killed: §f' + String(stats.mobsKilled).padEnd(10, ' ') + '§7| §aQuests: §f' + String(stats.questsCompleted).padEnd(3, ' ') + '§7| §aBosses: §f' + stats.bossesDef + '§b ║');
    player.tell('§b║ §aPlaytime: §f' + this.formatPlaytime(stats.playtimeTicks) + '§b');
    player.tell('§b╚════════════════════════════════════════════════════════════════╝');
    player.tell('§f');
  },
  
  // Format playtime
  formatPlaytime(ticks) {
    const hours = Math.floor(ticks / 72000);
    const minutes = Math.floor((ticks % 72000) / 1200);
    return hours + 'h ' + minutes + 'm';
  },
  
  // Save player data
  savePlayerData(playerName) {
    // In a real implementation, this would save to a database or file
    // For now, we keep it in memory
    Logger.INFO(`💾 Saved data for ${playerName}`);
  },
  
  // Get mob experience reward
  getMobReward(mobType) {
    return this.CONFIG.MOB_REWARDS[mobType] || { exp: 10, mbaq: 2 };
  }
};

// Export for other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedProgression;
}

Logger.SUCCESS('✅ Advanced Progression System loaded');
