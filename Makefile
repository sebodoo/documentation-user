# Makefile for Sphinx documentation

SPHINX_BUILD   = sphinx-build
CONFIG_DIR     = .
SOURCE_DIR     = content
BUILD_DIR      = _build

# Rely on COMSPEC, which is a variable present in all Windows platforms, to determine the OS
ifdef COMSPEC
  RM_CMD ?= del
else
  RM_CMD ?= rm -rf
endif

# In first position to build the documentation from scratch by default
all: clean html

help:
	@echo "Please use 'make <target>' where <target> is one of"
	@echo "  html       to build the documentation to HTML"
	@echo "  clean      to clear the build"

html: extensions/odoo_ext/static/style.css
	$(SPHINX_BUILD) -c $(CONFIG_DIR) -b html $(SOURCE_DIR) $(BUILD_DIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILD_DIR)/html."

extensions/odoo_ext/static/style.css: extensions/odoo_ext/static/*.scss
	pysassc $(subst .css,.scss,$@) $@

clean:
	$(RM_CMD) $(BUILD_DIR)/*
	$(RM_CMD) extensions/odoo_ext/static/style.css
