# mmrl chrome extension
To install, check out the official Chrome extension [installation guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/) (basically download this folder locally, go to chrome://extensions, and upload it as an unpacked extention).

To update the extension, change your local files and press the "update" button in chrome://extensions. 

## editing
The salient parts are script/content.js, which contains most of the functions, and manifest.json which contains the URLs of the Google forms (under "matches"). So if the tagging google forms ever change, you have to replace the URLs, otherwise the extension won't work!

## questions?
contact jingyili@cs.stanford.edu !