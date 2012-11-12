#!/bin/bash

#################
# URLBUILDER VARS
#################

# Path to the js scripts directory relative to the Closure Library [DEV-ONLY]
SCRIPTS_PATH="../urlbuilder/scripts"

# Output filename [DEV-ONLY]
DEPS_FILENAME="urlbuilder_deps.js"

#################
# BUILD OPTIONS
#################

# Output dir
BUILD_DIR="build"

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

# Path in which the Closure Library is installed
CLOSURE_LIBRARY_PATH="../extlib/closure-library/"

# Path in which the Closure Compiler is installed
CLOSURE_COMPILER_PATH="../extlib/closure-compiler/"

# Command to execute to create deps file [DEV-ONLY]
DEPSWRITER_CMD=$CLOSURE_LIBRARY_PATH"closure/bin/build/depswriter.py"

# Command to execute to create deps file [PROD-ONLY]
CLOSUREBUILDER_CMD=$CLOSURE_LIBRARY_PATH"closure/bin/build/closurebuilder.py"

# Compilation level
COMPILATION_LEVEL="ADVANCED_OPTIMIZATIONS"
