#!/bin/bash

set -o allexport
source ../api/.env
set +o allexport

# if DB_HOSTNAME is db, means should execute in the container instead
if [ ! $IS_CONTAINER ]; then
    echo -e >&2 "\n\033[1;32mExecuting: [cd /var/www/html/api && npm run export-db] inside app container.\033[0m"
    docker exec -it app /bin/sh -c "cd /var/www/html/api && npm run export-db"
    exit 0
fi

date=`date +%Y-%m-%d`
dumpfile="./sql/$DB_DATABASE.$date.sql"

mysqldump \
    --add-drop-table \
    --user="$DB_USERNAME" --password="$DB_PASSWORD" --host="$DB_HOSTNAME" "$DB_DATABASE" \
 > "$dumpfile"

cp $dumpfile ./sql/$DB_DATABASE.sql
