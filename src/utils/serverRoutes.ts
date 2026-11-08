export type RouteCarrier = "ct" | "cu" | "cm";
export type RouteDirection = "outbound" | "inbound";
export type RouteTier = "premium" | "optimized" | "standard";

export interface ServerRouteOption {
  id: string;
  tier: RouteTier;
  owner: string;
  label: string;
}

export type DirectionRouteSelection = Partial<Record<RouteCarrier, string>>;
export type ServerRouteSelection = Partial<Record<RouteDirection, DirectionRouteSelection>>;
export type ServerRoutesByNode = Record<string, ServerRouteSelection>;
export type ServerRouteVisibility = Record<string, Partial<Record<RouteDirection, boolean>>>;

export const ROUTE_CARRIERS: Array<{ id: RouteCarrier; label: string }> = [
  { id: "ct", label: "电信" },
  { id: "cu", label: "联通" },
  { id: "cm", label: "移动" },
];

export const ROUTE_DIRECTIONS: Array<{ id: RouteDirection; label: string }> = [
  { id: "outbound", label: "去程线路" },
  { id: "inbound", label: "回程线路" },
];

export const SERVER_ROUTE_OPTIONS: ServerRouteOption[] = [
  { id: "ct-cn2-gia", tier: "premium", owner: "电信", label: "CN2 GIA (AS4809)" },
  { id: "cu-9929", tier: "premium", owner: "联通", label: "CUII 9929" },
  { id: "cu-cup", tier: "premium", owner: "联通", label: "CUP AS10099 + 9929" },
  { id: "cm-cmin2", tier: "premium", owner: "移动", label: "CMIN2 (AS58807)" },
  { id: "premium-bgp", tier: "premium", owner: "三网", label: "三网精品 BGP" },
  { id: "ct-ctg-gia", tier: "premium", owner: "电信", label: "CTG GIA" },

  { id: "ct-cn2-gt", tier: "optimized", owner: "电信", label: "CN2 GT (AS4809)" },
  { id: "ct-ctgnet", tier: "optimized", owner: "电信", label: "CTGNet (AS23764)" },
  { id: "cu-10099-4837", tier: "optimized", owner: "联通", label: "AS10099 + 4837" },
  { id: "cu-10099-9929", tier: "optimized", owner: "联通", label: "AS10099 + 9929" },
  { id: "cm-cmi-optimized", tier: "optimized", owner: "移动", label: "CMI 优化 (AS58453)" },
  { id: "jp-iij", tier: "optimized", owner: "日本", label: "IIJ (AS2497)" },
  { id: "jp-softbank", tier: "optimized", owner: "日本", label: "SoftBank (AS17676)" },
  { id: "jp-kddi", tier: "optimized", owner: "日本", label: "KDDI (AS2516)" },
  { id: "hk-pccw", tier: "optimized", owner: "香港", label: "PCCW (AS3491)" },
  { id: "hk-hgc", tier: "optimized", owner: "香港", label: "HGC (AS9304)" },
  { id: "hk-hkt", tier: "optimized", owner: "香港", label: "HKT (AS4515)" },
  { id: "sg-singtel", tier: "optimized", owner: "新加坡", label: "Singtel (AS7473)" },
  { id: "kr-kt", tier: "optimized", owner: "韩国", label: "KT (AS4766)" },
  { id: "kr-skb", tier: "optimized", owner: "韩国", label: "SK Broadband (AS9318)" },

  { id: "ct-163", tier: "standard", owner: "电信", label: "163 / ChinaNet (AS4134)" },
  { id: "cu-4837", tier: "standard", owner: "联通", label: "169 / 4837" },
  { id: "cu-10099", tier: "standard", owner: "联通", label: "CUGI (AS10099)" },
  { id: "cm-cmnet", tier: "standard", owner: "移动", label: "CMNET (AS9808)" },
  { id: "cm-cmi", tier: "standard", owner: "移动", label: "CMI (AS58453)" },
  { id: "transit-pegtech-54600", tier: "standard", owner: "区域接入", label: "PEG TECH (AS54600)" },
  { id: "transit-ntt", tier: "standard", owner: "国际", label: "NTT (AS2914)" },
  { id: "transit-cogent", tier: "standard", owner: "国际", label: "Cogent (AS174)" },
  { id: "transit-gtt", tier: "standard", owner: "国际", label: "GTT (AS3257)" },
  { id: "transit-arelion", tier: "standard", owner: "国际", label: "Arelion (AS1299)" },
  { id: "transit-he", tier: "standard", owner: "国际", label: "HE (AS6939)" },
  { id: "transit-lumen", tier: "standard", owner: "国际", label: "Lumen / Level3 (AS3356)" },
  { id: "transit-zayo", tier: "standard", owner: "国际", label: "Zayo (AS6461)" },
  { id: "transit-tata", tier: "standard", owner: "国际", label: "Tata (AS6453)" },
  { id: "transit-retn", tier: "standard", owner: "国际", label: "RETN (AS9002)" },
  { id: "transit-sparkle", tier: "standard", owner: "国际", label: "Sparkle (AS6762)" },
  { id: "transit-telstra", tier: "standard", owner: "国际", label: "Telstra (AS4637)" },
];

const OPTION_BY_ID = new Map(SERVER_ROUTE_OPTIONS.map((option) => [option.id, option]));

export function getServerRouteOption(id: string | undefined) {
  return id ? OPTION_BY_ID.get(id) : undefined;
}

const COMPACT_ROUTE_LABELS: Record<string, string> = {
  "ct-cn2-gia": "CN2 GIA",
  "cu-9929": "9929",
  "cu-cup": "CUP 9929",
  "cm-cmin2": "CMIN2",
  "premium-bgp": "精品 BGP",
  "ct-ctg-gia": "CTG GIA",
  "ct-cn2-gt": "CN2 GT",
  "cu-10099-4837": "10099+4837",
  "cu-10099-9929": "10099+9929",
  "cm-cmi-optimized": "CMI 优化",
  "ct-163": "163",
  "cu-4837": "4837",
  "cu-10099": "AS10099",
  "cm-cmnet": "CMNET",
  "cm-cmi": "CMI",
  "transit-pegtech-54600": "AS54600",
  "transit-lumen": "Level3",
};

export function getCompactRouteLabel(option: ServerRouteOption) {
  return COMPACT_ROUTE_LABELS[option.id] ?? option.label.replace(/\s*\(AS\d+\)$/, "");
}

function normalizeDirection(value: unknown): DirectionRouteSelection {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: DirectionRouteSelection = {};
  for (const carrier of ROUTE_CARRIERS) {
    const routeId = (value as Record<string, unknown>)[carrier.id];
    if (typeof routeId === "string" && getServerRouteOption(routeId)) result[carrier.id] = routeId;
  }
  return result;
}

export function normalizeServerRoutes(value: unknown): ServerRoutesByNode {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: ServerRoutesByNode = {};
  for (const [uuid, rawSelection] of Object.entries(value)) {
    if (!uuid || !rawSelection || typeof rawSelection !== "object" || Array.isArray(rawSelection)) continue;
    const raw = rawSelection as Record<string, unknown>;
    const outbound = normalizeDirection(raw.outbound);
    const inbound = normalizeDirection(raw.inbound);
    // v1 兼容：旧配置的 ct/cu/cm 自动迁移为回程线路。
    const legacy = normalizeDirection(rawSelection);
    const selection: ServerRouteSelection = {
      ...(Object.keys(outbound).length ? { outbound } : {}),
      ...(Object.keys(inbound).length ? { inbound } : Object.keys(legacy).length ? { inbound: legacy } : {}),
    };
    if (Object.keys(selection).length > 0) result[uuid] = selection;
  }
  return result;
}

export function normalizeServerRouteVisibility(value: unknown): ServerRouteVisibility {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: ServerRouteVisibility = {};
  for (const [uuid, raw] of Object.entries(value)) {
    if (!uuid || !raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const visibility: Partial<Record<RouteDirection, boolean>> = {};
    for (const direction of ROUTE_DIRECTIONS) {
      const setting = (raw as Record<string, unknown>)[direction.id];
      if (typeof setting === "boolean") visibility[direction.id] = setting;
    }
    if (Object.keys(visibility).length > 0) result[uuid] = visibility;
  }
  return result;
}
