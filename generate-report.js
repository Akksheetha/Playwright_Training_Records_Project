const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './Report',
    reportPath: './Report/cucumber-html-report',

    metadata: {
        browser: {
            name: 'chromium',
            version: 'latest'
        },
        device: 'Jenkins',
        platform: {
            name: 'windows',
            version: 'Jenkins'
        }
    },

    customData: {
        title: 'Playwright Cucumber Test Report',
        data: [
            {
                label: 'Project',
                value: 'Playwright Training Records Project'
            },
            {
                label: 'Environment',
                value: 'QA'
            },
            {
                label: 'Executed By',
                value: 'Jenkins'
            }
        ]
    }
});

console.log('Cucumber HTML report generated successfully.');