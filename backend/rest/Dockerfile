FROM ubuntu
ADD ./ /rest
RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install -y mongodb

WORKDIR /rest
EXPOSE 3000

RUN npm install
CMD ["/etc/init.d/mongodb","start"]
CMD ["npm","start"]
