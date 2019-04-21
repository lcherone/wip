FROM node:lts-slim

# copy files to container
#COPY somefile.ini /var/www/html

# install deps
RUN apt-get update && apt-get install -y wget mysql-client ssmtp \
    && apt-get autoremove -y && apt-get autoclean -y && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && echo "mailhub=mailhog:2525\nUseTLS=NO\nFromLineOverride=YES" > /etc/ssmtp/ssmtp.conf

# Create volumn link to current directory
VOLUME /var/www/html

# Set enviroment vars
ENV TZ Europe/London

COPY entrypoint.sh /

#
ENTRYPOINT ["/entrypoint.sh"]

#
CMD npm run serve
