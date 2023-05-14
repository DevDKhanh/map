import { LAYERS } from "./enum";

export const listFile: {
  path: string;
  pathColor?: string;
  type: string;
  id: number;
  title: string;
}[] = [
  {
    path: "roads.json",
    type: "MultiLineString",
    id: LAYERS.roads,
    title: "Roads",
    pathColor: "vic_roads.json",
  },
  {
    path: "ptv_metro_bus_route.json",
    type: "MultiLineString",
    id: LAYERS.ptv_metro_bus_route,
    title: "Metro bus route",
  },
  {
    path: "ptv_metro_bus_stop.json",
    type: "Point",
    id: LAYERS.ptv_metro_bus_stop,
    title: "Metro bus stop",
  },
  {
    path: "ptv_metro_train_station.json",
    type: "Point",
    id: LAYERS.ptv_metro_train_station,
    title: "Metro train station",
  },
  {
    path: "ptv_metro_tram_route.json",
    type: "MultiLineString",
    id: LAYERS.ptv_metro_tram_route,
    title: "Metro tram route",
  },
  {
    path: "ptv_metro_tram_stop.json",
    type: "Point",
    id: LAYERS.ptv_metro_tram_stop,
    title: "Metro tram stop",
  },
  {
    path: "ptv_regional_bus_route.json",
    type: "MultiLineString",
    id: LAYERS.ptv_regional_bus_route,
    title: "Regional bus route",
  },
  {
    path: "ptv_regional_bus_stop.json",
    type: "Point",
    id: LAYERS.ptv_regional_bus_stop,
    title: "Regional bus stop",
  },
  {
    path: "ptv_regional_train_station.json",
    type: "Point",
    id: LAYERS.ptv_regional_train_station,
    title: "Regional train station",
  },
  {
    path: "ptv_train_station_platform.geojson",
    type: "MultiPolygon",
    id: LAYERS.ptv_train_station_platform,
    title: "Train station platform",
  },
  {
    path: "melbourneadmin.json",
    pathColor: "vic_admin.json",
    type: "MultiPolygon",
    id: LAYERS.melbourneadmin,
    title: "Melbourne Admin",
  },
];
