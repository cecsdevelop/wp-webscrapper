#!/bin/bash

# Navigate to the plugin directory
cd /Applications/MAMP/htdocs/wordpress/wp-content/plugins/wp-webscrapper

# Initialize npm if package.json doesn't exist
if [ ! -f package.json ]; then
    npm init -y
fi

# Install puppeteer if not already installed
npm install puppeteer

# Run the puppeteer script
node node-scripts/puppeteer-script.js