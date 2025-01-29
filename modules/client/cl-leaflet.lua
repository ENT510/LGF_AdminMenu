Map = {}

function Map.startRequestPlayers()
    local AllPlayers = lib.callback.await("LGF_DebugTool.getPlayerLists", false)

    if not AllPlayers or #AllPlayers == 0 then
        AllPlayers = {}
    end

    return AllPlayers
end

RegisterNUICallback("LGF_ToolDebug.NUI.reloadData", function(data, resultCallback)
    resultCallback({
        success = true,
        players = Map.startRequestPlayers()
    })
end)
