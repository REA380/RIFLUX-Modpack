// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║              RIFLUX ADVANCED ECONOMY SYSTEM (v2.0)                        ║
// ║         Banking | Trading | Market | Currency Exchange                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

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
      
      Logger.INFO(`💰 Initialized economy for player: ${playerName}`);
    }
    
    return this.playerEconomy[playerName];
  },
  
  // Deposit money to bank
  deposit(player, amount) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) {
      player.tell('§c❌ Economy not initialized!');
      return false;
    }
    
    if (amount < this.CONFIG.BANK_FEATURES.MIN_DEPOSIT) {
      player.tell(`§cMinimum deposit is ${this.CONFIG.BANK_FEATURES.MIN_DEPOSIT} MBAQ!`);
      return false;
    }
    
    if (amount > economy.cash) {
      player.tell(`§cInsufficient cash! You only have ${economy.cash} MBAQ`);
      return false;
    }
    
    // Process deposit
    economy.cash -= amount;
    economy.bankBalance += amount;
    
    // Record transaction
    this.recordTransaction(playerName, 'deposit', amount, null);
    
    player.tell('§f');
    player.tell('§b╔══════════════════════════════════════╗');
    player.tell(`§b║ §a✓ Deposit Successful§b             ║`);
    player.tell(`§b║ §aAmount: §f${amount} MBAQ§b             ║`);
    player.tell(`§b║ §aNew Cash: §f${economy.cash} MBAQ§b             ║`);
    player.tell(`§b║ §aBank: §f${economy.bankBalance} MBAQ§b             ║`);
    player.tell('§b╚══════════════════════════════════════╝');
    player.tell('§f');
    
    return true;
  },
  
  // Withdraw money from bank
  withdraw(player, amount) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) {
      player.tell('§c❌ Economy not initialized!');
      return false;
    }
    
    if (amount < this.CONFIG.BANK_FEATURES.MIN_WITHDRAWAL) {
      player.tell(`§cMinimum withdrawal is ${this.CONFIG.BANK_FEATURES.MIN_WITHDRAWAL} MBAQ!`);
      return false;
    }
    
    if (amount > economy.bankBalance) {
      player.tell(`§cInsufficient bank balance! You have ${economy.bankBalance} MBAQ`);
      return false;
    }
    
    // Process withdrawal
    economy.bankBalance -= amount;
    economy.cash += amount;
    
    // Record transaction
    this.recordTransaction(playerName, 'withdraw', amount, null);
    
    player.tell('§f');
    player.tell('§6╔══════════════════════════════════════╗');
    player.tell(`§6║ §a✓ Withdrawal Successful§6           ║`);
    player.tell(`§6║ §aAmount: §f${amount} MBAQ§6             ║`);
    player.tell(`§6║ §aNew Cash: §f${economy.cash} MBAQ§6             ║`);
    player.tell(`§6║ §aBank: §f${economy.bankBalance} MBAQ§6             ║`);
    player.tell('§6╚══════════════════════════════════════╝');
    player.tell('§f');
    
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
    
    player.tell('§f');
    player.tell('§b╔════════════════════════════════════════╗');
    player.tell('§b║         §a💰 MBAQ BALANCE§b            ║');
    player.tell('§b╠════════════════════════════════════════╣');
    player.tell(`§b║ §aCash: §f${String(economy.cash).padEnd(10)} §7MBAQ§b`);
    player.tell(`§b║ §aBank: §f${String(economy.bankBalance).padEnd(10)} §7MBAQ§b`);
    player.tell(`§b║ §a─────────────────────────────────────§b`);
    player.tell(`§b║ §aTotal: §f${String(total).padEnd(10)} §7MBAQ§b`);
    player.tell('§b╚════════════════════════════════════════╝');
    player.tell('§f');
  }
};

Logger.SUCCESS('✅ Advanced Economy System loaded');