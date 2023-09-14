// to render homepage

const User = require('../models/user');
const Habit = require('../models/habit');


// this function takes user to home
module.exports.home = async function(req, res) {
    if(req.user){
        let habits = await Habit.find({user: req.user._id}); 
        // console.log(habits)
        
        return res.render('home', {
            title : "Habit Tracker",
            habits : habits,
            weeklyDates : await getOneWeekDate()
        })
    }else{
        return res.render('home', {
            title: "Home"
        });
    }
}

// This function is for providing the 7days date, which will be displayed afte the habit is created.
function getOneWeekDate(){
    let months = ["","JAN", "FEB", "MARCH", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    let dates = [];
    for(let i = 6; i>=0 ; i--){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        let mm = currentDate.getMonth()+1;
        mm = months[mm];
        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;
        dates.push(mm +" " +dd);
    }
    return dates;
}


module.exports.notFound = async function(req, res) {
    return res.render('404', {
        title :'Not Found!'
    });
}