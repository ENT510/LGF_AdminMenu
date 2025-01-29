RegisterNuiCallback("LGF_ToolDebug.NUI.handleAddItem", function(data, cb)
    data.coords = GetEntityCoords(cache.ped)
    local successs = lib.callback.await("LGF_ToolDebug.NUI.handleAddItem", false, data)
    cb({ success = successs, })
end)

