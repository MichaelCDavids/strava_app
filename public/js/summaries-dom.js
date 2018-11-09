const stravaAPI = StravaAPI();
window.addEventListener('load',function(){
    stravaAPI.listActivities().then( results => {
        console.log(results);
    })
});