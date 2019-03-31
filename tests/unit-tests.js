var expect  = require('chai').expect;
var request = require('request');

describe('Status and content', function() {
    describe ('Home Route', function() {
        it('status', function(done){
            request('http://localhost:3000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done){
            request('http://localhost:3000/', function(error, response, body) {
                expect(body);
                done();
            });
        });
    });

    describe ('Users Route', function() {
        it('status', function(done){
            request('http://localhost:3000/api/users', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done){
            request('http://localhost:3000/api/users', function(error, response, body) {
                expect(body);
                done();
            });
        });

    });

    describe ('About route', function() {
        it('status', function(done){
            request('http://localhost:3000/about', function(error, response, body) {
                console.log(response.statusCode);
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

        it('content', function(done){
            request('http://localhost:3000/about', function(error, response, body) {
                expect(error);
                done();
            });
        });

    });
});