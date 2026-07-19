module.exports={
    default:{
        "formatOptions":{
            "snippetInterface":"async-await"
        },
        requireModule:[
            "ts-node/register"
        ],

        require:[
            "src/test/steps/**/*.ts",
            "src/test/hooks/**/*.ts",
            "src/test/support/**/*.ts",
           
        ],

        

        paths:[
            "src/test/feature/**/*.feature",
        ],

        publishQuiet:true,
        dryRun:true,  //false for real automation

        format: [
            "progress",
            "html:Report/cucumber-html-report/cucumber-report.html",
            "json:Report/cucumber-json-report/report.json",
            "allure-cucumberjs/reporter:Report/allure/report/allure-results",
            "rerun:rerun/rerun.txt"
]

    }
};
