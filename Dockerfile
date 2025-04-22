FROM node:18.19.0 AS builder

# Instalar nvm y Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    && . ~/.nvm/nvm.sh \
    && nvm install 18.19.0 \
    && nvm use 18.19.0 \
    && nvm alias default 18.19.0 \
    && node -v \
    && npm -v
# Añadir el directorio de nvm al PATH para que este disponible en futuras etapas de run
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18.19.0
ENV NVM_BIN=$NVM_DIR/versions/node/v$NODE_VERSION/bin
ENV PATH=$NVM_BIN:$PATH

# Elstablecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de la aplicación
COPY ./ .

# Instalar las dependencias de la aplicación y compilarla
RUN npm install --legacy-peer-deps && \
    npm install -g @angular/cli && \
    ng build

FROM httpd:2.4.

COPY ./k8s/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./k8s/.htaccess /usr/local/apache2/htdocs

COPY --from=builder /app/dist/adminpro /usr/local/apache2/htdocs

# Copiar los archivos de la aplicación construida al directorio de trabajo


EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]