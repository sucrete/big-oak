import { LitElement, html } from "../../assets/js/vendor/lit.js";

export class Header extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="header-wrapper-1">
              <a href="index.html" class="logo-area">
                <img
                  src="assets/images/logo/big-oak-logo.svg"
                  class="big-oak-logo logo-large"
                  alt="logo"
                  onload="SVGInject(this)"
                />
                <img
                  src="assets/images/logo/big-oak-logo.svg"
                  class="big-oak-logo logo-small"
                  alt="logo"
                />
              </a>
              <div class="nav-area row flex-row g-5">
                <nav class="d-flex">
                  <ul>
                    <li>
                      <a class="nav-link" href="contact.html">Contact</a>
                    </li>

                    <li>
                      <a class="nav-link" href="#"> Another Page</a>
                    </li>
                  </ul>
                </nav>
                <div class="button-area-right-header">
                  <a
                    href="book-tee-time.html"
                    class="rts-btn btn-border header-btn"
                  >
                    Book Tee Time
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      data-inject-url="https://html.themewant.com/luminos/assets/images/service/icons/13.svg"
                      class="injectable"
                    >
                      <path
                        d="M9.3335 22.6667L22.6668 9.33337M22.6668 9.33337H9.3335M22.6668 9.33337V22.6667"
                        stroke="#999999"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </a>
                  <div class="menu-btn-toggle">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="14" width="20" height="2" fill="#1F1F25"></rect>
                      <rect y="7" width="20" height="2" fill="#1F1F25"></rect>
                      <rect width="20" height="2" fill="#1F1F25"></rect>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("my-header", Header);
