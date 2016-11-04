app.service('DateUtil', [function() {
  var o = {
    monthFullNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthShortNames : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayFullNames: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    dayShortNames: ['Mon','Tue','Wed','Thu','Fri','Sat', 'Sun']
  };
  o.getHour = function(date) {
    return date.getHours() -1;
  };

  o.getMinutes = function(date) {
    return date.getMinutes();
  }

  o.getDayMonthYear = function(date) {
    var day = date.getUTCDate();
    var dayInWeek = date.getDay();
    var month = o.monthShortNames[date.getMonth()];
    var year = date.getUTCFullYear();

    return day + " " + month + " " + year + " (" + o.dayShortNames[day] + ")";
  }

  o.getHoursAndMinutesFromMinutes = function(minutes) {
    var hours = Math.floor(minutes / 60);
    var minutes = minutes % 60;
    if(hours > 0) {
      return hours + "h " + minutes + "m";
    } else {
      return minutes + "m";
    }
  };

  return o;
}]);
