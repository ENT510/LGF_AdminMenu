local IsModelInCdimage = IsModelInCdimage

EntityHandler = {}
EntityHandler.entitySpawned = {}

RegisterNuiCallback("LGF_DebugTool.NUI.entitySpawner", function(data, cb)
    EntityHandler.createNewEntity({
        type = data.EntityType,
        model = data.EntityModel,
        color = data.EntityColor
    })
    cb(true)
end)

function EntityHandler.removeEntityFromTable(entity)
    for i, ent in ipairs(EntityHandler.entitySpawned) do
        if ent == entity then
            table.remove(EntityHandler.entitySpawned, i)
            break
        end
    end
end

function EntityHandler.isAllowedType(Entity)
    local AllowedType = { [1] = true, [2] = true, [3] = true, }

    local entityType = GetEntityType(Entity)
    if AllowedType[entityType] then
        return true
    else
        DeleteEntity(Entity)
        return false
    end
end

function EntityHandler.createNewEntity(data)
    local typeEntity = data.type
    local model = data.model
    local color = (data.type == "vehicle" and data.color) or {}

    if not IsModelInCdimage(model) then return end

    NUI.closeTool()
    Wait(1000)

    local Coords, Heading = Raycast.placeEntitySpawner({
        EntityType = typeEntity,
        Model = model,
        Color = color,
    })

    if not Coords then return end
    local FinalCoords = vec4(Coords.x, Coords.y, Coords.z, Heading)
    local Entity

    if typeEntity == "vehicle" then
        Entity = Utils.spawnVehicle({ Model = model, Coords = FinalCoords, Color = color })
    elseif typeEntity == "ped" then
        Entity = Utils.spawnPed({ Model = model, Coords = FinalCoords })
    elseif typeEntity == "object" then
        Entity = Utils.spawnObject({ Model = model, Coords = FinalCoords })
    end

    if not EntityHandler.isAllowedType(Entity) then return end

    EntityHandler.entitySpawned[#EntityHandler.entitySpawned + 1] = Entity

    if Config.Logs._EntitySpawnerEnabled then
        lib.callback.await("LGF_DebugTool.Logs.Logs", false, {
            model = model,
            coords = FinalCoords
        }, "entity")
    end

    exports.ox_target:addLocalEntity(Entity, {
        {
            icon = 'fa-solid fa-bong',
            label = 'Delete Entity',
            onSelect = function(data)
                local Entity = data.entity
                if DoesEntityExist(Entity) then
                    exports.ox_target:removeLocalEntity(Entity)
                    DeleteEntity(Entity)
                    EntityHandler.removeEntityFromTable(Entity)
                end
            end
        },
        {
            icon = 'fa-solid fa-bong',
            event = 'ox_target:debug',
            label = 'Debug Entity',
        },
    })
end

local deleteOnRestart = true

if deleteOnRestart then
    AddEventHandler("onResourceStop", function(resource)
        if cache.resource == resource then
            for i = #EntityHandler.entitySpawned, 1, -1 do
                local entity = EntityHandler.entitySpawned[i]
                if DoesEntityExist(entity) then
                    exports.ox_target:removeLocalEntity(entity)
                    DeleteEntity(entity)
                end
            end

            EntityHandler.entitySpawned = {}
        end
    end)
end
