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
    BUILD_MODE=$1
  fi
fi

#
# Clean
#
rm -rf $BUILD_DIR

#
# Create build directory
#
mkdir -p $BUILD_DIR

#
# Dev build
#
if [ $BUILD_MODE == "dev" ]; then
  echo "Building development package..."
  
  # Escape Closure dir to be used in sed
  SAFE_CLOSURE_LIBRARY_PATH=$(printf "%s\n" "$CLOSURE_LIBRARY_PATH" | sed 's/[][\.*^$/]/\\&/g')
  # Prefix to append to each dependency path 
  PREFIX="../../../../"$SCRIPTS_PATH
  # Create deps file
  $PYTHON $DEPSWRITER_CMD --root_with_prefix=$SCRIPTS_PATH" "$PREFIX > $BUILD_DIR/$DEPS_FILENAME
  # Remove <!--PROD PROD--> into index.html
  sed -e :a -re 's/<!--PROD.*?PROD-->//g;/<!--/N;//ba' < index.html | 
  # Uncomment <!--DEV DEV--> into index.html
  sed -e :a -re 's/<!--DEV(.*?)DEV-->/\1/g;/<!--/N;//ba' |
  # Replace Closure Library directory
  sed -e 's/\${CLOSURE_LIBRARY_PATH}/..\/'$SAFE_CLOSURE_LIBRARY_PATH'/g' > $BUILD_DIR/index.html

#
# Prod build
#
elif [ $BUILD_MODE == "prod" ]; then
  echo "Building production package..."
  # Generate compiled file into build dir
  $PYTHON $CLOSUREBUILDER_CMD --root=$CLOSURE_LIBRARY_PATH/ \
                             --root=$SCRIPTS_PATH/ \
                             --namespace="urlbuilder" \
                             --output_mode=compiled \
                             --compiler_jar=$CLOSURE_COMPILER_PATH/compiler.jar \
                             --compiler_flags="--compilation_level=$COMPILATION_LEVEL" \
                             > $BUILD_DIR/urlbuilder.min.js
  # Remove <!--DEV DEV--> into index.html
  sed -e :a -re 's/<!--DEV.*?DEV-->//g;/<!--/N;//ba' < index.html |
  # Uncomment <!--PROD PROD--> into index.html
  sed -e :a -re 's/<!--PROD(.*?)PROD-->/\1/g;/<!--/N;//ba' > $BUILD_DIR/index.html
fi

# Copy style
cp -r style $BUILD_DIR

echo "Done."


