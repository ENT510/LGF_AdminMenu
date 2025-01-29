import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Image,
  Grid,
  ScrollArea,
  Tabs,
  Pagination,
  Tooltip,
  Badge,
  ColorSwatch,
} from "@mantine/core";
import { motion } from "framer-motion";
import { IconCar, IconUser, IconCube } from "@tabler/icons-react";
import { fetchNui } from "../utils/fetchNui";

import vehicleData from "../data/vehicle.json";
import pedData from "../data/ped.json";
import objectData from "../data/object.json";

const EntitySpawner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("vehicle");
  const [value, setValue] = useState<number>(1);
  const itemsPerPage = activeTab === "ped" ? 16 : 8;
  const [data, setData] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setData([]);
    if (activeTab === "vehicle") {
      setData(vehicleData);
    } else if (activeTab === "ped") {
      setData(pedData);
    } else if (activeTab === "object") {
      setData(objectData);
    }

    setValue(1);
  }, [activeTab]);

  const handleSpawnEntity = (
    entityType: string,
    entity: any,
    color: string
  ) => {
    const matches = color.match(/\d+/g);

    if (matches) {
      const [r, g, b] = matches.slice(0, 3).map((val) => parseInt(val, 10));

      fetchNui("LGF_DebugTool.NUI.entitySpawner", {
        EntityType: entityType,
        EntityModel: entity.model,
        EntityColor: entityType === "vehicle" ? { r, g, b } : undefined,
      });
    } else {
      console.error("Invalid color format:", color);
    }
  };

  const handleColorSelect = (color: string, entityId: string) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [entityId]: color,
    }));
  };

  const renderEntities = (entityType: string) => {
    const startIndex = (value - 1) * itemsPerPage;
    const paginatedEntities = data.slice(startIndex, startIndex + itemsPerPage);

    return (
      <ScrollArea offsetScrollbars scrollbarSize={0} h={720}>
        <Grid gutter="xs">
          {paginatedEntities.map((entity) => (
            <Grid.Col span={activeTab === "vehicle" ? 6 : 3} key={entity.id}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  style={{
                    backgroundColor: "rgba(35, 45, 61, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                  }}
                  shadow="sm"
                  radius="md"
                  padding="xs"
                >
                  {entityType === "vehicle" && entity.class && (
                    <Badge
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "15px",
                      }}
                      size="xs"
                      radius="xs"
                      color="teal"
                      variant="dot"
                    >
                      {entity.class}
                    </Badge>
                  )}

                  {entityType === "vehicle" && (
                    <Group
                      spacing="xs"
                      position="left"
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 15,
                        zIndex: 10,
                      }}
                    >
                      <ColorSwatch
                        onClick={() =>
                          handleColorSelect("rgba(255, 0, 0, 0.5)", entity.id)
                        }
                        radius="sm"
                        color="rgba(255, 0, 0, 0.5)"
                        style={{
                          cursor: "pointer",
                          transform:
                            selectedColors[entity.id] === "rgba(255, 0, 0, 0.5)"
                              ? "scale(1.2)"
                              : "scale(1)",
                          transition: "transform 0.1s ease",
                        }}
                      />

                      <ColorSwatch
                        onClick={() =>
                          handleColorSelect("rgba(0, 0, 0, 0.8)", entity.id)
                        }
                        radius="sm"
                        color="rgba(0, 0, 0, 0.8)"
                        style={{
                          cursor: "pointer",
                          transform:
                            selectedColors[entity.id] === "rgba(0, 0, 0, 0.8)"
                              ? "scale(1.2)"
                              : "scale(1)",
                          transition: "transform 0.1s ease",
                        }}
                      />

                      <ColorSwatch
                        onClick={() =>
                          handleColorSelect(
                            "rgba(255, 255, 255, 0.8)",
                            entity.id
                          )
                        }
                        radius="sm"
                        color="rgba(255, 255, 255, 0.8)" 
                        style={{
                          cursor: "pointer",
                          transform:
                            selectedColors[entity.id] ===
                            "rgba(255, 255, 255, 0.8)"
                              ? "scale(1.2)"
                              : "scale(1)",
                          transition: "transform 0.1s ease",
                        }}
                      />
                    </Group>
                  )}
                  {(entityType === "vehicle" || entityType === "ped") && (
                    <Image
                      fit="contain"
                      src={entity.image}
                      alt={entity.name}
                      height={activeTab === "ped" ? 350 : 108}
                    />
                  )}

                  <Group position="apart" style={{ marginTop: 10 }}>
                    <Text ml={5} tt="uppercase" weight={500} size="md">
                      {entity.name || entity.model}
                    </Text>
                    <Tooltip
                      withArrow
                      withinPortal
                      radius="md"
                      openDelay={1000}
                      closeDelay={0}
                      p={10}
                      color="dark"
                      position="right-end"
                      w="auto"
                      label={
                        <div>
                          {entityType === "vehicle" && entity.class && (
                            <Group spacing="xs">
                              <IconCar size={14} />
                              <Text size="xs" weight={500}>
                                Vehicle Class: {entity.class}
                              </Text>
                            </Group>
                          )}
                          {entityType === "vehicle" && entity.class && (
                            <Group spacing="xs" style={{ marginTop: 5 }}>
                              <IconUser size={14} />
                              <Text size="xs" weight={500}>
                                Name: {entity.name}
                              </Text>
                            </Group>
                          )}

                          <Group spacing="xs" style={{ marginTop: 5 }}>
                            <IconCube size={14} />
                            <Text size="xs" weight={500}>
                              Model: {entity.model}
                            </Text>
                          </Group>
                        </div>
                      }
                      multiline
                    >
                      <Button
                        variant="light"
                        size="xs"
                        style={{
                          backgroundColor: "rgba(35, 45, 61, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "white",
                        }}
                        onClick={() =>
                          handleSpawnEntity(
                            entityType,
                            entity,
                            selectedColors[entity.id] || "rgba(0, 0, 0, 0.8)"
                          )
                        }
                      >
                        Spawn
                      </Button>
                    </Tooltip>
                  </Group>
                </Card>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        color="gray"
        size="xs"
        
        variant="unstyled"
        style={{ marginBottom: 20 }}
        styles={{
          tab: {
            padding: "10px 15px",
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
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
          },
          tabsList: {
            padding: "10px",
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab mr={10} value="vehicle">Vehicles</Tabs.Tab>
          <Tabs.Tab mr={10} value="ped">Peds</Tabs.Tab>
          <Tabs.Tab value="object">Objects</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {renderEntities(activeTab)}

      <Pagination
        value={value}
        onChange={setValue}
        total={Math.ceil(data.length / itemsPerPage)}
        radius="lg"
        color="teal"
        style={{
          alignSelf: "center",
          position: "absolute",
          top: "20px",
          right: "15px",
        }}
      />
    </div>
  );
};

export default EntitySpawner;
