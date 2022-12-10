import { v4 as uuidv4 } from "uuid";

import db from "../database/index.js";

function readAll() {
  return db.dispositivos;
}

function read(id) {
  const host = db.dispositivos.find((host) => host.id === id);

  return host;
}

function create(host) {
  const id = uuidv4();

  const newHost = { ...host, id };

  db.dispositivos.push(newHost);

  return newHost;
}

function update(host, id) {
  const newHost = { ...host, id };

  const index = db.dispositivos.findIndex((host) => host.id === id);

  db.dispositivos[index] = newHost;

  return newHost;
}

function remove(id) {
  const index = db.dispositivos.findIndex((host) => host.id === id);

  db.dispositivos.splice(index, 1);
}

export default {
  readAll,
  read,
  create,
  remove,
  update,
};