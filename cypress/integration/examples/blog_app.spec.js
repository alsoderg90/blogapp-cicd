describe('Blog app', function() {
  beforeEach(function() {
	cy.request('POST', 'http://localhost:3001/api/testing/reset')
	cy.request('POST','http://localhost:3001/api/users',
	  ({ username: 'testijäbä', name:'testaaja', password:'salasana' }) )
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
  })

  it('fails with wrong credentials', function() {
	cy.get('#username').type('fail')
	cy.get('#password').type('salasana')
	cy.contains('Login').click()
	cy.contains('wrong')
  })
})




