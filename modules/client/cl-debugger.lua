RegisterNUICallback("LGF_ToolDebug.NUI.activeTabDebugger", function(data, cb)
    cb(true)

    if data.entered then
        NUI.setNuiFocus({ FocuseActive = false })
        Wait(1000)
        Raycast.startRaycastingDebug(function(raycastResult)
            raycastResult.entityType = Utils.getEntityType(raycastResult.entity)
            SendNUIMessage({
                action = "updateValueEntity",
                data = raycastResult
            })
        end)
    else
        CreateThread(function()
            Raycast.stopRaycastingDebug()
        end)

        NUI.setNuiFocus({ FocuseActive = true })
    end
end)


RegisterNUICallback("LGF_ToolDebug.NUI.handleDebugAction", function(data, cb)
    local Action = data.action
    local Value = data.value

    if type(Value) == "table" then
        Value = json.encode(Value)
    end

    if Action == "copy" then
        lib.setClipboard(Value)
    end

    cb(true)
end)
