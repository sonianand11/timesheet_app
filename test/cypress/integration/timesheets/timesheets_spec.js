describe('Timesheets feature', function() {
  before(() => {
    cy.app('clean')
    cy.appScenario('basic')
    cy.login("user1@example.com", "123456")
  })
  beforeEach(() => {
    cy.preserveAllCookiesOnce()
  })
  it('User should not find any timesheet', function() {
    cy.get('#timesheet_table').find('tbody').should(($tbody) => {
      expect($tbody).not.to.contain('<tr>')
    })
  })
  it('User should click on Clock in', function() {
    cy.get('[data-cy="clock_in_link"]').click()
    cy.get('#timesheet_table > tbody > tr').its('length').should('be.eq', 1)
  })

  it('User should click on Clock out', function() {
    cy.get('[data-cy="clock_out_link"]').click()
    cy.get('#timesheet_table > tbody > tr').its('length').should('be.eq', 1)
  })

  it('User should not be able to create new timesheet without entering clock out in previous timesheet', function() {
    cy.get('[data-cy="clock_in_link"]').click()
    cy.visit("/timesheets/new")
    cy.contains("Please Clock out from current timesheet to create new")
    cy.get('[data-cy="clock_out_link"]').click()
  })

  it('User should be able to edit timesheet', function() {
    cy.get('#timesheet_table > tbody > tr').first().within(() => {
      cy.get('[data-cy="edit_timesheet"]').click()
    })
    cy.contains("Editing Timesheet")
    cy.get("a[href='/timesheets']").click()

  })

  it('User should not be able to update timesheet with early end time', function() {
    cy.get('#timesheet_table > tbody > tr').first().within(() => {
      cy.get('[data-cy="edit_timesheet"]').click()
    })
    cy.contains("Editing Timesheet")
    cy.wait(1000)
    cy.get('#timesheet_end_time_2i').select('August')
    cy.get("input[type='submit']").click()
    cy.contains("End time can't be less than start time")
    cy.get("a[href='/timesheets']").click()
    
  })

  it('User should be able to create timesheet when previous timesheet is clock out', function() {
    cy.get('[data-cy="clock_in_link"]').click()
    cy.get('[data-cy="clock_out_link"]').click()
    cy.visit("/timesheets/new")
    cy.contains("New Timesheet")
    cy.get("input[type='submit']").click()
    cy.get('#timesheet_table > tbody > tr').its('length').should('be.eq', 4)   
  })

  it('User should be able to see timesheet of other users', function() {
    cy.logout()
    cy.login("user2@example.com", "123456")
    cy.contains("user2@example.com")
    cy.get('#timesheet_table').find('tbody').should(($tbody) => {
      expect($tbody).not.to.contain('<tr>')
    })  
  })

})
