/*
mmrl chrome extension
original written by jingyili@cs.stanford.edu - message with any questions!

last updated v 1.2 3/19/23
*/

//these are the titles that need multiselect dropdowns
var mainTitles = ["genre(s)", "plot-geo", "plot-date", "distribution-tags", 
    "production-tags", "production-geo", "positive-reception-tags", "negative-reception-tags", "actor nationality-geo", "character nationality-geo"];
//these are the titles to put the little red * by on the form, since the multiselect boxes breaks using google form's built in required options
var requiredTitles = ["tagger", "property name (original)", "media type", 
    "imdb page url", "wikipedia page url", "genre(s)", "plot-geo", "plot-date", 
    "distribution-tags", "production-tags", "production-geo", "bias tags",
    "plot tags", "positive-reception-tags", "negative-reception-tags", "cast lead pair #", "actor name", "actor ethnicity supertags", "actor gender supertags", "actor sexuality supertags", "actor age", "actor-z", "primary vs secondary character", "character name", "character ethnicity supertags", "character gender supertags", "character sexuality supertags", "character age", "character-z", "actor nationality-geo", "character nationality-geo"];

// MAIN runtime function below
const url = chrome.runtime.getURL('data/multiselect-options.json');
fetch(url)
    .then((response) => response.json())
    .then((json) => {

        //first, we read the multiselect options from the json file located in data/multiselect-options.json
        var data = json;
        console.log("DATA! ", data);
        for (var i = 0; i < mainTitles.length; i++) {
            addMultiSelect(mainTitles[i], data);     
            //now, in a loop, we call addmultiselect to process this data and add the dropdowns
        }
    })
    .then(()=> {
        //after we add the dropdowns, we call another js library
        //to make the dropdowns pretty
        MultiselectDropdown(window.MultiselectDropdownOptions);
        //and then add the required *s
        makeTitlesRequired(requiredTitles);
    })
    .then(() => {
        //finally, we add listeners to the text area to populate them on enter
        for (var i = 0; i < mainTitles.length; i++) {
            const title = mainTitles[i];
            const simplifiedTitle = simplifyTitle(title);
            // console.log("simplified title for button ", simplifiedTitle);
            $("#"+simplifiedTitle+"-textarea").keypress( function(e) {
              if (e.which == 13) { //enter or space
                //new scope for this function
                populateClick($(this), title);
            }});
        }
    });

function getSelectValues(options) {
    //get the selected values from a mutliselect
    if (options.length == 0) {
        return "";
    }
  // console.log(options, "options");
  var str = options[0];
  // console.log(options.length);
  for (var i = 1; i < options.length; i++) {
    str = str.concat("\n", options[i]);
  }
  return str;
}

function getBoxByTitle(title) {
    //get the correct DOM element that matches input title
    //if this is breaking, it's either because the title_class
    //changed - use inspect element to double check the google-given class
    //or because their dom structure changed - again, use inspect 
    //element to figure out the right hierarchy for the return statement
    const title_class = "M7eMe";
    titles = document.getElementsByClassName(title_class);
    for (var i = 0; i < titles.length; i++) {
        if (titles[i].innerHTML.includes(title)) {
            console.log("found ", title, "in ", titles[i]);
            return titles[i].parentElement.parentElement.parentElement.parentElement;
            //the fourth parent element is the big box
        }
    }
    console.log("ERROR null: no question box with title ", title);
    return null;
}

function makeTitlesRequired(titlesList) {
    //adds the *s
    //see notes on getBoxByTitle if this function stops working
    const title_class = "M7eMe";
    for (var j = 0; j < titlesList.length; j++) {
        var title = titlesList[j];
        console.log("WORKING ", title);
        allTitles = document.getElementsByClassName(title_class);
        for (var i = 0; i < allTitles.length; i++) {
            if (allTitles[i].innerHTML.includes(title)) {
                console.log("found required", title, "in ", allTitles[i]);
                var titleSpan = allTitles[i];
                if (titleSpan.lastChild.tagName == "BR") {
                    titleSpan.removeChild(titleSpan.lastChild);
                }
                var node = document.createElement("span");
                node.setAttribute("style", "color:red;");
                var textnode = document.createTextNode("*");
                node.appendChild(textnode);
                titleSpan.appendChild(node);
            }
        }
    }
}

function getTextAreaFromBox(box) {
    //given a box, return the textarea element
    return box.getElementsByTagName('textarea')[0];
}

function simplifyTitle(title) { //removes special characters
    return title.replace(/[^A-Za-z-]/g, '');
}

function processData(title,data) {
    //process read json data to only 
    //include the options where field==title
    var options = []
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      if (row["field"] == title) {
        options.push(row["option"]);
      }
      if (title.includes("-geo") && row["field"] == "-geo") {
        options.push(row["option"]);
      }
      if (title.includes("nationality-geo") && row["field"] == "plot-geo") {
        options.push(row["option"]);
      }
      if (title.includes("-reception-tags") && row["field"] == "-reception-tags") {
        options.push(row["option"]);
      }
    }
    return options;
}

function addMultiSelect(title, data) {
    //manipulates the DOM to actually add the multiselect elements

    options = processData(title,data);
    // console.log("title ", title, " has options ", options);
    
    //find the DOM element to attach
    var box = getBoxByTitle(title)
    if (box == null) {
        return;
    }
   
    //create and append multiselect list
    var selectList = document.createElement("select");
    selectList.id = simplifyTitle(title);
    selectList.setAttribute("multiple","");
    selectList.setAttribute("multiselect-search","true");
    selectList.setAttribute("multiselect-hide-x","true");
    box.appendChild(selectList);

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        selectList.appendChild(option);
    }

    //add id to each textarea to make them easier to find
    textBox = getTextAreaFromBox(box);
    textBox.setAttribute("id", simplifyTitle(title)+"-textarea");

}




function populateClick(textarea, title) {
    //fills in the selected options into the textarea
    // note - changed from click button due to need for user input

    console.log("populating click for ", textarea, title);

    var simplifiedTitle = simplifyTitle(title);
    var options = $("select#"+simplifiedTitle).val();
    const height = options.length*20;
    var values = getSelectValues(options);
    //set value
    var box = getBoxByTitle(title);
    if (box == null) { return; }
    textBox = getTextAreaFromBox(box);
    textBox.parentElement.parentElement.parentElement.classList.add("CDELXb");
    textBox.setAttribute("style", "height: "+height+"px");
    textBox.value = values;
    textBox.innerHTML = values; 
    textBox.setAttribute("data-initial-value", values);
    console.log("finished with val ", values);
    textBox.dispatchEvent(new Event('keypress', {keyCode: 65}));
    textBox.setAttribute("badinput", false);

}
