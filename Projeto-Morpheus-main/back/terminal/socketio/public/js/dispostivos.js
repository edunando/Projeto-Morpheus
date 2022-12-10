window.removeDisp = removeDisp;
window.openTerminalById = openTerminalById;
window.handleSubmit = handleSubmit;

const tbody = document.querySelector('tbody');

let disps = [];

function insertDispRow({ id, hostname, host, port, username }) {
  const dispRow = `<tr id="disp-${id}">
    <td>${hostname}</td>
    <td>${host}</td>
    <td>${port}</td>
    <td>${username}</td>
    <td>
      <i class="fa-solid fa-terminal" onclick="openTerminalById('${id}')"></i>
      <i class="ms-3 fa-solid fa-trash-can" onclick="removeDisp('${id}', '${hostname}')"></i>
      <div class="ms-3 invisible spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </td>
  </tr>`;

  tbody.insertAdjacentHTML('beforeend', dispRow);
}

async function openTerminalById(id) {

    const config = {
        method: 'get'
    };

    const disp = await (await fetch(`http://localhost:3000/dispositivos/${id}`, config)).json();

    const confTerminal  = {
        method: 'post',
        body: JSON.stringify(disp),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const terminal = await fetch(`http://localhost:3000/terminal`, confTerminal);

    if(terminal) {
        window.location.href = `http://localhost:3000/terminal.html?channel=data${disp.id}`;
    }
}

async function loadDisps() {

  disps = await (await fetch('http://localhost:3000/dispositivos')).json();

  disps.map((disp) => insertDispRow(disp));
}

async function handleSubmit(event) {
  event.preventDefault();

  const disps = document.querySelectorAll('input');

  const disp = {
    hostname: hostname.value,
    host: host.value,
    port: port.value,
    username: user.value,
    password: password.value
  };

  const config = {
    method: 'post',
    body: JSON.stringify(disp),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const newDisp = await (
    await fetch('http://localhost:3000/dispositivos', config)
  ).json();

  insertDispRow(newDisp);

  createDispForm.reset();
}

function removeDisp(id, name) {
  const result = confirm(`Deseja excluir o dispositivo ${name}?`);

  if (result) {
    const tr = document.querySelector(`#disp-${id}`);

    tr.remove();

    const config = {
        method: "delete",
      };

    fetch(`http://localhost:3000/dispositivos/${id}`, config);
  }
}

loadDisps();