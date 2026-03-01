import BasicElement, { type ElementSelector } from './basicElement';

class Input extends BasicElement {
  constructor(selector: ElementSelector) {
    super(selector);
  }

  type(text: string, options: Partial<Cypress.TypeOptions> = {}): void {
    this.clear();
    this.getElement().type(text, options);
  }

  enter(): void {
    this.getElement().type('{enter}');
  }

  clear(): void {
    this.getElement().clear();
  }
}

export default Input;
