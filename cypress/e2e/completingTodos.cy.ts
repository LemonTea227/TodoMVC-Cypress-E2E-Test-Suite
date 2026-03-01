import HomePage from '../pageobjects/homePage';

describe('Todo completion', () => {
  const bulkTodoCount = 5;
  let homePage: HomePage;

  beforeEach('opens TodoMVC homepage', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('marks and unmarks a single todo', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.getElement().should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');

    homePage.checkTodoByText(homePage.data.args.todoName);
    const checkedElement = homePage.getTodoCompletedToggleByText(
      homePage.data.args.todoName,
    );
    checkedElement.getElement().should('be.checked');

    homePage.uncheckTodoByText(homePage.data.args.todoName);
    const uncheckedElement = homePage.getTodoCompletedToggleByText(
      homePage.data.args.todoName,
    );
    uncheckedElement.getElement().should('not.be.checked');
  });

  it('marks and unmarks multiple todos', () => {
    const todoItems = Array.from(
      { length: bulkTodoCount },
      (_, index) => `${homePage.data.args.genericTodoName}${index + 1}`,
    );

    todoItems.forEach((todo) => homePage.addTodo(todo));
    todoItems.forEach((todo) => homePage.checkTodoByText(todo));
    todoItems.forEach((todo) =>
      homePage.getTodoCompletedToggleByText(todo).getElement().should('be.checked'),
    );

    todoItems.forEach((todo) => homePage.uncheckTodoByText(todo));
    todoItems.forEach((todo) =>
      homePage
        .getTodoCompletedToggleByText(todo)
        .getElement()
        .should('not.be.checked'),
    );
  });

  it('toggles all todos via main toggle button', () => {
    const todoItems = Array.from(
      { length: bulkTodoCount },
      (_, index) => `${homePage.data.args.genericTodoName}${index + 1}`,
    );

    todoItems.forEach((todo) => homePage.addTodo(todo));

    homePage.toggleAllTodos();
    todoItems.forEach((todo) =>
      homePage.getTodoCompletedToggleByText(todo).getElement().should('be.checked'),
    );

    homePage.toggleAllTodos();
    todoItems.forEach((todo) =>
      homePage
        .getTodoCompletedToggleByText(todo)
        .getElement()
        .should('not.be.checked'),
    );
  });

  it('toggles all todos when some are already completed', () => {
    const todoItems = Array.from(
      { length: bulkTodoCount },
      (_, index) => `${homePage.data.args.genericTodoName}${index + 1}`,
    );

    todoItems.forEach((todo) => homePage.addTodo(todo));

    homePage.checkTodoByIndex(0);
    homePage.checkTodoByIndex(1);

    homePage.getTodoCompletedToggleByIndex(0).getElement().should('be.checked');
    homePage.getTodoCompletedToggleByIndex(1).getElement().should('be.checked');

    homePage.toggleAllTodos();
    todoItems.forEach((todo) =>
      homePage.getTodoCompletedToggleByText(todo).getElement().should('be.checked'),
    );

    homePage.toggleAllTodos();
    todoItems.forEach((todo) =>
      homePage
        .getTodoCompletedToggleByText(todo)
        .getElement()
        .should('not.be.checked'),
    );
  });
});
