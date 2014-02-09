var qs = require('querystring'),
    http = require('http');

var Request = function(client_id, host) {
    this.client_id = client_id;

    this._makeRequest = function(httpOpts, cb) {
        console.log(httpOpts);
        var req = http.request(httpOpts, function(res) {
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function(d) {
                data += d;
            });
            res.on('end', function() {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.log('non-json response');
                    return cb(null, data);
                }
                console.log(data);
                cb(data);
            });
        });
        req.end();
    };

    this._makeGet = function(path, params, cb) {
        var self = this;
        if (typeof params === 'function') {
            cb = params;
            params = {};
        }
        params.client_id = self.client_id;
        var httpOpts = {
            method: 'GET',
            host: host,
            path: '/' + path + '.json' + ((params) ? '?' + qs.stringify(params) : '')
        };
        this._makeRequest(httpOpts, cb);
    };
};
module.exports = Request;