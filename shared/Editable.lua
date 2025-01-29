Editable = {}

--- @param image string - The URL of the item's image
--- @param id string - The item's unique ID (same as hash)
--- @param hash string - The item spawn hashname
--- @param name string - The display name of the item
--- @return table[]? - A sorted list of item objects:

Editable.inventoryGetItems = function()
    if GetResourceState("ox_inventory"):find("start") then
        local itemNames = {}
        for item, data in pairs(exports.ox_inventory:Items()) do
            itemNames[#itemNames + 1] = {
                name = data.label,
                hash = item,
                image = ("nui://ox_inventory/web/images/%s.png"):format(item),
                id = item
            }
        end

        table.sort(itemNames, function(a, b)
            return a.name < b.name
        end)

        return itemNames
    end

    if GetResourceState("qb-inventory"):find("start") then
   
    end
end

--- @param data table - The data for adding an item to the player's inventory
--- @param data.TargetID number - The player ID to whom the item will be added
--- @param data.ItemHash string - The hash (identifier) of the item to be added
--- @param data.ItemQuantity number - The quantity of the item to be added
--- @return boolean - Returns `true` if the item was successfully added, otherwise `false`

Editable.inventoryAddItems = function(data)
    if GetResourceState("ox_inventory"):find("start") then
        local success = exports.ox_inventory:AddItem(data.TargetID, data.ItemHash, data.ItemQuantity)
        return success
    end
    if GetResourceState("qb-inventory"):find("start") then
        local success = exports['qb-inventory']:AddItem(data.TargetID, data.ItemHash, data.ItemQuantity)
        return success
    end
end
