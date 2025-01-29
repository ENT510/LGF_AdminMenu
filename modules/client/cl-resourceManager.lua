Resource = {}

function Resource.getResourceData()
    local resourceList = {}

    for i = 0, GetNumResources() - 1 do
        local resource_name = GetResourceByFindIndex(i)
        if resource_name then
            local resource_state            = GetResourceState(resource_name)
            local resource_version          = GetResourceMetadata(resource_name, 'version', 0) or 'Unknown'
            local resource_author           = GetResourceMetadata(resource_name, 'author') or 'Unknown'

            local resource_data             = {
                name    = resource_name,
                status  = resource_state,
                version = resource_version,
                author  = resource_author,
            }
            resourceList[#resourceList + 1] = resource_data
        end
    end
    return resourceList
end

RegisterNuiCallback("LGF_DebugTool:NUI.handleActionResource", function(data, cb)

    local success, resourceState, author = lib.callback.await("LGF_DebugTool.NUI.manageActionResource", false, data)


    cb({ success = success, status = resourceState })
end)
