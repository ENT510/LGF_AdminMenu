import React, { useState } from "react";
import {
  Card,
  Badge,
  ActionIcon,
  Tooltip,
  Text,
  Grid,
  Title,
  RingProgress,
  Pagination,
  Loader,
  Flex,
} from "@mantine/core";
import {
  IconPlayerPlay,
  IconPlayerStop,
  IconRefresh,
} from "@tabler/icons-react";
import { fetchNui } from "../utils/fetchNui";
import { motion } from "framer-motion";

interface Resource {
  name: string;
  version: string;
  status: "started" | "stopped";
  author: string;
}

interface ResourceManagerProps {
  resourceData: Resource[];
}

interface ResourceActionResponse {
  success: boolean;
  status: string;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({ resourceData }) => {
  const [resources, setResources] = useState<Resource[]>(resourceData);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [value, setValue] = useState<number>(1);
  const itemsPerPage = 18;
  const notAllowedResources = ["LGF_ToolDebug"];
  const filteredResources = resources.filter(
    (resource) => !notAllowedResources.includes(resource.name)
  );

  const handleAction = async (action: string, resourceName: string) => {
    setLoading((prev) => ({ ...prev, [resourceName]: true }));

    setTimeout(async () => {

      const response = await fetchNui(
        "LGF_DebugTool:NUI.handleActionResource",
        {
          action,
          resource: resourceName,
        }
      );

      const typedResponse = response as ResourceActionResponse;

      if (typedResponse.success) {
        const newStatus: "started" | "stopped" =
          typedResponse.status === "started" ||
          typedResponse.status === "stopped"
            ? (typedResponse.status as "started" | "stopped")
            : "stopped";

        setResources((prevResources) =>
          prevResources.map((resource) =>
            resource.name === resourceName
              ? { ...resource, status: newStatus }
              : resource
          )
        );
      } else {
        console.error("Action failed");
      }

      setLoading((prev) => ({ ...prev, [resourceName]: false }));
    }, 2000);
  };

  const CardStyle = {
    backgroundColor: "rgba(35, 45, 61, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "13px",
  };

  const renderResources = () => {
    const startIndex = (value - 1) * itemsPerPage;
    const paginatedResources = filteredResources.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return (
      <Grid gutter="xs" grow>
        {paginatedResources.map((resource) => {
          const loaderColor = resource.status === "started" ? "red" : "teal";

          return (
            <Grid.Col key={resource.name} span={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card style={CardStyle} shadow="sm" radius="md">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Title
                        order={6}
                        tt="uppercase"
                        weight={700}
                        style={{ marginBottom: 5 }}
                      >
                        {resource.name}
                      </Title>

                      <Badge
                        color="teal"
                        size="sm"
                        radius="sm"
                        variant="dot"
                        style={{ marginLeft: 10 }}
                      >
                        {resource.version}
                      </Badge>
                      <Text size="xs" color="dimmed" style={{ marginLeft: 10 }}>
                        {resource.author}
                      </Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RingProgress
                        size={35}
                        thickness={2}
                        sections={[
                          {
                            value: 100,
                            color:
                              resource.status === "started" ? "teal" : "red",
                          },
                        ]}
                        style={{ marginRight: 10 }}
                      />
                      <Tooltip
                        withinPortal
                        color="dark"
                        radius="md"
                        label="Start"
                        position="bottom"
                        disabled={
                          resource.status === "started" ||
                          loading[resource.name]
                        }
                      >
                        <ActionIcon
                          onClick={() => handleAction("Start", resource.name)}
                          variant="light"
                          style={{
                            border: "3px solid rgba(255, 255, 255, 0.1)",
                            backgroundColor: "rgba(55, 65, 81, 0.85)",
                            marginLeft: 10,
                          }}
                          color="teal"
                          size={40}
                          radius="md"
                          disabled={
                            resource.status === "started" ||
                            loading[resource.name]
                          }
                        >
                          {loading[resource.name] ? (
                            <Loader color={loaderColor} size="xs" />
                          ) : (
                            <IconPlayerPlay size={16} />
                          )}
                        </ActionIcon>
                      </Tooltip>

                      <Tooltip
                        withinPortal
                        color="dark"
                        radius="md"
                        label="Stop"
                        position="bottom"
                        disabled={
                          resource.status === "stopped" ||
                          loading[resource.name]
                        }
                      >
                        <ActionIcon
                          onClick={() => handleAction("Stop", resource.name)}
                          variant="light"
                          style={{
                            border: "3px solid rgba(255, 255, 255, 0.1)",
                            backgroundColor: "rgba(55, 65, 81, 0.85)",
                            marginLeft: 10,
                          }}
                          color="red"
                          size={40}
                          radius="md"
                          disabled={
                            resource.status === "stopped" ||
                            loading[resource.name]
                          }
                        >
                          {loading[resource.name] ? (
                            <Loader color={loaderColor} size="xs" />
                          ) : (
                            <IconPlayerStop size={16} />
                          )}
                        </ActionIcon>
                      </Tooltip>

                      <Tooltip
                        withinPortal
                        color="dark"
                        radius="md"
                        label="Restart"
                        position="bottom"
                        disabled={loading[resource.name]}
                      >
                        <ActionIcon
                          onClick={() => handleAction("Restart", resource.name)}
                          variant="light"
                          style={{
                            border: "3px solid rgba(255, 255, 255, 0.1)",
                            backgroundColor: "rgba(55, 65, 81, 0.85)",
                            marginLeft: 10,
                          }}
                          color="orange"
                          size={40}
                          radius="md"
                          disabled={loading[resource.name]}
                        >
                          {loading[resource.name] ? (
                            <Loader color={loaderColor} size="xs" />
                          ) : (
                            <IconRefresh size={16} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Grid.Col>
          );
        })}
      </Grid>
    );
  };

  return (
    <div>
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        wrap="wrap"
        mb={20}
      >
        <Title tt="uppercase" order={2}>
          Resource Manager
        </Title>
        <Text size="sm" color="dimmed">
          Total Resource: {filteredResources.length} 
        </Text>
      </Flex>
      {renderResources()}

      <Pagination
        value={value}
        onChange={setValue}
        total={Math.ceil(filteredResources.length / itemsPerPage)}
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

export default ResourceManager;
