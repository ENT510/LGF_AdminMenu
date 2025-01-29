import React, { useState } from "react";
import {
  Card,
  Text,
  Grid,
  Title,
  Image,
  Pagination,
  Button,
  Group,
  TextInput,
  Loader,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { inputStyles } from "./InputStyles";
import { motion } from "framer-motion";
import { fetchNui } from "../utils/fetchNui";

const InventoryItems: React.FC<{ items: any[] }> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [playerIds, setPlayerIds] = useState<{ [key: string]: string }>({});
  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 12;

  const filteredItems = items.filter((item) =>
    item.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = filteredItems.length;

  const handleQuantityChange = (itemHash: string, quantity: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemHash]: quantity,
    }));
  };

  const handlePlayerIdChange = (itemHash: string, playerId: string) => {
    setPlayerIds((prev) => ({
      ...prev,
      [itemHash]: playerId,
    }));
  };

  const handleGiveItemToPlayer = (itemHash: string, quantity: number) => {
    const playerId = playerIds[itemHash];


    setLoading(true);


    setTimeout(async () => {
      const response = await fetchNui("LGF_ToolDebug.NUI.handleAddItem", {
        itemHash,
        quantity,
        playerId,
      });
      if ((response as { success: boolean }).success) {
        
      }
      setLoading(false); 
    }, 2000);
  };

  return (
    <div>
      <TextInput
        label="Search Item"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by item name"
        size="sm"
        mb={15}
        styles={inputStyles}
        style={{ width: "20%" }}
      />

      <Grid gutter="sm">
        {paginatedItems.map((item) => (
          <Grid.Col span={3} key={item.hash}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                shadow="sm"
                radius="md"
                padding="xs"
                style={{
                  backgroundColor: "rgba(35, 45, 61, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              >
                <Image
                  src={item.image}
                  alt="https://thumbs.dreamstime.com/b/missing-text-buffered-illustration-white-background-107542411.jpg"
                  height={120}
                  mt={20}
                  fit="contain"
                  withPlaceholder={true}
                  style={{ marginBottom: 10 }}
                />

                <Title
                  order={6}
                  tt="uppercase"
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  {item.name}
                </Title>

                <Group spacing="xs" style={{ width: "100%" }}>
                  <TextInput
                    label="Player ID"
                    value={playerIds[item.hash] || ""}
                    onChange={(e) =>
                      handlePlayerIdChange(item.hash, e.target.value)
                    }
                    size="xs"
                    placeholder="Enter Player ID"
                    style={{ flex: 1 }}
                    styles={inputStyles}
                  />
              
                  <TextInput
                    label="Quantity"
                    value={itemQuantities[item.hash] || ""}
                    onChange={(e) =>
                      handleQuantityChange(item.hash, +e.target.value)
                    }
                    size="xs"
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    style={{ flex: 1 }}
                    styles={inputStyles}
                  />

                  <Button
                    variant="light"
                    color="teal"
                    size="xs"
                    leftIcon={<IconPlus size={16} />}
                    onClick={() =>
                      handleGiveItemToPlayer(
                        item.hash,
                        itemQuantities[item.hash] || 0
                      )
                    }
                    style={{
                      color: "white",
                      position: "absolute",
                      left: 10,
                      top: 10,
                      backgroundColor: "rgba(35, 45, 61, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    disabled={
                        loading || 
                        !itemQuantities[item.hash] || 
                        !playerIds[item.hash]
                      }
                  >
                    {loading ? <Loader size="xs" color="white" /> : "Give Item"}
                  </Button>
                </Group>
              </Card>
            </motion.div>
          </Grid.Col>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        total={Math.ceil(totalItems / itemsPerPage)}
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

export default InventoryItems;
