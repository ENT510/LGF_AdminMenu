Dashboard = {}


function Dashboard.registerNewLogs(data)
    SendNUIMessage({
        action = "sendLogs",
        data = {
            Message = data.Message,
            LogType = data.LogType
        }
    })
end

RegisterNetEvent("__cfx_internal:serverPrint")
AddEventHandler("__cfx_internal:serverPrint", function(msg)
    if not Config.Logs._CFXprintEnabled then return end
    if msg == "" then return end
    Dashboard.registerNewLogs({ Message = msg, LogType = "cfx" })
end)

RegisterNetEvent("LGF_DebugTool.syncLogs", function(data)
    Dashboard.registerNewLogs({
        Message = data.Message,
        LogType = data.LogType
    })
end)

function Dashboard.getPlayersData()
    return lib.callback.await("LGF_Scoreboard.GetAllPlayersData", false)
end

function Dashboard.getEntityCount()
    local PedCounts = #GetGamePool("CPed")
    local ObjectCounts = #GetGamePool("CObject")
    local VehicleCounts = #GetGamePool("CVehicle")
    return {
        Peds = PedCounts,
        Objects = ObjectCounts,
        Vehicles = VehicleCounts
    }
end
