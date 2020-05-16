# alpha60-metadata

Metadata for alpha60 experimental results, organized per media object sampled, where *media object* is defined as a particular media instance such as a film, a season of a netflix show, an episode of a broadcast television series, a software release, an album release, a leak of a CDC report, a leak of presidential tax reports, etc.

Format description is as follows:

    {
        "data-version": "20200516",

        "name": "",
        "type": "",
        "id": "",

        "imdb-id": "",
        "wikipedia-id": "",

        "genre-tags": "",
        "plot-tags": "",
        "plot-geo": "",
        "plot-date": "",

        "distribution-tags": "",
        "production-tags": "",
        "production-geo": ""
    }
    
* * *
    
* __data-version__ last time fields were added, in compressed ISO date format, where 20200516 means YYYY-MM-DD of 2020-05-16
* __name__ what the media property calls itself: identifier with capitalization and typographic flourish, such as "Westworld" or "#blackAF", and the only place where capital letters are allowed
* __type__ media characteristics, such as "film", "serial", "software", "book"
* __id__ if film, nothing, if serial either the season, such as "4" or the season and episode in compressed format, where 301 means SSEE of Season 3 Episode 1, leading zero of season dropped
* __imdb-id__ the root page of the media property's IMDB.com entry
* __wikipedia-id__ the root page of the media property's wikipedia.org entry
* __genre-tags__ union of alpha 60 genre rubric, imdb genres, wikipedia genres
* __cast-poc__ either "true" if lead POC or "false"
* __cast-female__ number of cast that are female or female-identified
* __plot-tags__ union of alpha 60 plot tagging rubric, imdb plot keywords
* __plot-geo__ ostensible geography of media property
* __plot-date__ ostensible time period, deduced from media property, with multiple time periods separated by comma if be
* __distribution-tags__ wikipedia distributor, such as "netflix" or "disney+" or "cbs all access"
* __production-tags__ unknown if useful, put prouduction overflow here
* __production-geo__ union wikipedia country of origin and imdb production details locations 
