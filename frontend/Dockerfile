# Use Node.js for building the frontend
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Serve with a lightweight web server
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
