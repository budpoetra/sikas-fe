# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Set environment variables for Vite build (Production)
ENV VITE_API_URL=http://103.164.191.212:8089/api/v1
ENV VITE_ENV=production
ENV VITE_VERSION=1.0.0

# Set environment variables for Vite build (Development)
# ENV VITE_API_URL=http://localhost:8080/api/v1
# ENV VITE_ENV=development
# ENV VITE_VERSION=1.0.0

# Build Vite project
RUN npm run build

# --- Production Stage ---
FROM nginx:1.25-alpine

# Hapus default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Tambahkan config baru
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build ke folder yang dilayani nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]