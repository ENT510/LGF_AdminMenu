Raycast = {}
Raycast.isRaycasting = false
Raycast.currentPedHandle = nil



function Raycast.binderHelp()
    exports.LGF_Utility:interactionButton({
        Visible = true,
        Controls = {
            {
                key = "↶|↷",
                indexKey = 175,
                label = "Rotate",
                description = "Rotate the entity left or right."
            },
            {
                key = "X",
                indexKey = 73,
                label = "Cancel",
                description = "Cancel the entity's position."
            },
            {
                isMouse = true,
                key = "Left Click",
                indexKey = 18,
                label = "Place entity",
                description = "Place the entity where the raycast hits."
            },
            {
                key = "↑",
                indexKey = 172,
                label = "Raise",
                description = "Raise the entity upwards."
            },
            {
                key = "↓",
                indexKey = 173,
                label = "Lower",
                description = "Lower the entity downwards."
            },
            {
                key = "alt",
                indexKey = 19,
                label = "Use Alt",
                description = "Use the Alt key for more precise adjustments."
            }
        },
        Schema = {
            Styles = {
                Position = "top",
                Animation = "slide-down",
            },
        },
        onBindPressed = function(keyBind)
        end,
        onBindReleased = function(keyBind)
        end
    })
end

Raycast.placeEntitySpawner = function(data)
    local EntityType = data.EntityType
    local Model = lib.requestModel(data.Model)
    local Color = data.Color

    if not Model then return end

    local playerCoords = GetEntityCoords(cache.ped)
    local currentHeight = 0.0
    local slowRaiseSpeed = 0.01
    local fastRaiseSpeed = 0.1

    if EntityType == "ped" then
        Raycast.currentEntityInRaycast = CreatePed(4, Model, playerCoords.x, playerCoords.y, playerCoords.z, 0.0, false,
            true)
        FreezeEntityPosition(Raycast.currentEntityInRaycast, true)
        SetEntityAlpha(Raycast.currentEntityInRaycast, 170, false)
        SetEntityCollision(Raycast.currentEntityInRaycast, false, true)
        SetModelAsNoLongerNeeded(Model)
    elseif EntityType == "vehicle" then
        Raycast.currentEntityInRaycast = CreateVehicle(Model, playerCoords.x, playerCoords.y, playerCoords.z, 0.0, false,
            true)
        SetEntityAlpha(Raycast.currentEntityInRaycast, 170, false)
        SetEntityCollision(Raycast.currentEntityInRaycast, false, true)
        SetVehicleOnGroundProperly(Raycast.currentEntityInRaycast)
        SetModelAsNoLongerNeeded(Model)
        Utils.setVehicleColor(Color, Raycast.currentEntityInRaycast)
    elseif EntityType == "object" then
        Raycast.currentEntityInRaycast = CreateObject(Model, playerCoords.x, playerCoords.y, playerCoords.z, false, true,
            true)

        SetEntityAlpha(Raycast.currentEntityInRaycast, 170, false)
        SetEntityCollision(Raycast.currentEntityInRaycast, false, true)
        FreezeEntityPosition(Raycast.currentEntityInRaycast, true)
        SetModelAsNoLongerNeeded(Model)
    end

    Raycast.isRaycasting = true
    Raycast.binderHelp()

    while true do
        local hit, entityHit, coords, surface, hash = lib.raycast.cam(511, 7, 15)
        DisableControlAction(0, 24, true)

        if hit then
            SetEntityCoords(Raycast.currentEntityInRaycast, coords.x, coords.y, coords.z + currentHeight)
        end

        local placingEntityHeading = GetEntityHeading(Raycast.currentEntityInRaycast)

        if IsControlPressed(0, 174) then
            SetEntityHeading(Raycast.currentEntityInRaycast, placingEntityHeading - 1.5)
        end

        if IsControlPressed(0, 175) then
            SetEntityHeading(Raycast.currentEntityInRaycast, placingEntityHeading + 1.5)
        end

        if IsControlPressed(0, 19) then
            if IsControlPressed(0, 172) then
                currentHeight = currentHeight + slowRaiseSpeed
            end
            if IsControlPressed(0, 173) then
                currentHeight = currentHeight - slowRaiseSpeed
            end
        else
            if IsControlPressed(0, 172) then
                currentHeight = currentHeight + fastRaiseSpeed
            end
            if IsControlPressed(0, 173) then
                currentHeight = currentHeight - fastRaiseSpeed
            end
        end

        if IsControlJustPressed(0, 18) then
            exports.LGF_Utility:closeInteraction()
            DeleteEntity(Raycast.currentEntityInRaycast)
            Raycast.isRaycasting = false
            return coords, placingEntityHeading
        end

        if IsControlJustPressed(0, 73) then
            exports.LGF_Utility:closeInteraction()
            DeleteEntity(Raycast.currentEntityInRaycast)
            Raycast.isRaycasting = false
            Wait(0)
            NUI.togglePanel(true)
            return nil
        end
    end
end


local raycastActive = false
local lastHitEntity = nil

Raycast.setEntityDraw = function(entity, color, state)
    if state then
        SetEntityDrawOutline(entity, true)
        SetEntityDrawOutlineColor(color.r, color.g, color.b, color.a)
        SetEntityDrawOutlineShader(0)
    else
        SetEntityDrawOutline(entity, false)
    end
end

local keybind = lib.addKeybind({
    name = 'delete_entity_ray_+++',
    description = 'press X to delete entity Hitted',
    defaultKey = 'X',
    onPressed = function(self)
        if Raycast.isInRaycasting() then
            if lastHitEntity then
                SetEntityAsMissionEntity(lastHitEntity, true, true)
                DeleteEntity(lastHitEntity)
            end
        end
    end,
})


Raycast.startRaycastingDebug = function(callback)
    local raycastResult = {}
    raycastActive = true
    while true do
        Wait(0)
        Raycast.isRaycasting = true


        local hit, entityHit, hitcoords, surfaceNormal = LGF.RaycastHandler:performRaycast(70.0, true, false)
        local playerCoords = GetEntityCoords(cache.ped)
        local lineColor = { r = 0, g = 255, b = 0, a = 255 }


        local distance = Vdist(playerCoords.x, playerCoords.y, playerCoords.z, hitcoords.x, hitcoords.y, hitcoords.z)
        if distance <= 70.0 then
            if entityHit then
                lineColor = { r = 255, g = 0, b = 0, a = 255 }
            end

            DrawLine(playerCoords.x, playerCoords.y, playerCoords.z, hitcoords.x, hitcoords.y, hitcoords.z, lineColor.r,
                lineColor.g, lineColor.b, lineColor.a)
        end


        local archetypeName = "No Hit Entity"
        local modelHash = "Unknown Hash"

        if entityHit then
            if entityHit ~= lastHitEntity then
                if lastHitEntity then
                    Raycast.setEntityDraw(lastHitEntity, { r = 255, g = 0, b = 0, a = 255 }, false)
                end

                if (GetEntityType(entityHit) == 2) then
                    Raycast.setEntityDraw(entityHit, { r = 255, g = 0, b = 0, a = 255 }, true)
                elseif (GetEntityType(entityHit) == 3) then
                    Raycast.setEntityDraw(entityHit, { r = 255, g = 0, b = 0, a = 255 }, true)
                end


                lastHitEntity = entityHit
            end

            local success, result = pcall(function() return GetEntityArchetypeName(entityHit) end)
            if success then
                archetypeName = result or "Unknown Archetype"
            end
            modelHash = GetEntityModel(entityHit)
        else
            if lastHitEntity then
                Raycast.setEntityDraw(lastHitEntity, { r = 255, g = 0, b = 0, a = 255 }, false)
                lastHitEntity = nil
            end
        end

        local roundedHitcoords = {
            x = LGF.math:round(hitcoords.x, 2),
            y = LGF.math:round(hitcoords.y, 2),
            z = LGF.math:round(hitcoords.z, 2)
        }

        raycastResult = {
            coords = roundedHitcoords,
            archetype = archetypeName,
            modelHash = modelHash,
            entity = entityHit and entityHit or "no Entity"
        }

        callback(raycastResult)

        DisableControlAction(0, 24, true)


        if raycastActive == false then
            if lastHitEntity then
                Raycast.setEntityDraw(lastHitEntity, { r = 255, g = 0, b = 0, a = 255 }, false)
                lastHitEntity = nil
            end
            break
        end
    end
end


Raycast.stopRaycastingDebug = function()
    raycastActive = false
end

Raycast.isInRaycasting = function()
    return raycastActive
end
