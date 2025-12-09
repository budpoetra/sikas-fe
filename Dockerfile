# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

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