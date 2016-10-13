import moment from 'moment';
import 'moment-range';

CalendarController.$inject = ['$scope', 'MeFactory', 'MoonFactory'];
function CalendarController($scope, MeFactory, MoonFactory) {

  var vm = this;

  vm.currDate = moment();
  vm.startDate = null;
  vm.endDate = null;

  vm.prevMonth = prevMonth;
  vm.nextMonth = nextMonth;
  vm.range = range;

  initCalendar();

  function getDaysInMonth(startDate) {
    vm.startDate = new Date(startDate.startOf('month'));
    vm.endDate   = new Date(startDate.endOf('month'));
    let range = moment.range(vm.startDate, vm.endDate);
    let days = [];

    range.by('days', function(moment) {
      days.push({
        date: moment,
        claims: [],
        geld_collected: 0,
        geld_bonus: 0,
        newMoon: false,
      });
    });

    return days;
  }

  function range(n) {
    return new Array(n);
  }

  function prevMonth() {
    vm.currDate = moment(vm.currDate).subtract(1, 'months');
    initCalendar();
  }

  function nextMonth() {
    vm.currDate = moment(vm.currDate).add(1, 'months');
    initCalendar();
  }

  function initCalendar() {
    vm.days = getDaysInMonth(vm.currDate);

    MeFactory.getClaims(vm.startDate, vm.endDate)
      .then(function(response) {
        handleData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    MoonFactory.getNewMoons()
      .then((response) => handleNewMoons(response.data))
      .catch((error) => console.log(error));
  }

  // Handle the claims and attatch it to the calendar day
  function handleData(data) {
    vm.days.map((day) => {
      let claims = data.filter((obj) => moment(obj.claimed_on).format('YYYY-MM-DD') == day.date.format('YYYY-MM-DD'));

      if (claims.length) {
        day.claims = day.claims.concat(claims);

        // Add this days geld collected to total for day
        claims.forEach(obj => {
          day.geld_collected += parseInt(obj.geld_collected);
          day.geld_bonus += parseInt(obj.geld_bonus);
        });
      }
    });
  }

  function handleNewMoons(data) {
    // Only get new moons for the next three years
    let maxDate = moment().add(3, 'years');
    data = data.filter((obj) => new Date(obj.iso8601) < maxDate);

    vm.days.map((day) => {
      let newMoon = data.find((obj) => moment(obj.iso8601).format('YYYY-MM-DD') == day.date.format('YYYY-MM-DD'));

      if (newMoon) {
        day.newMoon = newMoon;
      }

      return day;
    });

  }

}

export default class calendar {
  constructor() {
    this.restrict = 'AE';
    this.templateUrl = 'app/directives/templates/calendar.html';
    this.controller = CalendarController;
    this.controllerAs = 'vm';
    this.bindToController = true;
  }
}
