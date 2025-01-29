import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Loader,
  Text,
  Switch,
  Group,
  Box,
  Image,
  Collapse,
} from "@mantine/core";
import { MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapHandler from "./map";
import { fetchNui } from "../utils/fetchNui";
const mapCenter: [number, number] = [-119.43, 58.84];
const latPr100 = 1.421; 
function gameToMap(x: number, y: number): [number, number] {
  return [
    mapCenter[0] + (latPr100 / 100) * y,
    mapCenter[1] + (latPr100 / 100) * x,
  ];
}

interface PlayerData {
  name: string;
  coords: [number, number, number];
}

interface FetchNuiResponse {
  success: boolean;
  players: PlayerData[];
}

const blipTypes = [
  { name: "High", iconUrl: "https://docs.fivem.net/blips/radar_higher.gif" },
  { name: "Centre", iconUrl: "https://docs.fivem.net/blips/radar_centre.png" },
  {
    name: "Boilersuit",
    iconUrl: "https://docs.fivem.net/blips/radar_boilersuit.png",
  },
  { name: "Noise", iconUrl: "https://docs.fivem.net/blips/radar_mp_noise.gif" },
];

const MapCard: React.FC<{ players: PlayerData[]; visible: boolean }> = ({
  players,
  visible,
}) => {
  const savedMapLayer = localStorage.getItem("mapLayer") || "game";
  const savedBlip = parseInt(localStorage.getItem("selectedBlip") || "0");

  const [coordsMarker, setCoordsMarker] = useState<PlayerData[]>(players || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [mapLayer, setMapLayer] = useState<string>(savedMapLayer);
  const [isChangingMap, setIsChangingMap] = useState<boolean>(false);
  const [selectedBlip, setSelectedBlip] = useState<number>(savedBlip);
  const [blipCollapseOpened, setBlipCollapseOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!visible) {
      setCoordsMarker([]);
    }
  }, [visible]);

  useEffect(() => {
    localStorage.setItem("mapLayer", mapLayer);
    localStorage.setItem("selectedBlip", selectedBlip.toString());
  }, [mapLayer, selectedBlip]);

  const reloadCoords = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response: FetchNuiResponse = await fetchNui(
          "LGF_ToolDebug.NUI.reloadData"
        );

        if (response.success && Array.isArray(response.players)) {
          setCoordsMarker(response.players);
        } else {
          console.error(
            "Errore nel ricaricare i dati delle coordinate o i dati non sono un array",
            response
          );
        }
      } catch (error) {
        console.error("Errore nella chiamata NUI:", error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleMapLayerChange = (newLayer: string) => {
    setIsChangingMap(true);
    setMapLayer(newLayer);

    setTimeout(() => {
      setIsChangingMap(false);
    }, 2000);
  };

  const handleBlipSelect = (index: number) => {
    setSelectedBlip(index);
  };

  useEffect(() => {
    setCoordsMarker(players);
  }, [players]);

  return (
    <Card
      shadow="sm"
      p="xs"
      radius="md"
      withBorder
      style={{
        height: "73vh",
        width: "100%",
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      <Button
        onClick={reloadCoords}
        disabled={loading || isChangingMap || blipCollapseOpened}
        loading={loading}
        style={{
          position: "absolute",
          top: "20px",
          width: "135px",
          right: "20px",
          backgroundColor: "rgba(35, 45, 61, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
          zIndex: 1000,
        }}
      >
        {loading ? "Reloading..." : "Reload Maps"}
      </Button>

      <div
        style={{
          position: "absolute",
          top: "70px",
          right: "20px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Switch
          label="Game"
          radius="xs"
          color="teal"
          checked={mapLayer === "game"}
          onChange={() => handleMapLayerChange("game")}
        />
        <Switch
          label="Print"
          radius="xs"
          color="teal"
          checked={mapLayer === "print"}
          onChange={() => handleMapLayerChange("print")}
        />
        <Switch
          label="Satellite"
          radius="xs"
          color="teal"
          checked={mapLayer === "render"}
          onChange={() => handleMapLayerChange("render")}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "170px",
          right: "20px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          fullWidth
          variant="subtle"
          disabled={loading || isChangingMap}
          onClick={() => setBlipCollapseOpened((prev) => !prev)}
          style={{
            backgroundColor: "rgba(35, 45, 61, 0.8)",
            zIndex: 1000,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            width: "135px",
          }}
        >
          {loading ? (
            <>
              <Loader size="xs" color="white" style={{ marginRight: 8 }} />
              Loading...
            </>
          ) : (
            <>{blipCollapseOpened ? "Hide Blips" : "Change Blips"}</>
          )}
        </Button>

        <Collapse in={blipCollapseOpened}>
          <Group style={{ marginTop: "10px", flexDirection: "column" }}>
            {blipTypes.map((blip, index) => (
              <Box
                key={index}
                style={{
                  cursor: "pointer",
                  border:
                    selectedBlip === index
                      ? "1px solid teal"
                      : "1px solid transparent",
                  padding: "10px",
                  display: "inline-block",
                }}
                onClick={() => handleBlipSelect(index)}
              >
                <Image
                  src={blip.iconUrl}
                  alt={blip.name}
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%" }}
                />
              </Box>
            ))}
          </Group>
        </Collapse>
      </div>

      {isChangingMap || loading || blipCollapseOpened ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 350,
            padding: "20px",
            color: "white",
          }}
        >
          <Loader size="xl" color="teal" variant="bars" />
          <Text weight={800} size="sm" tt="uppercase" color="dimmed">
            {blipCollapseOpened ? "Changing New Blip..." : "Loading Map..."}
          </Text>
        </div>
      ) : visible ? (
        <MapContainer
          center={mapCenter}
          zoom={10}
          crs={L.CRS.Simple}
          maxBoundsViscosity={1.0}
          style={{
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
          }}
        >
          <MapHandler mapType={mapLayer} />
          {coordsMarker.length > 0 ? (
            coordsMarker.map((player, index) => {
              const mapCoords = gameToMap(player.coords[0], player.coords[1]);

              return (
                <Marker
                  key={index}
                  icon={L.icon({
                    iconUrl: blipTypes[selectedBlip].iconUrl,
                    iconSize: [25, 25],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                    shadowUrl:
                      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                    shadowSize: [41, 41],
                  })}
                  position={mapCoords}
                >
                  <Popup>{player.name}</Popup>
                </Marker>
              );
            })
          ) : (
            <p>No players to display</p>
          )}
        </MapContainer>
      ) : null}
    </Card>
  );
};

export default MapCard;
