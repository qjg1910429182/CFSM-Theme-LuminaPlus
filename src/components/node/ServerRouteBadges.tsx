import { Crown, Gem, Route } from "lucide-react";
import { getServerRouteOption, ROUTE_CARRIERS, type ServerRouteSelection } from "@/utils/serverRoutes";

export function ServerRouteBadges({ routes }: { routes: ServerRouteSelection | undefined }) {
  const selected = ROUTE_CARRIERS.flatMap((carrier) => {
    const option = getServerRouteOption(routes?.[carrier.id]);
    return option ? [{ carrier, option }] : [];
  });
  if (selected.length === 0) return null;

  return (
    <div className="server-route-badges" aria-label="服务器线路">
      {selected.map(({ carrier, option }) => {
        const Icon = option.tier === "premium" ? Crown : option.tier === "optimized" ? Gem : Route;
        return (
          <span key={carrier.id} className="server-route-badge" data-tier={option.tier}>
            <Icon size={12} strokeWidth={2.2} />
            <span className="server-route-carrier">{carrier.label}</span>
            <strong>{option.label}</strong>
          </span>
        );
      })}
    </div>
  );
}
