#!/bin/bash

#
# Entrypoint script
#  - Its job is to setup the container and project, its run within the container
#

set -eu

# might add the option to generate random password if env var not set
# $(dd if=/dev/urandom bs=24 count=1 status=none | base64)

#
##
write_environment_file() {
    echo "#
## Environment variables
#

NODE_ENV=\"${NODE_ENV:-development}\"
DEBUG=\"${DEBUG:-app:*}\"
HOST=\"${HOST:-0.0.0.0}\"
PORT=\"8080\"

# mysql connection
DB_ROOTPASS=\"${DB_ROOTPASS:-}\"
DB_HOSTNAME=\"${DB_HOSTNAME:-}\"
DB_USERNAME=\"${DB_USERNAME:-}\"
DB_PASSWORD=\"${DB_PASSWORD:-}\"
DB_DATABASE=\"${DB_DATABASE:-}\"
# Socket (for MAMP)
#DB_SOCKET_PATH=\"/Applications/MAMP/tmp/mysql/mysql.sock\"

#
SMTP_HOSTNAME=\"${SMTP_HOSTNAME:-}\"
SMTP_USERNAME=\"${SMTP_USERNAME:-}\"
SMTP_PASSWORD=\"${SMTP_PASSWORD:-}\"
SMTP_PORT=\"${SMTP_PORT:-}\"

" > $WEBROOT/.env
}

#
##
setup_environment() {
    # check env file
    if [ ! -f $WEBROOT/.env ]; then
        echo >&2 "Entrypoint: [environment] $WEBROOT/.env created"
        write_environment_file
    fi

    # load env file
    set -o allexport
    source $WEBROOT/.env
    set +o allexport
    echo >&2 "Entrypoint: [ENV]"
    echo >&2 "$(printenv)"

    # set timezone
    echo $TZ > /etc/timezone
    dpkg-reconfigure -f noninteractive tzdata >/dev/null 2>/dev/null

    # add domain(s) to hosts file
    echo "127.0.0.1 localhost" >> /etc/hosts
    echo "127.0.0.1 ${DOMAIN_HOST:-localhost}" >> /etc/hosts
}

#
##
setup_database() {
    if [ "$IS_RESTART" = true ]; then
        echo >&2 "Entrypoint: [database] - assuming database container is setup after restart"
    else
        echo >&2 "Entrypoint: [database] - pausing 10s for database server to finish installing"
        sleep 10

        while ! mysqladmin ping --silent -h mysql -u"root" -p"$DB_ROOTPASS"; do
            echo >&2 "Entrypoint: [database] - waiting for database server to start +5s"
            sleep 5
        done

        echo >&2 "Entrypoint: [database] - database is up and running"
        sleep 1

        # setup users and database
        echo >&2 "Entrypoint: [database] - setup users and database"
        mysql -h mysql -u"root" -p"$DB_ROOTPASS" -e "CREATE DATABASE IF NOT EXISTS \`$DB_DATABASE\` /*\!40100 DEFAULT CHARACTER SET utf8mb4 */;"
        mysql -h mysql -u"root" -p"$DB_ROOTPASS" -e "CREATE USER IF NOT EXISTS $DB_USERNAME@'%' IDENTIFIED BY '$DB_PASSWORD';"
        mysql -h mysql -u"root" -p"$DB_ROOTPASS" -e "GRANT ALL PRIVILEGES ON \`$DB_DATABASE\`.* TO '$DB_USERNAME'@'%';"
        mysql -h mysql -u"root" -p"$DB_ROOTPASS" -e "GRANT ALL PRIVILEGES on *.* to 'root'@'localhost' IDENTIFIED BY '$DB_ROOTPASS';"
        mysql -h mysql -u"root" -p"$DB_ROOTPASS" -e "FLUSH PRIVILEGES;"

        # import database if exsits
        if [ -f $WEBROOT/.files/sql/seed.sql ]; then
            echo >&2 "Entrypoint: [database] - import database file: seed.sql"
            cat $WEBROOT/.files/sql/seed.sql | mysql -h mysql -u"root" -p"$DB_ROOTPASS" $DB_DATABASE
        fi
    fi
}

#
##
install_npm_packages() {
    if [ ! -f $WEBROOT/package-lock.json ]; then
        echo >&2 "Entrypoint: [npm install]"
        cd $WEBROOT && npm install
    else
        echo >&2 "Entrypoint: [npm install] - packages already installed and setup. To reinstall, remove: ./api/package-lock.json"
    fi
}

#
##
main() {
    echo >&2 "Entrypoint: [OS] $(uname -a)"
    echo >&2 "Entrypoint: [PWD] $WEBROOT"

    #
    setup_environment

    #
    install_npm_packages

    #
    #setup_database

    # run dev tests
    #cd $WEBROOT/.files && DEBUG="*:*" node test-lib-jwt.js

    echo >&2 "Entrypoint: [end build]"
    echo >&2 ""
    echo >&2 " Services:"
    echo >&2 " - App:        http://${HOST:-localhost}:8080"
    echo >&2 " - Adminer:    http://${HOST:-localhost}:8888 - Manage the database"
    echo >&2 " - *Ngrok:     http://${HOST:-localhost}:4040 - HTTP/S tunnel and inspection"
    echo >&2 " - *Mailhog:   http://${HOST:-localhost}:8025 - Email testing"
    echo >&2 " - *Cloud9:    http://${HOST:-localhost}:8181 - Web based code editor"
    echo >&2 " - *SharpTest: http://${HOST:-localhost}:3000 - Test what images will look like in boostrap components"
    echo >&2 "   *If enabled in ./files/docker/docker-compose.yml"
}

main

# go to ./app as its where the package.json is
cd $WEBROOT

echo >&2 "[exec] - $@"
exec "$@"
