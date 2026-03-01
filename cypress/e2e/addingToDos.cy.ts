import HomePage from '../pageobjects/homePage';

describe('Todo creation', () => {
  const bulkTodoCount = 20;
  let homePage: HomePage;

  beforeEach('opens TodoMVC homepage', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('adds a single todo', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.getElement().should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');
  });

  it('adds multiple todos', () => {
    const todoItems = Array.from(
      { length: bulkTodoCount },
      (_, index) => `${homePage.data.args.genericTodoName}${index + 1}`,
    );

    todoItems.forEach((todo) => homePage.addTodo(todo));

    homePage.inputs.newTodo.getElement().should('have.text', '');

    todoItems.forEach((todo) => homePage.getTodoByText(todo).should('be.visible'));
  });
});
