const report = require("multiple-cucumber-html-reporter");
import * as os from "os";

report.generate({
  jsonDir: "./Report/cucumber-json",
  reportPath: "./Report/reports/html",
  reportName: "Employee Records Automation Report",
  pageTitle: "Employee Records Test Report",
  displayDuration: true,
  openReportInBrowser: true,

  metadata: {
    browser: {
      name: process.env.BROWSER || "chromium",
      version: "Latest",
    },
    device: os.hostname(),
    platform: {
      name: os.platform(),
      version: os.release(),
    },
  },

  customData: {
    title: "Execution Info",
    data: [
      { label: "Project", value: "Employee Records" },
      { label: "Framework", value: "Playwright + TypeScript + Cucumber" },
      { label: "Environment", value: process.env.ENV || "QA" },
      { label: "Executed On", value: new Date().toLocaleString() }
    ]
  }
});