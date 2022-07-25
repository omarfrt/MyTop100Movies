const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../app");
const User = require("./../Api/Models/user");

//assertion style
chai.should();
chai.use(chaiHttp);

describe('User routes', ()=>{
    //post login
    describe("Post /User/login",()=>{
        it("it should let user login ",(done)=>{
            const user= new User({
                UserName:"TestUser",
                email:"TestUser@mail.com",
                password:"TestUser123"
            })
            chai.request(app)
            .post("/User/login")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                done();
            })
        })
    })

    //post signup
    describe("Post /User/signup",()=>{
        it("it should NOT let user signup with the same email ",(done)=>{
            const user= new User({
                UserName:"TestUser",
                email:"TestUser@mail.com",
                password:"TestUser123"
            })
            chai.request(app)
            .post("/User/signup")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(409);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
                done();
            })
        })
    })
})