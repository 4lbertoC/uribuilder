#!/bin/bash

#################
# URLBUILDER VARS
#################

# UrlBuilder's path relative to the Closure Library
UB_PATH="../urlbuilder"

# Folder in which the scripts are contained
SCRIPTS_FOLDER="/scripts"

# Path to the js scripts directory relative to the Closure Library [DEV-ONLY]
SCRIPTS_PATH=$UB_PATH$SCRIPTS_FOLDER

# Output filename [DEV-ONLY]
DEPS_FILENAME="urlbuilder_deps.js"

#################
# BUILD OPTIONS
#################

# Output dir relative to the Closure Library
BUILD_PATH="/usr/share/jetty/webapps/urlbuilder"
# BUILD_PATH="../urlbuilder/build"

# Build mode (dev|prod)
BUILD_MODE="prod"

#################
# PYTHON VARS
#################

# Path to Python command
PYTHON="/usr/bin/python"

#################
# CLOSURE VARS
#################

# Path to Closure Tools
CLOSURE_TOOLS_PATH="../closure-tools"

# Path in which Closure Library is installed
CLOSURE_LIBRARY_PATH=$CLOSURE_TOOLS_PATH"/closure-library"

# Path in which Closure Compiler is installed
CLOSURE_COMPILER_PATH=$CLOSURE_TOOLS_PATH"/closure-compiler"

# Path in which Closure StyleSheets is installed
CLOSURE_STYLESHEETS_PATH=$CLOSURE_TOOLS_PATH"/closure-stylesheets"

# Path in which Closure Templates is installed
CLOSURE_TEMPLATES_PATH=$CLOSURE_TOOLS_PATH"/closure-templates"

# Command to execute to create deps file [DEV-ONLY]
DEPSWRITER_CMD=$CLOSURE_LIBRARY_PATH"/closure/bin/build/depswriter.py"

# Command to execute to create deps file [PROD-ONLY]
CLOSUREBUILDER_CMD=$CLOSURE_LIBRARY_PATH"/closure/bin/build/closurebuilder.py"

# Command to execute to minify CSS
CLOSURE_STYLESHEETS_CMD=$CLOSURE_STYLESHEETS_PATH"/closure-stylesheets-20111230.jar"

# Compilation level
COMPILATION_LEVEL="ADVANCED_OPTIMIZATIONS"

# Name of the source map file
SOURCE_MAP_NAME="urlbuilder.min.js.map"

# The location in which the browser will search for the source map
SOURCE_MAP_URL=$BUILD_PATH"/"$SOURCE_MAP_NAME

# Copy the source maps to the build folder
COPY_SOURCE_MAPS=true

# CSS rename map name
RENAME_MAP_NAME="rename-map.js"

# CSS rename map name
INDEX_SOY_JS="index.soy.js"