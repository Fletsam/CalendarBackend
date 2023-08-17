const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, resp = response) => {
  const eventos = await Evento.find().populate("user", "name");
  try {
    resp.status(201).json({
      ok: true,
      msg: "getEventos",
      eventos,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
const crearEvento = async (req, resp = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();
    resp.status(201).json({
      ok: true,
      evento: eventoGuardado,
      msg: "Creado",
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

const actualizarEventos = async (req, resp = response) => {
  const eventoId = req.params.id;
  const evento = await Evento.findById(eventoId);
  try {
    if (!evento) {
      resp.status(404).json({
        ok: false,
        msg: "no existe id",
      });
    }
    if (evento.user.toString() !== req.uid) {
      return resp.status(401).json({
        ok: false,
        msg: "no tiene permiso para editar ",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: req.uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      {
        new: true,
      }
    );
    resp.status(200).json({
      ok: true,
      evento: eventoActualizado,
      msg: "actualizado",
    });
    console.log(evento);
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
const eliminarEventos = async (req, resp = response) => {
  const eventoId = req.params.id;
  const evento = await Evento.findById(eventoId);
  try {
    if (!evento) {
      resp.status(404).json({
        ok: false,
        msg: "no existe id",
      });
    }
    if (evento.user.toString() !== req.uid) {
      return resp.status(401).json({
        ok: false,
        msg: "no tiene permiso para editar ",
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
    resp.status(201).json({
      ok: true,
      eventoEliminado,
      msg: "Eliminar",
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

module.exports = {
  getEventos,
  actualizarEventos,
  eliminarEventos,
  crearEvento,
};
