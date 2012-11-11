#!/bin/bash

#################
# URLBUILDER VARS
#################

# Path to the urlbuilder directory relative to the Closure Library [DEV-ONLY]
PATH="../urlbuilder/scripts"

# Output filename [DEV-ONLY]
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

# Command to execute to create deps file [DEV-ONLY]
DEPSWRITERCMD=$CLOSUREDIR"closure-library/closure/bin/build/depswriter.py"

