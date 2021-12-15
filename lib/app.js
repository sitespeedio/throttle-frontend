import http from 'http';
import { join } from 'path';
import express from 'express';
import compress from 'compression';
import responseTime from 'response-time';
import { minify as _minify } from 'express-beautify';
import index from './routes/index.js';
import api from './routes/api.js';
import config from 'config';
const port = config.get('port');

export function setupServer() {
  const app = express();
  const minify = _minify({
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: true
  });

  app.use(compress());
  app.use(responseTime());
  app.use(minify);

  app.set('view engine', 'pug');
  app.set('views', join('views'));

  app.enable('view cache');

  app.disable('x-powered-by');

  app.use(
    '/img',
    express.static(join('public', 'img'), {
      maxAge: '366 days'
    })
  );

  app.use(
    '/css',
    express.static(join('public', 'css'), {
      maxAge: '10 days'
    })
  );

  app.use('/', index);
  app.use('/api', api);

  app.use(function (req, res) {
    res.status(400);
    res.render('404', {
      title: '404: File Not Found',
      description: '404'
    });
  });

  return app;
}

const app = setupServer();

http.createServer(app).listen(port, () => {
  console.log('Web app listening on :%s', port);
});
