import HomePage from '../pageobjects/homePage';

describe('Todo deletion', () => {
  const bulkTodoCount = 5;
  let homePage: HomePage;

  beforeEach('opens TodoMVC homepage', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('deletes a single todo', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.getElement().should('have.value', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');

    homePage.deleteTodoByText(homePage.data.args.todoName);
    cy.contains('li[data-testid="todo-item"]', homePage.data.args.todoName).should('not.exist');
  });

  it('deletes multiple todos', () => {
    const todoItems = Array.from(
      { length: bulkTodoCount },
      (_, index) => `${homePage.data.args.genericTodoName}${index + 1}`,
    );

    todoItems.forEach((todo) => homePage.addTodo(todo));
    todoItems.forEach((todo) => homePage.deleteTodoByText(todo));

    cy.get('li[data-testid="todo-item"]').should('not.exist');
  });
});
