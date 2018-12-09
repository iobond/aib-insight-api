'use strict';

var bitcore = require('bitcore-lib');
var _ = bitcore.deps._;
var Common = require('./common');

function TokenController(node) {
    this.node = node;
    this.common = new Common({log: this.node.log});
}

TokenController.prototype.verifyTokenOrigin = function(req, res) {
    var self = this;
    var tokenid = req.body.tokenid;
    var txid = req.body.txid;

    self._verifyTokenOrigin(txid,tokenid, function (err,resp) {
        res.json({
            'error': err,
            'result': resp
        });
    });
};

TokenController.prototype._verifyTokenOrigin = function(txid,tokenid, callback) {
    var options = {
        txid: txid,
        tokenid: tokenid,
    }
    this.node.verifyTokenOrigin(options, function(err, res) {
        if(err) {
            return callback(err);
        }
        callback(null, res);
    });
};

module.exports = TokenController;