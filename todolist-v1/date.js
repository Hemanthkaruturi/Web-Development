module.exports.getDate = getDate;

function getDate() {
  var today = new Date();
  var currentDay = today.getDay();
  days = {0:'Sunday',1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday'};
  return days[currentDay]
}
