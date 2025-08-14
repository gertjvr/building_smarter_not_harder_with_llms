FROM node:24-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN pnpm install

# Copy the server file
COPY index.js .

# Expose the port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]
