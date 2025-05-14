# Etapa de construcción
FROM node:18.19.0-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production

# Etapa de producción
FROM nginx:1.25-alpine

# Configuración Nginx directa en el Dockerfile
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
EOF

COPY --from=builder /app/dist/arrienta-tu-finca-ang /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]