#! /usr/bin/env bash 
[[ $1 = "" ]] && { echo "Usage: $0 <target>"; exit 1; }
[[ -d dist/ ]] || mkdir dist
npx rollup index.js --file dist/index.cjs --format cjs
npx @yao-pkg/pkg dist/index.cjs -t $1 -o dist/tables 

# install ??
read -p "Do you want to install the package? (y/n) " yn

case $yn in
    [Yy]* ) sudo cp dist/tables /usr/bin/;;
    [Nn]* ) exit;;
    * ) echo "Please answer yes or no.";;
esac
