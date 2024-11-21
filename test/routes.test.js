const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

let token = "";
let postId = "";

describe("test", () => {
    it("login", async () => {
        let user = {
            "username":"user1",
            "password":"user1",
        }
        return supertest(server)
            .post("/login")
            .send(user)
            .expect(200)
            .then((res) => {
                token = res.body.token;
                expect(res.statusCode).toBe(200);
            })

    });

    it("should return all posts", async () => {
        return supertest(server)
            .get("/posts")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("should return main page", async () => {
        return supertest(server)
            .get("/")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("should return admin page", async () => {
        return supertest(server)
            .get("/")
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("create post", async () => {
        let post = {
            "title":"test create post",
            "body":"test create post",
        }
        return supertest(server)
            .post("/create-post")
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("create post page", async () => {
        return supertest(server)
            .get("/create-post")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("add post", async () => {
        let post = {
            "title":"3 post from me",
            "body":"hi, i'm here",
        }
        return supertest(server)
            .post("/add-post")
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .then((res) => {
                postId = res.body._id
                console.log(postId)
                expect(res.statusCode).toBe(200);
            })

    });

    it("create post invalid", async () => {
        let post = {
            "title":"post without body",
            "body":"",
        }
        return supertest(server)
            .post("/create-post")
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .then((res) => {
                expect(res.statusCode).toBe(404);
            })

    });

    it("add post invalid", async () => {
        let post = {
            "title":"3 post from me",
            "body":"",
        }
        return supertest(server)
            .post("/add-post")
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .then((res) => {
                expect(res.statusCode).toBe(404);
            })

    });

    it("add post page", async () => {
        return supertest(server)
            .get("/add-post")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("auth page", async () => {
        return supertest(server)
            .get("/auth")
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("show one post", async () => {
        return supertest(server)
            .get("/one-post/" + postId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("show post page", async () => {
        return supertest(server)
            .get("/post/" + postId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("edit post", async () => {
        let post = {
            "title":"edit post",
            "body":"edit body",
        }
        console.log("'/edit-post/' + postId")
        console.log("/edit-post/" + postId)
        return supertest(server)
            .put("/edit-post/" + postId)
            .set('Authorization', `Bearer ${token}`)
            .send(post)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("edit post page", async () => {
        return supertest(server)
            .get("/edit-post/" + postId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });

    it("delete post", async () => {
        return supertest(server)
            .delete("/delete-post/" + postId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })

    });


    it("registration", async () => {
        let user = {
            "username":"userTest",
            "password":"userTest",
        }
        return supertest(server)
            .post("/registration")
            .send(user)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                removeUserFromDatabase(user);
            })

    });

    it("registration", async () => {
        let user = {
            "username":"userTestInvalid",
            "password":"123",
        }
        return supertest(server)
            .post("/registration")
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(400);
            })

    });

    it("login", async () => {
        let user = {
            "username":"userInvalid",
            "password":"12345",
        }
        return supertest(server)
            .post("/login")
            .send(user)
            .expect(400)
            .then((res) => {
                expect(res.statusCode).toBe(400);
            })

    });

    async function removeUserFromDatabase(user) {
        const User = require('../server/models/User');
        await User.findOneAndRemove({ username: user.username });
    }
});
