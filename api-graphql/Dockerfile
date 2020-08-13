FROM node:lts

# Setting up the maintainer label
LABEL maintainer 'lacroixDj <lacroixdj@gmail.com>'

# Setting up App dir as current working dir
WORKDIR /home/node/app

# copying the package.json and package-lock.json
COPY package*.json /home/node/app/

# Using non-root node user
USER node

# Installing app dependencies
RUN npm install

# COPY source code into App dir
COPY --chown=node:node . /home/node/app/

# Exposing API default port
EXPOSE ${API_PORT}

# Init commands  
CMD [ "npm", "start" ]