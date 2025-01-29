-- Need to Revision this Code Part

RegisterNUICallback("LGF_DebugTool.NUI.runCode", function(data, cb)
    local finalResult = ""
    local result = ""

    if not data or not data.codeToRun or data.codeToRun == "" then
        cb({ success = false, message = "No code provided" })
        return
    end

    local old_print = print
    print = function(...)
        local args = { ... }
        for i = 1, #args do
            finalResult = finalResult .. tostring(args[i]) .. "\t"
        end
    end

    local func, err = load(data.codeToRun)

    if not func then
        cb({ success = false, message = err })
        print = old_print
        return
    end

    local success, res = pcall(func)

    if success then
        result = res or "No result returned"
        cb({
            success = true,
            message = finalResult ~= "" and finalResult or ("Executing code successfully. Result: %s"):format(result)
        })
    else
        cb({
            success = false,
            message = ("Executing code failed. Error: %s"):format(res)
        })
    end

    print = old_print
end)
