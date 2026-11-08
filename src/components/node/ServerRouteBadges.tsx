import { Crown, Gem, Route } from "lucide-react";
import {
  getServerRouteOption,
  getCompactRouteLabel,
  ROUTE_CARRIERS,
  ROUTE_DIRECTIONS,
  type ServerRouteSelection,
} from "@/utils/serverRoutes";

export function ServerRouteBadges({ routes }: { routes: ServerRouteSelection | undefined }) {
  if (!routes) return null;
  const groups = ROUTE_DIRECTIONS.map((direction) => ({
    direction,
    items: ROUTE_CARRIERS.flatMap((carrier) => {
      const option = getServerRouteOption(routes[direction.id]?.[carrier.id]);
      return option ? [{ carrier, option }] : [];
    }),
  })).filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;

  return (
    <div className="server-route-panel" aria-label="服务器去程与回程线路">
      {groups.map(({ direction, items }) => (
        <div key={direction.id} className="server-route-group">
          <span className="server-route-group-title">{direction.label}</span>
          <div className="server-route-badges">
            {items.map(({ carrier, option }) => {
              const Icon = option.tier === "premium" ? Crown : option.tier === "optimized" ? Gem : Route;
              return (
                <span key={carrier.id} className="server-route-badge" data-tier={option.tier} title={`${carrier.label}：${option.owner} ${option.label}`}>
                  <Icon size={12} strokeWidth={2.2} />
                  <span className="server-route-carrier">{carrier.label}</span>
                  <strong>{getCompactRouteLabel(option)}</strong>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
