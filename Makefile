.PHONY: build clean help

EXTENSION_NAME = tmo-next-chapter
ZIP_FILE = $(EXTENSION_NAME).zip
SOURCE_FILES = content.js manifest.json icon16.png icon32.png icon48.png icon128.png

# Default target: display help
default: help

# Build the extension zip file
build:
	@echo "Creating $(ZIP_FILE)..."
	@rm -f $(ZIP_FILE)
	@zip -q $(ZIP_FILE) $(SOURCE_FILES)
	@echo "✅ Extension package created: $(ZIP_FILE)"
	@echo "File size: $$(du -h $(ZIP_FILE) | cut -f1)"

# Clean up build artifacts
clean:
	@echo "Cleaning up..."
	@rm -f $(ZIP_FILE)
	@echo "✅ Cleanup complete"

# Help information
help:
	@echo "TMO Next Chapter Extension - Build Helper"
	@echo ""
	@echo "Available commands:"
	@echo "  make build    - Package the extension into a zip file"
	@echo "  make clean    - Remove the zip file"
	@echo "  make help     - Display this help message"
	@echo ""
	@echo "The zip file will contain: $(SOURCE_FILES)"
