import express from 'express';
import spotify from './spotify';

const app = express();

app.use(express.static('public'));

app.get('/search/:name', (req, res) => {
  const emitter = spotify.searchWithRelated(req.params.name);
  emitter.on('end', (response) => {
    res.json(response);
  });
  emitter.on('error', (code) => {
    res.sendStatus(code);
  });
});

app.listen(process.env.PORT || 8080);

export { app as default };
