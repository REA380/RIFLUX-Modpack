// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║             RIFLUX INTEGRATED SYSTEMS & COMMANDS (v3.0)                   ║
// ║          Master Controller | Events | Commands | Integration              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ═══════════════════════════════════════════════════════════════════════════════
// PLAYER INITIALIZATION - Integrate all systems
// ═══════════════════════════════════════════════════════════════════════════════

ServerEvents.playerLogged(event => {
  const player = event.player;
  const playerName = player.username;
  
  Logger.INFO(`🎮 ${playerName} logged in`);
  
  // Initialize all systems
  AdvancedProgression.initializePlayer(player);
  AdvancedEconomy.initializeEconomy(player);
  MultiWorldSystem.initializeWorlds(player);
  
  // Welcome message
  player.tell('§f');
  player.tell('§6╔════════════════════════════════════════════════════════════════╗');
  player.tell('§6║                                                                ║');
  player.tell('§6║                   §b✨ RIFLUX ✨§6                              ║');
  player.tell('§6║                 §eInfinite Ascension§6                         ║');
  player.tell('§6║                                                                ║');
  player.tell('§6╠════════════════════════════════════════════════════════════════╣');
  player.tell('§6║ §aWelcome back, §b' + playerName + '§a!');
  player.tell('§6║ §eType §b/riflux help §efor commands');
  player.tell('§6║ §7────────────────────────────────────────────────────────────§6');
  player.tell('§6║ §eStatus:');
  
  const stats = AdvancedProgression.getPlayerStats(playerName);
  const economy = AdvancedEconomy.playerEconomy[playerName];
  const classInfo = AdvancedClassSystem.playerClasses[playerName];
  
  player.tell('§6║ §aLevel: §f' + (stats?.level || 1) + ' §7| §aBalance: §f' + (economy?.cash || 100) + ' MBAQ §7| §aClass: §f' + (classInfo?.name || 'Unassigned'));
  player.tell('§6╚════════════════════════════════════════════════════════════════╝');
  player.tell('§f');
});

// ═══════════════════════════════════════════════════════════════════════════════
// MOB KILL SYSTEM - Integrate Experience & Economy
// ═══════════════════════════════════════════════════════════════════════════════

ServerEvents.entityKilled(event => {
  const entity = event.entity;
  const source = event.source;
  
  // Only reward player kills
  if (!source.player) return;
  
  const player = source.player;
  const playerName = player.username;
  const mobType = entity.type;
  
  // Get rewards
  const reward = AdvancedProgression.CONFIG.MOB_REWARDS[mobType] || { exp: 10, mbaq: 2 };
  
  // Add experience
  AdvancedProgression.addExperience(player, reward.exp, 'mob_kill');
  
  // Add money
  const economy = AdvancedEconomy.playerEconomy[playerName];
  if (economy) {
    economy.cash += reward.mbaq;
    economy.totalEarned += reward.mbaq;
  }
  
  // Update statistics
  const stats = AdvancedProgression.getPlayerStats(playerName);
  if (stats) {
    stats.mobsKilled = (stats.mobsKilled || 0) + 1;
  }
  
  Logger.INFO(`📊 ${playerName} killed ${mobType}: +${reward.exp} XP, +${reward.mbaq} MBAQ`);
});

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMMAND REGISTRY - All RIFLUX Commands
// ═══════════════════════════════════════════════════════════════════════════════

ServerEvents.commandRegistry(event => {
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /riflux - Main stats display
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('riflux')
      .executes(ctx => {
        const player = ctx.source.player;
        AdvancedProgression.displayStats(player);
        return 1;
      })
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /class - Class Management
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('class')
      .then(event.literal('list')
        .executes(ctx => {
          const player = ctx.source.player;
          AdvancedClassSystem.displayAllClasses(player);
          return 1;
        })
      )
      .then(event.literal('select')
        .argument('classname', event.arguments.string())
        .executes(ctx => {
          const player = ctx.source.player;
          const className = ctx.arguments.classname;
          AdvancedClassSystem.initializeClass(player, className);
          return 1;
        })
      )
      .then(event.literal('info')
        .executes(ctx => {
          const player = ctx.source.player;
          AdvancedClassSystem.displayClassInfo(player);
          return 1;
        })
      )
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /bank - Banking System
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('bank')
      .then(event.literal('balance')
        .executes(ctx => {
          const player = ctx.source.player;
          AdvancedEconomy.displayBalance(player);
          return 1;
        })
      )
      .then(event.literal('deposit')
        .argument('amount', event.arguments.integer(1))
        .executes(ctx => {
          const player = ctx.source.player;
          const amount = ctx.arguments.amount;
          AdvancedEconomy.deposit(player, amount);
          return 1;
        })
      )
      .then(event.literal('withdraw')
        .argument('amount', event.arguments.integer(1))
        .executes(ctx => {
          const player = ctx.source.player;
          const amount = ctx.arguments.amount;
          AdvancedEconomy.withdraw(player, amount);
          return 1;
        })
      )
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /transfer - Transfer money to other player
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('transfer')
      .argument('player', event.arguments.player())
      .argument('amount', event.arguments.integer(1))
      .executes(ctx => {
        const fromPlayer = ctx.source.player;
        const toPlayer = ctx.arguments.player.first();
        const amount = ctx.arguments.amount;
        
        if (!toPlayer) {
          fromPlayer.tell('§c❌ Player not found!');
          return 0;
        }
        
        const result = AdvancedEconomy.transferMoney(
          fromPlayer.username,
          toPlayer.username,
          amount
        );
        
        if (result.success) {
          fromPlayer.tell(`§a✓ ${result.message}`);
          toPlayer.tell(`§a✓ Received ${result.finalAmount} MBAQ from ${fromPlayer.username}`);
          return 1;
        } else {
          fromPlayer.tell(`§c❌ ${result.message}`);
          return 0;
        }
      })
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /world - World Management
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('world')
      .then(event.literal('list')
        .executes(ctx => {
          const player = ctx.source.player;
          MultiWorldSystem.displayAllWorlds(player);
          return 1;
        })
      )
      .then(event.literal('teleport')
        .argument('worldid', event.arguments.string())
        .executes(ctx => {
          const player = ctx.source.player;
          const worldId = ctx.arguments.worldid;
          MultiWorldSystem.teleportToWorld(player, worldId);
          return 1;
        })
      )
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /rebirth - Rebirth System
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('rebirth')
      .executes(ctx => {
        const player = ctx.source.player;
        const result = AdvancedProgression.rebirth(player);
        return result ? 1 : 0;
      })
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /riflux help - Display all commands
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('riflux')
      .then(event.literal('help')
        .executes(ctx => {
          const player = ctx.source.player;
          displayHelpMenu(player);
          return 1;
        })
      )
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /stats - Detailed statistics
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('stats')
      .then(event.literal('progression')
        .executes(ctx => {
          const player = ctx.source.player;
          AdvancedProgression.displayStats(player);
          return 1;
        })
      )
      .then(event.literal('economy')
        .executes(ctx => {
          const player = ctx.source.player;
          AdvancedEconomy.displayBalance(player);
          return 1;
        })
      )
      .then(event.literal('class')
        .executes(ctx => {
          const player = ctx.source.player;
          AdvancedClassSystem.displayClassInfo(player);
          return 1;
        })
      )
  );
  
  // ─────────────────────────────────────────────────────────────────────────────
  // /richest - Show richest players
  // ─────────────────────────────────────────────────────────────────────────────
  event.register(
    event.command('richest')
      .then(event.literal('10')
        .executes(ctx => {
          const player = ctx.source.player;
          const richest = AdvancedEconomy.displayRichest(10);
          
          player.tell('§f');
          player.tell('§6╔════════════════════════════════════════════════╗');
          player.tell('§6║          §e💰 TOP 10 RICHEST PLAYERS§6       ║');
          player.tell('§6╠════════════════════════════════════════════════╣');
          
          richest.forEach((entry, index) => {
            player.tell(`§6║ §e${String(index + 1).padEnd(2, ' ')}. §f${entry.name.padEnd(25, ' ')} §e${entry.total} MBAQ§6`);
          });
          
          player.tell('§6╚════════════════════════════════════════════════╝');
          player.tell('§f');
          
          return 1;
        })
      )
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function displayHelpMenu(player) {
  player.tell('§f');
  player.tell('§b╔═══════════════════════════════════════════════════════════════╗');
  player.tell('§b║                 §e📖 RIFLUX HELP MENU§b                      ║');
  player.tell('§b╠═══════════════════════════════════════════════════════════════╣');
  
  player.tell('§b║ §e📊 PROGRESSION COMMANDS:§b');
  player.tell('§b║   §f/riflux§7 - View your stats');
  player.tell('§b║   §f/rebirth§7 - Start new progression cycle (Lvl 100+)');
  
  player.tell('§b║ §e🎭 CLASS COMMANDS:§b');
  player.tell('§b║   §f/class list§7 - Show all classes');
  player.tell('§b║   §f/class select <name>§7 - Choose your class');
  player.tell('§b║   §f/class info§7 - View your class info');
  
  player.tell('§b║ §e💰 ECONOMY COMMANDS:§b');
  player.tell('§b║   §f/bank balance§7 - View your balance');
  player.tell('§b║   §f/bank deposit <amount>§7 - Deposit to bank');
  player.tell('§b║   §f/bank withdraw <amount>§7 - Withdraw from bank');
  player.tell('§b║   §f/transfer <player> <amount>§7 - Send money');
  player.tell('§b║   §f/richest 10§7 - See top 10 richest players');
  
  player.tell('§b║ §e🌍 WORLD COMMANDS:§b');
  player.tell('§b║   §f/world list§7 - Show all worlds');
  player.tell('§b║   §f/world teleport <worldid>§7 - Travel to world');
  
  player.tell('§b║ §e📈 STATS COMMANDS:§b');
  player.tell('§b║   §f/stats progression§7 - View level stats');
  player.tell('§b║   §f/stats economy§7 - View money stats');
  player.tell('§b║   §f/stats class§7 - View class stats');
  
  player.tell('§b╚═══════════════════════════════════════════════════════════════╝');
  player.tell('§f');
}

Logger.SUCCESS('✅ Integrated Systems & Commands loaded');
Logger.INFO('📡 All systems connected and synchronized');
