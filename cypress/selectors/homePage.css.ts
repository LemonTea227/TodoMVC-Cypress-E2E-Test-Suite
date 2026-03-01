const selectors = {
  labels: {
    mainLabel: { selector: 'h1' },
    clearCompleted: { selector: '.clear-completed' },
    todoCount: { selector: '.todo-count' },
    todoLabel: { selector: 'li [data-testid="todo-item-label"]' },
  },
  inputs: {
    newTodo: { selector: '.new-todo' },
    editInput: { selector: '.edit' },
  },
  buttons: {
    allFilter: { selector: 'a[href="#/"]' },
    activeFilter: { selector: 'a[href="#/active"]' },
    completedFilter: { selector: 'a[href="#/completed"]' },
    deleteButton: { selector: 'button.destroy' },
    toggleCompletion: { selector: '[data-testid="toggle-all"]' },
  },
  toggles: {
    completedToggle: { selector: '[data-testid="todo-item-toggle"]' },
  },
  lists: {
    todosList: {
      listSelector: '[data-testid="todo-list"]',
      childSelector: 'li[data-testid="todo-item"]',
    },
  },
} as const;

export default selectors;
