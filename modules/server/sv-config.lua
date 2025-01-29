SvConfig = {}

-- Identify the players authorized to access the panel by their 'license'
-- The key is the player's unique identifier (license), and the value is 'true' to grant access.
-- You can add the player's license based on the framework you're using (e.g., ESX, QB, etc.).

SvConfig.AllowedPlayers = {
    ["license:5c54fbccfc7d92223ebc3e63fec67771759a704a"] = true,
    ["license:7c89b9ef6eaad73e75fb271d2dc6f9b79c2633f1"] = true,
}

-- Based on Group Player
-- This configuration defines which pages of the panel are accessible to players
-- based on their group (e.g., "admin"). Each group has a list of pages it can access,
-- where `true` means the page is accessible, and `false` means the page is not.

SvConfig.PanelPagesAllowed = {
    ["admin"] = {
        ["dashboard"] = true,
        ["entitySpawner"] = true,
        ["executor"] = true,
        ["resourceManager"] = true,
        ["inventory"] = true,
        ["rapidAction"] = true,
        ["mapWorld"] = true,
        ["help"] = true,
    }
}



lib.versionCheck('ENT510/LGF_AdminMenu')
