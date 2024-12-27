FROM ghcr.io/puppeteer/puppeteer:23.11.1

# Set environment variables to skip Puppeteer Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Install Chrome dependencies and the latest stable Chrome
RUN apt-get update && apt-get install -y \
    wget \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install \
    && rm -rf /var/lib/apt/lists/* google-chrome-stable_current_amd64.deb

# Install Node.js dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application code
COPY . .

# Expose the application port
EXPOSE 3000

# Verify Chrome installation and start the Node.js app
CMD ["/bin/sh", "-c", "google-chrome-stable --version && node app.js"]
