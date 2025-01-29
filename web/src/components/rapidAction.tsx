import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Group,
  Title,
  Grid,
  ActionIcon,
  Alert,
  Avatar,
  Flex,
  Tooltip,
} from "@mantine/core";
import {
  IconCopy,
  IconCubePlus,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";


type EntityData = {
  archetype: string;
  modelHash: string;
  coords: {
    x: number;
    y: number;
    z: number;
  };
  entityType: string;
  entity?: number;
};

const RapidAction: React.FC = () => {
  const [entityData, setEntityData] = useState<EntityData>({
    archetype: "No Hit Entity",
    modelHash: "Unknown Hash",
    coords: { x: 0, y: 0, z: 0 },
    entityType: "unknown",
  });

  const [showContent, setShowContent] = useState(false);

  useNuiEvent<any>("updateValueEntity", (data) => {
    setEntityData({
      archetype: data.archetype,
      modelHash: data.modelHash,
      coords: data.coords || { x: 0, y: 0, z: 0 },
      entityType: data.entityType,
      entity: data.entity,
    });
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const fetchCopy = (value: any) => {
    fetchNui("LGF_ToolDebug.NUI.handleDebugAction", {
      action: "copy", 
      value: value,
    });
  };

  if (!showContent) {
    return <div>Loading...</div>;
  }

  const cardData = [
    {
      value: "archetype",
      label: "Archetype Name",
      icon: <IconCopy size={19} />,
      color: "blue",
      tooltip: "Copy Archetype",
    },
    {
      value: "coords",
      label: "Entity Coords",
      icon: <IconCopy size={19} />,
      color: "teal",
      tooltip: "Copy Coordinates",
    },
    {
      value: "modelHash",
      label: "Model Hash",
      icon: <IconCopy size={19} />,
      color: "orange",
      tooltip: "Copy Model Hash",
    },
    {
      value: "entityType",
      label: "Entity Type",
      icon: <IconCopy size={19} />,
      color: "red",
      tooltip: "Copy Entity Type",
    },
    {
      value: "instructions",
      label: "Instructions",
      color: "gray",
      isAlert: true,
      button: "ALT",
    },
    {
      value: "remove",
      label: "Delete Entity",
      color: "red", 
      isAlert: true,
      button: "X",
    },
  ];

  return (
    <div>
      <Group spacing="xs" position="left" align="center" mb={20}>
        <IconCubePlus size={30} color="white" />
        <Title order={2} tt="uppercase">
          Entity Debugger
        </Title>
      </Group>

      <Grid gutter="xs">
        {cardData.map((card, index) => {
          if (card.isAlert) {
            return (
              <Grid.Col span={12} key={index}>
                <Alert
                  p="xs"
                  style={{
                    backgroundColor: "rgba(35, 45, 61, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: "10px",
                      pointerEvents: "none",
                    }}
                  >
                    <IconInfoCircle size={30} />
                  </div>
                  <Flex
                    gap="xs"
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <Avatar
                      color={card.button === "ALT" ? "teal" : "red"} 
                      size={50}
                      style={{
                        backgroundColor: "rgba(35, 45, 61, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                      radius="sm"
                    >
                      <Text color="white" size="md">
                        {card.button} 
                      </Text>
                    </Avatar>
                    <Flex
                      justify="flex-start"
                      align="flex-start"
                      direction="column"
                      wrap="wrap"
                    >
                      <Title tt="uppercase" order={4}>
                        {card.button === "ALT"
                          ? "Press ALT to Focus"
                          : "Press X to Delete"}
                      </Title>
                      <Text color="dimmed" size="sm">
                        {card.button === "ALT"
                          ? "Press ALT to focus the UI and copy values"
                          : "Press X to permanently delete this entity from the game"}
                      </Text>
                    </Flex>
                  </Flex>
                </Alert>
              </Grid.Col>
            );
          }

          const entityValue = entityData[card.value as keyof EntityData];

          const displayValue =
            typeof entityValue === "object" && "x" in entityValue
              ? `[${entityValue.x}, ${entityValue.y}, ${entityValue.z}]`
              : entityValue;

          return (
            <Grid.Col span={6} key={index}>
              <Card
                style={{
                  backgroundColor: "rgba(35, 45, 61, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  position: "relative",
                }}
                shadow="sm"
                radius="sm"
                withBorder
                padding="xs"
              >
                <Tooltip
                  withinPortal
                  color="dark"
                  radius="md"
                  label={card.tooltip}
                  position="top"
                  withArrow
                >
                  <ActionIcon
                    onClick={() => {
                      const valueToCopy = entityData[card.value as keyof EntityData];
                      fetchCopy(valueToCopy);
                    }}
                    variant="light"
                    radius="sm"
                    size={30}
                    color={card.color}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(55, 65, 81, 0.9)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {card.icon}
                  </ActionIcon>
                </Tooltip>

                <Group spacing="xs" position="left">
                  <Title
                    mb={14}
                    style={{
                      letterSpacing: "0.5px",
                    }}
                    tt="uppercase"
                    size="sm"
                    weight={600}
                  >
                    {card.label}
                  </Title>
                </Group>

                <Group spacing="xs" position="left">
                  <Text size={13} color="dimmed">
                    {displayValue}
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default RapidAction;
