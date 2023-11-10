# First build stage
FROM bitnami/node:18 as base
# Create a non-root user
RUN useradd -r -d / -u 1001 -g root appuser

WORKDIR /app
RUN chown -R appuser:root /app
USER appuser

# Copy app's source code to the /app directory
COPY package*.json .

# Second run stage
FROM base as development
RUN npm ci --ignore-scripts
COPY . .

FROM base as production
RUN npm ci --ignore-scripts --production
COPY . .
RUN npm run build
