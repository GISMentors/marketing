#!/bin/sh

for f in src/*.svg; do
    echo "${f}..."
    basename=`basename $f`
    inkscape --export-pdf=dist/${basename%%svg}pdf --export-dpi=300 --export-area-page $f
done

exit 0

    
