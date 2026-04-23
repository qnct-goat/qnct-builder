FROM nginx:alpine
RUN apk add --no-cache apache2-utils
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN htpasswd -bc /etc/nginx/.htpasswd qnct "R7!kP2mX9vL4qN"
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
