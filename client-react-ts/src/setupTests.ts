import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./msw/server";
import { Logs } from "./__test__/__mocks__/MockApi";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

afterEach(() => cleanup());
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  Logs.CallHistory = {} as { [key: string]: {}[] };
  server.resetHandlers();
});
