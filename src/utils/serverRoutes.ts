export type RouteCarrier = "ct" | "cu" | "cm";
export type RouteTier = "premium" | "optimized" | "standard";

export interface ServerRouteOption {
  id: string;
  carrier: RouteCarrier;
  tier: RouteTier;
  label: string;
}

export type ServerRouteSelection = Partial<Record<RouteCarrier, string>>;
export type ServerRoutesByNode = Record<string, ServerRouteSelection>;

export const ROUTE_CARRIERS: Array<{ id: RouteCarrier; label: string }> = [
  { id: "ct", label: "电信" },
  { id: "cu", label: "联通" },
  { id: "cm", label: "移动" },
];

export const SERVER_ROUTE_OPTIONS: ServerRouteOption[] = [
  { id: "ct-cn2-gia", carrier: "ct", tier: "premium", label: "CN2 GIA" },
  { id: "ct-premium-bgp", carrier: "ct", tier: "premium", label: "三网精品 BGP" },
  { id: "ct-cn2-gt", carrier: "ct", tier: "optimized", label: "CN2 GT" },
  { id: "ct-pccw", carrier: "ct", tier: "optimized", label: "PCCW" },
  { id: "ct-ntt", carrier: "ct", tier: "optimized", label: "NTT 优化" },
  { id: "ct-163", carrier: "ct", tier: "standard", label: "163" },
  { id: "ct-cogent", carrier: "ct", tier: "standard", label: "Cogent" },
  { id: "ct-gtt", carrier: "ct", tier: "standard", label: "GTT" },
  { id: "cu-9929", carrier: "cu", tier: "premium", label: "9929 / CUII" },
  { id: "cu-premium-bgp", carrier: "cu", tier: "premium", label: "三网精品 BGP" },
  { id: "cu-10099-9929", carrier: "cu", tier: "optimized", label: "AS10099 + 9929" },
  { id: "cu-10099-4837", carrier: "cu", tier: "optimized", label: "AS10099 + 4837" },
  { id: "cu-iij", carrier: "cu", tier: "optimized", label: "日本 IIJ" },
  { id: "cu-softbank", carrier: "cu", tier: "optimized", label: "SoftBank" },
  { id: "cu-4837", carrier: "cu", tier: "standard", label: "4837" },
  { id: "cu-arelion", carrier: "cu", tier: "standard", label: "Arelion" },
  { id: "cu-he", carrier: "cu", tier: "standard", label: "HE" },
  { id: "cm-cmin2", carrier: "cm", tier: "premium", label: "CMIN2" },
  { id: "cm-premium-bgp", carrier: "cm", tier: "premium", label: "三网精品 BGP" },
  { id: "cm-cmi-optimized", carrier: "cm", tier: "optimized", label: "CMI 优化" },
  { id: "cm-pccw", carrier: "cm", tier: "optimized", label: "PCCW" },
  { id: "cm-ntt", carrier: "cm", tier: "optimized", label: "NTT 优化" },
  { id: "cm-cmi", carrier: "cm", tier: "standard", label: "CMI 普通" },
  { id: "cm-cogent", carrier: "cm", tier: "standard", label: "Cogent" },
  { id: "cm-gtt", carrier: "cm", tier: "standard", label: "GTT" },
];

const OPTION_BY_ID = new Map(SERVER_ROUTE_OPTIONS.map((option) => [option.id, option]));

export function getServerRouteOption(id: string | undefined) {
  return id ? OPTION_BY_ID.get(id) : undefined;
}

export function normalizeServerRoutes(value: unknown): ServerRoutesByNode {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: ServerRoutesByNode = {};
  for (const [uuid, rawSelection] of Object.entries(value)) {
    if (!uuid || !rawSelection || typeof rawSelection !== "object" || Array.isArray(rawSelection)) continue;
    const selection: ServerRouteSelection = {};
    for (const carrier of ROUTE_CARRIERS) {
      const routeId = (rawSelection as Record<string, unknown>)[carrier.id];
      const option = typeof routeId === "string" ? getServerRouteOption(routeId) : undefined;
      if (option?.carrier === carrier.id) selection[carrier.id] = option.id;
    }
    if (Object.keys(selection).length > 0) result[uuid] = selection;
  }
  return result;
}
