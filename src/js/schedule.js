import _ from 'lodash';
import fullSchedule from './full-schedule.ejs';
import skedData from './fullsked.csv';

//Matt, change this.
let sport = "uniqueSportsName"

const d3formatter = require('d3-format');
const d3 = Object.assign(d3formatter, require('d3-time-format'));

const data = skedData.filter(d => d.sport === sport);

const dateParser = d3.timeParse('%m/%d/%y');
const dateFormatter = d3.timeFormat('%b %e');
data.forEach(function(d) {
  d.dateObj = dateParser(d.date);
  d.displayDate = dateFormatter(d.dateObj);
  d.event = d.event.split('; ');
});
const disciplines = _.uniq(_.map(data, 'discipline'));
const disciplineGroup = _.groupBy(data, 'discipline');

const APP_ROOT = document.getElementById('full-schedule');

// If container is empty, then we inject the content ourselves.
if (!APP_ROOT.hasChildNodes()) {
  APP_ROOT.innerHTML = fullSchedule({ disciplines: disciplines, data: disciplineGroup, sport:sport });
}

// This function is what the rig will call to render your content!
export default () => {
  return fullSchedule({ disciplines: disciplines, data: disciplineGroup, sport:sport });
};
