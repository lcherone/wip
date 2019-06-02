FROM codercom/code-server

# switch into root
USER root

# replace shell with bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# install any additional system packages
RUN apt-get update && apt-get install -y -q --no-install-recommends \
    apt-transport-https build-essential ca-certificates curl git libssl-dev wget bsdtar mysql-client ssmtp \
    && apt-get autoremove -y && apt-get autoclean -y && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# setup extensions
#RUN mkdir -p /home/coder/.vscode/extensions
# copy over extensions
COPY --chown=coder:coder ./extensions /home/coder/.vscode/extensions

# switch into coder
USER coder

# set quokka.js non pro
RUN mkdir -p $HOME/.quokka && echo "{\"pro\":false}" > $HOME/.quokka/config.json

#
#RUN curl -JL https://github.com/Microsoft/vscode-python/releases/download/2019.2.5558/ms-python-release.vsix | bsdtar -xvf - extension && \
#    mv extension /home/coder/.vscode/extensions/ms-python.python-vscode-2.0.3

# install nvm, node and update npm
ENV NVM_VERSION=0.34.0
ENV NODE_VERSION=10.15.3
RUN curl -o- "https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh" | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
    nvm install $NODE_VERSION && \
    npm install npm -g && \
    npm install jshint -g && \
    rm -rf node_modules
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

#
CMD ["code-server", "--allow-http", "--no-auth"]