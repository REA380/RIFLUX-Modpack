// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║           RIFLUX MULTI-WORLD SYSTEM (v2.0)                               ║
// ║      Dimensions | Teleportation | Difficulty Scaling | Boss Arenas      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

const MultiWorldSystem = {
  // World configuration
  WORLDS: {
    OVERWORLD: {
      id: 'minecraft:overworld',
      name: 'Main Realm',
      description: '🌍 The starting realm with balanced difficulty',
      icon: '🌍',
      
      // Level requirements
      minLevel: 1,
      recommendedLevel: 10,
      maxRecommendedLevel: 100,
      
      // Difficulty scaling
      difficultyMultiplier: 1.0,
      
      // Mobs
      bosses: [
        {
          id: 'warden',
          name: 'The Warden',
          level: 50,
          health: 500,
          damage: 20,
          loot: ['riflux:essence_of_void', 'minecraft:diamond'],
          reward: { exp: 5000, mbaq: 1000 }
        }
      ],
      
      // Resources
      resources: [
        'minecraft:diamond',
        'minecraft:gold_ore',
        'minecraft:emerald',
        'minecraft:ancient_debris'
      ],
      
      // Waypoints
      waypoints: [
        { name: 'Spawn', x: 0, y: 64, z: 0 },
        { name: 'Village', x: 100, y: 64, z: 0 },
        { name: 'Dungeon', x: 200, y: 30, z: 200 }
      ]
    },
    
    NETHER: {
      id: 'minecraft:the_nether',
      name: 'Infernal Abyss',
      description: '🔥 A dangerous realm of fire and lava',
      icon: '🔥',
      
      minLevel: 20,
      recommendedLevel: 40,
      maxRecommendedLevel: 200,
      
      difficultyMultiplier: 2.5,
      
      bosses: [
        {
          id: 'nether_demon',
          name: 'Infernal Demon',
          level: 75,
          health: 800,
          damage: 35,
          loot: ['riflux:spell_tome_fire', 'minecraft:blaze_rod'],
          reward: { exp: 10000, mbaq: 2500 }
        }
      ],
      
      resources: [
        'minecraft:blaze_rod',
        'minecraft:ghast_tear',
        'minecraft:magma_block'
      ],
      
      waypoints: [
        { name: 'Nether Hub', x: 0, y: 64, z: 0 },
        { name: 'Lava Castle', x: 300, y: 100, z: 300 },
        { name: 'Fortress', x: -200, y: 50, z: 0 }
      ]
    },
    
    END: {
      id: 'minecraft:the_end',
      name: 'The Void',
      description: '🌌 The final frontier of reality',
      icon: '🌌',
      
      minLevel: 50,
      recommendedLevel: 100,
      maxRecommendedLevel: 500,
      
      difficultyMultiplier: 5.0,
      
      bosses: [
        {
          id: 'ender_dragon',
          name: 'Ender Dragon',
          level: 200,
          health: 2000,
          damage: 50,
          loot: ['minecraft:dragon_egg', 'riflux:rivlorix_shard'],
          reward: { exp: 50000, mbaq: 10000 }
        }
      ],
      
      resources: [
        'minecraft:ender_pearl',
        'minecraft:end_stone',
        'minecraft:obsidian'
      ],
      
      waypoints: [
        { name: 'Portal', x: 0, y: 64, z: 0 },
        { name: 'Dragon Arena', x: 0, y: 100, z: 0 },
        { name: 'End Cities', x: 1000, y: 100, z: 1000 }
      ]
    },
    
    TWILIGHT_FOREST: {
      id: 'twilightforest:twilight_forest',
      name: 'Twilight Grove',
      description: '🌳 An enchanted forest full of magic and mystery',
      icon: '🌳',
      
      minLevel: 15,
      recommendedLevel: 35,
      maxRecommendedLevel: 150,
      
      difficultyMultiplier: 1.8,
      
      bosses: [
        {
          id: 'twilight_lich',
          name: 'Twilight Lich',
          level: 80,
          health: 600,
          damage: 25,
          loot: ['riflux:spell_tome_ice', 'minecraft:mana_crystal'],
          reward: { exp: 8000, mbaq: 1500 }
        }
      ],
      
      resources: [
        'minecraft:glowstone',
        'minecraft:purpur_block',
        'twilightforest:twilight_wood'
      ],
      
      waypoints: [
        { name: 'Forest Entrance', x: 0, y: 64, z: 0 },
        { name: 'Troll Cavern', x: 200, y: 40, z: 100 },
        { name: 'Wizard Tower', x: 500, y: 150, z: 0 }
      ]
    },
    
    BLUE_SKIES: {
      id: 'blue_skies:everbright',
      name: 'Celestial Heights',
      description: '☀️ Floating islands in the clouds',
      icon: '☀️',
      
      minLevel: 30,
      recommendedLevel: 60,
      maxRecommendedLevel: 300,
      
      difficultyMultiplier: 3.0,
      
      bosses: [
        {
          id: 'sky_guardian',
          name: 'Sky Guardian',
          level: 120,
          health: 1000,
          damage: 40,
          loot: ['riflux:spell_tome_lightning', 'minecraft:cloud_block'],
          reward: { exp: 15000, mbaq: 3000 }
        }
      ],
      
      resources: [
        'blue_skies:cloud_wood',
        'minecraft:end_rod',
        'minecraft:amethyst'
      ],
      
      waypoints: [
        { name: 'Sky Tower', x: 0, y: 200, z: 0 },
        { name: 'Cloud City', x: 300, y: 180, z: 300 },
        { name: 'Celestial Temple', x: -500, y: 250, z: 0 }
      ]
    }
  },
  
  // Player world data
  playerWorlds: {},
  
  // Initialize player worlds
  initializeWorlds(player) {
    const playerName = player.username;
    
    if (!this.playerWorlds[playerName]) {
      this.playerWorlds[playerName] = {
        currentWorld: 'minecraft:overworld',
        discoveredWorlds: ['minecraft:overworld'],
        visitedWorlds: {
          'minecraft:overworld': Date.now()
        },
        unlockedWaypoints: {
          'minecraft:overworld': ['Spawn']
        },
        completedBosses: [],
        boastieDefeated: []
      };
    }
    
    return this.playerWorlds[playerName];
  },
  
  // Teleport player to world
  teleportToWorld(player, worldId) {
    const playerName = player.username;
    const worldData = this.playerWorlds[playerName];
    const worldConfig = Object.values(this.WORLDS).find(w => w.id === worldId);
    
    if (!worldConfig) {
      player.tell('§c❌ World not found!');
      return false;
    }
    
    // Check level requirement
    const playerLevel = AdvancedProgression.getPlayerStats(playerName)?.level || 1;
    if (playerLevel < worldConfig.minLevel) {
      player.tell(`§c❌ Requires level ${worldConfig.minLevel}! You are level ${playerLevel}`);
      return false;
    }
    
    // Unlock world if not discovered
    if (!worldData.discoveredWorlds.includes(worldId)) {
      worldData.discoveredWorlds.push(worldId);
      worldData.unlockedWaypoints[worldId] = [worldConfig.waypoints[0].name];
      player.tell(`§a✓ Discovered new world: §b${worldConfig.name}§a!`);
    }
    
    // Update current world
    worldData.currentWorld = worldId;
    worldData.visitedWorlds[worldId] = Date.now();
    
    player.tell('§f');
    player.tell('§b╔════════════════════════════════════════╗');
    player.tell(`§b║ §a✓ Teleporting to §b${worldConfig.name}§a...§b ║`);
    player.tell('§b║ §7────────────────────────────────────────§b');
    player.tell(`§b║ §aDifficulty: §f${(worldConfig.difficultyMultiplier * 100).toFixed(0)}%§b`);
    player.tell(`§b║ §aRecommended Level: §f${worldConfig.recommendedLevel}§b`);
    player.tell('§b╚════════════════════════════════════════╝');
    player.tell('§f');
    
    return true;
  },
  
  // Teleport to waypoint
  teleportToWaypoint(player, worldId, waypointName) {
    const playerName = player.username;
    const worldData = this.playerWorlds[playerName];
    const worldConfig = Object.values(this.WORLDS).find(w => w.id === worldId);
    
    if (!worldConfig) {
      player.tell('§c❌ World not found!');
      return false;
    }
    
    // Check if waypoint is unlocked
    if (!worldData.unlockedWaypoints[worldId] || !worldData.unlockedWaypoints[worldId].includes(waypointName)) {
      player.tell('§c❌ Waypoint not discovered!');
      return false;
    }
    
    const waypoint = worldConfig.waypoints.find(w => w.name === waypointName);
    
    if (!waypoint) {
      player.tell('§c❌ Waypoint not found!');
      return false;
    }
    
    // Teleport
    this.teleportToWorld(player, worldId);
    
    player.tell(`§a✓ Teleported to §b${waypointName}§a at (${waypoint.x}, ${waypoint.y}, ${waypoint.z})`);
    
    return true;
  },
  
  // Discover waypoint
  discoverWaypoint(player, waypointName) {
    const playerName = player.username;
    const worldData = this.playerWorlds[playerName];
    const currentWorldId = worldData.currentWorld;
    
    if (!worldData.unlockedWaypoints[currentWorldId]) {
      worldData.unlockedWaypoints[currentWorldId] = [];
    }
    
    if (!worldData.unlockedWaypoints[currentWorldId].includes(waypointName)) {
      worldData.unlockedWaypoints[currentWorldId].push(waypointName);
      player.tell(`§a✓ Discovered waypoint: §b${waypointName}§a!`);
      return true;
    }
    
    return false;
  },
  
  // Defeat boss
  defeatBoss(player, bossId) {
    const playerName = player.username;
    const worldData = this.playerWorlds[playerName];
    const currentWorldId = worldData.currentWorld;
    const worldConfig = this.WORLDS[Object.keys(this.WORLDS).find(key => this.WORLDS[key].id === currentWorldId)];
    
    if (!worldConfig) return false;
    
    const boss = worldConfig.bosses.find(b => b.id === bossId);
    
    if (!boss) {
      player.tell('§c❌ Boss not found!');
      return false;
    }
    
    // Check if already defeated
    if (worldData.completedBosses.includes(bossId)) {
      player.tell('§c❌ You already defeated this boss!');
      return false;
    }
    
    // Mark as defeated
    worldData.completedBosses.push(bossId);
    
    // Award rewards
    const progression = AdvancedProgression.getPlayerStats(playerName);
    const economy = AdvancedEconomy.playerEconomy[playerName];
    
    if (progression) {
      progression.bossesDef = (progression.bossesDef || 0) + 1;
      AdvancedProgression.addExperience(player, boss.reward.exp, 'boss');
    }
    
    if (economy) {
      economy.cash += boss.reward.mbaq;
    }
    
    player.tell('§f');
    player.tell('§c╔════════════════════════════════════════╗');
    player.tell(`§c║ §6⚔️ BOSS DEFEATED! ⚔️§c              ║`);
    player.tell(`§c║ §a${boss.name}§c                    ║`);
    player.tell('§c╠════════════════════════════════════════╣');
    player.tell(`§c║ §aRewards:§c`);
    player.tell(`§c║   §e+ ${boss.reward.exp} Experience`);
    player.tell(`§c║   §e+ ${boss.reward.mbaq} MBAQ`);
    boss.loot.forEach(item => {
      player.tell(`§c║   §e+ ${item}`);
    });
    player.tell('§c╚════════════════════════════════════════╝');
    player.tell('§f');
    
    return true;
  },
  
  // Display world info
  displayWorldInfo(player, worldId) {
    const worldConfig = Object.values(this.WORLDS).find(w => w.id === worldId);
    
    if (!worldConfig) {
      player.tell('§c❌ World not found!');
      return;
    }
    
    player.tell('§f');
    player.tell('§b╔════════════════════════════════════════════════╗');
    player.tell(`§b║ §e${worldConfig.icon} ${worldConfig.name.toUpperCase()}§b`);
    player.tell('§b╠════════════════════════════════════════════════╣');
    player.tell(`§b║ §a${worldConfig.description}§b`);
    player.tell(`§b║ §7────────────────────────────────────────────§b`);
    player.tell(`§b║ §aLevel Requirement: §f${worldConfig.minLevel}§b`);
    player.tell(`§b║ §aRecommended Level: §f${worldConfig.recommendedLevel}§b`);
    player.tell(`§b║ §aDifficulty: §f${(worldConfig.difficultyMultiplier * 100).toFixed(0)}%§b`);
    player.tell('§b║ §7────────────────────────────────────────────§b');
    player.tell('§b║ §aBosses:');
    worldConfig.bosses.forEach(boss => {
      player.tell(`§b║   §e${boss.name} (Lvl. ${boss.level}) - ${boss.reward.mbaq} MBAQ`);
    });
    player.tell('§b║ §7────────────────────────────────────────────§b');
    player.tell('§b║ §aWaypoints:');
    worldConfig.waypoints.forEach(wp => {
      player.tell(`§b║   §e${wp.name} (${wp.x}, ${wp.y}, ${wp.z})`);
    });
    player.tell('§b╚════════════════════════════════════════════════╝');
    player.tell('§f');
  },
  
  // Display all worlds
  displayAllWorlds(player) {
    player.tell('§f');
    player.tell('§6╔════════════════════════════════════════════════╗');
    player.tell('§6║ §e            AVAILABLE WORLDS§6              ║');
    player.tell('§6╠════════════════════════════════════════════════╣');
    
    Object.values(this.WORLDS).forEach(world => {
      player.tell(`§6║ §e${world.icon} ${world.name.toUpperCase()}§6`);
      player.tell(`§6║    §7${world.description}§6`);
      player.tell(`§6║    §eMin Level: §f${world.minLevel}§6 | §eRecommended: §f${world.recommendedLevel}§6`);
      player.tell('§6║ §7────────────────────────────────────────────§6');
    });
    
    player.tell('§6╚════════════════════════════════════════════════╝');
    player.tell('§f');
  }
};

// Export for other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MultiWorldSystem;
}

Logger.SUCCESS('✅ Multi-World System loaded');
