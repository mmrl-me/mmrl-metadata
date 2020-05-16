# alpha60-metadata

Metadata for alpha60 experimental results, organized per media object collection sampled.

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
    
* data-version: last time fields were added, in compressed ISO date format, where 20200516 means YYYY-MM-DD of 2020-05-16
* name: media property identifier, such as "Westworld" or "#blackAF"
* type: either "film", or "serial" meaning tv or 
* id: if film, nothing, if serial either the season, such as "4" or the season and episode in compressed format, where 301 means SSEE of Season 3 Episode 1, leading zero of season dropped
* imdb-id: the root page of the media property's IMDB.com entry
* wikipedia-id: the root page of the media property's wikipedia.org entry
* genre-tags
* plot-tags
* plot-geo
* plot-date
* distribution-tags
* production-tags
* production-geo
