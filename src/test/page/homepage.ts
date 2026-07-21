import { Page, Locator } from "@playwright/test";
import { basepage } from "./basepage";
import { logger } from "../utilites/logger";

export class HomePage extends basepage {

    readonly downloadBtn: Locator

    constructor(page: Page) {
        super(page);
        this.downloadBtn = page.locator("//button[contains(text(),'Export to Excel')]");
    }

    async clickDownloadButton() {
        try{
            const downloadPromise = this.page.waitForEvent("download")
            await this.click(this.downloadBtn)
            logger.info("Clicked Export to Excel button")
            const download = await downloadPromise
            return download
        }catch(error) {
            logger.error(error)
            throw error
        }
    }
}