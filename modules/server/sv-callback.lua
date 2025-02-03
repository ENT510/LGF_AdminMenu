local function registerSyncLogs(data)
    TriggerClientEvent("LGF_DebugTool.syncLogs", data.Target or -1, {
        Message = data.Message,
        LogType = data.LogType
    })
end

exports("registerSyncLogs", registerSyncLogs)


lib.callback.register("LGF_DebugTool.NUI.manageActionResource", function(source, data)
    local success, err, resourceState
    local author = LGF.Core:GetName(source)

    if data.action == "Start" then
        success, err = pcall(function()
            StartResource(data.resource)
        end)
        resourceState = GetResourceState(data.resource)
    elseif data.action == "Stop" then
        success, err = pcall(function()
            StopResource(data.resource)
        end)
        resourceState = GetResourceState(data.resource)
    elseif data.action == "Restart" then
        success, err = pcall(function()
            StopResource(data.resource)
            Wait(2000)
            StartResource(data.resource)
        end)
        resourceState = GetResourceState(data.resource)
    end


    if not success then
        registerSyncLogs({
            Message = ("Error during resource action: %s"):format(err or "Unknown error"),
            LogType = "critical"
        })
    end


    if Config.Logs._ResourceManagerPrintEnabled then
        local Message = ("%s performed action %s for resource %s"):format(author, data.action, data.resource)
        local LogType = success and "success" or "warning"
        registerSyncLogs({ Message = Message, LogType = LogType })
    end

    return success, resourceState, author
end)



lib.callback.register("LGF_ToolDebug.NUI.handleAddItem", function(source, data)
    local ItemToAdd = data.itemHash
    local TargetID = type(data.playerId) == "number" and data.playerId or tonumber(data.playerId)
    local QuantityToAdd = data.quantity
    local authorName = LGF.Core:GetName(source)

    if not GetPlayerName(TargetID) then
        print(("Player %s is not Online"):format(TargetID))
        return false
    end

    local targetName = LGF.Core:GetName(TargetID)



    local success = Editable.inventoryAddItems({
        TargetID = TargetID,
        ItemHash = ItemToAdd,
        ItemQuantity = QuantityToAdd
    })


    if Config.Logs._AddItemLogsEnabled then
        local logMessage
        local logType
        if success then
            logMessage = ("Player %s successfully added %d of item %s to player %s"):format(authorName, QuantityToAdd,
                ItemToAdd, targetName)
            logType = "success"
        else
            logMessage = ("Failed to add %d of item %s to player %s by %s"):format(QuantityToAdd, ItemToAdd, targetName,
                authorName)
            logType = "error"
        end

        registerSyncLogs({ Message = logMessage, LogType = logType })
    end

    return success
end)

lib.callback.register("LGF_DebugTool.Logs.Logs", function(source, data, type)
    local author = LGF.Core:GetName(source)

    if type == "entity" then
        local coords = data.coords
        local logMessage = ("%s successfully spawned the entity model %s at coordinates [%.2f, %.2f, %.2f]"):format(
            author,
            data.model, coords.x, coords.y, coords.z
        )
        registerSyncLogs({ Message = logMessage, LogType = "success" })
    end


    if type == "accessPanel" then
        registerSyncLogs({
            Message = ("Player %s successfully accessed the panel"):format(author),
            LogType = "info"
        })
    end

    return true
end)



lib.callback.register("LGF_Scoreboard.GetAllPlayersData", function(source)
    local allPlayers = GetPlayers()
    local playersData = {}

    for i = 1, #allPlayers do
        local playerId = tonumber(allPlayers[i])
        local rpName = LGF.Core:GetName(playerId)
        local group = LGF.Core:GetGroup(playerId)

        playersData[#playersData + 1] = {
            targetID = playerId,
            playerName = rpName,
            group = group,
        }
    end

    return playersData
end)


lib.callback.register("LGF_DebugTool.getPlayerLists", function(source)
    local allPlayers = GetPlayers()
    local playersData = {}

    for i = 1, #allPlayers do
        local playerId = tonumber(allPlayers[i])
        local rpName = LGF.Core:GetName(playerId)
        local PlayerCoords = GetEntityCoords(GetPlayerPed(playerId))
        local FormattedCoords = { PlayerCoords.x, PlayerCoords.y, PlayerCoords.z }

        table.insert(playersData, {
            targetID = playerId,
            name = rpName,
            coords = FormattedCoords
        })
    end

    return playersData
end)

function isAllowed(source)
    local Identifier = LGF.Core:GetIdentifier(source)
    if SvConfig.AllowedPlayers[Identifier] then
        return true
    else
        return false
    end
end

lib.callback.register("LGF_DebugTool.isAllowedToOpenPanel", function(source)
    return isAllowed(source)
end)


lib.callback.register("LGF_DebugTool.allowedPageForPlayer", function(source)
    local Identifier = GetPlayerIdentifierByType(source, "license")
    local allowedPages = SvConfig.PanelPagesAllowed[Identifier]
    if not allowedPages then return false end
    return allowedPages
end)
