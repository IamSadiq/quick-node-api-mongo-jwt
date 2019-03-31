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
                // expect(body).contains()
                done();
            });
        });
    });

    describe ('Users Route', function() {
        it('status', function(done){
            request('http://localhost:3000/users', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done){
            request('http://localhost:3000/users', function(error, response, body) {
                expect(body).contains(Object);
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