import HomePage from '../pageobjects/homePage';

describe('Todo editing', () => {
  let homePage: HomePage;

  beforeEach('opens TodoMVC homepage', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('edits todo text', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.getElement().should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');

    homePage.changeNameOfATodoByName(
      homePage.data.args.todoName,
      homePage.data.args.editedTodoName,
    );
    homePage.getTodoByText(homePage.data.args.editedTodoName).should('be.visible');
  });
});
