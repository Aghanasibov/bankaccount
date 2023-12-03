const incrementBtn = document.querySelector('#incrementBtn');
const decrementBtn = document.querySelector('#decrementBtn');
const showBtn = document.querySelector('#showBtn');
const moneyInput = document.querySelector('#moneyInput');

const balanceEl = document.querySelector('#balanceEl');
const listTable = document.querySelector('#list');

const bankAccount = {
  balance: 0,
  limit: 1000,
  hesabat: [],
  date: new Date(),

  artir: function (m) {
    if (this.balance >= this.limit || m <= 0 || !m) {
      console.log('Invalid');
      return;
    }

    this.balance += m;

    const history = {
      type: 'Cash',
      amount: m,
      created: new Date(),
    };

    this.hesabat.push(history);

    return this.balance;
  },

  xercle: function (m) {
    const checkValid = () => {
      if (this.balance - moneyInput.value < 0) {
        return alert('Falsche Entscheidung!');
      }

      this.balance -= m;

      const history = {
        type: 'Withdraw',
        amount: m,
        created: new Date(),
      };

      this.hesabat.push(history);
    };

    checkValid();

    return this.balance;
  },

  show: function (m) {
    const thisObj = this;

    function handleMonitor() {
      console.log(thisObj.balance);
      console.log(thisObj.hesabat);
    }

    handleMonitor();

    return this.balance;
  },
};

incrementBtn.addEventListener('click', function () {
  const value = moneyInput.value;

  bankAccount.artir(+value);

  moneyInput.value = '';
});

decrementBtn.addEventListener('click', function () {
  const value = moneyInput.value;
  bankAccount.xercle(+value);
  moneyInput.value = '';
});
moneyInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const value = moneyInput.value;
    bankAccount.artir(+value); 
    moneyInput.value = '';
  }
});

showBtn.addEventListener('click', function () {
  const result = bankAccount.show();
  
  balanceEl.innerHTML = result;

  const newContent = bankAccount.hesabat
    .map(
      (item, index) => `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.type}</td>
          <td class="text-${item.type == 'Cash' ? 'success' : 'danger'}">${
            item.type == 'Cash' ? '+' + item.amount : '-' + item.amount
          }</td>
          <td>${new Date(item.created).toLocaleString('de-DE', {
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}</td>
        </tr>
      `
    )
    .join('');

  listTable.innerHTML = newContent;
});
