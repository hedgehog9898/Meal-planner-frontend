module.exports = {
    apps: [
        {
            name: 'MealPlannerFrontend',
            port: '80',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}