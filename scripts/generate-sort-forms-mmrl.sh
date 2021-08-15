mv $src/alpha60/src/a60-metadata-analyze.exe .;
./a60-metadata-analyze.exe;

mkdir txt ; mv *.txt ./txt/;

mkdir svg ; mv *.svg ./svg/;
mkdir svg.chord ; mv svg/*chord-graph* ./svg.chord/;
mkdir svg.dim ; mv svg/*dimension-graph* ./svg.dim/;

$src/alpha60/scripts/svg-dir-to-pngs-and-pdfs.sh ./svg
$src/alpha60/scripts/svg-dir-to-pngs-and-pdfs.sh ./svg.chord
$src/alpha60/scripts/svg-dir-to-pngs-and-pdfs.sh ./svg.dim

$src/alpha60/scripts/sort-dirs-to-type.sh ./svg
$src/alpha60/scripts/sort-dirs-to-type.sh ./svg.chord
$src/alpha60/scripts/sort-dirs-to-type.sh ./svg.dim
