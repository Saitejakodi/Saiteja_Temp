import { test as base, expect } from "@playwright/test";
import { SauceDemoFlow } from "../flows/SauceDemoFlow";

type MyFixtures = {
    sauceDemoFlow: SauceDemoFlow;
};

export const test = base.extend<MyFixtures>({
    sauceDemoFlow: async ({ page }, use) => {
        const sauceDemoFlow = new SauceDemoFlow(page);
        await use(sauceDemoFlow);
    }
});

export { expect };