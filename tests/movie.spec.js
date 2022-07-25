const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../app");


//assertion style
chai.should();
chai.use(chaiHttp);

describe('Movie routes',()=>{
    // Get movie
    describe("GET  /movie",()=>{
       it("it should get all the movies",(done)=>{
        chai.request(app)
            .get("/Movie")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('Movies');
                done();
            })
       }) 
    });

    // Post movie

    describe("POST  /movie",()=>{
        it("it should not let the movie the mask get saved as its a duplicate",(done)=>{
            const MovieName={
                movieName:'the mask'
            }
         chai.request(app)
             .post("/Movie")
             .query(MovieName)
             .end((err,response)=>{
                 response.should.have.status(500);
                 done();
             })
        }) 
     });
     describe("POST  /movie",()=>{
        it("it should not let the movie get saved with no movieName",(done)=>{
            const MovieName={
                movieName:''
            }
         chai.request(app)
             .post("/Movie")
             .query(MovieName)
             .end((err,response)=>{
                 response.should.have.status(500);
                 done();
             })
        }) 
     });
    //Delete movie
    describe("Delete  /movie",()=>{
        it("it should not let the movie get Delted with no _id ",(done)=>{
            const _id={
                _id:''
            }
         chai.request(app)
             .post("/Movie")
             .query(_id)
             .end((err,response)=>{
                 response.should.have.status(500);
                 done();
             })
        }) 
     });

})