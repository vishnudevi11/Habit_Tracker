//This function creates a new habit 
// and user can delete the habit
// Also edit the habits

const Habit = require('../models/habit');
const User = require('../models/user');
module.exports.createHabit = async function(req, res) {
    try {
        let habit = await Habit.findOne({title: req.body.title, user: req.user._id}).populate();
        if(habit) {
            console.log('Habit exists');
            return res.redirect('/');
        } else {
            let habit = await Habit.create({
                title: req.body.title,
                desc: req.body.desc,
                user: req.user._id,
                dates : {date : await getTodayDate() , completed : "none"}
            });

            req.flash('success', 'Habit Created Successfully');
            return res.redirect('/');
        }
    } catch (error) {
        console.log('Error in habitController/createHabit: ', error);
        return;
    }
}
// This function will change the current status of habit 
module.exports.toggleStatus = async function(req, res) {
    try {
        let id = req.query.id;
        let date = req.query.date;
        const habit = await Habit.findById(id);
        console.log(date);

        if(!habit) {
            console.log('Habit not present!');
            return res.redirect('/');
        }

        // take out the date array of the habit
        let dates = habit.dates;
        let found = false;
        // changes the complete argument
        dates.find((item, index) =>{
            if(item.date == date){
                if(item.complete === 'y'){
                    item.complete = 'n';
                }else if(item.complete === 'n'){
                    item.complete = 'x';
                }else if(item.complete === 'x'){
                    item.complete = 'y';
                }
                found = true;
            }
        });

        if(!found) {
            dates.push({date : date, complete : 'y'});
        }
        // at last save the dates
        habit.dates = dates;
        await habit.save();
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/toggleStatus', error);
        return res.render('404', {
            title: "Not Found"
        });
    }
}

// this function removes the habit
module.exports.deleteHabit = async function(req, res) {
    try {
        let id = req.query.id;
        let user = req.user._id;

        await Habit.deleteOne({ _id : id, user: user });
        req.flash('success', 'Habit Deleted Successfully'); //flash msg
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return res.render('404', {
            title: "Not Found"
        })
    }
}

// this function will return date,which will help for getting the range of dates
function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;

    let fullDate = month + " " + date;
    return fullDate;
}