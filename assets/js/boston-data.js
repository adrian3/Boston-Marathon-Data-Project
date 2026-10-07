// Data loading for the Boston Marathon Data Project.
//
// The original site asked a PHP/MySQL API (api/boston/boston.php) for the
// leaderboard and the placement calculator. GitHub Pages only serves static
// files, so the same answers are worked out in the browser:
//
//   Results tab      reads results<year>.csv from the root of this repository
//   Calculator tab   reads assets/data/finish-times.json
//
// finish-times.json is generated from the CSV files by tools/build_site_data.py.

var resultsCache = {};
var resultsRequests = {};
var finishTimes = null;
var finishTimesRequest = null;
var calculatorYears = [2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000];

// The CSV files are MySQL exports: text fields are wrapped in double quotes,
// a quote inside a field is written as \" and a missing value is a bare NULL.
function parseResultsCSV(text) {
  var rows = [];
  var row = [];
  var field = '';
  var inQuotes = false;
  var wasQuoted = false;
  var length = text.length;
  for (var i = 0; i < length; i++) {
    var c = text.charAt(i);
    if (inQuotes) {
      if (c === '\\' && i + 1 < length) {
        field += text.charAt(++i);
      }
      else if (c === '"') {
        inQuotes = false;
      }
      else {
        field += c;
      }
    }
    else if (c === '"') {
      inQuotes = true;
      wasQuoted = true;
    }
    else if (c === ',' || c === '\n') {
      row.push(!wasQuoted && field === 'NULL' ? null : field);
      field = '';
      wasQuoted = false;
      if (c === '\n') {
        rows.push(row);
        row = [];
      }
    }
    else if (c !== '\r') {
      field += c;
    }
  }
  if (field !== '' || wasQuoted || row.length) {
    row.push(!wasQuoted && field === 'NULL' ? null : field);
    rows.push(row);
  }
  return rows;
}

// Some names were saved as UTF-8 that had been read as Windows-1252
// ("FranÃ§ois" for "François"). Undo that where it can be done exactly.
var windows1252 = {0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F};
var utf8Decoder = (typeof TextDecoder !== 'undefined') ? new TextDecoder('utf-8', {fatal: true}) : null;
function repairName(name) {
  if (!name || !utf8Decoder || !/[Â-ô]/.test(name)) {
    return name;
  }
  var bytes = new Uint8Array(name.length);
  for (var i = 0; i < name.length; i++) {
    var code = name.charCodeAt(i);
    if (code > 0xFF) {
      code = windows1252[code];
      if (!code) { return name; }
    }
    bytes[i] = code;
  }
  try {
    return utf8Decoder.decode(bytes);
  }
  catch (e) {
    return name;
  }
}

// A finishing place, or null when the value is not a whole number.
function toPlace(value) {
  return /^\d+$/.test(value) ? parseInt(value, 10) : null;
}

// Fetches and parses results<year>.csv once, then answers from memory.
function loadResults(year, callback) {
  if (resultsCache[year]) {
    callback(resultsCache[year]);
    return;
  }
  if (resultsRequests[year]) {
    resultsRequests[year].push(callback);
    return;
  }
  resultsRequests[year] = [callback];
  $.ajax({url: 'results' + year + '.csv', dataType: 'text'}).done(function(text) {
    var rows = parseResultsCSV(text);
    var header = rows.shift() || [];
    var column = {};
    for (var i = 0; i < header.length; i++) {
      column[header[i]] = i;
    }
    var results = [];
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      if (row.length !== header.length) {
        continue;
      }
      results.push({
        display_name: repairName(row[column.display_name]),
        age: row[column.age],
        gender: row[column.gender],
        official_time: row[column.official_time],
        overall: toPlace(row[column.overall]),
        gender_result: toPlace(row[column.gender_result]),
        division_result: row[column.division_result],
        seconds: row[column.seconds]
      });
    }
    resultsCache[year] = results;
  }).fail(function() {
    resultsCache[year] = null;
  }).always(function() {
    var callbacks = resultsRequests[year];
    delete resultsRequests[year];
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i](resultsCache[year]);
    }
  });
}

// One page of 100 finishers for the current year, page and division.
function getLeaderboard() {
  var requestedYear = year;
  var requestedPage = page;
  var requestedFilter = filter;
  bostonData.leaderboardStatus = resultsCache[requestedYear] ? '' : 'Loading ' + requestedYear + ' results...';
  loadResults(requestedYear, function(results) {
    if (requestedYear != year || requestedPage != page || requestedFilter != filter) {
      return; // a newer request has replaced this one
    }
    if (!results) {
      bostonData.leaderboard = [];
      bostonData.hasPreviousPage = requestedPage > 0;
      bostonData.hasNextPage = false;
      bostonData.leaderboardStatus = 'The ' + requestedYear + ' results could not be loaded.';
      return;
    }
    var startPlace = requestedPage * 100 + 1;
    var endPlace = startPlace + 99;
    var placeField = 'overall';
    var gender = false;
    if (requestedFilter == 'M' || requestedFilter == 'F') {
      placeField = 'gender_result';
      gender = requestedFilter;
    }
    var rows = [];
    var hasNextPage = false;
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      if (gender && String(result.gender).toUpperCase() != gender) {
        continue;
      }
      var place = result[placeField];
      if (place === null) {
        continue;
      }
      if (place > endPlace) {
        hasNextPage = true;
      }
      else if (place >= startPlace) {
        rows.push(result);
      }
    }
    rows.sort(function(a, b) {
      return a[placeField] - b[placeField];
    });
    bostonData.leaderboard = rows;
    bostonData.hasPreviousPage = requestedPage > 0;
    bostonData.hasNextPage = hasNextPage;
    bostonData.leaderboardStatus = '';
  });
}

function loadFinishTimes(callback) {
  if (finishTimes) {
    callback(finishTimes);
    return;
  }
  if (!finishTimesRequest) {
    finishTimesRequest = $.getJSON('assets/data/finish-times.json').done(function(data) {
      // Each list is stored as the gap to the previous time; add them back up.
      var years = data.years;
      for (var y in years) {
        for (var group in years[y]) {
          var times = years[y][group];
          for (var i = 1; i < times.length; i++) {
            times[i] += times[i - 1];
          }
        }
      }
      finishTimes = years;
    });
  }
  finishTimesRequest.done(function() {
    callback(finishTimes);
  });
}

// How many of the sorted times are faster than the given time.
function countFaster(times, seconds) {
  var low = 0;
  var high = times.length;
  while (low < high) {
    var middle = (low + high) >> 1;
    if (times[middle] < seconds) {
      low = middle + 1;
    }
    else {
      high = middle;
    }
  }
  return low;
}

// Where a finish time would have placed in each year: one more than the
// number of finishers who were faster.
function getResultBefore() {
  var seconds = parseInt($('#raceTime').val(), 10);
  if (isNaN(seconds)) {
    return;
  }
  loadFinishTimes(function(times) {
    var placements = [];
    for (var i = 0; i < calculatorYears.length; i++) {
      var yearTimes = times[calculatorYears[i]];
      if (!yearTimes) {
        continue;
      }
      var fasterMen = countFaster(yearTimes.M, seconds);
      var fasterWomen = countFaster(yearTimes.F, seconds);
      var fasterOthers = countFaster(yearTimes.other, seconds);
      placements.push({
        year: calculatorYears[i],
        time: toHHMMSS(seconds),
        overall: fasterMen + fasterWomen + fasterOthers + 1,
        male: fasterMen + 1,
        female: fasterWomen + 1
      });
    }
    bostonData.placementboard = placements;
  });
}
