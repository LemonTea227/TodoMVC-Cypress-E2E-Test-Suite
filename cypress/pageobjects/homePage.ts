import fixtureData from '../fixtures/home_page.json';
import selectors from '../selectors/homePage.css';
import Button from '../elementObjects/button';
import Input from '../elementObjects/input';
import Label from '../elementObjects/label';
import List from '../elementObjects/list';
import Toggle from '../elementObjects/toggle';

type FilterName = 'all' | 'active' | 'completed';

interface HomePageData {
  inputs: {
    urls: Record<FilterName, string>;
  };
  args: {
    todoName: string;
    secondTodoName: string;
    genericTodoName: string;
    editedTodoName: string;
  };
}

class HomePage {
  readonly data: HomePageData = fixtureData as HomePageData;
  readonly labels: Record<string, Label> = {};
  readonly buttons: Record<string, Button> = {};
  readonly inputs: Record<string, Input> = {};
  readonly toggles: Record<string, Toggle> = {};
  readonly lists: Record<string, List> = {};

  constructor() {
    Object.entries(selectors.labels).forEach(([key, definition]) => {
      this.labels[key] = new Label(definition.selector);
    });

    Object.entries(selectors.buttons).forEach(([key, definition]) => {
      this.buttons[key] = new Button(definition.selector);
    });

    Object.entries(selectors.inputs).forEach(([key, definition]) => {
      this.inputs[key] = new Input(definition.selector);
    });

    Object.entries(selectors.toggles).forEach(([key, definition]) => {
      this.toggles[key] = new Toggle(definition.selector);
    });

    Object.entries(selectors.lists).forEach(([key, definition]) => {
      this.lists[key] = new List(definition.listSelector, definition.childSelector);
    });
  }

  get elements() {
    return {
      labels: this.labels,
      buttons: this.buttons,
      inputs: this.inputs,
      toggles: this.toggles,
      lists: this.lists,
    };
  }

  addTodo(text: string): void {
    this.inputs.newTodo.type(text, { release: false });
    this.inputs.newTodo.enter();
  }

  getAllTodosText(): Cypress.Chainable<string[]> {
    return this.lists.todosList.getAllChildrenText();
  }

  getTodoByText(text: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.lists.todosList.getChildByText(text);
  }

  getTodoByIndex(index = 0): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.lists.todosList.getChildByIndex(index);
  }

  deleteTodoByText(text: string): void {
    const todoItem = this.getTodoByText(text);
    const deleteButton = new Button(todoItem.find(selectors.buttons.deleteButton.selector).first());
    deleteButton.showAndClick();
  }

  deleteTodoByIndex(index = 0): void {
    const todoItem = this.getTodoByIndex(index);
    const deleteButton = new Button(todoItem.find(selectors.buttons.deleteButton.selector));
    deleteButton.showAndClick();
  }

  checkTodoByText(text: string): void {
    this.getTodoCompletedToggleByText(text).check();
  }

  checkTodoByIndex(index = 0): void {
    this.getTodoCompletedToggleByIndex(index).check();
  }

  uncheckTodoByText(text: string): void {
    this.getTodoCompletedToggleByText(text).uncheck();
  }

  uncheckTodoByIndex(index = 0): void {
    this.getTodoCompletedToggleByIndex(index).uncheck();
  }

  getTodoCompletedToggleByText(text: string): Toggle {
    const todoItem = this.lists.todosList.getChildByText(text);
    return new Toggle(todoItem.find(selectors.toggles.completedToggle.selector));
  }

  getTodoCompletedToggleByIndex(index = 0): Toggle {
    const todoItem = this.lists.todosList.getChildByIndex(index);
    return new Toggle(todoItem.find(selectors.toggles.completedToggle.selector));
  }

  changeNameOfATodoByName(currentName: string, newName: string): void {
    const todoItem = this.getTodoByText(currentName);
    todoItem.dblclick();
    const editInput = new Input(todoItem.find(selectors.inputs.editInput.selector));
    editInput.type(newName, { release: false });
    editInput.enter();
  }

  changeNameOfATodoByIndex(index = 0, newName: string): void {
    const todoItem = this.getTodoByIndex(index);
    todoItem.dblclick();
    const editInput = new Input(todoItem.find(selectors.inputs.editInput.selector));
    editInput.type(newName, { release: false });
    editInput.enter();
  }

  toggleAllTodos(): void {
    this.buttons.toggleCompletion.click();
  }

  getNumberOfTodos(): Cypress.Chainable<number> {
    return this.labels.todoCount.getInnerText().then((text) => {
      const leadingCountText = text.split(' ')[0];
      return Number.parseInt(leadingCountText, 10);
    });
  }

  chooseFilter(filterName: FilterName): void {
    const expectedHash = this.data.inputs.urls[filterName];
    const filterButtonName = `${filterName}Filter`;

    this.buttons[filterButtonName].click({ waitForAnimations: false });
    cy.location('hash').should('eq', expectedHash);
  }

  clearCompleted(): void {
    this.labels.clearCompleted.click();
  }
}

export default HomePage;
