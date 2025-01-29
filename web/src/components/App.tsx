import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import Menu from "./Panel";

import "./index.scss";
import { fetchNui } from "../utils/fetchNui";

const App: React.FC = () => {
  const [panelVisible, setPanelVisible] = useState(false);
  const [resourceData, setResourceData] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [entityCounts, setEntityCounts] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [pagesAllowed, setPagesAllowed] = useState([]);

  useNuiEvent<any>("openTool", (data) => {
    setPanelVisible(data.Visible);
    setResourceData(data.ResourceData);
    setItemsList(data.ItemsList);
    setEntityCounts(data.EntityCount)
    setPlayersData(data.PlayersData)
    setPlayers(data.Players)
    setPagesAllowed(data.PagesAllowed)
  });

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (panelVisible && e.code === "Escape") {
        if (!isEnvBrowser()) {
          fetchNui("LGF_DebugTool:closePanel", {
            uiName: "openTool",
          });
        }
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [panelVisible]);

  return (
    <>
      <Menu
        visible={panelVisible}
        resourceData={resourceData}
        inventoryItems={itemsList}
        entityCounts={entityCounts}
        playersData={playersData}
        players={players}
        pagesAllowed={pagesAllowed}
      />

      {isEnvBrowser() && (
        <div style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
          <Button
            onClick={() => setPanelVisible((prev) => !prev)}
            variant="default"
            color="orange"
            style={{ marginBottom: 10, width: 150 }}
          >
            Toggle Panel
          </Button>
        </div>
      )}
    </>
  );
};

export default App;
