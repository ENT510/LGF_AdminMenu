fx_version 'cerulean'
game 'gta5'
version '1.0.1'
lua54 'yes'
author 'ENT510'

shared_scripts {
  'shared/Config.lua',
  'shared/Editable.lua',
  '@ox_lib/init.lua',
  'init.lua',
  'locale/init_locale.lua',
  'locale/locales/*.lua',
}

client_scripts {
  'modules/client/cl-nui.lua',
  'modules/client/cl-utils.lua',
  'modules/client/cl-entitySpawner.lua',
  'modules/client/cl-executor.lua',
  'modules/client/cl-raycast.lua',
  'modules/client/cl-resourceManager.lua',
  'modules/client/cl-inventoryItems.lua',
  'modules/client/cl-dashboard.lua',
  'modules/client/cl-debugger.lua',
  'modules/client/cl-leaflet.lua',
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  'modules/server/sv-config.lua',
  'modules/server/sv-callback.lua',
}

files {
  'web/build/index.html',
  'web/build/**/*',
}

ui_page 'web/build/index.html'

