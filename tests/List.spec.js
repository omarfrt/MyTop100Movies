const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../app");


//assertion style
chai.should();
chai.use(chaiHttp);

describe('MyTop100Movies List Routes',()=>{
    //add-movie POST
    describe("POST  /MyTop100Movie",()=>{
        it("it should Not let let user add movie to list without authentication",(done)=>{
            const MovieName={
                movieName:'the mask',
                rank:5
            }
            chai.request(app)
             .post("/MyTop100Movie")
             .send(MovieName)
             .end((err,response)=>{
                 response.should.have.status(401);
                 done();
             })
        }) 
     });
    //getMyTop100Movies GET
    describe("GET  /MyTop100Movie",()=>{
        it("it should NOT let let user get movie to list without authentication",(done)=>{
         chai.request(app)
             .get("/MyTop100Movie")
             .end((err,response)=>{
                 response.should.have.status(401);
                 done();
             })
        }) 
     });
    //remove-movie DELETE
    describe("Delete  /MyTop100Movie",()=>{
        it("it should NOT let let user Delete movie from list without authentication ",(done)=>{
            const _id={
                _id:'213548'
            }
         chai.request(app)
             .post("/MyTop100Movie")
             .query(_id)
             .end((err,response)=>{
                 response.should.have.status(401);
                 done();
             })
        }) 
     });
})