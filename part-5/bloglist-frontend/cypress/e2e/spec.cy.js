describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const newUser1 = {
      name: "test",
      username: "test",
      password: "test",
    };

    const newUser2 = {
      name: "anotherTest",
      username: "anotherTest",
      password: "anotherTest",
    };

    cy.request("POST", "http://localhost:3003/api/users/", newUser1);
    cy.request("POST", "http://localhost:3003/api/users/", newUser2);
    cy.visit("http://localhost:5173");
  });

  it("login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("test");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("a blog can be created", function () {
      cy.get("#buttonLabel").click();
      cy.get("#title").type("Healthy Vegan Recipes");
      cy.get("#author").type("Ella Smith");
      cy.get("#url").type("https://veganrecipesblog.com/healthy-vegan-recipes");
      cy.get("#create").click();

      cy.contains("a new blog Healthy Vegan Recipes by Ella Smith");
    });

    describe("user already logged in", function () {
      beforeEach(function () {
        cy.get("#buttonLabel").click();
        cy.get("#title").type("Healthy Vegan Recipes");
        cy.get("#author").type("Ella Smith");
        cy.get("#url").type(
          "https://veganrecipesblog.com/healthy-vegan-recipes"
        );
        cy.get("#create").click();
      });

      it("a blog can be liked", function () {
        cy.get(".viewButton").click();
        cy.get(".likeButton").click();

        cy.contains("likes 1");
      });

      it("a blog can be deleted", function () {
        cy.get(".viewButton").click();
        cy.get(".removeButton").click();
        cy.contains("Healthy Vegan Recipes Ella Smith").should("not.exist");
      });
    });
  });

  describe("only the creator can see the delete button of a blog", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.get("#buttonLabel").click();
      cy.get("#title").type("Healthy Vegan Recipes");
      cy.get("#author").type("Ella Smith");
      cy.get("#url").type("https://veganrecipesblog.com/healthy-vegan-recipes");
      cy.get("#create").click();
    });

    it("user 'test' can see the remove button", function () {
      cy.get(".viewButton").click();
      cy.contains("remove");
    });

    it("user 'anotherTest' cannot see the remove button", function () {
      cy.get(".logoutButton").click();

      cy.get("#username").type("anotherTest");
      cy.get("#password").type("anotherTest");
      cy.get("#login-button").click();

      cy.get(".viewButton").click();
      cy.contains("remove").should("not.exist");
    });
  });

  describe("blogs are ordered according to likes", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.get("#buttonLabel").click();
      cy.get("#title").type("Healthy Vegan Recipes");
      cy.get("#author").type("Ella Smith");
      cy.get("#url").type("https://veganrecipesblog.com/healthy-vegan-recipes");
      cy.get("#create").click();

      cy.get("#title").type("Exploring Quantum Physics");
      cy.get("#author").type("Sophia Turner");
      cy.get("#url").type(
        "https://quantumphysicsblog.com/exploring-quantum-physics"
      );
      cy.get("#create").click();

      cy.get("select").select("descending");
    });

    it("ordered in descending order", function () {
      cy.get("div>.viewButton").eq(1).click();
      cy.get("div>.likeButton").eq(1).click();

      cy.get("div>.viewButton").eq(0).click();
      cy.get("div>.blog").eq(0).contains("likes 1");
    });
  });
});
