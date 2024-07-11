import { html, render } from 'lit-html';
import { dbank_backend } from 'declarations/dbank_backend';
import logo from './logo2.svg';

class App {

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);


    if (document.getElementById("input-amount").value.length != 0) {


      const button = e.target.querySelector("#submit-btn");
      button.setAttribute("disabled", "true");
      await dbank_backend.topUp(inputAmount);
      button.removeAttribute("disabled");

      const currentAmount = await dbank_backend.checkBalance();
      document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

    }

    this.#render();
  };

  #render() {
    let body = html`

      <body>
        <div class="container">
          <img src="dbank_logo.png" alt="DBank logo" width="100"/>
          <h1>Current Balance: $<span id="value">234</span></h1>
          <div class="divider"></div>
          <form action="#">
          <h2>Amount to Top Up</h2>
          <input id="input-amount" type="number" step="0.01" min=0 name="topUp" value=""/>
          <h2>Amount to Withdraw</h2>
          <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min=0 value=""/>
          <input id="submit-btn" type="submit" value="Finalise Transaction" />
        </form>
        </div>
      </body>

    
    `;
    render(body, document.getElementById('root'));
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);

    window.addEventListener("load", async function () {

      // function twoDecimals(x) {
      //   return Number.parseFloat(x).toFixed(2);            // Other way to do it
      // }

      const currentAmount = await dbank_backend.checkBalance();
      document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

    });
  }
}

export default App;
