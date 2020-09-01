#!/bin/sh

find ./ -type f -exec sed -i 's/href="#"/href="..\/eloquentJS\/learnjs.html#chapter-3-functions"/g' {} \;