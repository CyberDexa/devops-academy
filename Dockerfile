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

# Install dependencies (skip postinstall since terminal server doesn't need Prisma)
RUN npm ci --omit=dev --ignore-scripts

# Copy terminal server
COPY terminal-server.js ./

# Expose port
EXPOSE 10000

# Start server
CMD ["node", "terminal-server.js"]
