import express from 'express';
import router from './server/router/index';
import cors from 'cors';
const errorHandler = require('./server/utils/errorHandler');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json({limit: '10mb'}));

app.use(router);
app.use(errorHandler);

process.env.NODE_ENV === 'development' && app.get('/images/*', (req, res) => {
    res.sendFile(`/var/www/html/${req.path}`);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
