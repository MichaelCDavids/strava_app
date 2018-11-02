module.exports = function(Instance){
    async function index(req,res){
        res.render('home')
    }
    return{
        index
    }
}