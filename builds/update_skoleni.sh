#!/bin/bash

echo "buildim" `date` >> /tmp/build.log
workshops=("vugtk" "geopython" "grass-gis-zacatecnik" "postgis-zacatecnik" "postgis-pokrocily" "otevrena-geodata" "open-source-gis" "grass-gis-pokrocily" "qgis-zacatecnik")

function update_git {
	cd ~;
	echo updating $1;
	cd $1;
	git pull --rebase;
	make clean;
	make html;
};

function update_pdf {
    cd ~;
    echo generating pdf for $1;
    cd $1;
    make latexpdf;
    cp _build/latex/*.pdf html
    cd html
    pdf=`basename *.pdf | sed 's/-[0-9].*/.pdf/g'`
    ln -sf `basename *.pdf` $pdf
}

# update sphinx template
cd ~/sphinx-template/
git pull --rebase


# update all workshops
for dir in ${!workshops[*]}
do
    workshop=${workshops[$dir]}
    update_git $workshop
    if [ $workshop == "grass-gis-zacatecnik" -o \
	$workshop == "otevrena-geodata" -o \
	$workshop == "postgis-zacatecnik" ] ; then
	update_pdf $workshop
    fi
done
