FROM ghcr.io/puppeteer/puppeteer:23.11.1

# Skip Chromium download since we are using a custom Chrome executable
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Install project dependencies
COPY package*.json ./
RUN npm ci

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Ensure Chrome is accessible and start the Node.js application
CMD ["/bin/sh", "-c", "/usr/bin/google-chrome-stable --version && nodemon app.js"]
