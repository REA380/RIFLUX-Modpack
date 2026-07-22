// â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—
// â•‘              RIFLUX ADVANCED CLASS SYSTEM (v2.0)                          â•‘
// â•‘         6 Unique Classes | Specializations | Skill Trees                  â•‘
// â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌

const AdvancedClassSystem = {
  // Configuration for all classes
  CLASSES: {
    WARRIOR: {
      name: 'Warrior',
      color: '#FF6B6B',
      description: 'âڑ”ï¸ڈ Master of melee combat and physical strength',
      icon: 'ًں—،ï¸ڈ',
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
      description: 'âœ¨ Master of arcane magic',
      icon: 'ًں§™',
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
      description: 'ًںڈ¹ Swift and deadly with bow',
      icon: 'ًںڈ¹',
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
      description: 'ًں—،ï¸ڈ Master of stealth',
      icon: 'ًں—،ï¸ڈ',
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
      description: 'âœ¨ Holy warrior combining magic and melee',
      icon: 'âڑ”ï¸ڈ',
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
      description: 'ًںŒ؟ Master of nature magic',
      icon: 'ًںŒ؟',
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
      player.tell('آ§câ‌Œ Class not found!');
      return false;
    }
    
    if (this.playerClasses[playerName]) {
      player.tell('آ§câ‌Œ You already have a class!');
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
    
    player.tell('آ§f');
    player.tell('آ§6â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell(`آ§6â•‘ آ§aâœ“ Class Selected: آ§b${classConfig.name}آ§a!آ§6        â•‘`);
    player.tell('آ§6â• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell(`آ§6â•‘ آ§e${classConfig.description}آ§6`);
    player.tell('آ§6â•‘ آ§7â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€آ§6');
    player.tell('آ§6â•‘ آ§aBase Stats:');
    Object.entries(classConfig.stats).forEach(([stat, value]) => {
      player.tell(`آ§6â•‘   آ§e${stat.toUpperCase()}: آ§f${(value * 100).toFixed(0)}%آ§6`);
    });
    player.tell('آ§6â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
    
    return true;
  },
  
  // Display class info
  displayClassInfo(player) {
    const playerName = player.username;
    const playerClass = this.playerClasses[playerName];
    
    if (!playerClass) {
      player.tell('آ§câ‌Œ No class selected!');
      return;
    }
    
    const classConfig = this.CLASSES[playerClass.name];
    
    player.tell('آ§f');
    player.tell('آ§bâ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell(`آ§bâ•‘ آ§e${classConfig.icon} ${playerClass.name}آ§b - Level ${playerClass.level}آ§e${classConfig.icon}آ§b        â•‘`);
    player.tell('آ§bâ• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell('آ§bâ•‘ آ§aStats:');
    Object.entries(playerClass.stats).forEach(([stat, value]) => {
      player.tell(`آ§bâ•‘   آ§e${stat.toUpperCase()}: آ§f${(value * 100).toFixed(0)}%آ§b`);
    });
    player.tell('آ§bâ•‘ آ§7â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€آ§b');
    player.tell(`آ§bâ•‘ آ§aAbilities Known: آ§f${playerClass.spellbook.length}آ§b`);
    playerClass.spellbook.forEach(abilityId => {
      const ability = playerClass.abilities.find(a => a.id === abilityId);
      if (ability) {
        player.tell(`آ§bâ•‘   آ§e${ability.name} (Lvl. ${ability.requiredLevel})آ§b`);
      }
    });
    player.tell('آ§bâ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
  }
};

Logger.SUCCESS('âœ… Advanced Class System loaded');
// â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—
// â•‘              RIFLUX ADVANCED ECONOMY SYSTEM (v2.0)                        â•‘
// â•‘         Banking | Trading | Market | Currency Exchange                   â•‘
// â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌

const AdvancedEconomy = {
  // Configuration
  CONFIG: {
    CURRENCY_NAME: 'MBAQ',
    STARTING_BALANCE: 100,
    MAX_BALANCE: 9999999999,
    BANK_INTEREST_RATE: 0.05, // 5% monthly
    TAX_RATE: 0.02, // 2% on transactions
    
    // Market prices (dynamic)
    BASE_PRICES: {
      'minecraft:gold_ingot': 50,
      'minecraft:diamond': 500,
      'minecraft:emerald': 100,
      'minecraft:blaze_rod': 150,
      'minecraft:ender_pearl': 75,
      'minecraft:nether_star': 5000
    },
    
    // Mob drops value
    MOB_DROPS: {
      'minecraft:zombie': { item: 'minecraft:rotten_flesh', value: 10, drop_rate: 0.8 },
      'minecraft:skeleton': { item: 'minecraft:bone', value: 15, drop_rate: 0.9 },
      'minecraft:spider': { item: 'minecraft:string', value: 12, drop_rate: 0.85 },
      'minecraft:enderman': { item: 'minecraft:ender_pearl', value: 75, drop_rate: 0.5 },
      'minecraft:blaze': { item: 'minecraft:blaze_rod', value: 150, drop_rate: 0.7 }
    },
    
    // Bank account features
    BANK_FEATURES: {
      MIN_DEPOSIT: 10,
      MIN_WITHDRAWAL: 5,
      INTEREST_CHECK_INTERVAL: 72000 // 1 hour in ticks
    }
  },
  
  // Player economic data
  playerEconomy: {},
  
  // Global market data
  market: {
    transactions: [],
    priceHistory: {},
    totalVolume: 0
  },
  
  // Initialize player economy
  initializeEconomy(player) {
    const playerName = player.username;
    
    if (!this.playerEconomy[playerName]) {
      this.playerEconomy[playerName] = {
        // Cash & Bank
        cash: this.CONFIG.STARTING_BALANCE,
        bankBalance: 0,
        
        // Transactions
        transactions: [],
        totalSpent: 0,
        totalEarned: 0,
        
        // Market
        sellingItems: [],
        buyingRequests: [],
        completedTrades: 0,
        
        // Interest
        lastInterestPayout: Date.now(),
        totalInterestEarned: 0,
        
        // Statistics
        richestMoment: this.CONFIG.STARTING_BALANCE,
        averageBalance: this.CONFIG.STARTING_BALANCE,
        wealthRank: 0
      };
      
      Logger.INFO(`ًں’° Initialized economy for player: ${playerName}`);
    }
    
    return this.playerEconomy[playerName];
  },
  
  // Deposit money to bank
  deposit(player, amount) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) {
      player.tell('آ§câ‌Œ Economy not initialized!');
      return false;
    }
    
    if (amount < this.CONFIG.BANK_FEATURES.MIN_DEPOSIT) {
      player.tell(`آ§cMinimum deposit is ${this.CONFIG.BANK_FEATURES.MIN_DEPOSIT} MBAQ!`);
      return false;
    }
    
    if (amount > economy.cash) {
      player.tell(`آ§cInsufficient cash! You only have ${economy.cash} MBAQ`);
      return false;
    }
    
    // Process deposit
    economy.cash -= amount;
    economy.bankBalance += amount;
    
    // Record transaction
    this.recordTransaction(playerName, 'deposit', amount, null);
    
    player.tell('آ§f');
    player.tell('آ§bâ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell(`آ§bâ•‘ آ§aâœ“ Deposit Successfulآ§b             â•‘`);
    player.tell(`آ§bâ•‘ آ§aAmount: آ§f${amount} MBAQآ§b             â•‘`);
    player.tell(`آ§bâ•‘ آ§aNew Cash: آ§f${economy.cash} MBAQآ§b             â•‘`);
    player.tell(`آ§bâ•‘ آ§aBank: آ§f${economy.bankBalance} MBAQآ§b             â•‘`);
    player.tell('آ§bâ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
    
    return true;
  },
  
  // Withdraw money from bank
  withdraw(player, amount) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) {
      player.tell('آ§câ‌Œ Economy not initialized!');
      return false;
    }
    
    if (amount < this.CONFIG.BANK_FEATURES.MIN_WITHDRAWAL) {
      player.tell(`آ§cMinimum withdrawal is ${this.CONFIG.BANK_FEATURES.MIN_WITHDRAWAL} MBAQ!`);
      return false;
    }
    
    if (amount > economy.bankBalance) {
      player.tell(`آ§cInsufficient bank balance! You have ${economy.bankBalance} MBAQ`);
      return false;
    }
    
    // Process withdrawal
    economy.bankBalance -= amount;
    economy.cash += amount;
    
    // Record transaction
    this.recordTransaction(playerName, 'withdraw', amount, null);
    
    player.tell('آ§f');
    player.tell('آ§6â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell(`آ§6â•‘ آ§aâœ“ Withdrawal Successfulآ§6           â•‘`);
    player.tell(`آ§6â•‘ آ§aAmount: آ§f${amount} MBAQآ§6             â•‘`);
    player.tell(`آ§6â•‘ آ§aNew Cash: آ§f${economy.cash} MBAQآ§6             â•‘`);
    player.tell(`آ§6â•‘ آ§aBank: آ§f${economy.bankBalance} MBAQآ§6             â•‘`);
    player.tell('آ§6â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
    
    return true;
  },
  
  // Transfer money between players
  transferMoney(fromPlayerName, toPlayerName, amount) {
    const fromEconomy = this.playerEconomy[fromPlayerName];
    const toEconomy = this.playerEconomy[toPlayerName];
    
    if (!fromEconomy || !toEconomy) {
      return { success: false, message: 'Player not found!' };
    }
    
    if (amount <= 0) {
      return { success: false, message: 'Amount must be positive!' };
    }
    
    if (amount > fromEconomy.cash) {
      return { success: false, message: `Insufficient funds! You have ${fromEconomy.cash} MBAQ` };
    }
    
    // Calculate tax
    const tax = Math.floor(amount * this.CONFIG.TAX_RATE);
    const finalAmount = amount - tax;
    
    // Process transfer
    fromEconomy.cash -= amount;
    fromEconomy.totalSpent += amount;
    toEconomy.cash += finalAmount;
    toEconomy.totalEarned += finalAmount;
    
    // Record transaction
    this.recordTransaction(fromPlayerName, 'transfer_out', amount, toPlayerName);
    this.recordTransaction(toPlayerName, 'transfer_in', finalAmount, fromPlayerName);
    
    return { success: true, message: `Transferred ${finalAmount} MBAQ (tax: ${tax})` };
  },
  
  // Record transaction
  recordTransaction(playerName, type, amount, relatedPlayer) {
    const economy = this.playerEconomy[playerName];
    
    if (!economy) return;
    
    economy.transactions.push({
      type: type,
      amount: amount,
      relatedPlayer: relatedPlayer,
      timestamp: Date.now(),
      balanceAfter: economy.cash
    });
    
    // Keep only last 100 transactions
    if (economy.transactions.length > 100) {
      economy.transactions.shift();
    }
  },
  
  // Display balance
  displayBalance(player) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) return;
    
    const total = economy.cash + economy.bankBalance;
    
    player.tell('آ§f');
    player.tell('آ§bâ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell('آ§bâ•‘         آ§aًں’° MBAQ BALANCEآ§b            â•‘');
    player.tell('آ§bâ• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell(`آ§bâ•‘ آ§aCash: آ§f${String(economy.cash).padEnd(10)} آ§7MBAQآ§b`);
    player.tell(`آ§bâ•‘ آ§aBank: آ§f${String(economy.bankBalance).padEnd(10)} آ§7MBAQآ§b`);
    player.tell(`آ§bâ•‘ آ§aâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€آ§b`);
    player.tell(`آ§bâ•‘ آ§aTotal: آ§f${String(total).padEnd(10)} آ§7MBAQآ§b`);
    player.tell('آ§bâ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
  }
};

Logger.SUCCESS('âœ… Advanced Economy System loaded');
// â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—
// â•‘            RIFLUX ADVANCED PROGRESSION SYSTEM (v2.0)                      â•‘
// â•‘         Level System | Data Persistence | Rebirth System                  â•‘
// â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌

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
      Logger.INFO(`ًں“ٹ Initialized stats for player: ${playerName}`);
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
    player.tell('آ§f');
    player.tell('آ§câ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell('آ§câ•‘                  آ§6â­گ LEVEL UP! â­گآ§c                â•‘');
    player.tell('آ§câ•‘ آ§aYou are now level آ§b' + String(stats.level).padStart(6, ' ') + 'آ§c                   â•‘');
    player.tell('آ§câ• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell('آ§câ•‘ آ§aRewards:');
    player.tell('آ§câ•‘   آ§e+ ' + rewards.MBAQ + ' MBAQ');
    player.tell('آ§câ•‘   آ§e+ ' + (rewards.HEALTH * 100) + '% Max Health');
    player.tell('آ§câ•‘   آ§e+ ' + (rewards.DAMAGE * 100) + '% Damage');
    player.tell('آ§câ•‘   آ§e+ ' + (rewards.MANA) + ' Mana');
    player.tell('آ§câ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
    
    // Achievement check
    this.checkLevelMilestones(player, stats.level);
    
    this.savePlayerData(playerName);
  },
  
  // Rebirth system
  rebirth(player) {
    const playerName = player.username;
    const stats = this.playerData[playerName];
    
    if (!stats || stats.level < 100) {
      player.tell('آ§cYou must be at least level 100 to rebirth!');
      return false;
    }
    
    if (stats.rebirths >= this.CONFIG.REBIRTH_MAX_REBIRTHS) {
      player.tell('آ§cYou have reached the maximum number of rebirths!');
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
    
    player.tell('آ§f');
    player.tell('آ§dâ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell('آ§dâ•‘                  آ§5âœ¨ REBIRTH! âœ¨آ§d                  â•‘');
    player.tell('آ§dâ•‘ آ§aYou have been reborn!');
    player.tell('آ§dâ•‘ آ§eRebirth #' + stats.rebirths + ' / Power Multiplier: آ§b' + stats.powerMultiplier.toFixed(2) + 'xآ§d         â•‘');
    player.tell('آ§dâ•‘ آ§aYour level has been reset to 1');
    player.tell('آ§dâ•‘ آ§aBut your power increases exponentially!');
    player.tell('آ§dâ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
    
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
        player.tell('آ§6ًںڈ† آ§eAchievement: Reached level ' + milestone + '!');
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
    const progressBar = 'â–ˆ'.repeat(Math.floor(expPercent / 5)) + 'â–‘'.repeat(20 - Math.floor(expPercent / 5));
    
    player.tell('آ§f');
    player.tell('آ§bâ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell('آ§bâ•‘ آ§f                  RIFLUX PLAYER STATISTICSآ§b                 â•‘');
    player.tell('آ§bâ• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell('آ§bâ•‘ آ§aLevel: آ§f' + String(stats.level).padEnd(8, ' ') + 'آ§7| آ§aClass: آ§f' + (stats.class || 'Unassigned').padEnd(15, ' ') + 'آ§7| آ§aRebirths: آ§f' + stats.rebirths + 'آ§b â•‘');
    player.tell('آ§bâ•‘ آ§aPhase: آ§f' + phase.NAME.padEnd(15, ' ') + 'آ§7| آ§aPower: آ§f' + stats.powerMultiplier.toFixed(2) + 'xآ§b' + ' '.repeat(25) + 'â•‘');
    player.tell('آ§bâ• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell('آ§bâ•‘ آ§aExperience: [آ§e' + progressBar + 'آ§a] ' + expPercent + '%آ§b' + ' '.repeat(20) + 'â•‘');
    player.tell('آ§bâ•‘             ' + String(stats.experience).padStart(7, ' ') + ' / ' + String(stats.nextLevelExp).padStart(7, ' ') + 'آ§b');
    player.tell('آ§bâ• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    player.tell('آ§bâ•‘ آ§aBalance: آ§f' + String(stats.balance).padEnd(15, ' ') + 'آ§aMBAQآ§b');
    player.tell('آ§bâ•‘ آ§aBank: آ§f' + String(stats.bankBalance).padEnd(15, ' ') + 'آ§aMBAQآ§b');
    player.tell('آ§bâ•‘ آ§aMobs Killed: آ§f' + String(stats.mobsKilled).padEnd(10, ' ') + 'آ§7| آ§aQuests: آ§f' + String(stats.questsCompleted).padEnd(3, ' ') + 'آ§7| آ§aBosses: آ§f' + stats.bossesDef + 'آ§b â•‘');
    player.tell('آ§bâ•‘ آ§aPlaytime: آ§f' + this.formatPlaytime(stats.playtimeTicks) + 'آ§b');
    player.tell('آ§bâ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
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
    Logger.INFO(`ًں’¾ Saved data for ${playerName}`);
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

Logger.SUCCESS('âœ… Advanced Progression System loaded');
const EconomyConfig = {
  CURRENCY_NAME: 'MBAQ',
  STARTING_BALANCE: 100,
  INTEREST_RATE: 0.05
};

function displayBalance(player) {
  player.tell('§b╔═══════════════════════════╗');
  player.tell('§b║ Balance: §f100 MBAQ§b   ║');
  player.tell('§b╚═══════════════════════════╝');
}
// â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—
// â•‘           RIFLUX MULTI-WORLD SYSTEM (v2.0)                               â•‘
// â•‘      Dimensions | Teleportation | Difficulty Scaling | Boss Arenas      â•‘
// â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌

const MultiWorldSystem = {
  // World configuration
  WORLDS: {
    OVERWORLD: {
      id: 'minecraft:overworld',
      name: 'Main Realm',
      description: 'ًںŒچ The starting realm with balanced difficulty',
      icon: 'ًںŒچ',
      minLevel: 1,
      recommendedLevel: 10,
      difficultyMultiplier: 1.0,
      bosses: [
        { id: 'warden', name: 'The Warden', level: 50, health: 500, reward: { exp: 5000, mbaq: 1000 } }
      ],
      waypoints: [
        { name: 'Spawn', x: 0, y: 64, z: 0 },
        { name: 'Village', x: 100, y: 64, z: 0 },
        { name: 'Dungeon', x: 200, y: 30, z: 200 }
      ]
    },
    NETHER: {
      id: 'minecraft:the_nether',
      name: 'Infernal Abyss',
      description: 'ًں”¥ A dangerous realm of fire and lava',
      icon: 'ًں”¥',
      minLevel: 20,
      recommendedLevel: 40,
      difficultyMultiplier: 2.5,
      bosses: [
        { id: 'nether_demon', name: 'Infernal Demon', level: 75, health: 800, reward: { exp: 10000, mbaq: 2500 } }
      ],
      waypoints: [
        { name: 'Nether Hub', x: 0, y: 64, z: 0 },
        { name: 'Lava Castle', x: 300, y: 100, z: 300 }
      ]
    },
    END: {
      id: 'minecraft:the_end',
      name: 'The Void',
      description: 'ًںŒŒ The final frontier of reality',
      icon: 'ًںŒŒ',
      minLevel: 50,
      recommendedLevel: 100,
      difficultyMultiplier: 5.0,
      bosses: [
        { id: 'ender_dragon', name: 'Ender Dragon', level: 200, health: 2000, reward: { exp: 50000, mbaq: 10000 } }
      ],
      waypoints: [
        { name: 'Portal', x: 0, y: 64, z: 0 },
        { name: 'Dragon Arena', x: 0, y: 100, z: 0 }
      ]
    }
  },
  
  playerWorlds: {},
  
  // Initialize player worlds
  initializeWorlds(player) {
    const playerName = player.username;
    
    if (!this.playerWorlds[playerName]) {
      this.playerWorlds[playerName] = {
        currentWorld: 'minecraft:overworld',
        discoveredWorlds: ['minecraft:overworld'],
        completedBosses: []
      };
    }
    
    return this.playerWorlds[playerName];
  },
  
  // Teleport player
  teleportToWorld(player, worldId) {
    const playerName = player.username;
    const worldData = this.playerWorlds[playerName];
    const worldConfig = Object.values(this.WORLDS).find(w => w.id === worldId);
    
    if (!worldConfig) {
      player.tell('آ§câ‌Œ World not found!');
      return false;
    }
    
    const playerLevel = AdvancedProgression.getPlayerStats(playerName)?.level || 1;
    if (playerLevel < worldConfig.minLevel) {
      player.tell(`آ§câ‌Œ Requires level ${worldConfig.minLevel}!`);
      return false;
    }
    
    if (!worldData.discoveredWorlds.includes(worldId)) {
      worldData.discoveredWorlds.push(worldId);
    }
    
    worldData.currentWorld = worldId;
    
    player.tell('آ§f');
    player.tell('آ§bâ•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell(`آ§bâ•‘ آ§aâœ“ Teleporting to آ§b${worldConfig.name}آ§a...آ§b â•‘`);
    player.tell(`آ§bâ•‘ آ§aDifficulty: آ§f${(worldConfig.difficultyMultiplier * 100).toFixed(0)}%آ§b â•‘`);
    player.tell('آ§bâ•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
    
    return true;
  },
  
  // Display all worlds
  displayAllWorlds(player) {
    player.tell('آ§f');
    player.tell('آ§6â•”â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•—');
    player.tell('آ§6â•‘ آ§e            AVAILABLE WORLDSآ§6              â•‘');
    player.tell('آ§6â• â•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•£');
    
    Object.values(this.WORLDS).forEach(world => {
      player.tell(`آ§6â•‘ آ§e${world.icon} ${world.name.toUpperCase()}آ§6`);
      player.tell(`آ§6â•‘    آ§7${world.description}آ§6`);
      player.tell(`آ§6â•‘    آ§eMin Level: آ§f${world.minLevel}آ§6 | آ§eRecommended: آ§f${world.recommendedLevel}آ§6`);
    });
    
    player.tell('آ§6â•ڑâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•گâ•‌');
    player.tell('آ§f');
  }
};

Logger.SUCCESS('âœ… Multi-World System loaded');
const ProgressionConfig = {
  PHASE_1_MAX: 20,
  PHASE_2_MAX: 60,
  BASE_EXP_PHASE_1: 100,
  BASE_EXP_PHASE_2: 200,
  BASE_EXP_PHASE_3: 1000,
  REBIRTH_POWER_MULTIPLIER: 2.5
};

function calculateExpRequirement(level) {
  if (level <= ProgressionConfig.PHASE_1_MAX) {
    return ProgressionConfig.BASE_EXP_PHASE_1 * level;
  } else if (level <= ProgressionConfig.PHASE_2_MAX) {
    return ProgressionConfig.BASE_EXP_PHASE_2 * level * 2;
  } else {
    return ProgressionConfig.BASE_EXP_PHASE_3 * level * 10;
  }
}
const QuestSystem = {
  AVAILABLE_QUESTS: [
    {
      id: 'quest_first_wood',
      name: '§eFirst Steps',
      description: 'Chop 10 logs of wood',
      reward_exp: 100,
      reward_mbaq: 50
    }
  ]
};
