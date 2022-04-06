import API from "./api.js";

const getChapters = (req, reply) => {
  API.getChapters().then(chapters => {
    reply.send(chapters);
  });
}

const getPages = (req, reply) => {
  let chapter = req.params.chapter;
  API.getPages(Number(chapter)).then(pages => {
    reply.send(pages);
  });
}

export default {
  getChapters,
  getPages
}