// The Boston Marathon Data Project: page components and routes.
// Ported from tread1st (src/pages/boston.html). Charts are in boston.js and
// data loading is in boston-data.js.

// Sticky Nav
window.onscroll = function() {stickyNav()};
var navbar = false;
var sticky = "default";
function stickyNav() {
  if (!navbar) { return; }
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("stickit");
  } else if(sticky!="default") {
    navbar.classList.remove("stickit");
  }
}

var bostonData = {
  leaderboard: [],
  leaderboardStatus: '',
  hasPreviousPage: false,
  hasNextPage: false,
  placementboard: [],
  results: []
}

var year = 2019;

var startYear = 1897;
var yearList = [];
for (var i = year; i >= startYear; i--) {
  yearList.push(i);
}
bostonData.yearList = yearList;

var page = 0;
var filter = "all"; // options: all, men, women

var gender2015 = {
  year: 2015,
  men: 14581,
  women: 12017
}

var gender2016 = {
  year: 2016,
  men: 14463,
  women: 12167
}

var gender2017 = {
  year: 2017,
  men: 14438,
  women: 11972
}

var gender2018 = {
  year: 2018,
  men: 14250,
  women: 11746
}

var gender2019 = {
  year: 2019,
  men: 14666,
  women: 11980
}

// var qualifiers = {
//   year: 2018,
//   twenty: 4691,
//   ten: 7673,
//   five: 7505,
//   underfive: 2905,
//   veterans: 424,
//   handicap: 256
// }

// var qualifiers = {
//   year: 2019,
//   twenty: 5256,
//   ten: 8620,
//   five: 8545,
//   underfive: 220,
//   veterans: 433,
//   handicap: 270,
//   invited: 6656
// }

var qualifiers = {
  year: 2020,
  twenty: 4051,
  ten: 6772,
  five: 6948,
  underfive: 5885,
  veterans: 433,
  handicap: 270,
  invited: 7141
}

Vue.component('nav-bar', {
template: '<div id="topNav" class="athlete-nav grid-x">\
<div class="cell small-12 sub-nav">\
<ul class="tabs">\
  <li class="tabs-title is-active">\
    <router-link to="course">Course</router-link>\
  </li>\
  <li class="tabs-title">\
    <router-link to="participation">Participation</router-link>\
  </li>\
  <li class="tabs-title">\
    <router-link to="demographics">Demographics</router-link>\
  </li>\
  <li class="tabs-title">\
    <router-link to="qualifying">Qualifying</router-link>\
  </li>\
  <li class="tabs-title">\
    <router-link to="results">Results</router-link>\
  </li>\
  <li class="tabs-title">\
    <router-link to="performance">Performance</router-link>\
  </li>\
  <li class="tabs-title">\
    <router-link to="calculator">Calculator</router-link>\
  </li>\
</ul>\
</div>\
</div>',
  mounted: function() {
    navbar = document.getElementById("topNav");
    sticky = navbar.offsetTop;
  }
})

var home = Vue.component('home', {
template: '<div class="grid-x" style="margin-top:50px;">\
  <div class="cell medium-8 medium-offset-2">\
    <h2>Finding the story hidden in the data...</h2>\
    <p>Every time I line up at the start of a marathon I am amazed by the diversity of humans I see. Running is truly a sport for all shapes, sizes, and varieties of people. While the top finishers steal the headlines, the real story to me is the thousands of runners who finish behind the winners. If you dig into the data of the thousands of runners who conquer Boston, what kind of themes will emerge? That is what this Boston Marathon Data Project hopes to uncover.</p>\
      <p>The Boston Marathon is the perfect race to mine for data. Its high profile, strict qualification standards, and long history of results make it a juicy target for analysis. As a recent qualifier, I have been on a mission to learn as much as I can about the race and share the fruits of my research with you.</p>\
    <p>I have also written about what I have learned in a 2-part essay that you can read over on Medium. Here are the links:</p>\
    <ol>\
    <li><a href="https://medium.com/@ade3/boston-marathon-data-analysis-part-1-4891d1832eba">Women, men, young, and old: What can we learn from the data about how to qualify for Boston?</a></li>\
    <li><a href="https://medium.com/@ade3/why-is-the-boston-marathon-so-slow-6f8512129e24">Why is the Boston Marathon So Slow?</a></li>\
    <li><a href="https://medium.com/@ade3/bostons-evolution-1897-2018-cdd91aa79f95">Boston’s Evolution: 1897–2018</a></li>\
    <li><a href="https://link.medium.com/ns16K6f9T2">Qualifying for Boston in 2021 Will Be Harder than Ever</a></li>\
    </ol>\
    <p>Thanks for your interest in my project.</p>\
    <p>Sincerely, <br>Adrian Hanft</p>\
  </div>\
</div>'
})

var participation = Vue.component('participation', {
template: '<div class="grid-x" style="margin-top:50px;">\
  <div class="cell medium-8 medium-offset-2">\
    <h2>Participation</h2>\
      <div id="participationGraph2"></div>\
      <div id="participationGraph1"></div>\
  </div>\
</div>',
  mounted: function() {
    drawParticipationGraph();
  }
})

var course = Vue.component('course', {
template: '<div class="grid-x" style="margin-top:50px;">\
  <div class="cell medium-10 medium-offset-1">\
    <h1>The Boston Marathon Course</h1>\
    <h2>Pacing Strategy</h2>\
  <p>If you are looking for ways to pace yourself for the Boston Marathon, I recommend checking out <a href="https://www.pacecalculator.com/plans/ef518d3f4e40d04ef0e53d998f72fedc0f0dabc1">the pacing project.</a></p>\
  <h2>Weather Conditions</h2>\
    <div class="grid-x grid-padding-x">\
      <div class="cell small-12 medium-4 large-3">\
        <div class="card">\
          <div class="card-section">\
            <p>2019 </p>\
            <h1><img src="assets/img/rainy.jpg" style="width: 40px; height: 40px;"> 60&#176;</h1>\
            <hr>\
            <h4>Conditions: Warm</h4>\
            <p>It rained the morning of April 15, 2019, but by the time the race started it was 40 and conditions were good. Temperatures rose to 60 and runners benefited from a 13mph tail wind from the southwest. </p>\
            </div>\
          </div>\
        </div>\
      <div class="cell small-12 medium-4 large-3">\
        <div class="card">\
          <div class="card-section">\
            <p>2018 </p>\
            <h1><img src="assets/img/windy-rainy.jpg" style="width: 40px; height: 40px;"> 43&#176;</h1>\
            <hr>\
            <h4>Conditions: Cold/Wet/Windy</h4>\
            <p>On April 16, 2018 the starting temperature in Hopkinton was 40. The temperature in Boston was 43 as the first runners crossed the finish line. There was a headwind wind with gusts of up to 30mph.</p>\
            </div>\
          </div>\
        </div>\
      <div class="cell small-12 medium-4 large-3">\
        <div class="card">\
          <div class="card-section">\
            <p>2017 </p>\
            <h1><img src="assets/img/sunny.jpg" style="width: 40px; height: 40px;"> 73&#176;</h1>\
            <hr>\
            <h4>Conditions: Hot</h4>\
        <p>On April 17, 2017 the starting temperature in Hopkinton was 70. The temperature in Boston was 73 as the first runners crossed the finish line. The wind was WSW1-3 mph. The skies were clear.</p>\
            </div>\
          </div>\
        </div>\
      <div class="cell small-12 medium-4 large-3">\
        <div class="card">\
          <div class="card-section">\
            <p>2016</p>\
            <h1><img src="assets/img/sunny.jpg" style="width: 40px; height: 40px;"> 61&#176;</h1>\
            <hr>\
            <h4>Conditions: Hot</h4>\
            <p>On April 18, 2016 the starting temperature in Hopkinton was 71. The temperature in Boston was 61 as the first runners crossed the finish line. The wind was WSW 2-3 mph. The skies were clear.</p>\
            </div>\
          </div>\
        </div>\
      <div class="cell small-12 medium-4 large-3">\
        <div class="card">\
          <div class="card-section">\
            <p>2015</p>\
            <h1><img src="assets/img/rainy.jpg" style="width: 40px; height: 40px;"> 46&#176;</h1>\
            <hr>\
            <h4>Conditions: Cold/Wet</h4>\
            <p>On April 20,  2015 the starting temperature in Hopkinton was 46. The temperature in Boston was 46 as the first runners crossed the finish line. The wind was calm, the skies were overcast, and there was rain.</p>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>\
</div>'
})

var athletes = Vue.component('athletes', {
template: '<div class="grid-x">\
  <div class="cell medium-10 medium-offset-1">\
    <p>athletes info coming soon</p>\
  </div>\
</div>'
})

Vue.component('yearDropdown', {
props: ['yearList','selected'],
template: '<label>Year\
    <select id="year">\
      <option v-for="year in yearList" :value="year">{{ year }}</option>\
    </select>\
  </label>',
  mounted: function() {
    if (this.selected) {
      $(this.$el).find('select').val(this.selected);
    }
  }
})

var calculator = Vue.component('calculator', {
props: ['bostonData'],
template: '<div class="grid-x">\
  <div class="cell medium-10 medium-offset-1">\
  <h1>Placement Calculator</h1>\
  <p>Use this tool to figure out what your place in the Boston Marathon would have been in a given year.</p>\
        <label>What was your marathon finish time?\
        <input id="raceTime" type="text" value="10800">\
        </label>\
        <div class="button" onclick="getResultBefore();" href="#!">Where would I place?</div>\
        <placementboard v-bind:placementboard="bostonData.placementboard"></placementboard>\
  </div>\
</div>',
mounted: function() {
  getResultBefore();
  $('#raceTime').durationPicker({
    showSeconds: true,
    showDays: false
    });
  }
})

Vue.component('placementboard', {
props: ['placementboard'],
template: '<table>\
    <thead>\
    <tr>\
    <td>Year</td>\
    <td>Time</td>\
    <td>Overall Place</td>\
    <td>Male Place</td>\
    <td>Female Place</td>\
    </tr>\
    </thead>\
    <tbody>\
    <tr v-for="result in placementboard">\
      <td>{{ result.year }}</td>\
      <td>{{ result.time }}</td>\
      <td>{{ result.overall }}</td>\
      <td>{{ result.male }}</td>\
      <td>{{ result.female }}</td>\
    </tr>\
    </tbody>\
</table>'
})

var demographics = Vue.component('demographics', {
data: function () {
    return {
      years: [2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2002,2001,2000] // 2003 excluded because of bad data
    }
  },
template: '<div class="grid-x"style="margin-top: 50px;">\
  <div class="cell medium-10 medium-offset-1">\
  <h2>Boston Marathon Demographics</h2>\
  <p>In a perfect world the distribution of runners would be spread equally across all ages and genders. But the world is a messy place and the B.A.A. does a commendable job of balancing the fairness of qualifying times with a mostly even distribution of runners across ages and gender. </p>\
  <h2>Participation by Age</h2>\
  <p>While the average age of a runner in the Boston Marathon is 42.5, that doesn’t tell the whole story. An interesting side effect separating the field into age groups is that it gives an advantage to runners on the younger side of the 5 year divisions. You have a much better chance of running a 3:35 as a 55 year old than running a 3:25 at 54 years old. This advantage comes through in the data. For example, in 2017 there were 651 runners age 44 compared to 1,127 who were 45. Notice in the graphs below that there are spikes at the start of every age group.</p>\
    <div id="ageChart" style="height: 550px;"></div>\
  <p>At the extremes, the number of runners on the young side of an age group can double the number of runners on the older side of the spectrum. In 2018 there were 650 runners age 55 compared to 277 at age 59.</p>\
  <p>If you are a runner hoping to qualify for Boston you should definitely take advantage of the benefits of age groups if you can. If you are close to an age group jump, let that be added motivation for your training. Also, remember that your qualifying times are based on your age on the day of the race. That means that you can run your best race at age 34 and use the qualifying times for the 35–39 age group because that’s how old you will be on race day.</p>\
    <h2>Participation by Gender</h2>\
  <p>The largest demographic in the Boston Marathon by far is the female 18–34 group with 4,033 runners. The second largest group is the 18–34 male group with 2,984 runners. The 18–34 age groups are a 16 year spread while the other age groups are 5 years, so it makes sense that they will be large. Coming in third is the male 45-49 group with 2,540. The next closest group are males 40–44 with 1,932.</p>\
    <div class="grid-x">\
      <div class="cell medium-12">\
        <div style="max-width: 300px;">\
        <yearDropdown v-bind:year-list="years" v-bind:selected="2019"></yearDropdown>\
        </div>\
      </div>\
      <div class="cell medium-8">\
        <div id="ageGenderChart"></div>\
      </div>\
      <div class="cell medium-4">\
        <div id="piechart"></div>\
      </div>\
    </div>\
  </div>\
</div>',
mounted: function() {
  drawAgeDistributionChart();
  drawGenderPieChart(2019);
  drawAgeGenderChart(2019);
    $('select#year').on('change', function() {
      year = this.value;
        drawGenderPieChart(year);
        drawAgeGenderChart(year);
    });
  }
})

var qualifying = Vue.component('qualifying', {
template: '<div class="grid-x">\
  <div class="cell medium-10 medium-offset-1">\
  <h2 style="margin-top: 50px;">Qualifying for Boston</h2>\
      <p>Boston is notoriously hard to get into. Until 2020, participation was capped at 30,000 runners with more than 20% reserved for special invitations and charity programs. In 2020 an additional 1,500 runners were added, bumping the percentage of special invitations to 22%. That leaves about 23,000 spots up for grabs for anyone who can meet the qualification standards. If you know anyone who has tried to earn their “BQ” you can know how much work goes into achieving a qualifying time.</p>\
  <div class="grid-x grid-padding-x">\
    <div class="cell medium-6">\
      <div id="cutoffGraph"></div>\
    </div>\
    <div class="cell medium-6">\
      <div id="athletesTurnedAway"></div>\
    </div>\
  </div>\
  <p>Adding to the difficulty of securing a spot at Boston’s starting line is the fact that so many people want to participate. There aren’t nearly enough open spots to satisfy the amount of people who qualify and apply. That puts the B.A.A in the unfortunate position of having to turn runners away. In 2019, Boston rejected 7,384 runners who had qualified based on their times. That is a rejection rate of nearly 1 in 4 and an increase of 2,200 from 2018.</p>\
    <div id="qualificationchhart"></div>\
\
<p>In response to the increasing number of people applying for the race and to reduce the number of disappointed qualifiers, the B.A.A. adjusted their standards for 2020. The field size increased from 30,000 to 31,500 but the additional spots were reserved for special invitations, not qualifying athletes. The times needed to qualify increased by 5 minutes for all age groups. Below is a chart showing the new qualifying standards.</p>\
<h3>2020 Qualifying Times</h3>\
\
<table><thead><tr><th scope="col">Age Group</th>\
      <th scope="col">Men</th>\
      <th scope="col">Women</th>\
    </tr></thead><tbody><tr><td data-title="Age Group">18-34</td>\
      <td>3:00:00</td>\
      <td data-title="WOMEN">3:30:00</td>\
    </tr><tr><td data-title="Age Group">35-39</td>\
      <td>3:05:00</td>\
      <td data-title="WOMEN">3:35:00</td>\
    </tr><tr><td data-title="Age Group">40-44</td>\
      <td>3:10:00</td>\
      <td data-title="WOMEN">3:40:00</td>\
    </tr><tr><td data-title="Age Group">45-49</td>\
      <td>3:20:00</td>\
      <td data-title="WOMEN">3:50:00</td>\
    </tr><tr><td data-title="Age Group">50-54</td>\
      <td>3:25:00</td>\
      <td data-title="WOMEN">3:55:00</td>\
    </tr><tr><td data-title="Age Group">55-59</td>\
      <td>3:35:00</td>\
      <td data-title="WOMEN">4:05:00</td>\
    </tr><tr><td data-title="Age Group">60-64</td>\
      <td>3:50:00</td>\
      <td data-title="WOMEN">4:20:00</td>\
    </tr><tr><td data-title="Age Group">65-69</td>\
      <td>4:05:00</td>\
      <td data-title="WOMEN">4:35:00</td>\
    </tr><tr><td data-title="Age Group">70-74</td>\
      <td>4:20:00</td>\
      <td data-title="WOMEN">4:50:00</td>\
    </tr><tr><td data-title="Age Group">75-79</td>\
      <td>4:35:00</td>\
      <td data-title="WOMEN">5:05:00</td>\
    </tr><tr><td data-title="Age Group">80 and over</td>\
      <td>4:50:00</td>\
      <td data-title="WOMEN">5:20:00</td>\
    </tr></tbody></table>\
\
  <div class="grid-x grid-padding-x">\
    <div class="cell medium-6">\
<h3>2020 Men’s Actual Accepted Times</h3>\
\
<table><thead><tr><th scope="col">Age Group</th>\
      <th scope="col">Time Needed to Apply</th>\
      <th scope="col">Actual Accepted Time</th>\
    </tr></thead><tbody><tr><td data-title="Age Group">18-34</td>\
      <td>3:00:00</td>\
      <td>2:58:21</td>\
    </tr><tr><td data-title="Age Group">35-39</td>\
      <td>3:05:00</td>\
      <td>3:03:21</td>\
    </tr><tr><td data-title="Age Group">40-44</td>\
      <td>3:10:00</td>\
      <td>3:08:21</td>\
    </tr><tr><td data-title="Age Group">45-49</td>\
      <td>3:20:00</td>\
      <td>3:18:21</td>\
    </tr><tr><td data-title="Age Group">50-54</td>\
      <td>3:25:00</td>\
      <td>3:23:21</td>\
    </tr><tr><td data-title="Age Group">55-59</td>\
      <td>3:35:00</td>\
      <td>3:33:21</td>\
    </tr><tr><td data-title="Age Group">60-64</td>\
      <td>3:50:00</td>\
      <td>3:48:21</td>\
    </tr><tr><td data-title="Age Group">65-69</td>\
      <td>4:05:00</td>\
      <td>4:03:21</td>\
    </tr><tr><td data-title="Age Group">70-74</td>\
      <td>4:20:00</td>\
      <td>4:18:21</td>\
    </tr><tr><td data-title="Age Group">75-79</td>\
      <td>4:35:00</td>\
      <td>4:33:21</td>\
    </tr><tr><td data-title="Age Group">80 and over</td>\
      <td>4:50:00</td>\
      <td>4:56:21</td>\
    </tr></tbody></table>\
\
    </div>\
    <div class="cell medium-6">\
<h3>2020 Women’s Actual Accepted Times</h3>\
<table><thead><tr><th scope="col">Age Group</th>\
      <th scope="col">Time Needed to Apply</th>\
      <th scope="col">Actual Accepted Time</th>\
    </tr></thead><tbody><tr><td data-title="Age Group">18-34</td>\
      <td>3:30:00</td>\
      <td>3:28:21</td>\
    </tr><tr><td data-title="Age Group">35-39</td>\
      <td>3:35:00</td>\
      <td>3:33:21</td>\
    </tr><tr><td data-title="Age Group">40-44</td>\
      <td>3:40:00</td>\
      <td>3:38:21</td>\
    </tr><tr><td data-title="Age Group">45-49</td>\
      <td>3:50:00</td>\
      <td>3:48:21</td>\
    </tr><tr><td data-title="Age Group">50-54</td>\
      <td>3:55:00</td>\
      <td>3:53:21</td>\
    </tr><tr><td data-title="Age Group">55-59</td>\
      <td>4:05:00</td>\
      <td>4:03:21</td>\
    </tr><tr><td data-title="Age Group">60-64</td>\
      <td>4:20:00</td>\
      <td>4:18:21</td>\
    </tr><tr><td data-title="Age Group">65-69</td>\
      <td>4:35:00</td>\
      <td>4:33:21</td>\
    </tr><tr><td data-title="Age Group">70-74</td>\
      <td>4:50:00</td>\
      <td>4:48:21</td>\
    </tr><tr><td data-title="Age Group">75-79</td>\
      <td>5:05:00</td>\
      <td>5:03:21</td>\
    </tr><tr><td data-title="Age Group">80 and over</td>\
      <td>5:20:00</td>\
      <td>5:18:21</td>\
    </tr></tbody></table>\
    </div>\
  </div>\
\
<h2>What do the new standards mean for runners?</h2>\
<p>Although an increase of 5:00 might seem disheartening to runners hoping to qualify, if you were already aiming to beat your qualifying time by 5 minutes, this probably won’t change your training or goals significantly. Remember, just because the standards have changed doesn’t mean there will be thousands of runners who are running faster. Indeed, the number of rejected runners dropped to 3,136 from 7,384 in 2020. To be accepted you still needed to beat the qualifying standard by 1:39. The 2021 qualification times haven\'t been announced, but I don\'t expect them to change. The demand for the race shows no signs of weakening, so you should still aim to beat your required time by 3 minutes, perhaps more.</p>\
<h3>2013 - 2019 Qualifying Times</h3>\
\
<table><thead><tr><th scope="col">Age Group</th>\
      <th scope="col">Men</th>\
      <th scope="col">Women</th>\
    </tr></thead><tbody><tr><td data-title="Age Group">18-34</td>\
      <td>3:05:00</td>\
      <td data-title="WOMEN">3:35:00</td>\
    </tr><tr><td data-title="Age Group">35-39</td>\
      <td>3:10:00</td>\
      <td data-title="WOMEN">3:40:00</td>\
    </tr><tr><td data-title="Age Group">40-44</td>\
      <td>3:15:00</td>\
      <td data-title="WOMEN">3:45:00</td>\
    </tr><tr><td data-title="Age Group">45-49</td>\
      <td>3:25:00</td>\
      <td data-title="WOMEN">3:55:00</td>\
    </tr><tr><td data-title="Age Group">50-54</td>\
      <td>3:30:00</td>\
      <td data-title="WOMEN">4:00:00</td>\
    </tr><tr><td data-title="Age Group">55-59</td>\
      <td>3:40:00</td>\
      <td data-title="WOMEN">4:10:00</td>\
    </tr><tr><td data-title="Age Group">60-64</td>\
      <td>3:55:00</td>\
      <td data-title="WOMEN">4:25:00</td>\
    </tr><tr><td data-title="Age Group">65-69</td>\
      <td>4:10:00</td>\
      <td data-title="WOMEN">4:40:00</td>\
    </tr><tr><td data-title="Age Group">70-74</td>\
      <td>4:25:00</td>\
      <td data-title="WOMEN">4:55:00</td>\
    </tr><tr><td data-title="Age Group">75-79</td>\
      <td>4:40:00</td>\
      <td data-title="WOMEN">5:10:00</td>\
    </tr><tr><td data-title="Age Group">80 and over</td>\
      <td>4:55:00</td>\
      <td data-title="WOMEN">5:25:00</td>\
    </tr></tbody></table>\
\
  <div class="grid-x grid-padding-x">\
    <div class="cell medium-6">\
<h3>2019 Men’s Actual Accepted Times</h3>\
\
<table><thead><tr><th scope="col">Age Group</th>\
      <th scope="col">Time Needed to Apply</th>\
      <th scope="col">Actual Accepted Time</th>\
    </tr></thead><tbody><tr><td data-title="Age Group">18-34</td>\
      <td>3:05:00</td>\
      <td>3:00:08</td>\
    </tr><tr><td data-title="Age Group">35-39</td>\
      <td>3:10:00</td>\
      <td>3:05:08</td>\
    </tr><tr><td data-title="Age Group">40-44</td>\
      <td>3:15:00</td>\
      <td>3:10:08</td>\
    </tr><tr><td data-title="Age Group">45-49</td>\
      <td>3:25:00</td>\
      <td>3:20:08</td>\
    </tr><tr><td data-title="Age Group">50-54</td>\
      <td>3:30:00</td>\
      <td>3:25:08</td>\
    </tr><tr><td data-title="Age Group">55-59</td>\
      <td>3:40:00</td>\
      <td>3:35:08</td>\
    </tr><tr><td data-title="Age Group">60-64</td>\
      <td>3:55:00</td>\
      <td>3:50:08</td>\
    </tr><tr><td data-title="Age Group">65-69</td>\
      <td>4:10:00</td>\
      <td>4:05:08</td>\
    </tr><tr><td data-title="Age Group">70-74</td>\
      <td>4:25:00</td>\
      <td>4:20:08</td>\
    </tr><tr><td data-title="Age Group">75-79</td>\
      <td>4:40:00</td>\
      <td>4:35:08</td>\
    </tr><tr><td data-title="Age Group">80 and over</td>\
      <td>4:55:00</td>\
      <td>4:50:08</td>\
    </tr></tbody></table>\
\
    </div>\
    <div class="cell medium-6">\
<h3>2019 Women’s Actual Accepted Times</h3>\
<table><thead><tr><th scope="col">Age Group</th>\
      <th scope="col">Time Needed to Apply</th>\
      <th scope="col">Actual Accepted Time</th>\
    </tr></thead><tbody><tr><td data-title="Age Group">18-34</td>\
      <td>3:35:00</td>\
      <td>3:30:08</td>\
    </tr><tr><td data-title="Age Group">35-39</td>\
      <td>3:40:00</td>\
      <td>3:35:08</td>\
    </tr><tr><td data-title="Age Group">40-44</td>\
      <td>3:45:00</td>\
      <td>3:40:08</td>\
    </tr><tr><td data-title="Age Group">45-49</td>\
      <td>3:55:00</td>\
      <td>3:50:08</td>\
    </tr><tr><td data-title="Age Group">50-54</td>\
      <td>4:00:00</td>\
      <td>3:55:08</td>\
    </tr><tr><td data-title="Age Group">55-59</td>\
      <td>4:10:00</td>\
      <td>4:05:08</td>\
    </tr><tr><td data-title="Age Group">60-64</td>\
      <td>4:25:00</td>\
      <td>4:20:08</td>\
    </tr><tr><td data-title="Age Group">65-69</td>\
      <td>4:40:00</td>\
      <td>4:35:08</td>\
    </tr><tr><td data-title="Age Group">70-74</td>\
      <td>4:55:00</td>\
      <td>4:50:08</td>\
    </tr><tr><td data-title="Age Group">75-79</td>\
      <td>5:10:00</td>\
      <td>5:05:08</td>\
    </tr><tr><td data-title="Age Group">80 and over</td>\
      <td>5:25:00</td>\
      <td>5:20:08</td>\
    </tr></tbody></table>\
    </div>\
  </div>\
  </div>\
</div>',
mounted: function() {
  drawQualificationChart(qualifiers);
  drawCutoffGraphs();
  }
})

var training = Vue.component('training', {
template: '<div class="grid-x">\
  <div class="cell medium-10 medium-offset-1">\
    <p>training info coming soon</p>\
  </div>\
</div>'
})

var performance = Vue.component('performance', {
props: ['yearlyAverages','yearlyQualifiers'],
data: function () {
    return {
      years: [2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2002,2001,2000]
    }
  },
template: '<div class="grid-x" style="margin-top: 50px;">\
  <div class="cell medium-10 medium-offset-1">\
  <h2>Why is the Boston Marathon so slow?</h2>\
  <p>The perception is that the Boston Marathon is a fast race. True, the winners always post blazing fast times, but what about everyone else? It might surprise you to learn that that the majority of Boston participants perform far below their capabilities.</p>\
    <p>To get into Boston, each runner has ran a race faster than where the line on the chart below designates. Every dot on the right side of that line is a runner who failed to have a PR on race day. Something doesn’t add up. In order to qualify for Boston 25,996 people were able to beat their qualifying standard by at least 3:23 minutes in 2018. Then on race day 18,563 of these same runners failed to hit the qualifying time? How is it possible that only 29% were able to run a time that they have proven they are capable of?</p>\
    <div style="max-width: 300px;">\
    <yearDropdown v-bind:year-list="years" v-bind:selected="2019"></yearDropdown>\
    </div>\
    <div id="genderChart" style="height: 500px;"></div>\
    <p>There could be several reasons why Boston finishing times are so slow. Perhaps the participants are taking in the experience, savoring the moment, and not worrying about running fast. Perhaps just being in the race is enough for most runners and they have nothing else to prove. Perhaps the course is clogged with runners making it hard to pass people. Perhaps the course is more difficult than it would seem. Maybe weather is the determining factor. </p>\
    <h2>Who beat their qualifying time?</h2>\
      <yearQualifiers v-bind:yearly-qualifiers="yearlyQualifiers"></yearQualifiers>\
      <h2>How close were the runners to their qualifying times?</h2>\
    <div class="grid-x grid-padding-x">\
      <div class="cell small-12 medium-4 large-3">\
          <table>\
            <thead>\
            <tr>\
                <td><h3>2019</h3></td>\
                <td></td>\
             </tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td>Missed BQ by less than 10 seconds: </td>\
                <td>71</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 60 seconds: </td>\
                <td>389</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 5 minutes: </td>\
                <td>1,899</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 15 minutes: </td>\
                <td>5,103</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 30 minutes: </td>\
                <td>8,292</td>\
             </tr>\
            <tr>\
                <td>Total finishers: </td>\
                <td>26,647</td>\
             </tr>\
            </tbody>\
          </table>\
    </div>\
\
      <div class="cell small-12 medium-4 large-3">\
          <table>\
            <thead>\
            <tr>\
                <td><h3>2018</h3></td>\
                <td></td>\
             </tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td>Missed BQ by less than 10 seconds: </td>\
                <td>72</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 60 seconds: </td>\
                <td>402</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 5 minutes: </td>\
                <td>1,962</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 15 minutes: </td>\
                <td>5,404</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 30 minutes: </td>\
                <td>8,833</td>\
             </tr>\
            <tr>\
                <td>Total finishers: </td>\
                <td>25,996</td>\
             </tr>\
            </tbody>\
          </table>\
    </div>\
\
      <div class="cell small-12 medium-4 large-3">\
          <table>\
            <thead>\
            <tr>\
                <td><h3>2017</h3></td>\
                <td></td>\
             </tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td>Missed BQ by less than 10 seconds: </td>\
                <td>71</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 60 seconds: </td>\
                <td>398</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 5 minutes: </td>\
                <td>1,931</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 15 minutes: </td>\
                <td>5,677</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 30 minutes: </td>\
                <td>9,838</td>\
             </tr>\
            <tr>\
                <td>Total finishers: </td>\
                <td>26,410</td>\
             </tr>\
            </tbody>\
          </table>\
    </div>\
\
      <div class="cell small-12 medium-4 large-3">\
          <table>\
            <thead>\
            <tr>\
                <td><h3>2016</h3></td>\
                <td></td>\
             </tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td>Missed BQ by less than 10 seconds: </td>\
                <td>67</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 60 seconds: </td>\
                <td>421</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 5 minutes: </td>\
                <td>2,148</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 15 minutes: </td>\
                <td>6,088</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 30 minutes: </td>\
                <td>10,045</td>\
             </tr>\
            <tr>\
                <td>Total finishers: </td>\
                <td>26,630</td>\
             </tr>\
            </tbody>\
          </table>\
    </div>\
\
      <div class="cell small-12 medium-4 large-3">\
          <table>\
            <thead>\
            <tr>\
                <td><h3>2015</h3></td>\
                <td></td>\
             </tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td>Missed BQ by less than 10 seconds: </td>\
                <td>88</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 60 seconds: </td>\
                <td>501</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 5 minutes: </td>\
                <td>2,152</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 15 minutes: </td>\
                <td>5,259</td>\
             </tr>\
            <tr>\
                <td>Missed BQ by less than 30 minutes: </td>\
                <td>7,967</td>\
             </tr>\
            <tr>\
                <td>Total finishers: </td>\
                <td>26,598</td>\
             </tr>\
            </tbody>\
          </table>\
    </div>\
\
  </div>\
\
<div class="grid-x grid-padding-x">\
  <div class="cell small-12">\
    <h2>Does Age and Gender Matter?</h2>\
    <p>One might expect the percentage of runners who hit their BQ on race day to be spread evenly across ages and gender. After all, that’s why the qualifying standards are relaxed as age increases and why there are different standards for men than women. In theory, that should level the field. That’s now what happens, however, as you can see from the charts below.</p>\
    <h2>What percentage achieved their qualifying times or better?</h2>\
    <div class="grid-x">\
      <div class="cell small-12 medium-6 large-3">\
        <div id="qualifierChart2019"></div>\
      </div>\
      <div class="cell small-12 medium-6 large-3">\
        <div id="qualifierChart2018"></div>\
      </div>\
      <div class="cell small-12 medium-6 large-3">\
        <div id="qualifierChart2017"></div>\
      </div>\
      <div class="cell small-12 medium-6 large-3">\
        <div id="qualifierChart2016"></div>\
      </div>\
      <div class="cell small-12 medium-6 large-3">\
        <div id="qualifierChart2015"></div>\
    </div>\
    </div>\
    <h2>Average times runners missed their BQ by</h2>\
    <div class="grid-x">\
      <div class="cell small-12 medium-6">\
        <div id="subQualifierChart2019"></div>\
      </div>\
      <div class="cell small-12 medium-6">\
        <div id="subQualifierChart2018"></div>\
      </div>\
      <div class="cell small-12 medium-6">\
        <div id="subQualifierChart2017"></div>\
      </div>\
      <div class="cell small-12 medium-6">\
        <div id="subQualifierChart2016"></div>\
      </div>\
      <div class="cell small-12 medium-6">\
        <div id="subQualifierChart2015"></div>\
      </div>\
    </div>\
  </div>\
  </div>\
  </div>\
</div>',
mounted: function() {
    for (var i = yearlyQualifiers.length - 1; i >= 0; i--) {
      drawSubQualifierChart(i);
      drawQualifierChart(i);
    }
      drawGenderChart(2019);
    $('select#year').on('change', function() {
      year = this.value;
      drawGenderChart(year);
    });
  }
})

Vue.component('yearAverages', {
props: ['yearlyAverages'],
template: '<div class="grid-x grid-padding-x">\
<div class="cell small-12">\
  <table class="fixed_headers">\
    <thead class="fixed">\
    <tr>\
      <th>Year</th>\
      <th>Male Avg</th>\
      <th>Female Avg</th>\
      <th>Top 100 Male Avg</th>\
      <th>Top 100 Female Avg</th>\
    </tr>\
    </thead>\
    <tbody>\
      <tr v-for="average in yearlyAverages">\
      <td>{{average[0].year}}</td>\
      <td>{{convertSeconds(average[0].maleAverage)}}</td>\
      <td>{{convertSeconds(average[0].femaleAverage)}}</td>\
      <td>{{convertSeconds(average[0].maleTop100Average)}}</td>\
      <td>{{convertSeconds(average[0].femaleTop100Average)}}</td>\
      </tr>\
    </tbody>\
    </table>\
  </div>\
</div>',
  methods: {
    convertSeconds: function(seconds) {
      var sec_num = parseInt(seconds, 10);
      var minutes = Math.floor(sec_num / 60) % 60;
      var hours = Math.floor(seconds / 3600) % 60;
      if (minutes == 0) {
        minutes = '00';
      }
      else if (minutes < 10) {
        minutes = '0' + minutes;
      }
      var seconds = sec_num % 60;
      if (seconds == 0) {
        seconds = '00';
      }
      else if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return(hours +':'+ minutes +':'+seconds);
    }
  }
})

Vue.component('yearQualifiers', {
props: ['yearlyQualifiers'],
template: '<div class="grid-x grid-padding-x">\
<div class="cell small-12 medium-4 large-3" v-for="total in yearlyQualifiers">\
  <div class="card">\
    <div class="card-section">\
      <h3>{{total[0].year}}:</h3>\
      Total Participants: {{ addComma(total[0].total_participants) }}<br>\
      Total who beat Qualifying Time: {{ addComma(total[0].total_qualifiers) }} ({{ getAverage(total[0].total_qualifiers, total[0].total_participants) }})<br>\
      Total Men: {{ addComma(total[0].men) }}<br>\
      Men who beat Qualifying Time: {{ addComma(total[0].total_men_qualifiers) }} ({{ getAverage(total[0].total_men_qualifiers, total[0].men) }})<br>\
      Total Women: {{ addComma(total[0].women) }}<br>\
      Women who beat Qualifying Time: {{ addComma(total[0].total_women_qualifiers) }} ({{ getAverage(total[0].total_women_qualifiers, total[0].women) }})<br>\
      </div>\
    </div>\
  </div>\
</div>'
,
  methods: {
    addComma: function(athletes) {
      var num = athletes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return(num);
    },
    getAverage: function(qualifiers,total) {
      var average = (qualifiers/total)*100;
      return(Math.round(average)+'%');
    }
  }
})

Vue.component('nonQualifiers', {
props: ['nonQualifiers'],
template: '<div>\
    Who beat their qualifying time?<br>\
<div class="card"  v-for="total in yearlyQualifiers">\
  <div class="card-section">\
    {{total[0].year}} Totals:<br>\
    Total Participants: {{ addComma(total[0].total_participants) }}<br>\
    </div>\
  </div>\
</div>'
,
  methods: {
    addComma: function(athletes) {
      var num = athletes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return(num);
    },
    convertSeconds: function(seconds) {
      var sec_num = parseInt(seconds, 10);
      var minutes = Math.floor(sec_num / 60) % 60;
      var hours = Math.floor(seconds / 3600) % 60;
      if (minutes == 0) {
        minutes = '00';
      }
      else if (minutes < 10) {
        minutes = '0' + minutes;
      }
      var seconds = sec_num % 60;
      if (seconds == 0) {
        seconds = '00';
      }
      else if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return(hours +':'+ minutes +':'+seconds);
    }
  }
})

Vue.component('winners',{
data: function () {
    return {
      years1: winners.winners_1897_1923,
      years2: winners.winners_1924_1956,
      years3: winners.winners_1957_2019,
      years4: winners.winnersFemale,
    }
  },
template: '<div>\
<h2>Male Winners 2019-1957 (26.2 mile course)</h2>\
    <table class="fixed_headers"><thead><tr>\
    <th>Year</th>\
    <th>Winner</th>\
    <th>Finish Time</th>\
    <th>Pace/Mile</th>\
    </tr></thead><tbody>\
    <tr v-for="winner in years3.slice().reverse()">\
    <td>{{winner.year}}</td>\
    <td>{{winner.name}}</td>\
    <td>{{winner.official_time}}</td>\
    <td>{{winner.pace}}</td>\
    </tr>\
    </tbody>\
    </table>\
<h2>Male Winners 1956-1924 (24.5 mile course)</h2>\
    <table class="fixed_headers"><thead><tr>\
    <th>Year</th>\
    <th>Winner</th>\
    <th>Finish Time</th>\
    <th>Pace/Mile</th>\
    </tr></thead><tbody>\
    <tr v-for="winner in years2.slice().reverse()">\
    <td>{{winner.year}}</td>\
    <td>{{winner.name}}</td>\
    <td>{{winner.official_time}}</td>\
    <td>{{winner.pace}}</td>\
    </tr>\
    </tbody>\
    </table>\
<h2>Male Winners 1923-1897 (24.5 mile course)</h2>\
    <table class="fixed_headers"><thead><tr>\
    <th>Year</th>\
    <th>Winner</th>\
    <th>Finish Time</th>\
    <th>Pace/Mile</th>\
    </tr></thead><tbody>\
    <tr v-for="winner in years1.slice().reverse()">\
    <td>{{winner.year}}</td>\
    <td>{{winner.name}}</td>\
    <td>{{winner.official_time}}</td>\
    <td>{{winner.pace}}</td>\
    </tr>\
    </tbody>\
    </table>\
<h2>Female Winners 2019-1972</h2>\
    <table class="fixed_headers"><thead><tr>\
    <th>Year</th>\
    <th>Winner</th>\
    <th>Finish Time</th>\
    <th>Pace/Mile</th>\
    </tr></thead><tbody>\
    <tr v-for="winner in years4.slice().reverse()">\
    <td>{{winner.year}}</td>\
    <td>{{winner.name}}</td>\
    <td>{{winner.official_time}}</td>\
    <td>{{winner.pace}}</td>\
    </tr>\
    </tbody>\
    </table>\
</div>'
})

var results = Vue.component('results', {
props: ['bostonData','yearlyAverages'],
data: function () {
    return {
      selectedYear: year
    }
  },
template: '\
<div class="grid-x" style="margin-top:30px;">\
  <div class="cell medium-10 medium-offset-1">\
    <h2>Average Finish Times</h2>\
    <div id="averageFinishTimes"></div>\
    <yearAverages v-bind:yearly-averages="yearlyAverages"></yearAverages>\
    <h2>Winning Finish Times</h2>\
    <div id="winningFinishTimes"></div>\
    <div id="paceGraph"></div>\
    <winners></winners>\
    <h2>Results</h2>\
    <div class="grid-x grid-padding-x">\
      <div class="cell medium-4 large-2">\
        <yearDropdown v-bind:year-list="bostonData.yearList" v-bind:selected="selectedYear"></yearDropdown>\
      </div>\
      <div class="cell medium-4 large-2">\
        <label>Division\
          <select id="filter">\
            <option value="all">Overall</option>\
            <option value="M">Men</option>\
            <option value="F">Women</option>\
          </select>\
        </label>\
      </div>\
    </div>\
    <div class="grid-x grid-padding-x">\
      <div class="cell small-12">\
        <pagination v-bind:boston-data="bostonData"></pagination>\
          <p class="leaderboard-status" v-if="bostonData.leaderboardStatus">{{ bostonData.leaderboardStatus }}</p>\
          <leaderboard v-bind:leaderboard="bostonData.leaderboard"></leaderboard>\
        <pagination v-bind:boston-data="bostonData"></pagination>\
      </div>\
    </div>\
  </div>\
</div>',
  mounted: function() {
    drawAverageFinishTimes();
    drawWinningFinishTimes();
    getLeaderboard();
    $('select#filter').val(filter);
    $('select#year').on('change', function() {
      year = this.value;
      page = 0;
      getLeaderboard();
    });
    $('select#filter').on('change', function() {
      filter = this.value;
      page = 0;
      getLeaderboard();
    });
  }
})

Vue.component('boston', {
// props: ['bostonData'],
template: '<div>\
    <div class="boston-header"><h1></h1></div>\
    <nav-bar></nav-bar>\
    <router-view></router-view>\
</div>'
})

Vue.component('pagination', {
props: ['bostonData'],
template: '<div>\
  <a class="button previousPage" v-show="bostonData.hasPreviousPage" @click="previousItem">Previous 100</a>\
  <a class="button nextPage" v-show="bostonData.hasNextPage" @click="nextItem">Next 100</a>\
</div>',
  methods: {
    nextItem: function() {
      page++;
      getLeaderboard();
    },
    previousItem: function() {
      page--;
      if (page<0) {
        page=0;
      }
      getLeaderboard();
    }
  }
})

Vue.component('leaderboard', {
props: ['leaderboard'],
template: '<table class="fixed_headers">\
    <thead>\
    <tr>\
    <th>Overall</th>\
    <th>Name</th>\
    <th>Time</th>\
    <th>Gender/Age</th>\
    <th>Gender Place</th>\
    <th>Division Place</th>\
    </tr>\
    </thead>\
    <tbody>\
    <tr v-for="result in leaderboard">\
      <td v-if="result.overall"> {{ result.overall }}</td>\
      <td v-if="result.display_name">{{ result.display_name }}</td>\
      <td v-if="result.official_time">{{ result.official_time }}</td>\
      <td><span v-if="result.age*1">{{ result.gender }}/{{ result.age }}</span></td>\
      <td v-if="result.gender">{{ result.gender_result }}</td>\
      <td v-if="result.division_result">{{ result.division_result }}</td>\
    </tr>\
    </tbody>\
</table>',
  methods: {
    flipName: function(athlete) {
      var name = athlete.split(", ");
      if (name[1]) {
        var firstname = name[1];
        var lastname = name[0];
        return(firstname +' '+lastname);
      }
      else {
        return(athlete);
      }
    }
  }
})

function checkRoute(route) {
  if (!route.name) {
    router.push({path: '/course'});
  $('.boston-header h1').html("The Boston Marathon");
  }
  else {
    $('.boston-header h1').html(route.meta.title);
  }
}

var router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', 
      name: 'home', 
      component: home,
      meta: {title: 'The Boston Marathon Data Project'}
    },
    { path: '/participation', 
      name: 'participation', 
      component: participation,
      props: {
      },
      meta: {title: 'Participation'}
    },
    { path: '/course', 
      name: 'course', 
      component: course,
      meta: {title: 'Course'}
    },
    { path: '/athletes', 
      name: 'athletes', 
      component: athletes,
      props: {
      },
      meta: {title: 'Athletes'}
    },
    { path: '/calculator', 
      name: 'calculator', 
      component: calculator,
      props: {
        bostonData: bostonData
      },
      meta: {title: 'Calculator'}
    },
    { path: '/demographics', 
      name: 'demographics', 
      component: demographics,
      props: {
      },
      meta: {title: 'Demographics'}
    },
    { path: '/qualifying', 
      name: 'qualifying', 
      component: qualifying,
      props: {
      },
      meta: {title: 'Qualifying'}
    },
    { path: '/training', 
      name: 'training', 
      component: training,
      props: {
      },
      meta: {title: 'Training'}
    },
    { path: '/results', 
      name: 'results', 
      component: results,
      props: {
        bostonData: bostonData,
        yearlyAverages: yearlyAverages,
        yearList: yearList
      },
      meta: {title: 'Results'}
    },
    { path: '/performance', 
      name: 'performance', 
      component: performance,
      props: {
        yearlyQualifiers: yearlyQualifiers
      },
      meta: {title: 'Performance'}
    },
    ],
  linkExactActiveClass: "active"
  })
  router.beforeEach((to, from, next) => {
    $('.boston-header h1').html(to.meta.title);
  next()
})

var app = new Vue({
  el: '#app',
  data: {
    bostonData: bostonData,
    yearlyAverages: yearlyAverages,
    yearlyQualifiers: yearlyQualifiers,
    yearList: yearList
  },
  mounted: function() {
    checkRoute(router.currentRoute);
  },
  router
  }).$mount('#app');

