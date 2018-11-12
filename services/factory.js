const moment = require('moment');

module.exports = function (pool) {
    function listActivities(err, payload) {
        let data = [];
        let runs = [];
        let rides = [];
        if (!err) {
            for (let i = 0; i < payload.length; i++) {
                const activity = payload[i];
                let date = new Date();
                date.setMonth(date.getMonth() - 3)

                if (moment(activity.start_date).utc() > moment(date).utc()) {
                    data.push(
                        activity
                    );
                    if (activity.type === 'Run') {
                        runs.push(
                            activity
                        );
                    } else if (activity.type === 'Ride') {
                        runs.push(
                            activity
                        );
                    }
                }
            }
            let obj = {
                data,
                runs,
                rides
            }
            return obj
        } else {
            console.log(err);
        }
    }

    async function runSummary(runs) {
        let numberOfRuns = runs.length;
        let yearOne = moment(runs[0].start_date_local).get('year');
        let monthOne = moment(runs[0].start_date_local).get('month') + 1;
        let dayOne = moment(runs[0].start_date_local).get('date');
        let dateOne = `${monthOne}-${dayOne}-${yearOne}`;
        let yearTwo = moment(runs[runs.length - 1].start_date_local).get('year');
        let monthTwo = moment(runs[runs.length - 1].start_date_local).get('month') + 1;
        let dayTwo = moment(runs[runs.length - 1].start_date_local).get('date');
        let dateTwo = `${monthTwo}-${dayTwo}-${yearTwo}`
        let difference = getWeekDifference(dateOne, dateTwo)
        let averageDistance = getAverageDistance(runs, numberOfRuns)
        let averagePacePerRun = averagePace(runs)
        let fastestAverage = fastestAveragePace(runs)
        let longestDistance = getLongestDistance(runs)
        let longestDuration = getLongestDuration(runs)       
        let data = {
            runsPerWeek: numberOfRuns / difference,
            averageDistance,
            averagePacePerRun,
            fastestAverage,
            longestDistance,
            longestDuration
        }
        return data;
    }
    async function rideSummary(rides) {
        console.log(rides);

        // For cycling, display:
        // Average number of rides per week
        // Average distance per ride
        // Average speed per ride
        // Fastest average speed for a ride
        // Longest ride distance
        // Longest ride duration
    }



    function getWeekDifference(dateOne, dateTwo) {
        var weekNumberOne = moment(dateOne, "MM-DD-YYYY").isoWeek();
        var weekNumberTwo = moment(dateTwo, "MM-DD-YYYY").isoWeek();
        let difference = weekNumberOne - weekNumberTwo
        return difference;
    }

    function getAverageDistance(activity, numberOfRuns) {
        let distance = 0;
        for (const i of activity) {
            distance += i.distance;
        }
        let average = distance / numberOfRuns;
        return average.toFixed(2);
    }

    function averagePace(activity) {
        let kilometers = 0;
        let minutes = 0;
        for (const i of activity) {
            kilometers += i.distance / 1000
            minutes += i.elapsed_time / 60
        }
        var averagePace = minutes / kilometers
        return averagePace.toFixed(1);
    }

    function fastestAveragePace(activity) {
        let fastestAverages = [];
        for (const i of activity) {
            let kilometers = i.distance / 1000
            let minutes = i.elapsed_time / 60
            let result = minutes / kilometers
            fastestAverages.push(result)
        }
        Array.min = function (array) {
            return Math.min.apply(Math, array);
        };
        let fastest = Array.min(fastestAverages);
        return fastest.toFixed(1);
    }
    function getLongestDistance(activity){
        let list = [];
        for (const k of activity) {
            list.push(k.distance/1000)
        }
        Array.max = function (array) {
            return Math.max.apply(Math, array);
        };
        let longest = Array.max(list);
        return longest.toFixed(1); 
    }
    function getLongestDuration(activity){
        let list = [];
        for (const l of activity) {
            list.push(l.elapsed_time/60)
        }
        Array.max = function (array) {
            return Math.max.apply(Math, array);
        };
        let longestDuration = Array.max(list);
        return longestDuration.toFixed(1); 
    }

    async function saveSummary() {
        // Allow user to save summary with effective date
    }
    async function getSummary() {
        //When user logs in again, retrieve and display summary history
    }

    // Github Repo & Link
    // Go to necessary depth for the app
    // API
    // Database
    // Add any bells and whistles that you think will add value, showing what you, as a developer, are capable of doing.

    // holistic approach
    // software engineer
    // approach to problems
    // problem solving
    // development methodology
    // result
    // Use any languages, frameworks, etc. that you prefer.

    // Any assumptions you make, note them in the code or in a response email
    return {
        listActivities,
        runSummary,
        rideSummary,
        saveSummary,
        getSummary
    }
}