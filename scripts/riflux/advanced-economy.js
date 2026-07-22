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
  
  // ═══════════════════════════════════════════════════════════════════════════
  // BANKING SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  
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
  
  // Calculate and apply interest
  applyInterest(playerName) {
    const economy = this.playerEconomy[playerName];
    
    if (!economy) return 0;
    
    const timeSinceLastPayout = Date.now() - economy.lastInterestPayout;
    const monthsElapsed = timeSinceLastPayout / (30 * 24 * 60 * 60 * 1000);
    
    if (monthsElapsed < 1) return 0; // Only apply once per month
    
    const interest = Math.floor(economy.bankBalance * this.CONFIG.BANK_INTEREST_RATE * monthsElapsed);
    
    if (interest > 0) {
      economy.bankBalance += interest;
      economy.totalInterestEarned += interest;
      economy.lastInterestPayout = Date.now();
      
      Logger.INFO(`💵 Interest payout for ${playerName}: ${interest} MBAQ`);
      return interest;
    }
    
    return 0;
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PLAYER-TO-PLAYER TRADING
  // ═══════════════════════════════════════════════════════════════════════════
  
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
    
    // Record in market
    this.market.transactions.push({
      from: fromPlayerName,
      to: toPlayerName,
      amount: finalAmount,
      tax: tax,
      timestamp: Date.now()
    });
    
    return { 
      success: true, 
      message: `Transferred ${finalAmount} MBAQ (tax: ${tax})`,
      finalAmount: finalAmount,
      tax: tax
    };
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MARKET SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Sell item to market
  sellItem(player, itemId, quantity, pricePerUnit) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) return false;
    
    if (pricePerUnit <= 0) {
      player.tell('§cPrice must be positive!');
      return false;
    }
    
    const totalPrice = pricePerUnit * quantity;
    
    economy.sellingItems.push({
      itemId: itemId,
      quantity: quantity,
      pricePerUnit: pricePerUnit,
      totalPrice: totalPrice,
      seller: playerName,
      listedAt: Date.now(),
      active: true
    });
    
    player.tell(`§a✓ Listed ${quantity}x ${itemId} for ${pricePerUnit} MBAQ each (Total: ${totalPrice} MBAQ)`);
    
    return true;
  },
  
  // Buy item from market
  buyItem(player, itemId, quantity, maxPricePerUnit) {
    const playerName = player.username;
    const economy = this.playerEconomy[playerName];
    
    if (!economy) return false;
    
    // Find matching selling items
    let totalCost = 0;
    let itemsBought = 0;
    
    for (let listing of this.playerEconomy[playerName].sellingItems) {
      if (listing.itemId === itemId && listing.active && listing.pricePerUnit <= maxPricePerUnit) {
        const canBuy = Math.min(quantity - itemsBought, listing.quantity);
        totalCost += canBuy * listing.pricePerUnit;
        itemsBought += canBuy;
        
        if (canBuy >= listing.quantity) {
          listing.active = false;
        } else {
          listing.quantity -= canBuy;
        }
        
        if (itemsBought >= quantity) break;
      }
    }
    
    if (itemsBought === 0) {
      player.tell('§cNo matching items found in market!');
      return false;
    }
    
    if (totalCost > economy.cash) {
      player.tell(`§cInsufficient funds! You need ${totalCost} MBAQ`);
      return false;
    }
    
    // Process purchase
    economy.cash -= totalCost;
    economy.totalSpent += totalCost;
    economy.completedTrades++;
    
    player.tell(`§a✓ Purchased ${itemsBought}x ${itemId} for ${totalCost} MBAQ`);
    
    return true;
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSACTION HISTORY
  // ═══════════════════════════════════════════════════════════════════════════
  
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
  
  // Get transaction history
  getTransactionHistory(playerName, limit = 10) {
    const economy = this.playerEconomy[playerName];
    
    if (!economy) return [];
    
    return economy.transactions.slice(-limit).reverse();
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DISPLAY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
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
    player.tell('§b╠════════════════════════════════════════╣');
    player.tell(`§b║ §aInterest Earned: §f${economy.totalInterestEarned} MBAQ§b`);
    player.tell(`§b║ §aCompleted Trades: §f${economy.completedTrades}§b`);
    player.tell('§b╚════════════════════════════════════════╝');
    player.tell('§f');
  },
  
  // Display market info
  displayMarketInfo(player) {
    const totalTransactions = this.market.transactions.length;
    const totalVolume = this.market.transactions.reduce((sum, t) => sum + t.amount, 0);
    
    player.tell('§f');
    player.tell('§6╔════════════════════════════════════════╗');
    player.tell('§6║         §e📊 MARKET STATISTICS§6        ║');
    player.tell('§6╠════════════════════════════════════════╣');
    player.tell(`§6║ §eTotalTransactions: §f${totalTransactions}§6`);
    player.tell(`§6║ §eMarket Volume: §f${totalVolume} MBAQ§6`);
    player.tell(`§6║ §eTax Rate: §f${(this.CONFIG.TAX_RATE * 100)}%§6`);
    player.tell('§6║ §eActive Listings: §f' + this.market.totalVolume + '§6');
    player.tell('§6╚════════════════════════════════════════╝');
    player.tell('§f');
  },
  
  // Display richest players
  displayRichest(limit = 10) {
    const players = Object.entries(this.playerEconomy)
      .map(([name, econ]) => ({
        name: name,
        total: econ.cash + econ.bankBalance
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
    
    return players;
  },
  
  // Get price for item
  getPrice(itemId) {
    return this.CONFIG.BASE_PRICES[itemId] || 50;
  }
};

// Export for other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedEconomy;
}

Logger.SUCCESS('✅ Advanced Economy System loaded');
