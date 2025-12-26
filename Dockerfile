FROM node:20-slim

WORKDIR /app

# Install system dependencies for node-pty
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    git \
    curl \
    vim \
    nano \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy terminal server
COPY terminal-server-isolated.js ./

# Expose port
EXPOSE 10000

# Start server
CMD ["node", "terminal-server-isolated.js"]
