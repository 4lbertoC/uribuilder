#!/bin/bash

#################
# URLBUILDER VARS
#################

# Path to the urlbuilder files
PATH="../urlbuilder_static"

# Prefix to append to each dependency path 
PREFIX="../../../"$PATH

# Output filename
DEPSFILENAME="urlbuilder_deps.js"

#################
# PYTHON VARS
#################

# Directory in which Python is installed
PYTHON="/usr/bin/python"

#################
# CLOSURE VARS
#################

# Directory in which the Closure Library is installed
CLOSUREDIR="../extlib/"

# Command to execute to create deps file
DEPSWRITERCMD=$CLOSUREDIR"closure-library/closure/bin/build/depswriter.py"

# Launch the command
$PYTHON $DEPSWRITERCMD --root_with_prefix=$PATH" "$PREFIX > $DEPSFILENAME

