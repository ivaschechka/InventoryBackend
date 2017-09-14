var server = require('../server'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();


chai.use(chaiHTTP);

reqServer = server

describe('Basic routes tests', function() {

    it('GET to /pagecount should return 200', function(done) {
        chai.request(reqServer)
            .get('/pagecount')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            })

    })
})