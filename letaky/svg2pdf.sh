#!/bin/sh

for f in svg/*.svg; do
    echo "${f}..."
    basename=`basename $f`
    inkscape --export-pdf=pdf/${basename%%svg}pdf --export-dpi=300 --export-area-page $f
done

exit 0

    
