process.env.NODE_ENV = "test";

let User = require("../models/users.model");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let expect = chai.expect;
let adminToken = "";
let userToken = "";

chai.use(chaiHttp);

describe("CodeClouds assignment", () => {
    describe("Authentication API testcases", () => {
        it("it should login admin and generate a token", (done) => {
            let credential = {
                username: "admin",
                password: "codeclouds",
            };
            chai.request(server)
                .post("/api/users/login")
                .send(credential)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    adminToken = res.body.token;
                    done();
                });
        });
        it("it should try to login admin and fail", (done) => {
            let credential = {
                username: "admin",
                password: "codecloud",
            };
            chai.request(server)
                .post("/api/users/login")
                .send(credential)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    done();
                });
        });
        it("it should register a new user", (done) => {
            let credential = {
                username: "testUser",
                password: "testPassword",
            };
            chai.request(server)
                .post("/api/users/register")
                .send(credential)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    done();
                });
        });
        it("it should try to register a new user and should fail", (done) => {
            let credential = {
                username: "testUser",
                password: "testPassword",
            };
            chai.request(server)
                .post("/api/users/register")
                .send(credential)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    done();
                });
        });
        it("it should login a user", (done) => {
            let credential = {
                username: "testUser",
                password: "testPassword",
            };
            chai.request(server)
                .post("/api/users/login")
                .send(credential)
                .end((err, res) => {
                    userToken = res.body.token;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
    });
    describe("City APIs", () => {
        it("it should add/update a city", (done) => {
            chai.request(server)
                .post("/api/city/add")
                .set("Cookie", "token=" + adminToken)
                .send({ name: "patna" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    done();
                });
        });
        it("it should check radius and return true/false", (done) => {
            chai.request(server)
                .get("/api/city/check/ranchi")
                .set("Cookie", "token=" + userToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.boolean;
                    done();
                });
        });
    });
    after(async () => {
        await User.findOneAndDelete({ username: "testUser" });
    });
});
