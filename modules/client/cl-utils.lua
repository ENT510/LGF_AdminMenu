Utils = {}


function Utils.setVehicleColor(Color, entity)
    local r = Color.r
    local g = Color.g
    local b = Color.b

    SetVehicleCustomPrimaryColour(entity, r, g, b)
    SetVehicleCustomSecondaryColour(entity, r, g, b)
end

function Utils.spawnVehicle(data)
    local model = data.Model
    local coords = data.Coords
    local color = data.Color

    local vehicleModel = lib.requestModel(model)
    if not vehicleModel then return end
    local vehicle = CreateVehicle(vehicleModel, coords.x, coords.y, coords.z, coords.w, false, true)

    local ress = lib.waitFor(function()
        NetworkRegisterEntityAsNetworked(vehicle)
        SetVehicleOnGroundProperly(vehicle)
        SetEntityAsMissionEntity(vehicle, true, true)
        return NetworkGetNetworkIdFromEntity(vehicle) ~= 0
    end, "Timeout during vehicle creation.", 4000)

    if color then
        Utils.setVehicleColor(color, vehicle)
    end

    SetEntityVisible(vehicle, true, false)
    SetModelAsNoLongerNeeded(vehicleModel)

    return vehicle
end

function Utils.spawnPed(data)
    local model = data.Model
    local coords = data.Coords
    local pedModel = lib.requestModel(model)
    if not pedModel then return end
    local ped = CreatePed(4, pedModel, coords.x, coords.y, coords.z, coords.w, false, true)
    SetEntityAsMissionEntity(ped, true, true)
    SetEntityVisible(ped, true, false)
    SetModelAsNoLongerNeeded(pedModel)
    FreezeEntityPosition(ped, true)
    SetBlockingOfNonTemporaryEvents(ped, true)
    SetEntityInvincible(ped, true)

    return ped
end

function Utils.spawnObject(data)
    local model = data.Model
    local coords = data.Coords
    local objectModel = lib.requestModel(model)
    if not objectModel then return end
    local object = CreateObject(objectModel, coords.x, coords.y, coords.z, true, false, true)
    SetEntityHeading(object, coords.w)
    FreezeEntityPosition(object, true)
    SetEntityAsMissionEntity(object, true, true)
    SetEntityVisible(object, true, false)
    SetModelAsNoLongerNeeded(objectModel)


    return object
end

function Utils.getEntityType(entity)
    local entityType = GetEntityType(entity)


    if entityType == 1 then
        return "ped"
    elseif entityType == 2 then
        return "vehicle"
    elseif entityType == 3 then
        return "object"
    else
        return "unknown"
    end
end

function Utils.getAllowedPage()
    return lib.callback.await("LGF_DebugTool.allowedPageForPlayer", false)
end

function Utils.getAllowedAccesPanel()
    return lib.callback.await("LGF_DebugTool.isAllowedToOpenPanel", false)
end
