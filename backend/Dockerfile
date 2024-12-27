FROM ghcr.io/puppeteer/puppeteer:23.11.1

# Set environment variables to skip Puppeteer Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Switch to root to handle permissions
USER root

# Copy application files
COPY package*.json ./

# Adjust permissions for the application directory
RUN chown -R pptruser:pptruser /usr/src/app

# Install Node.js dependencies
RUN npm install --only=production

# Copy the remaining application files
COPY . .

# Switch back to the Puppeteer user
USER pptruser

# Expose the application port
EXPOSE 3000

# Verify Chrome installation and start the Node.js app
CMD ["/bin/sh", "-c", "google-chrome-stable --version && node app.js"]
