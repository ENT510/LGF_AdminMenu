Locale = {}

local Config = LGF:LuaLoader("shared/Config")

function Locale.GetLocale()
    local localeKey = Config.Locales

    local status, localeData = pcall(function()
        return require(("locale.locales.%s"):format(localeKey))
    end)

    if not status or not localeData then
        error(("Locale data is empty or missing for key: %s"):format(localeKey))
    end

    return localeData
end

function Locale.GetString(key)
    local localeData = Locale.GetLocale()

    if localeData[key] then
        return localeData[key]
    else
        print(("Missing key string: %s"):format(key))
        return key
    end
end
