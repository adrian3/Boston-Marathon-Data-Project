# Boston-Marathon-Data-Project
## Race Results 1897-2019 for the Boston Marathon Data Project

This project contains the race results of the Boston Marathon from 1897-2019. To be clear, I have no association with the Boston Athletic Association. If my data contradicts anything provided by the B.A.A. you should assume that I am wrong and they are right. I have accumulated these results from whatever resources I can find and therefore I can't vouch for accuracy or be held responsible for mistakes contained in this data. I make no claims of ownership over this data, I simply share this with the running community as a resource that all of us can learn from. I encourage you to dissect this data and share your findings. My analysis can be found at [https://adrian3.github.io/Boston-Marathon-Data-Project/](https://adrian3.github.io/Boston-Marathon-Data-Project/) and I welcome feedback.

## The Data

There is one CSV file per race in the root of this repository, named `results<year>.csv` (for example [`results2019.csv`](results2019.csv)). Download the whole repository, or grab a single year directly:

```
https://raw.githubusercontent.com/adrian3/Boston-Marathon-Data-Project/master/results2019.csv
```

Every file has these columns:

| Column | Meaning |
| --- | --- |
| `display_name` | Runner's name, first name first |
| `first_name`, `last_name` | The same name split in two |
| `age` | Age on race day (`0` when unknown) |
| `gender` | `M` or `F` (a handful are `U`, unknown) |
| `official_time` | Finish time as `h:mm:ss` |
| `seconds` | Finish time in seconds |
| `pace` | Average pace per mile |
| `overall` | Overall finishing place |
| `gender_result` | Place among runners of the same gender |
| `division_result` | Place within the age division |

The 1897-2014 files also have a single `residence` column. The 2015-2019 files replace it with `city`, `state`, `country_residence` and `contry_citizenship`, and add `bib`, `name` (last name first), `name_suffix`, `place_overall`, `projected_time` and split times at `5k`, `10k`, `15k`, `20k`, `half`, `25k`, `30k`, `35k` and `40k` where I have them.

The files are exports from a MySQL database, which matters if you are parsing them yourself: text values are wrapped in double quotes, a quote inside a value is written as `\"`, and a missing value is a bare `NULL`.

## Known Discrepencies  
While I am doing everything I can to keep these results accurate, this data is hard to find and verify. Here are some gaps and known errors contained in this data...

**Wheelchair data:** So far I have neglected this data but I plan on adding it as I go.

**2013:** There are 2 csv files for 2013 because there is a second data set that contains runners that were diverted because of the bombing that year. 

**1993 & 1995:** My source for this data had wheelchair data mixed in with the runner results.  I was able to remove all times that were shorter the winner, I assume that there are wheelchair times mixed in with the results.

**1897-1899:** I currently only have the winners of the Boston Marathon for these years. 

## The Website

The same repository is published with GitHub Pages at [https://adrian3.github.io/Boston-Marathon-Data-Project/](https://adrian3.github.io/Boston-Marathon-Data-Project/). It is a static site: there is nothing to build and no server code.

| Path | What it is |
| --- | --- |
| `index.html` | The page |
| `assets/js/boston-app.js` | The tabs and their text (Vue components and routes) |
| `assets/js/boston.js` | The charts (Highcharts) |
| `assets/js/boston-data.js` | Loads results for the Results tab and the Calculator |
| `assets/js/vendor/` | jQuery, Vue, Vue Router, Highcharts, Snap.svg and what-input |
| `assets/css/`, `assets/img/`, `assets/fonts/` | Styles, images and fonts |
| `assets/data/` | Summaries that the charts read, described below |
| `tools/build_site_data.py` | Rebuilds the generated files in `assets/data/` |

**Where each tab gets its numbers**

- The **Results** table reads the `results<year>.csv` files above directly, so a correction to a CSV shows up there as soon as it is pushed.
- The **Calculator** and the age and gender scatter chart on the **Performance** tab read `assets/data/finish-times.json` and `assets/data/results-by-age/<year>.json`. These are generated from the 2000-2019 CSV files. After changing one of those CSV files, rebuild them with:

  ```
  python3 tools/build_site_data.py
  ```

- The other charts read summaries in `assets/data/` that were computed from the same results ahead of time (`averages.js`, `winners.js`, `year-counts.js`, `ageCounts.js`, `ageDistribution.js`, `qualifiers.js` and `subQualifierTimes.js`). The script does not rebuild these, so they need a manual edit when a new year is added. `course.js` holds the route of the course and is not used by the page yet.

**Previewing locally**

The page loads its data over HTTP, so open it through a local web server rather than as a file:

```
python3 -m http.server 8000
```

Then visit [http://localhost:8000/](http://localhost:8000/).

**Publishing**

In the repository settings on GitHub, open **Pages**, choose **Deploy from a branch**, and select the `master` branch and the `/ (root)` folder. The `.nojekyll` file tells GitHub to publish the files exactly as they are.

***

If you find mistakes in this data or if you can help fill in the blanks please get in touch. 

- Adrian Hanft
[https://adrian3.github.io/Boston-Marathon-Data-Project/](https://adrian3.github.io/Boston-Marathon-Data-Project/)
