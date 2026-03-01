import BasicElement, { type ElementSelector } from './basicElement';

class List extends BasicElement {
  constructor(listSelector: ElementSelector, private readonly childSelector: string) {
    super(listSelector);
  }

  getAllElements(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getElement().children();
  }

  getChildByIndex(index = 0): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getElement().find(this.childSelector).eq(index);
  }

  getChildByText(text: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.getElement().contains(this.childSelector, text);
  }

  getAllChildrenText(): Cypress.Chainable<string[]> {
    return this.getElement().find(this.childSelector).then(($elements) => {
      return Cypress._.map($elements, 'innerText');
    });
  }
}

export default List;
