import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { worker } from "./msw/server";
import { MonitorAPI } from "./msw/handlers";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

afterEach(() => cleanup());
beforeAll(() => worker.start());
afterAll(() => worker.stop());
afterEach(() => {
  MonitorAPI.callHistory = {} as { [key: string]: {}[] };
  worker.resetHandlers();
});
