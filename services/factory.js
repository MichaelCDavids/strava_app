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
                    };
                };
            };
            let obj = {
                data,
                runs,
                rides
            };
            return obj;
        } else {
            console.log(err);
        };
    }

    async function runSummary(runs) {
        if (runs.length > 0) {
            let numberOfRuns = runs.length;
            let yearOne = moment(runs[0].start_date_local).get('year');
            let monthOne = moment(runs[0].start_date_local).get('month') + 1;
            let dayOne = moment(runs[0].start_date_local).get('date');
            let dateOne = `${monthOne}-${dayOne}-${yearOne}`;
            let yearTwo = moment(runs[runs.length - 1].start_date_local).get('year');
            let monthTwo = moment(runs[runs.length - 1].start_date_local).get('month') + 1;
            let dayTwo = moment(runs[runs.length - 1].start_date_local).get('date');
            let dateTwo = `${monthTwo}-${dayTwo}-${yearTwo}`
            let difference = getWeekDifference(dateOne, dateTwo);
            let averageDistance = getAverageDistance(runs, numberOfRuns);
            let averagePacePerRun = averagePace(runs);
            let fastestAverage = fastestAveragePace(runs);
            let longestDistance = getLongestDistance(runs);
            let longestDuration = getLongestDuration(runs);
            let runsPerWeek = Math.round(numberOfRuns / difference)
            let data = {
                type: 'Run',
                runsPerWeek,
                averageDistance,
                averagePacePerRun,
                fastestAverage,
                longestDistance,
                longestDuration
            };
            return data;
        } else {
            let data = {
                type: 'Run',
                runsPerWeek: 0,
                averageDistance: 0,
                averagePacePerRun: 0,
                fastestAverage: 0,
                longestDistance: 0,
                longestDuration: 0
            };
            return data;
        }
    };
    async function rideSummary(rides) {
        if (rides.length > 0) {
            let numberOfRides = rides.length;
            let yearOne = moment(rides[0].start_date_local).get('year');
            let monthOne = moment(rides[0].start_date_local).get('month') + 1;
            let dayOne = moment(rides[0].start_date_local).get('date');
            let dateOne = `${monthOne}-${dayOne}-${yearOne}`;
            let yearTwo = moment(rides[rides.length - 1].start_date_local).get('year');
            let monthTwo = moment(rides[rides.length - 1].start_date_local).get('month') + 1;
            let dayTwo = moment(rides[rides.length - 1].start_date_local).get('date');
            let dateTwo = `${monthTwo}-${dayTwo}-${yearTwo}`
            let difference = getWeekDifference(dateOne, dateTwo);
            let averageDistance = getAverageDistance(rides, numberOfRides);
            let averagePacePerRide = averagePace(rides);
            let fastestAverage = fastestAveragePace(rides);
            let longestDistance = getLongestDistance(rides);
            let longestDuration = getLongestDuration(rides);
            let ridesPerWeek = Math.round(numberOfRides / difference);
            let data = {
                type: 'Ride',
                ridesPerWeek,
                averageDistance,
                averagePacePerRide,
                fastestAverage,
                longestDistance,
                longestDuration
            };
            return data;
        } else {
            let data = {
                type: 'Ride',
                ridesPerWeek: 0,
                averageDistance: 0,
                averagePacePerRide: 0,
                fastestAverage: 0,
                longestDistance: 0,
                longestDuration: 0
            };
            return data;
        }
    };

    function getWeekDifference(dateOne, dateTwo) {
        var weekNumberOne = moment(dateOne, "MM-DD-YYYY").isoWeek();
        var weekNumberTwo = moment(dateTwo, "MM-DD-YYYY").isoWeek();
        let difference = weekNumberOne - weekNumberTwo
        return difference;
    };

    function getAverageDistance(activity, numberOfRuns) {
        let distance = 0;
        for (const i of activity) {
            distance += i.distance;
        }
        let average = distance / numberOfRuns;
        let averageDistanceKilometeres = average / 1000;
        return averageDistanceKilometeres.toFixed(1);
    };

    function averagePace(activity) {
        let kilometers = 0;
        let minutes = 0;
        for (const i of activity) {
            kilometers += i.distance / 1000
            minutes += i.elapsed_time / 60
        }
        var averagePace = minutes / kilometers
        return averagePace.toFixed(1);
    };

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
    };

    function getLongestDistance(activity) {
        let list = [];
        for (const k of activity) {
            list.push(k.distance / 1000)
        }
        Array.max = function (array) {
            return Math.max.apply(Math, array);
        };
        let longest = Array.max(list);
        return longest.toFixed(1);
    };

    function getLongestDuration(activity) {
        let list = [];
        for (const l of activity) {
            list.push(l.elapsed_time / 60)
        }
        Array.max = function (array) {
            return Math.max.apply(Math, array);
        };
        let longestDuration = Array.max(list);
        return longestDuration.toFixed(1);
    };
    async function saveSummary(runs, rides, date, athleteID) {
        let query = 'insert into summaries (athlete_id, activity_type, effective_date, times_per_week, average_distance, average_pace_per_activity, fastest_average, longest_distance, longest_duration) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        let runSummary = [athleteID, runs.type, date, runs.runsPerWeek, runs.averageDistance, runs.averagePacePerRun, runs.fastestAverage, runs.longestDistance, runs.longestDuration];
        let rideSummary = [athleteID, rides.type, date, rides.ridesPerWeek, rides.averageDistance, rides.averagePacePerRide, rides.fastestAverage, rides.longestDistance, rides.longestDuration]
        await pool.query(query, runSummary)
        await pool.query(query, rideSummary)
        return 'your summaries was saved successfully!';

    };
    async function getSavedSummaries(athleteID) {
        let data = await pool.query('select * from summaries where athlete_id=$1', [athleteID]);
        return data.rows
    };
    return {
        listActivities,
        runSummary,
        rideSummary,
        saveSummary,
        getSavedSummaries
    };
};