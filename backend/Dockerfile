FROM ghcr.io/puppeteer/puppeteer:23.11.1

# Skip Chromium download since we are using a custom Chrome executable
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm ci if lock file exists, fallback to npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Ensure Chrome is accessible and start the Node.js application
CMD ["/bin/sh", "-c", "/usr/bin/google-chrome-stable --version && node app.js"]
