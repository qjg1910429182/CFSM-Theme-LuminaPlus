import { describe, expect, it } from "vitest";
import { normalizeServerRoutes } from "@/utils/serverRoutes";

describe("normalizeServerRoutes", () => {
  it("keeps valid carrier routes per node", () => {
    expect(normalizeServerRoutes({
      nodeA: { ct: "ct-cn2-gia", cu: "cu-9929", cm: "cm-cmin2" },
    })).toEqual({
      nodeA: { ct: "ct-cn2-gia", cu: "cu-9929", cm: "cm-cmin2" },
    });
  });

  it("drops unknown routes and carrier mismatches", () => {
    expect(normalizeServerRoutes({
      nodeA: { ct: "cu-9929", cu: "unknown", cm: "cm-cmi" },
      nodeB: null,
    })).toEqual({ nodeA: { cm: "cm-cmi" } });
  });
});
