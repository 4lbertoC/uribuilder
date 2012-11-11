#!/bin/bash

#################
# URLBUILDER VARS
#################

# Path to the urlbuilder files
PATH="../urlbuilder"

# Prefix to append to each dependency path 
PREFIX="../../../"$PATH

# Output filename
DEPSFILENAME="urlbuilder_deps.js"

#################
# BUILD OPTIONS
#################

# Output dir
BUILDDIR="build"

# Build mode (dev|prod)
BUILDMODE="prod"

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

