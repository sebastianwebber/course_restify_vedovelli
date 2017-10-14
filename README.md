# Restify App for VUE-SPA course

## Befor run

install `nodemon`:

```bash
npm install -g nodemon
```

Enable mysql container:

```bash
docker run --detach --name=lab-mysql --env="MYSQL_ROOT_PASSWORD=mypassword" -p 3306:3306 mysql
alias mysql="docker run --rm -ti --entrypoint /usr/bin/mysql mysql -u root -pmypassword -h 172.17.0.2"
```

to run mysql, just type:

```
mysql
```
> You can get the ip address to the container using: `docker inspect lab-mysql | grep IPAddress\" | tail -n 1 | awk '{print $2}' | tr -d '"' | tr -d ","`

### Install dependencies


## Dependencies:

https://nodejs.org/en/

http://restify.com/

https://www.npmjs.com/package/restify-cors-middleware

https://github.com/mysqljs/mysql

https://www.npmjs.com/package/dotenv

https://github.com/avajs/ava

https://github.com/auth0/node-jsonwebtoken

http://www.sha1-online.com/

https://jwt.io/
