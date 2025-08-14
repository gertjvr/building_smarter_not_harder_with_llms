FROM node:18-alpine

WORKDIR /app

# Install socket.io and express
RUN npm install socket.io@4.7.5 express@4.18.2

# Copy the server file
COPY server.js .

# Expose the port
EXPOSE 1948

# Start the server
CMD ["node", "server.js"]
