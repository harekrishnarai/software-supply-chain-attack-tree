#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Copy CNAME file to dist directory for custom domain
echo "Setting up custom domain..."
cp CNAME dist/

echo "Build complete! The dist/ directory is ready for deployment to attack-tree.harekrishnarai.me"
echo ""
echo "To deploy:"
echo "1. Upload the contents of the dist/ directory to your web server"
echo "2. Ensure your DNS points attack-tree.harekrishnarai.me to your server"
echo "3. Configure your web server to serve the files from the root path"
