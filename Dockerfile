FROM nginx:alpine
# Copy custom configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf
# Copy static assets to nginx html directory
COPY . /usr/share/nginx/html
# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080
# Modify nginx to listen on port 8080 instead of 80 to match Cloud Run's expectation
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
