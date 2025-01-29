import React from "react";
import { Card, Flex, Title, Text, Grid, Button, Badge } from "@mantine/core";
import { IconHelpCircle, IconHome } from "@tabler/icons-react";

const Help: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title
        tt="uppercase"
        weight={700}
        align="center"
        order={2}
        style={{ color: "white" }}
      >
        Help and Summary
      </Title>

      <Grid gutter="lg" style={{ marginTop: "40px" }}>
        {/* Overview Section */}
        <Grid.Col span={12} md={6}>
          <Card
            shadow="xs"
            radius="md"
            padding="md"
            style={{
              height: "140px",
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Flex justify="center" align="center" gap="xs">
              <IconHelpCircle size={40} color="white" />
              <Title order={3} style={{ color: "white" }}>
                Overview
              </Title>
            </Flex>
            <Text color="dimmed" size="sm" style={{ marginTop: "10px" }}>
              This panel allows you to manage and monitor the different aspects
              of your game world. Below you can find details about each section
              and how to use them effectively.
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          <Card
            shadow="xs"
            radius="md"
            padding="md"
            style={{
              height: "140px",
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Flex justify="center" align="center" gap="xs">
              <IconHome size={40} color="white" />
              <Title order={3} style={{ color: "white" }}>
                Getting Started
              </Title>
            </Flex>
            <Text color="dimmed" size="sm" style={{ marginTop: "10px" }}>
              To start, navigate through the tabs on the left side of the panel.
              Each tab represents a different functionality that you can manage.
              Configure your game experience.
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card
            shadow="xs"
            radius="md"
            padding="md"
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title order={3} style={{ color: "white" }}>
              Features and Sections
            </Title>
            <Text color="dimmed" size="sm" style={{ marginTop: "10px" }}>
              Here’s a quick summary of the key features available in this
              panel:
            </Text>
            <ul style={{ marginTop: "10px", color: "white" }}>
              <li>
                <strong>Entity Spawner</strong>: Spawn and manage in-game
                entities such as NPCs, vehicles, and objects.
              </li>
              <li>
                <strong>Resource Manager</strong>: Handle resources used in the
                game , handle action like start stop and restart.
              </li>
              <li>
                <strong>Executor</strong>: Run code snippets, commands, or
                scripts directly in the console to interact with the game world
                and adjust game parameters.
              </li>
              <li>
                <strong>Inventory</strong>: Check the items in your virtual
                inventory. And add to the player inventory.
              </li>
              <li>
                <strong>Dashboard</strong>: View detailed statistics such as
                player counts, resource usage, and system logs. Monitor your
                game's performance and health in real-time.
              </li>
              <li>
                <strong>Map World</strong>: Display players Connected with the
                in-game map and environment.
              </li>
              <li>
                <strong>Entity Debugger</strong>: Debug and manage game
                entities, including viewing detailed information about entity
                attributes like archetype
              </li>
            </ul>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card
            shadow="xs"
            radius="md"
            padding="md"
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title order={3} style={{ color: "white" }}>
              Troubleshooting
            </Title>
            <Text color="dimmed" size="sm" style={{ marginTop: "10px" }}>
              If you encounter any issues, here are some common troubleshooting
              steps:
            </Text>
            <ul style={{ marginTop: "10px", color: "white" }}>
              <li>
                Ensure your game resources are properly loaded. If they aren't,
                try reloading or check the resource manager for updates.
              </li>
              <li>
                Check the console for error messages. It may provide specific
                details on what went wrong.
              </li>
              <li>
                If the panel is unresponsive or slow, try refreshing the page or
                clearing your browser cache.
              </li>
              <li>
                For persistent issues, visit the support section on our website
                or contact the community forum for assistance.
              </li>
            </ul>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Help;
