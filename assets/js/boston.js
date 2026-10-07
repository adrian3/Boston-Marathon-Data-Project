// Charts for the Boston Marathon Data Project.
// Ported from tread1st (src/js/boston.js). Data loading lives in boston-data.js.

var maleResults = [];
var femaleResults = [];
var ageDistribution = [];
var menQualifyingTimes2019 = [
'3:05:00',
'3:10:00',
'3:15:00',
'3:25:00',
'3:30:00',
'3:40:00',
'3:55:00',
'4:10:00',
'4:25:00',
'4:40:00',
'4:55:00',
];

var womenQualifyingTimes2019 = [
'3:35:00',
'3:40:00',
'3:45:00',
'3:55:00',
'4:00:00',
'4:10:00',
'4:25:00',
'4:40:00',
'4:55:00',
'5:10:00',
'5:25:00',
];

var ageGroups = [
'18-34',
'35-39',
'40-44',
'45-49',
'50-54',
'55-59',
'60-64',
'65-69',
'70-74',
'75-79',
'80',
];

var menQualifyingTimes2020 = [
'3:00:00',
'3:05:00',
'3:10:00',
'3:20:00',
'3:25:00',
'3:35:00',
'3:50:00',
'4:05:00',
'4:20:00',
'4:35:00',
'4:50:00',
];

var womenQualifyingTimes2020 = [
'3:30:00',
'3:35:00',
'3:40:00',
'3:50:00',
'3:55:00',
'4:05:00',
'4:20:00',
'4:35:00',
'4:50:00',
'5:05:00',
'5:20:00',
];

function drawGenderChart(year) {
    var url = 'assets/data/results-by-age/'+year+'.json';
  $.getJSON(url, function(data) {
    // console.log(data);
    maleResults = data.males;
    femaleResults = data.females;
  }).done(function() {
  if (!document.getElementById('genderChart')) { return; }

  Highcharts.chart('genderChart', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: year + ' Boston Marathon Results by Age & Gender'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Finish Time'
      },
    labels: {
        formatter: function() {
            return toHHMMSS(this.value);
        },
    },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: {
        text: 'Age'
      }
    },
    legend: {
      layout: 'horizontal',
      backgroundColor: '#FFFFFF',
      borderWidth: 0
    },

    tooltip: {
      formatter: function () {
        return "Time: " + toHHMMSS(this.x) + " <br>Age: " + this.y;
      }
    },
    series: [{
      type: 'scatter',
      name: 'Female',
      color: 'rgba(223, 83, 83, .5)',
      data: femaleResults,
      marker: {
        radius: 2,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      }
    }, {
      type: 'scatter',
      name: 'Male',
      color: 'rgba(119, 152, 191, .5)',
      data: maleResults,
      marker: {
        radius: 2,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      }
    },
    {
        type: 'line',
        name: 'Men Qualifying Time',
        color: '#0c386d',
        data: [[11100, 18], [11100, 35],
[11400, 35],[11400, 40],
[11700, 40],[11700, 45],
[12300, 45],[12300, 50],
[12600, 50],[12600, 55],
[13200, 55],[13200, 60],
[14100, 60],[14100, 65],
[15000, 65],[15000, 70],
[15900, 70],[15900, 75],
[16800, 75],[16800, 80],
[17700, 80],[17700, 85]],
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    },
    {
        type: 'line',
        name: 'Women Qualifying Line',
        color: '#990000',
        data: [[12900, 18], [12900, 35],
[13200, 35],[13200, 40],
[13500, 40],[13500, 45],
[14100, 45],[14100, 50],
[14400, 50],[14400, 55],
[15000, 55],[15000, 60],
[15900, 60],[15900, 65],
[16800, 65],[16800, 70],
[17700, 70],[17700, 75],
[18600, 75],[18600, 80],
[19500, 80],[19500, 85]],
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }
    ]
  });
});
}

function drawAgeDistributionChart() {
Highcharts.chart('ageChart', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   
    chart: {
        type: 'area'
    },
    title: {
        text: 'Boston Marathon Age Distribution'
    },
    xAxis: {
        title: {
            text: 'Age'
        },
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; 
            }
        },
    plotBands: [
    {
      color: 'rgba(50,50,50,0.1)', // Color value
      from: 18, // Start of the plot band
      to: 35,
      label: {
        text: '18-34',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(255,255,255,0.1)', // Color value
      from: 35, // Start of the plot band
      to: 40,
      label: {
        text: '35-39',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(50,50,50,0.1)', // Color value
      from: 40, // Start of the plot band
      to: 45,
      label: {
        text: '40-44',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(255,255,255,0.1)', // Color value
      from: 45, // Start of the plot band
      to: 50,
      label: {
        text: '45-49',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(50,50,50,0.1)', // Color value
      from: 50, // Start of the plot band
      to: 55,
      label: {
        text: '50-54',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(255,255,255,0.1)', // Color value
      from: 55, // Start of the plot band
      to: 60,
      label: {
        text: '55-59',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(50,50,50,0.1)', // Color value
      from: 60, // Start of the plot band
      to: 65,
      label: {
        text: '60-64',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(255,255,255,0.1)', // Color value
      from: 65, // Start of the plot band
      to: 70,
      label: {
        text: '65-69',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(50,50,50,0.1)', // Color value
      from: 70, // Start of the plot band
      to: 75,
      label: {
        text: '70-74',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(255,255,255,0.1)', // Color value
      from: 75, // Start of the plot band
      to: 80,
      label: {
        text: '75-79',
        style: {
            color: '#666'
        }
      }
    },
    {
      color: 'rgba(50,50,50,0.1)', // Color value
      from: 80, // Start of the plot band
      to: 110,
      label: {
        text: '80+',
        style: {
            color: '#666'
        }
      }
    }
    ]
    },
    yAxis: {
        title: {
            text: 'Athlete Count'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        shared: true,
        useHTML: true,
       formatter: function() {
            var tooltip='<table class="tip"><caption>Age '+this.x+'</caption><tbody>';
            //loop each point in this.points
            $.each(this.points,function(i,point){
                tooltip+='<tr><th style="color: '+point.series.color+'">'+point.series.name+': </th>'
                      + '<td style="text-align: right; color: #000;">'+point.y+'</td></tr>'
            });
            +'</tbody></table>';
            return tooltip;
        }  ,
    },
    plotOptions: {
      series: {
        fillOpacity: 0.1,
        lineWidth: 1
      },
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: '2019',
        data: ageDistribution2019
    },{
        name: '2018',
        data: ageDistribution2018
    },{
        name: '2017',
        data: ageDistribution2017
    },{
        name: '2016',
        data: ageDistribution2016
    },{
        name: '2015',
        data: ageDistribution2015
    },{
        name: '2014',
        data: ageDistribution2014
    },{
        name: '2013',
        data: ageDistribution2013
    },{
        name: '2012',
        data: ageDistribution2012
    },{
        name: '2011',
        data: ageDistribution2011
    },{
        name: '2010',
        data: ageDistribution2010
    },{
        name: '2009',
        data: ageDistribution2009
    },{
        name: '2008',
        data: ageDistribution2008
    },{
        name: '2007',
        data: ageDistribution2007
    },{
        name: '2006',
        data: ageDistribution2006
    },{
        name: '2005',
        data: ageDistribution2005
    },{
        name: '2004',
        data: ageDistribution2004
    },
    // {
    //     name: '2003',
    //     data: ageDistribution2003
    // },
    // {
    //     name: '2002',
    //     data: ageDistribution2002
    // },{
    //     name: '2001',
    //     data: ageDistribution2001
    // },{
    //     name: '2000',
    //     data: ageDistribution2000
    // }
    ]
});
}

function drawGenderPieChart(year){
if (year == 2019) { i=0; }
else if (year == 2018) { i=1; }
else if (year == 2017) { i=2; }
else if (year == 2016) { i=3; }
else if (year == 2015) { i=4; }
else if (year == 2014) { i=5; }
else if (year == 2013) { i=6; }
else if (year == 2012) { i=7; }
else if (year == 2011) { i=8; }
else if (year == 2010) { i=9; }
else if (year == 2009) { i=10; }
else if (year == 2008) { i=11; }
else if (year == 2007) { i=12; }
else if (year == 2006) { i=13; }
else if (year == 2005) { i=14; }
else if (year == 2004) { i=15; }
else if (year == 2003) { i=16; }
else if (year == 2002) { i=17; }
else if (year == 2001) { i=18; }
else if (year == 2000) { i=19; }

  var a = ageCounts[i].M_count;
  var maleData = a.reduce(function(a, b) { return a + b; }, 0);
  var a = ageCounts[i].F_count;
  var femaleData = a.reduce(function(a, b) { return a + b; }, 0);

Highcharts.chart('piechart', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: year + ' Boston Marathon Gender'
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %',
                style: {
                    textOutline: false 
                }
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Genders',
        colorByPoint: true,
        data: [{
            name: 'Women',
        color: 'rgba(223, 83, 83, .8)',
            y: femaleData,
            selected: true
        },{
            name: 'Men',
        color: 'rgba(119, 152, 191, .8)',
            y: maleData,
            selected: true
        },]
    }]
});
}

function drawQualificationChart(data){
Highcharts.chart('qualificationchhart', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: data.year + ' Qualification Criteria'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %',
                style: {
                    textOutline: false 
                }
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Total',
        colorByPoint: true,
        data: [{
            name: 'Beat qualifying time by 20 minutes',
            y: qualifiers.twenty,
        },{
            name: 'Beat qualifying time by 10-20 minutes',
            y: qualifiers.ten,
        },{
            name: 'Beat qualifying time by 5-10 minutes',
            y: qualifiers.five,
        },{
            name: 'Beat qualifying time less than 5 minutes',
            y: qualifiers.underfive,
        },{
            name: 'Have run 10 or more consecutive Boston Marathons',
            y: qualifiers.veterans,
        },{
            name: 'Athletes with disabilities',
            y: qualifiers.handicap,
        },{
            name: 'Special Invitation',
            y: qualifiers.invited,
        },
        ]
    }]
});
}

var toHHMMSS = function toHHMMSS(seconds) {
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
      time = hours +':'+ minutes +':'+seconds;
      while(time.charAt(0) === '0'&&time.charAt(1) === ':')
      {
       time = time.substr(2);
      }
      return time;
};


function drawAgeGenderChart(year) { 
if (year == 2019) { i=0; }
else if (year == 2018) { i=1; }
else if (year == 2017) { i=2; }
else if (year == 2016) { i=3; }
else if (year == 2015) { i=4; }
else if (year == 2014) { i=5; }
else if (year == 2013) { i=6; }
else if (year == 2012) { i=7; }
else if (year == 2011) { i=8; }
else if (year == 2010) { i=9; }
else if (year == 2009) { i=10; }
else if (year == 2008) { i=11; }
else if (year == 2007) { i=12; }
else if (year == 2006) { i=13; }
else if (year == 2005) { i=14; }
else if (year == 2004) { i=15; }
else if (year == 2003) { i=16; }
else if (year == 2002) { i=17; }
else if (year == 2001) { i=18; }
else if (year == 2000) { i=19; }

var maleData = ageCounts[i].M_count;
var femaleData = ageCounts[i].F_count;

  Highcharts.chart('ageGenderChart', {
      exporting: { 
        enabled: false 
      },
      credits: {
          enabled: false
      },
      title: {
          text: year + ' Boston Marathon Age Groups By Gender'
      },
      tooltip: {
              enabled: false
          },
      xAxis: {
          categories: [
              '18-34',
              '35-39',
              '40-44',
              '45-49',
              '50-54',
              '55-59',
              '60-64',
              '65-69',
              '70-74',
              '74-79',
              '80+'
          ],
          crosshair: true,
          alternateGridColor: '#efefef'
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Total Runners'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0;color: #666;"><b>{point.y} Athletes</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [
      {
          type: 'spline',
          name: 'Men',
          color: 'rgba(119, 152, 191, .8)',
          data: maleData

      }, 
      {
          type: 'spline',
          name: 'Women',
          color: 'rgba(223, 83, 83, .8)',
          data: femaleData

      }
      ]
  });
}

function drawCutoffGraphs() {
Highcharts.chart('cutoffGraph', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   chart: {
        type: 'column'
    },
    title: {
        text: 'How much faster than the qualifying time was needed?'
    },
    xAxis: {
        categories: [
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020'
        ],
        crosshair: true
    },
    yAxis: {
      labels: {
            formatter: function () {
            var sec_num = parseInt(this.value, 10);
            var minutes = Math.floor(sec_num / 60) % 60;
            var seconds = sec_num % 60;
            if (seconds == 0) {
              seconds = '00';
            }
            else if (seconds < 10) {
              seconds = '0' + seconds;
            }
                return minutes + ':'+seconds;
            }
          },
        min: 0,
        title: {
            text: 'Time'
        }
    },
    tooltip: {
      formatter: function () {
    var sec_num = parseInt(this.y, 10);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

        return '<h1 class="text-center" style="margin-bottom: 0;">' + minutes + ':'+seconds+'</h1>to be accepted in ' + this.x;
      },
        useHTML: true,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Qualified Athletes Turned Away',
        data: [98, 62, 148, 129, 203, 292, 99],
        color: '#9cbebf'
    }, 
    ]
});

Highcharts.chart('athletesTurnedAway', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   chart: {
        type: 'column'
    },
    title: {
        text: 'How many athletes were turned away?'
    },
    xAxis: {
        categories: [
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        max: 12000,
        title: {
            text: 'Athletes Turned Away'
        }
    },
    tooltip: {
      formatter: function () {
        var num = this.y;
        // add comma
        num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return '<h1 class="text-center" style="margin-bottom: 0;">'+num + '</h1>turned away in ' + this.x;
      },
        useHTML: true,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
    {
        name: 'Athletes Turned Away',
        data: [2976, 1947, 4562, 2957, 5062, 7384, 3161],
        color: '#d26342'
    }
    ]
});
}

var QualifierPercentages = [];
var QualifierPercentagesWomen = [];
var qualifierYear;
function drawQualifierChart(i) {
  qualifierYear = yearlyQualifiers[i][0].year;
  QualifierPercentagesMen = [];
  QualifierPercentagesWomen = [];
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_18_34_qualifiers/yearlyQualifiers[i][0].women_18_34_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_35_39_qualifiers/yearlyQualifiers[i][0].women_35_39_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_40_44_qualifiers/yearlyQualifiers[i][0].women_40_44_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_45_49_qualifiers/yearlyQualifiers[i][0].women_45_49_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_50_54_qualifiers/yearlyQualifiers[i][0].women_50_54_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_55_59_qualifiers/yearlyQualifiers[i][0].women_55_59_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_60_64_qualifiers/yearlyQualifiers[i][0].women_60_64_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_65_69_qualifiers/yearlyQualifiers[i][0].women_65_69_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_70_74_qualifiers/yearlyQualifiers[i][0].women_70_74_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_75_79_qualifiers/yearlyQualifiers[i][0].women_75_79_total*100));
  QualifierPercentagesWomen.push(Math.round(yearlyQualifiers[i][0].women_80_qualifiers/yearlyQualifiers[i][0].women_80_total*100));

  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_18_34_qualifiers/yearlyQualifiers[i][0].men_18_34_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_35_39_qualifiers/yearlyQualifiers[i][0].men_35_39_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_40_44_qualifiers/yearlyQualifiers[i][0].men_40_44_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_45_49_qualifiers/yearlyQualifiers[i][0].men_45_49_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_50_54_qualifiers/yearlyQualifiers[i][0].men_50_54_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_55_59_qualifiers/yearlyQualifiers[i][0].men_55_59_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_60_64_qualifiers/yearlyQualifiers[i][0].men_60_64_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_65_69_qualifiers/yearlyQualifiers[i][0].men_65_69_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_70_74_qualifiers/yearlyQualifiers[i][0].men_70_74_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_75_79_qualifiers/yearlyQualifiers[i][0].men_75_79_total*100));
  QualifierPercentagesMen.push(Math.round(yearlyQualifiers[i][0].men_80_qualifiers/yearlyQualifiers[i][0].men_80_total*100));


  Highcharts.chart('qualifierChart'+qualifierYear, {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
      chart: {
          type: 'column'
      },
      title: {
          text: qualifierYear
      },
      xAxis: {
          categories: [
              '18-34',
              '35-39',
              '40-44',
              '45-49',
              '50-54',
              '55-59',
              '60-64',
              '65-69',
              '70-74',
              '74-79',
              '80+'
          ],
          crosshair: true,
          alternateGridColor: '#efefef'
      },
      yAxis: {
          min: 0,
          max: 100,
          title: {
              text: 'Percentage of Runners'
          }
      },
      tooltip: {
        shadow: false,
        borderWidth: 0,
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0;color: #666;"><b>{point.y}%</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [
      {
          type: 'column',
          name: 'Men',
          color: 'rgba(119, 152, 191, .8)',
          data: QualifierPercentagesMen

      },
      
      {
          type: 'column',
          name: 'Women',
          color: 'rgba(223, 83, 83, .8)',
          data: QualifierPercentagesWomen

      }, 
      
      ]
  });
}

var subQualifierTimesWomen = [];
var subQualifierTimesMen = [];
var qualifierYear;
function drawSubQualifierChart(i) {
  qualifierYear = subQualifierTimes[i].year;
  subQualifierTimesMen = [];
  subQualifierTimesWomen = [];
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_18_34);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_35_39);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_40_44);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_45_49);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_50_54);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_55_59);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_60_64);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_65_69);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_70_74);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_75_79);
  subQualifierTimesWomen.push(subQualifierTimes[i].avg_time_M_80_110);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_18_34);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_35_39);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_40_44);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_45_49);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_50_54);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_55_59);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_60_64);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_65_69);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_70_74);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_75_79);
  subQualifierTimesMen.push(subQualifierTimes[i].avg_time_F_80_110);

  Highcharts.chart('subQualifierChart'+qualifierYear, {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
      chart: {
          type: 'bar'
      },
      title: {
          text: qualifierYear
      },
      xAxis: {
          categories: [
              '18-34',
              '35-39',
              '40-44',
              '45-49',
              '50-54',
              '55-59',
              '60-64',
              '65-69',
              '70-74',
              '74-79',
              '80+'
          ],
          crosshair: true,
          alternateGridColor: '#efefef'
      },
      yAxis: {
      tickInterval: 900,
      labels: {
            formatter: function () {
              var time = toHHMMSS(this.value);
              return time;
            }
          },
          min: 0,
          max: 3600,
          title: {
              text: 'Time'
          }
      },
      tooltip: {
      formatter: function () {
        return this.series.name+ ' missed BQ by: ' + toHHMMSS(this.y);
      },
        shadow: false,
        borderWidth: 0,
        shared: false,
        useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [
      {
          type: 'column',
          name: 'Men',
          color: 'rgba(119, 152, 191, .8)',
          data: subQualifierTimesMen

      },
      {
          type: 'column',
          name: 'Women',
          color: 'rgba(223, 83, 83, .8)',
          data: subQualifierTimesWomen
      }, 
      ]
  });
}

function drawAverageFinishTimes() {
  overallAverages = [];
  maleAverages = [];
  femaleAverages = [];
  maleTop100Average = [];
  femaleTop100Average = [];

  for (var i = yearlyAverages.length - 1; i >= 0; i--) {
  if (yearlyAverages[i][0].year<=1960) {
    maleAverages.push(yearlyAverages[i][0].maleAverage);
    maleTop100Average.push('');
  }
  else {
    maleAverages.push(yearlyAverages[i][0].maleAverage);
    maleTop100Average.push(yearlyAverages[i][0].maleTop100Average);
  }
    overallAverages.push(yearlyAverages[i][0].overall);
    if (yearlyAverages[i][0].femaleAverage==0) {
      femaleAverages.push('');
    }
    else {
      femaleAverages.push(yearlyAverages[i][0].femaleAverage);
    }
    if (yearlyAverages[i][0].femaleAverage==0) {
      femaleTop100Average.push('');
    }
    else {
      femaleTop100Average.push(yearlyAverages[i][0].femaleTop100Average);
    }
  }

  Highcharts.chart('averageFinishTimes', {
    exporting: { 
      enabled: false 
    },
    credits: {
        enabled: false
    },
      title: {
          text: 'Average Finish Times'
      },
      xAxis: {
        plotLines: [{
          color: '#ccc',
          dashStyle: 'dot',
          value: 1924,
          width: 3,
          zIndex: 2
        },{
          color: '#ccc',
          dashStyle: 'dot',
          value: 1957,
          width: 3,
          zIndex: 2
        }],
        plotBands: [{
          color: '#fff',
          from: 1924,
          to: 1957,
          label: {
            text: 'Course Changes 1924 & 1957',
            style: {
              color: '#606060'
            }
          }
        }]
      },
      yAxis: {
          title: {
              text: 'Finish Time'
          },
      labels: {
          formatter: function() {
              return toHHMMSS(this.value);
          },
        },
      },
      plotOptions: {
      line: {
          marker: {
              symbol: 'circle',
              enabled: false
          }
      },
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 1897
          }
      },
      tooltip: {
          shared: true,
          useHTML: true,
         formatter: function() {
              var tooltip='<table class="tip"><caption>'+this.x+'</caption><tbody>';
              //loop each point in this.points
              $.each(this.points,function(i,point){
                  tooltip+='<tr><th style="color: '+point.series.color+'">'+point.series.name+': </th>'
                        + '<td style="text-align: right; color: #000;">'+toHHMMSS(point.y)+'</td></tr>'
              });
              +'</tbody></table>';
              return tooltip;
          }  ,
      },

      series: [
      // {
      //     name: 'Overall Average',
      //     data: overallAverages
      // }, 
      {
          name: 'Male Average',
          color: 'rgba(119, 152, 191, .8)',
          data: maleAverages
      }, {
          name: 'Female Average',
          color: '#660000',
          data: femaleAverages
      }, {
          name: 'Male Top 100',
          color: '#006699',
          data: maleTop100Average
      }, {
          name: 'Female Top 100',
          color: 'rgba(230, 85, 85, 1)',
          data: femaleTop100Average
      }],
  });
}

function paceToSeconds(pace){
  var t = pace.split(':');
  var min = t[0]*1;
  var sec = t[1]*1;
  var TotalSeconds = (min*60)+sec;
  return TotalSeconds;
}

var finisherPace = [];

function drawWinningFinishTimes() {
  maleWinners26 = [];
  maleWinners25 = [];
  maleWinners24 = [];
  femaleWinners = [];
  finisherPace = [];

  for (var i = 0; i < 75; i++) {
    femaleWinners.push('');
  }
  for (var i = 0; i < winners.winnersFemale.length; i++) {
    var winner = {y:winners.winnersFemale[i].seconds*1, name:winners.winnersFemale[i].name};
    femaleWinners.push(winner);

  }
  for (var i = 0; i < winners.winners_1897_1923.length; i++) {
    var winner = {y:winners.winners_1897_1923[i].seconds*1, name:winners.winners_1897_1923[i].name};
    maleWinners24.push(winner);
    maleWinners25.push('');
    maleWinners26.push('');
    fpace = winners.winners_1897_1923[i].pace;
    finisherPace.push(paceToSeconds(fpace));
  }
  for (var i = 0; i < winners.winners_1924_1956.length; i++) {
    var winner = {y:winners.winners_1924_1956[i].seconds*1, name:winners.winners_1924_1956[i].name};
    maleWinners25.push(winner);
    maleWinners26.push('');
    fpace = winners.winners_1924_1956[i].pace;
    finisherPace.push(paceToSeconds(fpace));
  }
  for (var i = 0; i < winners.winners_1957_2019.length; i++) {
    var winner = {y:winners.winners_1957_2019[i].seconds*1, name:winners.winners_1957_2019[i].name};
    maleWinners26.push(winner);
    fpace = winners.winners_1957_2019[i].pace;
    finisherPace.push(paceToSeconds(fpace));
  }

  Highcharts.chart('winningFinishTimes', {
    exporting: { 
      enabled: false 
    },
    credits: {
        enabled: false
    },
      title: {
          text: 'Winning Finish Times'
      },
      yAxis: {
          title: {
              text: 'Finish Time'
          },
      labels: {
          formatter: function() {
              return toHHMMSS(this.value);
          },
        },
      },
      xAxis: {
        plotLines: [{
          color: '#ccc',
          dashStyle: 'dot',
          value: 1924,
          width: 3,
          zIndex: 2
        },{
          color: '#ccc',
          dashStyle: 'dot',
          value: 1957,
          width: 3,
          zIndex: 2
        }],
        plotBands: [{
          color: '#fff',
          from: 1924,
          to: 1957,
          label: {
            text: 'Course Changes 1924 & 1957',
            style: {
              color: '#606060'
            }
          }
        }]
      },
      plotOptions: {
      line: {
          marker: {
              symbol: 'circle',
              enabled: false
          }
      },
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 1897
          }
      },
      tooltip: {
          shared: true,
          useHTML: true,
         formatter: function() {
              var tooltip='<table class="tip"><caption>'+this.x+'</caption><tbody>';
              //loop each point in this.points
              $.each(this.points,function(i,point){
                  tooltip+='<tr><th style="color: '+point.series.color+'">'+point.key +': </th>'
                        + '<td style="text-align: right; color: #000;">'+toHHMMSS(point.y)+'</td></tr>'
              });
              +'</tbody></table>';
              return tooltip;
          }  ,
      },

      series: [
      // {
      //     name: 'Overall Average',
      //     data: overallAverages
      // }, 
      {
          name: 'Male Winners (26.2 mi)',
          data: maleWinners26,
          color: 'rgba(119, 152, 191, .8)',
      }, {
          name: 'Male Winners (25.5 mi)',
          data: maleWinners25,
          color: '#006699',
      },  {
          name: 'Male Winners (24.5 mi)',
          data: maleWinners24,
          color: '#66b7f2',
      }, {
          name: 'Female Winners',
          data: femaleWinners,
          color: 'rgba(223, 83, 83, .8)',
      }],
  });

Highcharts.chart('paceGraph', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   // chart: {
   //      type: 'column'
   //  },
    title: {
        text: 'Winner\'s Pace 1897-2019'
    },
    xAxis: {
        categories: yearList.slice().reverse(),
        crosshair: true
    },
    yAxis: {
      labels: {
            formatter: function () {
              var pace = toHHMMSS(this.value);
              pace = pace.replace(/^0+/, '')
                return pace;              }
          },
        title: {
            text: 'Pace'
        }
    },
    tooltip: {
            formatter: function () {
              var pace = toHHMMSS(this.y);
              pace = pace.replace(/^0+/, '')
                return this.x +": "+pace;
              },
      shared: true,
      useHTML: true,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
        }
    },
    legend: {
      enabled: false
    },
    series: [{
        type: 'line',
        name: 'Regression Line',
        data: [[0, 380], [121, 285]],
        color: 'rgba(119, 152, 191, .2)',
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    }, {
        name: 'Men',
        data: finisherPace,
        color: 'rgba(119, 152, 191, .8)'
    }
    ]
});

}

function drawParticipationGraph() {
var years1972_2019 = [];
for (var i = 2019; i >= 1972; i--) {
  years1972_2019.push(i);
}
var years1897_1971 = [];
for (var i = 1971; i >= 1897; i--) {
  years1897_1971.push(i);
}


maleCountsPre1972 = [];
  for (var i = yearCounts.counts1897_1971.length - 1; i >= 0; i--) {
  maleCountsPre1972.push(yearCounts.counts1897_1971[i].maleCount)
}
maleCountsPre1972[1]= 15; // 1898
maleCountsPre1972[3]= 26;// 1900
maleCountsPre1972[7]= 40;// 1904
maleCountsPre1972[8]= 38;// 1905
maleCountsPre1972[21]= 14;// 1918

  maleCounts = [];
  femaleCounts = [];
  for (var i = yearCounts.counts1972_2019.length - 1; i >= 0; i--) {
  maleCounts.push(yearCounts.counts1972_2019[i].maleCount)
  femaleCounts.push(yearCounts.counts1972_2019[i].femaleCount)
}

Highcharts.chart('participationGraph1', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   chart: {
        type: 'column'
    },
    title: {
        text: 'Total Participants 1897-1971'
    },
    xAxis: {
        categories: years1897_1971.reverse(),
        crosshair: true
    },
    yAxis: {
      labels: {
            formatter: function () {
                return this.value;
              }
          },
        min: 0,
        title: {
            text: 'Participants'
        }
    },
    tooltip: {
      shared: true,
      useHTML: true,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Men',
        data: maleCountsPre1972,
        color: 'rgba(119, 152, 191, .8)'
    }
    ]
});

Highcharts.chart('participationGraph2', {
  exporting: { 
    enabled: false 
  },
  credits: {
      enabled: false
  },
   chart: {
        type: 'column'
    },
    title: {
        text: 'Total Participants 1972-2019'
    },
    xAxis: {
        categories: years1972_2019.reverse(),
        crosshair: true
    },
    yAxis: {
      labels: {
            formatter: function () {
                return this.value;
              }
          },
        min: 0,
        title: {
            text: 'Participants'
        }
    },
    tooltip: {
      shared: true,
      useHTML: true,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Men',
        data: maleCounts,
        color: 'rgba(119, 152, 191, .8)'
    }, {
        name: 'Women',
        data: femaleCounts,
        color: 'rgba(223, 83, 83, .8)'
    }, 
    ]
});
}

var dot1;
var dot2;
var dot3;
var dot4;
var dot5;
var dot6;
var dot7;
var dot8;
var dot9;

function bostonLogo() {
  b = Snap("#bostonLogo");
  if(b){
    arrow = b.select("#arrow");
    dot1 = b.select("#dot1");
    dot2 = b.select("#dot2");
    dot3 = b.select("#dot3");
    dot4 = b.select("#dot4");
    dot5 = b.select("#dot5");
    dot6 = b.select("#dot6");
    dot7 = b.select("#dot7");
    dot8 = b.select("#dot8");
    dot9 = b.select("#dot9");

    // dot10 = s.select("#dot10");
    // dot11 = s.select("#dot11");
    // dot12 = s.select("#dot12");
    // dot13 = s.select("#dot13");
    // dot14 = s.select("#dot14");
    // dot15 = s.select("#dot15");
    // dot16 = s.select("#dot16");
    // dot17 = s.select("#dot17");
    // dot18 = s.select("#dot18");
    // dot19 = s.select("#dot19");
    // dot20 = s.select("#dot20");
    // dot21 = s.select("#dot21");
    // dot22 = s.select("#dot22");
    // dot23 = s.select("#dot23");
    // dot24 = s.select("#dot24");

    $('#bostonLogo').hover(function() {
      animateBostonLogoIn();
    }, function() {
      animateBostonLogoOut();
    });
    animateBostonLogoOut();
  }
}

function animateBostonLogoOut() {
  dot1.animate({fillOpacity:"0"},200);
  dot2.animate({fillOpacity:"0"},200);
  dot3.animate({fillOpacity:"0"},200);
  dot4.animate({fillOpacity:"0"},200);
  dot5.animate({fillOpacity:"0"},200);
  dot6.animate({fillOpacity:"0"},200);
  dot7.animate({fillOpacity:"0"},200);
  dot8.animate({fillOpacity:"0"},200);
  dot9.animate({fillOpacity:"0"},200);
  dot1.attr({fill: "#000000"});
  dot2.attr({fill: "#000000"});
  dot3.attr({fill: "#ffffff"});
  dot4.attr({fill: "#000000"});
  dot5.attr({fill: "#000000"});
  dot6.attr({fill: "#000000"});
  dot7.attr({fill: "#000000"});

  arrow.attr({fill: "#FAB816"});

  // dot3.animate({"transform" : "t-16"},200);
  // dot5.animate({"transform" : "t-0"},200);
  // dot6.animate({"transform" : "t-0"},200);

  // dot2.animate({"transform" : "t-0"},200);
  // dot7.animate({"transform" : "t-33"},200);
  // dot8.animate({"transform" : "t-33"},200);

  // dot7.attr({fill: "#fff"});
  // dot8.animate({ transform: "r59,37.5,37.5 s1.35,1.35,37.5,37.5"}, 400);
  // dot9.attr({fill: "#fcb715"});
  // dot1.animate({ transform: "r300,37.5,37.5 s0.6,0.6,37.5,37.5"}, 400);

  // dot10.attr({fill: "#ffffff"});
  // dot11.attr({fill: "#ffffff"});
  // dot12.attr({fill: "#ffffff"});
  // dot13.attr({fill: "#ffffff"});
  // dot14.attr({fill: "#ffffff"});
  // dot15.attr({fill: "#ffffff"});
  // dot16.attr({fill: "#ffffff"});
  // dot17.attr({fill: "#ffffff"});
  // dot18.attr({fill: "#ffffff"});
  // dot19.attr({fill: "#ffffff"});
  // dot20.attr({fill: "#ffffff"});
  // dot21.attr({fill: "#ffffff"});
  // dot22.attr({fill: "#ffffff"});
  // dot23.attr({fill: "#ffffff"});
  // dot24.attr({fill: "#ffffff"});
}

function animateBostonLogoIn() {
  dot1.animate({fillOpacity:"1"},200);
  dot2.animate({fillOpacity:"1"},200);
  dot3.animate({fillOpacity:"1"},200);
  dot4.animate({fillOpacity:"1"},200);
  dot5.animate({fillOpacity:"1"},200);
  dot6.animate({fillOpacity:"1"},200);
  dot7.animate({fillOpacity:"1"},200);
  dot8.animate({fillOpacity:"1"},200);
  dot9.animate({fillOpacity:"1"},200);

  arrow.attr({fill: "#6D6E71"});

  // dot3.animate({"transform" : "t-0"},200);
  // dot5.animate({"transform" : "t-33"},200);
  // dot6.animate({"transform" : "t-33"},200);

  // dot2.animate({"transform" : "t-16"},200);
  // dot7.animate({"transform" : "t-0"},200);
  // dot8.animate({"transform" : "t-0"},200);

  dot1.attr({fill: "#FAB816"});
  dot2.attr({fill: "#FAB816"});
  dot3.attr({fill: "#000000"});
  dot4.attr({fill: "#FAB816"});
  dot5.attr({fill: "#FAB816"});
  dot6.attr({fill: "#FAB816"});
  dot7.attr({fill: "#FAB816"});
  dot2.attr({fill: "#000"});
  dot8.attr({fill: "#000"});
  // dot8.animate({ transform: "r0,37.5,37.5 s1,1,37.5,37.5"}, 400);
  // dot1.animate({ transform: "r0,37.5,37.5 s1,1,37.5,37.5"}, 400);

  // dot10.attr({fill: blink()});
  // dot11.attr({fill: blink()});
  // dot12.attr({fill: blink()});
  // dot13.attr({fill: blink()});
  // dot14.attr({fill: blink()});
  // dot15.attr({fill: blink()});
  // dot16.attr({fill: blink()});
  // dot17.attr({fill: blink()});
  // dot18.attr({fill: blink()});
  // dot19.attr({fill: blink()});
  // dot20.attr({fill: blink()});
  // dot21.attr({fill: blink()});
  // dot22.attr({fill: blink()});
  // dot23.attr({fill: blink()});
  // dot24.attr({fill: blink()});

}

function blink(){
  var blink = Math.round(Math.random());
  if (blink) {
    return("#FAB816");
  }
  else {
    return ("#ffffff");
  }
}

$(document).ready(function($) {
  bostonLogo();
});