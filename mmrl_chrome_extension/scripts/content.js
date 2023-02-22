/*
mmrl chrome extension
original written by jingyili@cs.stanford.edu - message with any questions!

last updated v 1.0 feb 2023
*/

var mainTitles = ["genre(s)", "plot-geo", "plot-date", "distribution-tags", 
    "production-tags", "production-geo", "positive-reception-tags", "negative-reception-tags", "actor nationality-geo", "character nationality-geo"];
var requiredTitles = ["tagger", "property name (original)", "media type", 
    "imdb page url", "wikipedia page url", "genre(s)", "plot-geo", "plot-date", 
    "distribution-tags", "production-tags", "production-geo", "bias tags",
    "plot tags", "positive-reception-tags", "negative-reception-tags", "cast lead pair #", "actor name", "actor ethnicity supertags", "actor gender supertags", "actor sexuality supertags", "actor age", "actor-z", "primary vs secondary character", "character name", "character ethnicity supertags", "character gender supertags", "character sexuality supertags", "character age", "character-z", "actor nationality-geo", "character nationality-geo"];

//first, we read the multiselect options from the json as data
const url = chrome.runtime.getURL('data/multiselect-options.json');
fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
        var data = json;
        console.log("DATA! ", data);
   

        for (var i = 0; i < mainTitles.length; i++) {
            addMultiSelect(mainTitles[i], data);     
        }

    })
    .then(()=> {
        MultiselectDropdown(window.MultiselectDropdownOptions);
        makeTitlesRequired(requiredTitles);
    })
    .then(() => {
        for (var i = 0; i < mainTitles.length; i++) {
            const simplifiedTitle = simplifyTitle(mainTitles[i]);
            console.log("simplified title for button ", simplifiedTitle);
            $("#"+simplifiedTitle+"-button").click(function () {
                //new scope for this function
                populateClick($(this).attr('name'));
            });
        }
    });

function getSelectValues(options) {
    if (options.length == 0) {
        return "";
    }
    console.log(options, "options");
  var str = options[0];
  console.log(options.length);
  for (var i = 1; i < options.length; i++) {
    str = str.concat("\n", options[i]);
  }
  return str;
}

function getBoxByTitle(title) {
    const title_class = "M7eMe";
    titles = document.getElementsByClassName(title_class);
    for (var i = 0; i < titles.length; i++) {
        if (titles[i].innerHTML.includes(title)) {
            console.log("found ", title, "in ", titles[i]);
            return titles[i].parentElement.parentElement.parentElement.parentElement;
            //the fourth parent element is the big box
        }
    }
    console.log("ERROR: no question box with title ", title);
    return null;
}

function makeTitlesRequired(titlesList) {
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
        console.log("ERROR: no question box with title to make required ", title);
    }
}

function getTextAreaFromBox(box) {
    return box.getElementsByTagName('textarea')[0];
    //this is DOM the structure for the text area
}

const genre_textbox_class = ".KHxj8b.tL9Q4c"; //any text area 
const genre_box = ".geS5n"; //any box 
//M7eMe is span title class

function simplifyTitle(title) { //removes special characters
    return title.replace(/[^A-Za-z-]/g, '');
}

function processData(title,data) {
    //first, process read json data
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

    //create button
    var populateButton = document.createElement("button");
    populateButton.innerHTML = "Populate";
    populateButton.type = "submit";
    populateButton.name = title
    populateButton.id = simplifyTitle(title)+"-button";
    box.appendChild(populateButton);

}

function populateClick(title){
    console.log("populating click for ", title);
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
    textBox.setAttribute("data-initial-value", values);
}
