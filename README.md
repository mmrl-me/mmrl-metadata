# alpha60-metadata

Metadata for alpha60 experimental results, organized per media object sampled, where *media object* is defined as a particular media instance such as a film, a season of a netflix show, an episode of a broadcast television series, a software release, an album release, a leak of a CDC report, future leaks of presidential tax reports, etc.

Tag existing media objects with metadata. Sort by streaming platform. Sort by genre. Try to find a schema to represent Bechdel, Villalobos, Gagen, DuVernay tests. Try to quantify “diverse ensemble,”  “fully realized lives”, “scenery in white lives” tags.  

Schema description is as follows:

    {
        "name": "",
        "type": "",
        "id": "",

        "id-imdb": "",
        "id-wikipedia": "",

        "genre-tags": [""],
        "plot-tags": [""],
        "plot-geo": [""],
        "plot-date": [""],

        "cast-lead-1-ethnicities": [""],
        "cast-lead-1-genders": [""],
        "cast-lead-1-sexualities": [""],
        
        "cast-lead-2-ethnicities": [""],
        "cast-lead-2-genders": [""],
        "cast-lead-2-sexualities": [""],
        
        "cast-lead-3-ethnicities": [""],
        "cast-lead-3-genders": [""],
        "cast-lead-3-exualities": [""],
        
        "distribution-tags": [""],
        "production-tags": [""],
        "production-geo": [""],
        
        "notes": [""],
        
        "data-version": "20200517"
    }
    
* * *
 
 Rubric Documentation: https://docs.google.com/document/d/13EYleLGOzrNcB8ZtPQnwgNBLCf0IIjOl9Yq2rMCCDjY/edit
    

* __name__ what the media property calls itself: identifier with capitalization and typographic flourish, such as "Westworld" or "#blackAF", and the only place where capital letters are allowed
* __type__ media characteristics, such as "film", "serial", "software", "book"
* __id__ if film, nothing, if serial either the season, such as "4" or the season and episode in compressed format, where 301 means SSEE of Season 3 Episode 1, leading zero of season dropped
* __id-imdb__ the root page of the media property's IMDB.com entry
* __id-wikipedia__ the root page of the media property's wikipedia.org entry
* __genre-tags__ union of alpha 60 genre rubric, imdb genres, wikipedia genres
* __plot-tags__ union of alpha 60 plot tagging rubric, imdb plot keywords
* __plot-geo__ ostensible geography of media property
* __plot-date__ ostensible time period, deduced from media property, with multiple time periods separated by comma if be
* __cast-lead-ethnicities__ lead or leads ethnicity, comma separated list, "diverse ensemble" catch-all
* __cast-lead-genders__ lead or leads gender, comma separated list, "diverse ensemble" catch-all
* __cast-lead-sexualities__ lead or leads sexuality, comma separated list, "diverse ensemble" catch-all
* __distribution-tags__ wikipedia distributor, such as "netflix" or "disney+" or "cbs all access"
* __production-tags__ optional, unknown if useful, put prouduction overflow here
* __production-geo__ union wikipedia country of origin and imdb production details locations 
* __notes__ optional, overflow and space for custom or prototype tagging 
* __data-version__ last time new data fields were added, in compressed ISO date format, where 20200516 means YYYY-MM-DD of 2020-05-16. *Don't change this.*
