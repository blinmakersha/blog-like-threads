const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);

describe("User workflow tests", () => {
  it("register + login a user", () => {
    let user = {
      username: "user1",
      password: "user1",
      roles: ["ADMIN"],
    };
    chai
      .request(app)
      .post("/registration")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        chai
          .request(app)
          .post("/login")
          .send({
            username: "user1",
            password: "user1",
          })
          .end((err, res) => {
            console.log(res.body.message);
            expect(res.status).to.be.equal(200);
          });
      });
  });

  it("create post", () => {
    let user = {
      username: "user2",
      password: "user2",
      roles: ["ADMIN"],
    };
    chai
      .request(app)
      .post("/registration")
      .send(user)
      .end((err, res) => {
        console.log("res.status");
        console.log(res.status);

        // Asserts
        expect(res.status).to.be.equal(200);
        chai
          .request(app)
          .post("/login")
          .send({
            username: "user2",
            password: "user2",
          })
          .end((err, res) => {
            console.log(res.status);
            console.log(res.body.message);
            expect(res.status).to.be.equal(200);

            let post = {
              title: "Test post",
              body: "Test post Description",
              author: res.body.userId,
            };

            chai
              .request(app)
              .post("/add-post")
              .send(post)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
              });
          });
      });
  });

  it("edit post", () => {
    let user = {
      username: "user3",
      password: "user3",
      roles: ["ADMIN"],
    };
    chai
      .request(app)
      .post("/registration")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        chai
          .request(app)
          .post("/login")
          .send({
            username: "user3",
            password: "user3",
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);

            let post = {
              title: "Test post",
              body: "Test post Description",
              author: res.body.userId,
            };
            let editPost = {
              title: "Test postEdit",
              body: "Test postEdit Description",
              author: res.body.userId,
            };
            chai
              .request(app)
              .post("/add-post")
              .send(post)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);

                chai
                  .request(app)
                  .post("/edit-post/" + res.body._id)
                  .send(editPost)
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                  });
              });
          });
      });
  });

  it("delete post", () => {
    let user = {
      username: "user4",
      password: "user4",
      roles: ["ADMIN"],
    };
    chai
      .request(app)
      .post("/registration")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        chai
          .request(app)
          .post("/login")
          .send({
            username: "user4",
            password: "user4",
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);

            let post = {
              title: "Test post",
              body: "Test post Description",
              author: res.body.userId,
            };
            chai
              .request(app)
              .post("/add-post")
              .send(post)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);

                chai
                  .request(app)
                  .post("/delete-post/" + res.body._id)
                  .end((err, res) => {
                    // Asserts
                    expect(res.status).to.be.equal(200);
                  });
              });
          });
      });
  });

  it("should register user with invalid input", () => {
    let user = {
      username: "Peter Petersen",
      password: "123",
    };
    chai
      .request(app)
      .post("/registration")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(400);
      });
  });

  it("add post invalid data", () => {
    let user = {
      username: "user4",
      password: "user4",
      roles: ["ADMIN"],
    };
    chai
      .request(app)
      .post("/registration")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(200);
        chai
          .request(app)
          .post("/login")
          .send({
            username: "user4",
            password: "user4",
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);

            let post = {
              title: "",
              body: "Test post Description",
              author: res.body.userId,
            };
            chai
              .request(app)
              .post("/add-post")
              .send(post)
              .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
              });
          });
      });
  });
});
