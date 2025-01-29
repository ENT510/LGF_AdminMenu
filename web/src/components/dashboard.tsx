import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  ScrollArea,
  Badge,
  ThemeIcon,
  Flex,
  Title,
  ActionIcon,
  Grid,
  Loader,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconCheckbox,
  IconInfoCircle,
  IconSkull,
  IconUxCircle,
  IconBrandCodepen,
  IconUser,
  IconWorld,
  IconUsersGroup,
  IconWebhook,
} from "@tabler/icons-react";

type LogType = "success" | "error" | "warning" | "critical" | "info" | "cfx";

const getLogStyle = (type: LogType) => {
  switch (type) {
    case "success":
      return {
        color: "green",
        icon: <IconCheckbox size={25} />,
        background: "rgba(0, 128, 0, 0.1)",
      };
    case "error":
      return {
        color: "red",
        icon: <IconUxCircle size={25} />,
        background: "rgba(255, 0, 0, 0.1)",
      };
    case "warning":
      return {
        color: "orange",
        icon: <IconAlertCircle size={25} />,
        background: "rgba(255, 165, 0, 0.1)",
      };
    case "critical":
      return {
        color: "darkred",
        icon: <IconSkull size={25} />,
        background: "rgba(139, 0, 0, 0.1)",
      };
    case "info":
      return {
        color: "blue",
        icon: <IconInfoCircle size={25} />,
        background: "rgba(0, 0, 255, 0.1)",
      };
    case "cfx":
      return {
        color: "violet",
        icon: <IconBrandCodepen size={25} />,
        background: "rgba(128, 0, 128, 0.1)",
      };
    default:
      return {
        color: "blue",
        icon: <IconInfoCircle size={25} />,
        background: "rgba(0, 0, 255, 0.1)",
      };
  }
};

const CardStyle = {
  backgroundColor: "rgba(35, 45, 61, 0.8)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

interface Log {
  message: string;
  type: LogType;
  timestamp: string;
}

interface SimulatedConsoleProps {
  logs: Log[];
  entityCount: any;
  playersData: any;
}

const SimulatedConsole: React.FC<SimulatedConsoleProps> = ({
  logs,
  entityCount,
  playersData,
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div style={{ textAlign: "center", marginTop:350, padding: "20px", color: "white" }}>
        <Loader size="xl" color="teal" variant="bars" />
        <Text weight={800} size="sm" tt="uppercase" color="dimmed" >Loading dashboard...</Text>
      </div>
    );
  }

  return (
    <Flex
      justify="center"
      align="flex-start"
      style={{ gap: "20px", width: "100%" }}
    >
      <div style={{ width: "46%" }}>
        <Title
          tt="uppercase"
          order={2}
          style={{ marginBottom: "15px", color: "white" }}
        >
          Dashboard
        </Title>
        <Card
          shadow="xs"
          radius="md"
          padding="sm"
          style={{
            backgroundColor: "rgba(35, 45, 61, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Flex
            gap="xs"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            mb={20}
          >
            <ActionIcon
              variant="light"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",

                backgroundColor: "rgba(55, 65, 81, 0.85)",
                pointerEvents: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              color="yellow"
            >
              <IconWebhook size={24} />
            </ActionIcon>
            <Flex
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="wrap"
            >
              <Title
                tt="uppercase"
                order={3}
                style={{ color: "white", marginTop: 0 }}
              >
                Server Logs
              </Title>
              <Text color="dimmed" size="sm">
                Specific Logs with Execution / Action and Other Information
              </Text>
            </Flex>
          </Flex>
          <ScrollArea scrollbarSize={0} style={{ height: 623 }}>
            {logs.map((log, index) => {
              const logStyle = getLogStyle(log.type);
              return (
                <Card
                  key={index}
                  shadow="xs"
                  radius="md"
                  padding="xs"
                  mt={10}
                  style={CardStyle}
                >
                  <Flex
                    gap="xs"
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <ThemeIcon
                      style={{
                        border: "3px solid rgba(255, 255, 255, 0.1)",
                        backgroundColor: "rgba(55, 65, 81, 0.85)",
                      }}
                      color={logStyle.color}
                      radius="md"
                      variant="outline"
                      size={40}
                    >
                      {logStyle.icon}
                    </ThemeIcon>
                    <Text tt="uppercase" size="sm" color="white">
                      {log.type}
                    </Text>
                    <Badge
                      variant="dot"
                      size="sm"
                      radius="sm"
                      color={logStyle.color}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                      }}
                    >
                      {log.timestamp}
                    </Badge>
                  </Flex>
                  <Text size="xs" weight={600} mt={10}>
                    {log.message}
                  </Text>
                </Card>
              );
            })}
          </ScrollArea>
        </Card>
      </div>

      <div style={{ width: "54%", marginTop: 50 }}>
        <Flex direction="column" gap="xs">
          <Card
            shadow="xs"
            radius="md"
            padding="sm"
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              height: 480,
            }}
          >
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
              mb={20}
            >
              <ActionIcon
                variant="light"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(55, 65, 81, 0.85)",
                  pointerEvents: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                color="violet"
              >
                <IconUsersGroup size={24} />
              </ActionIcon>
              <Flex
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <Title
                  tt="uppercase"
                  order={3}
                  style={{ color: "white", marginTop: 0 }}
                >
                  Players List
                </Title>
                <Text color="dimmed" size="sm">
                  List of all players online with the following information
                </Text>
              </Flex>
            </Flex>
            <ScrollArea scrollbarSize={0} h={500}>
              <Grid gutter="xs" style={{ width: "100%" }}>
                {playersData.map((player: any, index: number) => (
                  <Grid.Col span={6} key={index}>
                    <Card
                      shadow="xs"
                      radius="sm"
                      padding="xs"
                      style={{
                        backgroundColor: "rgba(25, 35, 51, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginBottom: 10,
                      }}
                    >
                      <Flex justify="space-between" align="center" gap="xs">
                        <Flex gap="xs" align="center">
                          <ActionIcon
                            radius="xs"
                            size="lg"
                            variant="light"
                            style={{
                              backgroundColor: "rgba(55, 65, 81, 0.85)",
                              pointerEvents: "none",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            {player.targetID}
                          </ActionIcon>
                          <Text
                            tt="uppercase"
                            size="sm"
                            weight={600}
                            color="white"
                          >
                            {player.playerName}
                          </Text>
                        </Flex>
                        <Flex gap="xs" align="center">
                          <Badge
                            variant="dot"
                            color="red"
                            size="sm"
                            radius="sm"
                          >
                            {player.group}
                          </Badge>
                        </Flex>
                      </Flex>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          </Card>

          <Card
            shadow="xs"
            radius="md"
            padding="sm"
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              height: "230px",
            }}
          >
            <Flex
              gap="xs"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Flex justify="center" align="center" gap="xs">
                <ActionIcon
                  variant="light"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(55, 65, 81, 0.85)",
                    pointerEvents: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  color="teal"
                >
                  <IconWorld size={20} />
                </ActionIcon>
                <Flex
                  justify="flex-start"
                  align="flex-start"
                  direction="column"
                  wrap="wrap"
                >
                  <Title
                    tt="uppercase"
                    order={3}
                    style={{ color: "white", marginTop: 0 }}
                  >
                    Entity Count
                  </Title>
                  <Text color="dimmed" size="sm">
                    Keep an eye on the numbers of registered entities around the
                    world
                  </Text>
                </Flex>
              </Flex>

              <Flex
                gap="lg"
                justify="center"
                align="center"
                mt={20}
                style={{ width: "100%" }}
              >
                <Flex direction="column" align="center" gap="xs">
                  <ActionIcon
                    variant="light"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      backgroundColor: "rgba(55, 65, 81, 0.85)",
                      pointerEvents: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    color="pink"
                  >
                    <Text size="xl" color="white">
                      {entityCount?.Peds}
                    </Text>
                  </ActionIcon>
                  <Text tt="uppercase" weight={600} color="white">
                    Peds
                  </Text>
                </Flex>

                <Flex direction="column" align="center" gap="xs">
                  <ActionIcon
                    variant="filled"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      backgroundColor: "rgba(55, 65, 81, 0.85)",
                      pointerEvents: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    color="blue"
                  >
                    <Text size="xl" color="white">
                      {entityCount?.Objects}
                    </Text>
                  </ActionIcon>
                  <Text tt="uppercase" weight={600} color="white">
                    Objects
                  </Text>
                </Flex>

                <Flex direction="column" align="center" gap="xs">
                  <ActionIcon
                    variant="filled"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      backgroundColor: "rgba(55, 65, 81, 0.85)",
                      pointerEvents: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    color="green"
                  >
                    <Text size="xl" color="white">
                      {entityCount?.Vehicles}
                    </Text>
                  </ActionIcon>
                  <Text tt="uppercase" weight={600} color="white">
                    Vehicles
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </div>
    </Flex>
  );
};

export default SimulatedConsole;
