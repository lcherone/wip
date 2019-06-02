# Docker Dev

A boilerplate project structure for dev which uses docker containers.

Includes mysql, adminer, mailhog, ngrok, coder-server (persistant state with extra extensions) to 
run/develop a frontend `./app` (Vue3) with a seperate express `./api`

**Run:** 

`npm run docker-dev`


**Cleanup:**

`npm run docker-clean`

**i.e.:**

```
Docker Pull stuff ..snip
Creating adminer
Creating db
Creating code-server
Creating mailhog
Creating app
Attaching to db, mailhog, adminer, app, code-server

mailhog        | [HTTP] Binding to address: 0.0.0.0:8025
mailhog        | 2019/06/02 18:35:37 Using in-memory storage
mailhog        | 2019/06/02 18:35:37 [SMTP] Binding to address: 0.0.0.0:2525
mailhog        | 2019/06/02 18:35:37 Serving under http://0.0.0.0:8025/
mailhog        | Creating API v1 with WebPath: 
mailhog        | Creating API v2 with WebPath: 

db             | Initializing database
db             | PLEASE REMEMBER TO SET A PASSWORD FOR THE MariaDB root USER !
db             | To do so, start the server, then issue the following commands:
db             | 
db             | '/usr/bin/mysqladmin' -u root password 'new-password'
db             | '/usr/bin/mysqladmin' -u root -h  password 'new-password'
db             | 
db             | Alternatively you can run:
db             | '/usr/bin/mysql_secure_installation'
db             | 
db             | which will also give you the option of removing the test
db             | databases and anonymous user created by default.  This is
db             | strongly recommended for production servers.
db             | 
db             | See the MariaDB Knowledgebase at http://mariadb.com/kb or the
db             | MySQL manual for more instructions.
db             | Please report any problems at http://mariadb.org/jira
db             | 
db             | The latest information about MariaDB is available at http://mariadb.org/.
db             | You can find additional information about the MySQL part at:
db             | http://dev.mysql.com
db             | Consider joining MariaDB's strong and vibrant community:
db             | https://mariadb.org/get-involved/
db             | 
db             | Database initialized
db             | MySQL init process in progress...
db             | 2019-06-02 18:35:39 0 [Note] mysqld (mysqld 10.3.15-MariaDB-1:10.3.15+maria~bionic) starting as process 107 ...
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Using Linux native AIO
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Uses event mutexes
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Compressed tables use zlib 1.2.11
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Number of pools: 1
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Using generic crc32 instructions
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Initializing buffer pool, total size = 256M, instances = 1, chunk size = 128M
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Completed initialization of buffer pool
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: If the mysqld execution user is authorized, page cleaner thread priority can be changed. See the man page of setpriority().
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: 128 out of 128 rollback segments are active.
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Creating shared tablespace for temporary tables
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Setting file './ibtmp1' size to 12 MB. Physically writing the file full; Please wait ...
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: File './ibtmp1' size is now 12 MB.
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: 10.3.15 started; log sequence number 1630815; transaction id 21
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Loading buffer pool(s) from /var/lib/mysql/ib_buffer_pool
db             | 2019-06-02 18:35:39 0 [Note] Plugin 'FEEDBACK' is disabled.
db             | 2019-06-02 18:35:39 0 [Warning] 'user' entry 'root@db' ignored in --skip-name-resolve mode.
db             | 2019-06-02 18:35:39 0 [Warning] 'user' entry '@db' ignored in --skip-name-resolve mode.
db             | 2019-06-02 18:35:39 0 [Warning] 'proxies_priv' entry '@% root@db' ignored in --skip-name-resolve mode.
db             | 2019-06-02 18:35:39 0 [Note] InnoDB: Buffer pool(s) load completed at 190602 18:35:39
db             | 2019-06-02 18:35:39 0 [Note] Reading of all Master_info entries succeded
db             | 2019-06-02 18:35:39 0 [Note] Added new Master_info '' to hash table
db             | 2019-06-02 18:35:39 0 [Note] mysqld: ready for connections.
db             | Version: '10.3.15-MariaDB-1:10.3.15+maria~bionic'  socket: '/var/run/mysqld/mysqld.sock'  port: 0  mariadb.org binary distribution
db             | Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
db             | 2019-06-02 18:35:41 10 [Warning] 'proxies_priv' entry '@% root@db' ignored in --skip-name-resolve mode.
db             | 2019-06-02 18:35:41 0 [Note] mysqld (initiated by: unknown): Normal shutdown
db             | 2019-06-02 18:35:41 0 [Note] Event Scheduler: Purging the queue. 0 events
db             | 2019-06-02 18:35:41 0 [Note] InnoDB: FTS optimize thread exiting.
db             | 2019-06-02 18:35:41 0 [Note] InnoDB: Starting shutdown...
db             | 2019-06-02 18:35:41 0 [Note] InnoDB: Dumping buffer pool(s) to /var/lib/mysql/ib_buffer_pool
db             | 2019-06-02 18:35:41 0 [Note] InnoDB: Buffer pool(s) dump completed at 190602 18:35:41
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Shutdown completed; log sequence number 1630824; transaction id 24
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Removed temporary tablespace data file: "ibtmp1"
db             | 2019-06-02 18:35:43 0 [Note] mysqld: Shutdown complete
db             | 
db             | MySQL init process done. Ready for start up.
db             | 
db             | 2019-06-02 18:35:43 0 [Note] mysqld (mysqld 10.3.15-MariaDB-1:10.3.15+maria~bionic) starting as process 1 ...
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Using Linux native AIO
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Uses event mutexes
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Compressed tables use zlib 1.2.11
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Number of pools: 1
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Using generic crc32 instructions
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Initializing buffer pool, total size = 256M, instances = 1, chunk size = 128M
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Completed initialization of buffer pool
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: If the mysqld execution user is authorized, page cleaner thread priority can be changed. See the man page of setpriority().
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: 128 out of 128 rollback segments are active.
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Creating shared tablespace for temporary tables
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Setting file './ibtmp1' size to 12 MB. Physically writing the file full; Please wait ...
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: File './ibtmp1' size is now 12 MB.
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Waiting for purge to start
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: 10.3.15 started; log sequence number 1630824; transaction id 21
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Loading buffer pool(s) from /var/lib/mysql/ib_buffer_pool
db             | 2019-06-02 18:35:43 0 [Note] Plugin 'FEEDBACK' is disabled.
db             | 2019-06-02 18:35:43 0 [Note] Server socket created on IP: '::'.
db             | 2019-06-02 18:35:43 0 [Warning] 'proxies_priv' entry '@% root@db' ignored in --skip-name-resolve mode.
db             | 2019-06-02 18:35:43 0 [Note] InnoDB: Buffer pool(s) load completed at 190602 18:35:43
db             | 2019-06-02 18:35:43 0 [Note] Reading of all Master_info entries succeded
db             | 2019-06-02 18:35:43 0 [Note] Added new Master_info '' to hash table
db             | 2019-06-02 18:35:43 0 [Note] mysqld: ready for connections.
db             | Version: '10.3.15-MariaDB-1:10.3.15+maria~bionic'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  mariadb.org binary distribution
db             | 2019-06-02 18:35:49 13 [Warning] 'proxies_priv' entry '@% root@db' ignored in --skip-name-resolve mode.

adminer        | PHP 7.3.6 Development Server started at Sun Jun  2 18:35:38 2019

app            | Entrypoint: [OS] Linux app 4.15.0-50-generic #54~16.04.1-Ubuntu SMP Wed May 8 15:55:19 UTC 2019 x86_64 GNU/Linux
app            | Entrypoint: [PWD] /var/www/html
app            | Entrypoint: [ENV]
app            | YARN_VERSION=1.16.0
app            | TZ=UTC
app            | HOSTNAME=app
app            | DEBUG=app:*
app            | IS_RESTART=false
app            | SMTP_HOSTNAME=localhost
app            | SMTP_PASSWORD=123456
app            | NODE_ENV=development
app            | PWD=/
app            | HOME=/home/node
app            | HOST=0.0.0.0
app            | DB_PASSWORD=654321
app            | PORT=8080
app            | NODE_VERSION=10.16.0
app            | IS_CONTAINER=true
app            | SMTP_USERNAME=localhost@localhost
app            | DB_USERNAME=app
app            | DB_HOSTNAME=db
app            | SHLVL=1
app            | DB_ROOTPASS=123456
app            | SMTP_PORT=2525
app            | WEBROOT=/var/www/html
app            | PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
app            | DB_DATABASE=app
app            | _=/usr/bin/printenv
app            | Entrypoint: [npm install] - packages already installed and setup. To reinstall, remove: ./api/package-lock.json
app            | Entrypoint: [database] - pausing 10s for database server to finish installing
app            | Entrypoint: [database] - database is up and running
app            | Entrypoint: [database] - setup users and database
app            | Entrypoint: [database] - import database file: seed.sql
app            | Entrypoint: [end build]
app            | 
app            |  User: node
app            | 
app            |  Services:
app            |  - App:          http://0.0.0.0:8080
app            |  - Adminer:      http://0.0.0.0:8888 - Manage the database
app            |  - *Ngrok:       http://0.0.0.0:4040 - HTTP/S tunnel and inspection
app            |  - *Mailhog:     http://0.0.0.0:8025 - Email testing
app            |  - *Code Server: http://0.0.0.0:8444 - Visual Studio Code Editor
app            |    *If enabled in ./.docker/docker-compose.yml
app            | [exec] - /bin/sh -c npm run dev
app            | 
app            | > acme-project@0.0.0 dev /var/www/html
app            | > concurrently --kill-others "sleep 5; cd api && npm run serve" "cd app && rm -rf dist && npm run build-dev"
app            | 
app            | [1] 
app            | [1] > @acme-project/app@0.1.0 build-dev /var/www/html/app
app            | [1] > cross-env NODE_ENV=development vue-cli-service build --mode development --watch --fix
app            | [1] 
app            | [1] 
app            | [1] -  Building for development...
app            | [1]  10% building 1/2 modules 1 active ...ref--13-0!/var/www/html/app/src/main.js
app            | [0] > @acme-project/api@0.0.0 serve /var/www/html/api
app            | [0] > nodemon src/index.js --watch .
app            | [0] 
app            | [0] [nodemon] 1.19.1
app            | [0] [nodemon] to restart at any time, enter `rs`
app            | [0] [nodemon] watching: *.*
app            | [0] [nodemon] starting `node src/index.js`
app            | [0] app:lib:express express Starting: @acme-project/api [v0.0.0]
app            | [0] app:lib:express Environment: development
app            | [0] app:lib:express Dist folder [GET /]: /var/www/html/app/dist
app            | [0] app:lib:express Loading API local router [index]: /var/www/html/api/src/routes/index.js
app            | [0] app:lib:express  - adding socket
app            | [0] app:lib:express Loading API module router [auth]: @acme-project/api-auth
app            | [0] app:lib:express  - adding socket
app            | [0] app:lib:express Loading API module router [user]: @acme-project/api-user
app            | [0] app:lib:express  - adding socket
app            | [0] app:lib:express Loading API local router [test]: /var/www/html/api/src/routes/test.js
app            | [0] app:lib:express  - adding socket
app            | [0] app:lib:express Using http.listen
app            | [0] app:jwt:socket.io Attaching controller sockets

code-server    | (node:6) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
code-server    | INFO  code-server development
code-server    | INFO  Additional documentation: http://github.com/codercom/code-server
code-server    | INFO  Initializing {"data-dir":"/home/coder/.local/share/code-server","extensions-dir":"/home/coder/.vscode/extensions","working-dir":"/home/coder/project","log-dir":"/home/coder/.cache/code-server/logs/20190602183539732"}
code-server    | INFO  Starting webserver... {"host":"0.0.0.0","port":"8444"}
code-server    | WARN  No certificate specified. This could be insecure.
code-server    | WARN  Documentation on securing your setup: https://github.com/codercom/code-server/blob/master/doc/security/ssl.md
code-server    | INFO   
code-server    | INFO  Password: 123456
code-server    | INFO   
code-server    | INFO  Started (click the link below to open):
code-server    | INFO  http://localhost:8444/
code-server    | INFO   
code-server    | INFO  Starting shared process [1/5]...
code-server    | WARN  stderr {"data":"(node:18) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.\n"}
code-server    | INFO  Connected to shared process
code-server    | INFO  WebSocket opened / {"client":1,"ip":"10.1.1.1"}
code-server    | INFO  WebSocket opened / {"client":2,"ip":"10.1.1.1"}
code-server    | ERROR "kill" is not a function on proxy 14 {"type":"undefined","proxyId":14}
```