#!/bin/bash

#############################################
#
# URLBuilder build script
# -----------------------
#
# Usage:
#
#   ./build.sh [dev|prod|WHITESPACE_ONLY|SIMPLE_OPTIMIZATIONS|ADVANCED_OPTIMIZATIONS]
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
# Read custom compilation level
#
if [ $1 ]; then
  if [ $1 == "WHITESPACE_ONLY" -o $1 == "SIMPLE_OPTIMIZATIONS" -o $1 == "ADVANCED_OPTIMIZATIONS" ]; then
    BUILD_MODE="prod"
    COMPILATION_LEVEL=$1
  fi
fi

#
# Clean
#
rm -rf $BUILD_PATH

#
# Create build directory
#
mkdir -p $BUILD_PATH

#
# Create temporary directory
#
TEMP_DIR="tmp"
mkdir -p $TEMP_DIR

#
# Create directory for generated files
#
GEN_DIR="gen"
mkdir -p $GEN_DIR

#
# Dev build
#
if [ $BUILD_MODE == "dev" ]; then
  echo "Building development package..."

  echo "Minify CSS"
  java -jar $CLOSURE_STYLESHEETS_CMD \
            style/*.css \
            --pretty-print \
            --output-file $BUILD_PATH/ubstyle.css

  echo "Set index.soy.js dir"
  INDEX_SOY_JS=$TEMP_DIR/$INDEX_SOY_JS

  echo "Generate index.html filler from template"
  java -jar $CLOSURE_TEMPLATES_PATH"/SoyToJsSrcCompiler.jar" \
            --codeStyle concat \
            --shouldProvideRequireSoyNamespaces \
            --cssHandlingScheme GOOG \
            --outputPathFormat $INDEX_SOY_JS \
            templates/index.soy

  # Escape Closure dirs to be used in sed
  SAFE_CLOSURE_LIBRARY_PATH=$(printf "%s\n" "$CLOSURE_LIBRARY_PATH" | sed 's/[][\.*^$/]/\\&/g')
  SAFE_CLOSURE_TEMPLATES_PATH=$(printf "%s\n" "$CLOSURE_TEMPLATES_PATH" | sed 's/[][\.*^$/]/\\&/g')
  # Prefix to append to scripts path
  PREFIX="../../../"
  echo "Create deps file"
  $PYTHON $DEPSWRITER_CMD \
          --root_with_prefix=$SCRIPTS_PATH" "$PREFIX$UB_PATH$SCRIPTS_FOLDER \
          --root_with_prefix=$TEMP_DIR" "$PREFIX$UB_PATH$SCRIPTS_FOLDER \
          --root_with_prefix=$CLOSURE_TEMPLATES_PATH" "$PREFIX$CLOSURE_TEMPLATES_PATH > $BUILD_PATH/$DEPS_FILENAME

  echo "Copy source files"
  cp -r $SCRIPTS_PATH $BUILD_PATH
  cp -r $INDEX_SOY_JS $BUILD_PATH$SCRIPTS_FOLDER

  echo "Replace variables in index.html"
  cat index.html |
  # Remove <!--PROD PROD--> into index.html
  sed -e :a -re 's/<!--PROD.*?PROD-->//g;/<!--/N;//ba' | 
  # Uncomment <!--DEV DEV--> into index.html
  sed -e :a -re 's/<!--DEV(.*?)DEV-->/\1/g;/<!--/N;//ba' |
  # Replace variables directory
  sed -e 's/\${CLOSURE_LIBRARY_PATH}/..\/'$SAFE_CLOSURE_LIBRARY_PATH'/g' |
  sed -e 's/\${CLOSURE_TEMPLATES_PATH}/..\/'$SAFE_CLOSURE_TEMPLATES_PATH'/g' > $BUILD_PATH/index.html

#
# Prod build
#
elif [ $BUILD_MODE == "prod" ]; then
  echo "Building production package..."

  INDEX_SOY_JS=$GEN_DIR/$INDEX_SOY_JS
  RENAME_MAP_NAME=$TEMP_DIR/$RENAME_MAP_NAME

  echo "Minify CSS"
  java -jar $CLOSURE_STYLESHEETS_CMD \
            style/*.css \
            --output-file $BUILD_PATH/ubstyle.css \
            --rename CLOSURE \
            --output-renaming-map-format CLOSURE_COMPILED \
            --output-renaming-map $RENAME_MAP_NAME

  echo "Generate index.html filler from template"
  java -jar $CLOSURE_TEMPLATES_PATH"/SoyToJsSrcCompiler.jar" \
            --codeStyle concat \
            --shouldProvideRequireSoyNamespaces \
            --cssHandlingScheme GOOG \
            --outputPathFormat $INDEX_SOY_JS \
            --isUsingIjData \
            templates/index.soy

  echo "Generate compiled file into build dir"
  $PYTHON $CLOSUREBUILDER_CMD --root=$CLOSURE_LIBRARY_PATH \
          --root=$SCRIPTS_PATH \
          --root=$TEMP_DIR \
          --root=$GEN_DIR \
          --root=$CLOSURE_TEMPLATES_PATH \
          --namespace="urlbuilder" \
          --output_mode=compiled \
          --compiler_jar=$CLOSURE_COMPILER_PATH/compiler.jar \
          --compiler_flags="--js=$RENAME_MAP_NAME" \
          --compiler_flags='--output_wrapper="(function() {%output%})();  //@ sourceMappingURL='$SOURCE_MAP_URL'"' \
          --compiler_flags="--create_source_map=$TEMP_DIR/$SOURCE_MAP_NAME" \
          --compiler_flags="--source_map_format=V3" \
          --compiler_flags="--compilation_level=$COMPILATION_LEVEL" > $BUILD_PATH/urlbuilder.min.js

  echo "Replace variables in index.html"          
  cat index.html |
  # Remove <!--DEV DEV--> into index.html
  sed -e :a -re 's/<!--DEV.*?DEV-->//g;/<!--/N;//ba' |
  # Uncomment <!--PROD PROD--> into index.html
  sed -e :a -re 's/<!--PROD(.*?)PROD-->/\1/g;/<!--/N;//ba' > $BUILD_PATH/index.html

  echo "Gzip the files"
  mkdir $TEMP_DIR/gzipped
  cp $BUILD_PATH/* $TEMP_DIR/gzipped
  gzip $TEMP_DIR/gzipped/* -r
  mv $TEMP_DIR/gzipped/* $BUILD_PATH

  if [ $COPY_SOURCE == true ]; then
    echo "Copy source files"
    cp -r $SCRIPTS_PATH $BUILD_PATH
    cp -r $INDEX_SOY_JS $BUILD_PATH$SCRIPTS_FOLDER
    cp -r $GEN_DIR $BUILD_PATH
    cp $TEMP_DIR/$SOURCE_MAP_NAME $BUILD_PATH
  fi  
fi

#
# Delete temporary directory
#
rm -rf $TEMP_DIR
rm -rf $GEN_DIR

echo "Web app created into $BUILD_PATH"


