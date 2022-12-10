import express from "express";

import Disp from "./models/Dispositivos.js";

const router = express.Router();

router.get("/dispositivos", (req, res) => {
  const dispositivos = Disp.readAll();

  res.json(dispositivos);
});

router.get("/dispositivos/:id", (req, res) => {
    const dispId = req.params.id;
    
    const disp = Disp.read(dispId);
    
    res.json(disp);
});

router.post("/dispositivos", (req, res) => {
  const disp = req.body;

  const newDisp = Disp.create(disp);

  res.status(201).json(newDisp);
});

router.put("/dispositivos/:id", (req, res) => {
  const id = req.params.id;

  const disp = req.body;

  const newDisp = Disp.update(disp, id);

  res.json(newDisp);
});

router.delete("/dispositivos/:id", (req, res) => {
  const id = req.params.id;

  Disp.remove(id);

  res.status(204).send();
});


export default router;