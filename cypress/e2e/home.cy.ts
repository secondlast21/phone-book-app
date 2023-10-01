describe('The Home Page', () => {
    beforeEach(() => {
        cy.exec('yarn dev')
    })

    it('successfully load home page', () => {
        cy.visit('/')
    })
})
