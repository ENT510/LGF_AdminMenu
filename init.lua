if not GetResourceState("LGF_Utility"):find("start") then
    warn("missing LGF_Utility or is not started")
    return
end

LGF = exports.LGF_Utility:UtilityData()

Init = {}

if LGF:GetContext() == "client" then
    Init.setNotify = function(title, message, duration, type, position)
        lib.notify({
            title = title,
            description = message,
            type = type,
            duration = duration or 5000,
            position = position or 'top-right',
        })
    end
else
    Init.setNotify = function(title, message, duration, type, position, source)
        TriggerClientEvent('ox_lib:notify', source, {
            title = title,
            description = message,
            type = type,
            duration = duration or 5000,
            position = position or 'top-right',
        })
    end
end
