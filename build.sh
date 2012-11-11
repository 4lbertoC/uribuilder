#!/bin/bash

#############################################
#
# URLBuilder build script
# -----------------------
#
# Usage:
#
#   ./build.sh [dev|prod]
#
#
#############################################

#
# Load config
#
. config.sh

#
# Read custom build mode
#
if [ $1 ]; then
  if [ $1 == "dev" -o $1 == "prod" ]; then
    BUILDMODE=$1
  fi
fi

#
# Clean
#
/bin/rm -rf $BUILDDIR

#
# Create build directory
#
/bin/mkdir -p $BUILDDIR

#
# Dev build
#
if [ $BUILDMODE == "dev" ]; then
  echo "Building development package..."
  
  # Escape Closure dir to be used in sed
  SAFECLOSUREDIR=$(printf "%s\n" "$CLOSUREDIR" | /bin/sed 's/[][\.*^$/]/\\&/g')
  # Prefix to append to each dependency path 
  PREFIX="../../../../"$PATH
  # Create deps file
  $PYTHON $DEPSWRITERCMD --root_with_prefix=$PATH" "$PREFIX > $BUILDDIR/$DEPSFILENAME
  # Remove <!--PROD PROD--> into index.html
  /bin/sed -e :a -re 's/<!--PROD.*?PROD-->//g;/<!--/N;//ba' < index.html | 
  # Uncomment <!--DEV DEV--> into index.html
  /bin/sed -e :a -re 's/<!--DEV(.*?)DEV-->/\1/g;/<!--/N;//ba' |
  # Replace Closure Library directory
  /bin/sed -e 's/\${CLOSUREDIR}/..\/'$SAFECLOSUREDIR'/g' > $BUILDDIR/index.html

#
# Prod build
#
elif [ $BUILDMODE == "prod" ]; then
  echo "Building production package..."
  # Generate compiled file into build dir
  # TODO
  # Remove <!--DEV DEV--> into index.html
  /bin/sed -e :a -re 's/<!--DEV.*?DEV-->//g;/<!--/N;//ba' < index.html |
  # Uncomment <!--PROD PROD--> into index.html
  /bin/sed -e :a -re 's/<!--PROD(.*?)PROD-->/\1/g;/<!--/N;//ba' > $BUILDDIR/index.html
fi

# Copy style
/bin/cp -r style $BUILDDIR

echo "Done."


