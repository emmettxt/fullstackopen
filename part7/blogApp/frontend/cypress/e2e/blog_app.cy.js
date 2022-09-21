describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3005/api/testing/reset')
    cy.createUser({
      name: 'Emmet Moore',
      username: 'emoore',
      password: 'passwordemoore',
    })
    cy.visit('http://localhost:3002')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
      .should('not.have.css', 'display', 'none')
      .and('be.visible')
  })
  describe('Login', function () {
    it('succeed with correct credentails', function () {
      cy.get('[name="username"]').type('emoore')
      cy.get('[name="password"]').type('passwordemoore')
      cy.get('#login-form').find('button').click()

      cy.get('#notification').contains('Emmet Moore logged in succefully')
    })

    it('fails with wrong credentials', function () {
      cy.get('[name="username"]').type('wrong username')
      cy.get('[name="password"]').type('wrong password')
      cy.get('#login-form').find('button').click()

      cy.get('#notification')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('contain', 'There was an error logging in,')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'emoore',
        password: 'passwordemoore',
      })
    })

    it('A blog can be created', function () {
      cy.get('button:contains("new blog")').click()
      cy.get('#BlogForm').find('input[name="title"]').type('cypress title')
      cy.get('#BlogForm').find('input[name="author"]').type('cypress author')
      cy.get('#BlogForm').find('input[name="url"]').type('cypress url')

      cy.get('#BlogForm').find('button:contains("create")').click()

      cy.get('#notification').contains(
        'a new blog "cypress title" by cypress author added'
      )

      cy.get('.blog:contains("cypress title cypress author")')
    })
    describe('a blog from logged in user exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a new blog',
          author: 'a new author',
          url: 'https://webiste.com/blogurl',
        })
      })

      it('logged in user can delete blog', function () {
        cy.get('.blog:contains("a new blog")').as('blogToDelete')
        cy.get('@blogToDelete').find('button:contains("view")').click()
        cy.get('@blogToDelete').find('button:contains("delete")').click()

        cy.get('#notification').contains('Deleted blog "a new blog"')
        cy.get('@blogToDelete').should('not.exist')
      })
      it('logged in user cannot delete blog not beloning to them', function () {
        //create user
        cy.createUser({
          name: 'Not Emmet Moore',
          username: 'nemoore',
          password: 'passwordnemoore',
        })
        cy.login({ username: 'nemoore', password: 'passwordnemoore' })
        cy.get('.blog:contains("a new blog")').as('blogToDelete')
        cy.get('@blogToDelete').find('button:contains("view")').click()
        cy.get('@blogToDelete')
          .find('button:contains("delete")')
          .should('not.be.visible')
      })
    })
    it('blogs are displayed in order of number of likes', function () {
      //add three blogs
      cy.createBlog({
        title: 'blog 1 title',
        author: 'blog 1 author',
        url: 'blog 1 url',
      })
      cy.createBlog({
        title: 'blog 2 title',
        author: 'blog 2 author',
        url: 'blog 2 url',
      })
      cy.createBlog({
        title: 'blog 3 title',
        author: 'blog 3 author',
        url: 'blog 3 url',
      })

      //expand each blog
      cy.get('.blog:contains("blog 1 title")')
        .find('button:contains("view")')
        .click()
      cy.get('.blog:contains("blog 2 title")')
        .find('button:contains("view")')
        .click()
      cy.get('.blog:contains("blog 3 title")')
        .find('button:contains("view")')
        .click()

      //like each blog a different number of times
      cy.get('.blog:contains("blog 1 title")')
        .find('button:contains("like")')
        .click()
      cy.get('.blog:contains("blog 1 title")').contains('likes 1')

      //like blog 2 twice wait
      cy.get('.blog:contains("blog 2 title")')
        .find('button:contains("like")')
        .click()
      cy.get('.blog:contains("blog 2 title")').contains('likes 1')

      cy.get('.blog:contains("blog 2 title")')
        .find('button:contains("like")')
        .click()
      cy.get('.blog:contains("blog 2 title")').contains('likes 2')

      //like blog 3 three times
      cy.get('.blog:contains("blog 3 title")')
        .find('button:contains("like")')
        .click()
      cy.get('.blog:contains("blog 3 title")').contains('likes 1')

      cy.get('.blog:contains("blog 3 title")')
        .find('button:contains("like")')
        .click()
      cy.get('.blog:contains("blog 3 title")').contains('likes 2')

      cy.get('.blog:contains("blog 3 title")')
        .find('button:contains("like")')
        .click()
      cy.get('.blog:contains("blog 3 title")').contains('likes 3')

      //check order of blogs
      cy.get('.blog').eq(0).should('contain', 'blog 3 title')
      cy.get('.blog').eq(1).should('contain', 'blog 2 title')
      cy.get('.blog').eq(2).should('contain', 'blog 1 title')
    })
  })
})
