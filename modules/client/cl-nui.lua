NUI = {}
LocalPlayer.state.toolBusy = false

local keybind = lib.addKeybind({
  name = 'toggle_nui_state_tool+++',
  description = 'press ALT to active Nui Focus',
  defaultKey = 'LMENU',
  onPressed = function(self)
    if LocalPlayer.state.toolBusy and not (IsNuiFocused() or IsNuiFocusKeepingInput()) then
      NUI.setNuiFocus({ FocuseActive = true })
    end
    if Raycast.isInRaycasting() then
      Raycast.stopRaycastingDebug()
    end
  end,
})

function NUI.setNuiFocus(data)
  SetNuiFocus(data.FocuseActive, data.FocuseActive)
end

function NUI.toggleUI(action, data)
  if data.Visible == true and LocalPlayer.state.toolBusy then return end
  LocalPlayer.state.toolBusy = data.Visible
  NUI.setNuiFocus({ FocuseActive = data.Visible })
  SendNUIMessage({ action = action, data = data })
end

function NUI.closeTool()
  NUI.toggleUI("openTool", {
    Visible = false,
    ResourceData = Resource.getResourceData(),
    ItemsList = Editable.inventoryGetItems(),
    EntityCount = Dashboard.getEntityCount(),
    PlayersData = Dashboard.getPlayersData(),
    Players = Map.startRequestPlayers(),
    PagesAllowed = Utils.getAllowedPage(),
  })

  if Raycast.isInRaycasting() then
    Raycast.stopRaycastingDebug()
  end
end

RegisterNuiCallback("LGF_DebugTool:closePanel", function(data, cb)
  NUI.closeTool()
  cb(true)
end)

exports("getStateTool", function()
  return LocalPlayer.state.toolBusy
end)



function NUI.togglePanel(state)
  if Config.Logs._AccessToolsEnabled then
    if state == true then
      lib.callback.await("LGF_DebugTool.Logs.Logs", false, {}, "accessPanel")
    end
  end


  local IsALlowed = Utils.getAllowedAccesPanel()

  if not IsALlowed then return end

  NUI.toggleUI("openTool", {
    Visible = state,
    ResourceData = Resource.getResourceData(),
    ItemsList = Editable.inventoryGetItems(),
    EntityCount = Dashboard.getEntityCount(),
    PlayersData = Dashboard.getPlayersData(),
    Players = Map.startRequestPlayers(),
    PagesAllowed = Utils.getAllowedPage(),
  })
end

RegisterCommand("de", function()
  NUI.togglePanel(true)
end)
