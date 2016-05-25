// НЕОБХОДИМЫЕ ПАКЕТЫ И ПЕРЕМЕННЫЕ
// ==================================================
var express = require('express');
var app     = express();
var ig      = require('instagram-node').instagram();

// КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ
// ==================================================
// сообщаем Node где лежат ресурсы сайта
app.use(express.static(__dirname + '/public'));

// устанавливаем движок EJS для представления
app.set('view engine', 'ejs');

// настройка приложения instagram с помощью идентификатора клиента
ig.use({ 
  client_id: 'e0e51c60672c4f09abe28c46c71a3a7a',
  client_secret: 'db11c575a8ae4f1aa90a03ba1d1345d8' 
});

// УСТАНОВКА МАРШРУТОВ
// ===================================================
// главная страница — популярные изображения
  app.get('/', function(req, res) {

  // используем пакет instagram для получения популярных картинок
  ig.media_popular(function(err, medias, remaining, limit) {
    // отображаем главную страницу и передаём в неё изображения
    res.render('pages/index', { grams: medias });
  });

});

// ЗАПУСК СЕРВЕРА
// ==================================================
app.listen(8080);
console.log('Приложение запущено! Смотрите на http://localhost:8080');