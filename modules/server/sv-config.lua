SvConfig = {}

-- Identify the players authorized to access the panel by their 'license'
-- The key is the player's unique identifier (license), and the value is 'true' to grant access.
-- You can add the player's license based on the framework you're using (e.g., ESX, QB, etc.).

SvConfig.AllowedPlayers = {
    ["license:5c54fbccfc7d92223ebc3e63fec67771759a704a"] = true,
}

-- Switch using License directly

SvConfig.PanelPagesAllowed = {
    ["license:5c54fbccfc7d92223ebc3e63fec67771759a704a"] = {
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
