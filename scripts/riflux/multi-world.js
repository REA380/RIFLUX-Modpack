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
      description: '🔥 A dangerous realm of fire and lava',
      icon: '🔥',
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
      description: '🌌 The final frontier of reality',
      icon: '🌌',
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
      player.tell('§c❌ World not found!');
      return false;
    }
    
    const playerLevel = AdvancedProgression.getPlayerStats(playerName)?.level || 1;
    if (playerLevel < worldConfig.minLevel) {
      player.tell(`§c❌ Requires level ${worldConfig.minLevel}!`);
      return false;
    }
    
    if (!worldData.discoveredWorlds.includes(worldId)) {
      worldData.discoveredWorlds.push(worldId);
    }
    
    worldData.currentWorld = worldId;
    
    player.tell('§f');
    player.tell('§b╔════════════════════════════════════════╗');
    player.tell(`§b║ §a✓ Teleporting to §b${worldConfig.name}§a...§b ║`);
    player.tell(`§b║ §aDifficulty: §f${(worldConfig.difficultyMultiplier * 100).toFixed(0)}%§b ║`);
    player.tell('§b╚════════════════════════════════════════╝');
    player.tell('§f');
    
    return true;
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
    });
    
    player.tell('§6╚════════════════════════════════════════════════╝');
    player.tell('§f');
  }
};

Logger.SUCCESS('✅ Multi-World System loaded');