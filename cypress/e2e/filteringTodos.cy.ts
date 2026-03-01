import HomePage from '../pageobjects/homePage';

describe('Todo filtering', () => {
  let homePage: HomePage;

  beforeEach('opens TodoMVC homepage', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('shows correct active and completed todos per filter', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.addTodo(homePage.data.args.secondTodoName);

    homePage.getTodoByIndex(0).should('be.visible');
    homePage.getTodoByIndex(1).should('be.visible');

    homePage.checkTodoByIndex(0);

    homePage.chooseFilter('completed');

    homePage.getAllTodosText().then((todosText) => {
      expect(todosText.includes(homePage.data.args.todoName)).equal(true);
      expect(todosText.includes(homePage.data.args.secondTodoName)).equal(false);
    });

    homePage.chooseFilter('active');

    homePage.getAllTodosText().then((todosText) => {
      expect(todosText.includes(homePage.data.args.todoName)).equal(false);
      expect(todosText.includes(homePage.data.args.secondTodoName)).equal(true);
    });
  });
});
