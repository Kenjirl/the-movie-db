class AppBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.shadowDOM.querySelector("#search");
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                ::selection {
                    background-color: black;
                    color: white;
                }
                input {
                    font-family: "Quicksand", sans-serif;
                }
                :host {
                    background-color: var(--color-1);
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 100%;
                    font-size: 0.85rem;
                }
                h1 {
                    width: 60%;
                    color: white;
                    padding: 20px;
                }
                .search-bar {
                    width: 40%;
                    padding: 20px;
                }
                .search-bar input {
                    width: 100%;
                    border: none;
                    outline: none;
                    background-color: white;
                    color: black;
                    font-weight: bold;
                    padding: 10px 15px;
                    margin: 10px 0;
                    border-bottom: 3px solid var(--color-3);
                }

                @media screen and (max-width: 500px) {
                    :host {
                        display: block;
                    }
                    h1 {
                        width: 100%;
                        padding: 10px;
                        text-align: center;
                    }
                    .search-bar {
                        width: 100%;
                        padding: 10px;
                    }
                }
            </style>

            <h1>Find Your MOVIES</h1>
            <div class="search-bar">
                <form id="form">
                    <input
                        type="text"
                        placeholder="Search"
                        id="search"
                        class="search"
                    />
                </form>
            </div>
        `;

        this.shadowDOM
            .querySelector("#search")
            .addEventListener("click", this._clickEvent);
    }
}

customElements.define("app-bar", AppBar);
