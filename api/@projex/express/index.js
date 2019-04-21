const debug = require('debug')('app:module:express')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const fileUpload = require('express-fileupload')

const app = express()

/**
 *
 */
module.exports = options => {

    /**
     * Options
     */
    this.options = Object.assign({
        basePath: path.join(__dirname, '../', '../', 'src'),
        publicPath: path.join(__dirname, '../', '../', 'src', 'public'),
        apiPath: '/',
        apiVersion: '1.0',
        bodyParser: {}
    }, options)

    /**
     * Options
     */
    this.package = require(path.join(this.options.basePath, '../', 'package.json'))
    app.set('package', this.package)

    debug('Starting: ' + this.package.name + ' [v' + this.package.version + ']')

    /**
     * Add routes method
     *
     * {array} routes
     */
    this.addRoutes = function (routes) {

        if (!Array.isArray(routes)) throw Error('Invalid argument type, expecting array');

        const apiPath = path.join(this.options.apiPath, '/', this.options.apiVersion);
        const routesPath = path.join(this.options.basePath, 'routes');
        debug('API %s', apiPath);

        routes.forEach(item => {
            if (typeof item !== "string") throw Error('Invalid route, expecting string');

            debug('Loading router [%s]: %s', item, path.join(routesPath, item + '.js'));
            const route = require(path.join(routesPath, item))(app);

            // add socket
            if (this.socket && route.controller && route.controller.socket) {
                debug(' - adding socket');
                this.socket.socketHooks.push(route.controller.socket);
            }

            // add route
            app.use(apiPath, route.router);
        });
    }

    /**
     * Listen method
     */
    this.listen = function () {
        if (this.socket) {
            debug('Using http.listen');
            this.socket.listen(...arguments)
        } else {
            debug('Using app.listen');
            app.listen(...arguments)
        }
    }

    /**
     * Static routes
     */
    app.use('/', express.static(this.options.publicPath))

    /**
     * Views and view engine
     */
    app.set('views', path.join(this.options.basePath, 'views'));
    app.set('view engine', 'ejs');

    /**
     * Core Middleware
     */
    app.use(compression());
    app.use(fileUpload());

    /*
     ** Config
     */
    debug('Environment:', process.env.NODE_ENV || 'development')
    app.set('env', process.env.NODE_ENV || 'development')
    if (process.env.NODE_ENV === 'development') {
        app.set('json spaces', 2)
    }

    //
    app.use(bodyParser.json(this.options.bodyParser))

    return {
        express: app,
        package: this.package,
        options: this.options,
        addRoutes: this.addRoutes,
        listen: this.listen
    }
}
