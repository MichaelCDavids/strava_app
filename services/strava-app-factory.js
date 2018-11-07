module.exports = function (pool){
    async function sortByActivity(payload,type){
        let sortedByActivity = []
        for (const activity of payload) {
            if(activity.type === type){
                let obj = {
                    "type": activity.type,
                    "distance": activity.distance,
                    "average_speed": activity.average_speed,
                    "max_speed": activity.max_speed
                };
                sortedByActivity.push(obj)
            };
        };
        return sortedByActivity;
    };
    return{
        sortByActivity
    }
}