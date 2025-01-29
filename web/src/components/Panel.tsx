import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Tabs,
  useMantineTheme,
  Text,
  Flex,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconPhoto,
  IconCode,
  IconTerminal,
  IconCreativeCommons,
  IconDeviceFloppy,
  IconBox,
  IconDashboard,
  IconArrowBack,
  IconBan,
  IconHelp,
  IconHelpHexagon,
} from "@tabler/icons-react";
import ExecutorConsole from "./executorConsole";
import EntitySpawner from "./entitySpawner";
import ResourceManager from "./resourceManager";
import InventoryItems from "./inventoryItems";
import Dashboard from "./dashboard";
import RapidActionMenu from "./rapidAction";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import MapCard from "./mapCard";
import Help from "./help";

interface ScoreboardProps {
  visible: boolean;
  resourceData: any;
  inventoryItems: any;
  entityCounts: any;
  playersData: any;
  players: any;
  pagesAllowed: any;
}

interface TabItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  disabled: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  visible,
  resourceData,
  inventoryItems,
  entityCounts,
  playersData,
  players,
  pagesAllowed,
}) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isTabsVisible, setIsTabsVisible] = useState<boolean>(true);
  const [shouldRenderContent, setShouldRenderContent] = useState<boolean>(true);
  const [logs, setLogs] = useState<
    {
      message: string;
      type: string;
      timestamp: string;
    }[]
  >([]);

  const theme = useMantineTheme();
  const previousTab = useRef<string>(activeTab);

  useNuiEvent<any>("sendLogs", (data) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = {
      message: data.Message,
      type: data.LogType,
      timestamp,
    };

    setLogs((prevLogs) => [...prevLogs, newLog]);
  });

  useEffect(() => {
    if (!visible) {
      setShouldRenderContent(false);
      setIsTabsVisible(false);
      setActiveTab("dashboard");
    } else {
      setShouldRenderContent(true);
      setIsTabsVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    if (previousTab.current === "rapidAction" && activeTab !== "rapidAction") {
      fetchNui("LGF_ToolDebug.NUI.activeTabDebugger", { entered: false });
      setIsTabsVisible(false);
      setTimeout(() => {
        setIsTabsVisible(true);
        setShouldRenderContent(true);
      }, 500);
    }

    if (activeTab === "rapidAction") {
      fetchNui("LGF_ToolDebug.NUI.activeTabDebugger", { entered: true });
      setShouldRenderContent(false);
    }

    previousTab.current = activeTab;
  }, [activeTab]);
  const tabsData: TabItem[] = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: <IconDashboard size="1rem" />,
      disabled: !pagesAllowed.dashboard, 
    },
    {
      value: "entitySpawner",
      label: "Entity Spawner",
      icon: <IconCreativeCommons size="1rem" />,
      disabled: !pagesAllowed.entitySpawner,
    },
    {
      value: "executor",
      label: "Code Runner",
      icon: <IconTerminal size="1rem" />,
      disabled: !pagesAllowed.executor, 
    },
    {
      value: "resourceManager",
      label: "Resource Manager",
      icon: <IconDeviceFloppy size="1rem" />,
      disabled: !pagesAllowed.resourceManager, 
    },
    {
      value: "inventory",
      label: "Inventory",
      icon: <IconBox size="1rem" />,
      disabled: !pagesAllowed.inventory,
    },
    {
      value: "rapidAction",
      label: "Entity Debug",
      icon: <IconCode size="1rem" />,
      disabled: !pagesAllowed.rapidAction, 
    },
    {
      value: "mapWorld",
      label: "Map World",
      icon: <IconPhoto size="1rem" />,
      disabled: !pagesAllowed.mapWorld,
    },
    {
      value: "help",
      label: "Help",
      icon: <IconHelpHexagon size="1rem" />,
      disabled: !pagesAllowed.help,
    },
  ];

  // USE THE TABS DATA DOWN HERE IN BROWSER
  //   const tabsData: TabItem[] = [
  //   {
  //     value: "dashboard",
  //     label: "Dashboard",
  //     icon: <IconDashboard size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "entitySpawner",
  //     label: "Entity Spawner",
  //     icon: <IconCreativeCommons size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "executor",
  //     label: "Code Runner",
  //     icon: <IconTerminal size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "resourceManager",
  //     label: "Resource Manager",
  //     icon: <IconDeviceFloppy size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "inventory",
  //     label: "Inventory",
  //     icon: <IconBox size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "rapidAction",
  //     label: "Entity Debug",
  //     icon: <IconCode size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "mapWorld",
  //     label: "Map World",
  //     icon: <IconPhoto size="1rem" />,
  //     disabled: false
  //   },
  //   {
  //     value: "help",
  //     label: "Help",
  //     icon: <IconHelpHexagon size="1rem" />,
  //     disabled: false
  //   },
  // ];
  const menuWidth = activeTab === "rapidAction" ? "500px" : "1450px";
  const menuLeft = activeTab === "rapidAction" ? `15%` : "50%";

  return (
    <div
      className={`container ${visible ? "slide-in" : "slide-out"}`}
      style={{
        width: menuWidth,
        opacity: visible ? 1 : 0,
        transition:
          "width 1.3s ease, opacity 0.4s ease, left 1.3s ease, height 1.3s ease",
        left: menuLeft,
        height: activeTab === "rapidAction" ? "400px" : "810px",
      }}
    >
      {activeTab === "rapidAction" && (
        <Tooltip
          withinPortal
          color="dark"
          radius="md"
          label="Back to Dashboard"
          position="bottom"
        >
          <ActionIcon
            onClick={() => setActiveTab("dashboard")}
            variant="light"
            style={{
              border: "3px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgba(55, 65, 81, 0.85)",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            color="teal"
            size={40}
            radius="md"
          >
            <IconArrowBack size={23} />
          </ActionIcon>
        </Tooltip>
      )}

      {activeTab !== "rapidAction" && (
        <div className="sidebar left">
          <Flex
            gap="xs"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Avatar
              src="https://avatars.githubusercontent.com/u/145626625?v=4"
              radius="sm"
              size={50}
              mb={4}
              style={{
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            />
            <Flex
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              <Text color="white" size="xs" weight={600}>
                ENT510
              </Text>
              <Text color="dimmed" size="xs">
                ID: 3
              </Text>
            </Flex>
          </Flex>

          {shouldRenderContent && isTabsVisible && (
            <Tabs
              orientation="vertical"
              value={activeTab}
              color="gray"
              onTabChange={setActiveTab}
              defaultValue="executor"
              styles={{
                tab: {
                  marginTop: 10,
                  padding: "15px 15px",
                  backgroundColor: "rgba(35, 45, 61, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#19212b",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  },
                  "&[data-active]": {
                    backgroundColor: "#19212b",
                    color: theme.white,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  },
                },
                tabsList: {
                  padding: "10px",
                },
              }}
            >
              <Tabs.List>
                {tabsData.map((tab) => (
                  <Tabs.Tab
                    disabled={tab.disabled}
                    key={tab.value}
                    value={tab.value}
                    icon={tab.disabled ? <IconBan size={23} /> : tab.icon}
                  >
                    {tab.disabled ? "Access Denied" : tab.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
          )}
        </div>
      )}

      <div className="tab-content">
        {activeTab === "executor" && <ExecutorConsole />}
        {activeTab === "entitySpawner" && <EntitySpawner />}
        {activeTab === "resourceManager" && (
          <ResourceManager resourceData={resourceData} />
        )}
        {activeTab === "mapWorld" && (
          <MapCard players={players} visible={visible} />
        )}
        {activeTab === "inventory" && <InventoryItems items={inventoryItems} />}
        {shouldRenderContent && activeTab === "dashboard" && (
          <Dashboard
            logs={logs}
            entityCount={entityCounts}
            playersData={playersData}
          />
        )}
        {activeTab === "rapidAction" && <RapidActionMenu />}
        {activeTab === "help" && <Help />}
      </div>
    </div>
  );
};

export default Scoreboard;
