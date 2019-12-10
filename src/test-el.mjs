import { html, LitElement } from 'lit-element';

export class TestEl extends LitElement {
  constructor() {
    super();

    this.message = 'Hello, World';
  }

  render() {
    return html`
      <h1>${this.message}</h1>
    `;
  }
}

if (null == window.customElements.get('test-el')) {
  window.customElements.define('test-el', TestEl);
}
