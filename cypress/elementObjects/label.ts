import BasicElement, { type ElementSelector } from './basicElement';

class Label extends BasicElement {
  constructor(selector: ElementSelector) {
    super(selector);
  }
}

export default Label;