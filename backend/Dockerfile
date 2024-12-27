FROM ghcr.io/puppeteer/puppeteer:23.11.1

# Set environment variables to skip Puppeteer Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Verify Chrome installation and start the Node.js app
CMD ["google-chrome-stable --version && node app.js"]
