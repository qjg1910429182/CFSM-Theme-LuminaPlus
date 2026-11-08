import { describe, expect, it } from "vitest";
import { normalizeServerRoutes } from "@/utils/serverRoutes";

describe("normalizeServerRoutes", () => {
  it("keeps valid carrier routes per node", () => {
    expect(normalizeServerRoutes({
      nodeA: {
        outbound: { ct: "ct-cn2-gia", cu: "cu-9929", cm: "cm-cmin2" },
        inbound: { ct: "cm-cmin2", cu: "cu-9929", cm: "ct-cn2-gia" },
      },
    })).toEqual({
      nodeA: {
        outbound: { ct: "ct-cn2-gia", cu: "cu-9929", cm: "cm-cmin2" },
        inbound: { ct: "cm-cmin2", cu: "cu-9929", cm: "ct-cn2-gia" },
      },
    });
  });

  it("drops unknown routes and keeps cross-carrier return routes", () => {
    expect(normalizeServerRoutes({
      nodeA: { inbound: { ct: "cm-cmin2", cu: "unknown", cm: "ct-cn2-gia" } },
      nodeB: null,
    })).toEqual({ nodeA: { inbound: { ct: "cm-cmin2", cm: "ct-cn2-gia" } } });
  });

  it("migrates legacy selections to inbound", () => {
    expect(normalizeServerRoutes({ nodeA: { ct: "ct-cn2-gia", cm: "cm-cmi" } })).toEqual({
      nodeA: { inbound: { ct: "ct-cn2-gia", cm: "cm-cmi" } },
    });
  });

  it("accepts AS54600 for any carrier and direction", () => {
    expect(normalizeServerRoutes({
      nodeA: {
        outbound: { ct: "transit-pegtech-54600", cu: "transit-pegtech-54600", cm: "transit-pegtech-54600" },
      },
    })).toEqual({
      nodeA: {
        outbound: { ct: "transit-pegtech-54600", cu: "transit-pegtech-54600", cm: "transit-pegtech-54600" },
      },
    });
  });
});
