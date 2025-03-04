const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function (ws) {
    console.log('Клиент подключился');

    ws.on('message', function (message) {
        console.log('Получено сообщение:', message);
        ws.send('Ответ от сервера: ' + message);
    });

    ws.on('close', function () {
        console.log('Клиент отключился');
    });
});

// Экспорт функции для отправки уведомлений
function sendNotification(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message }));
        }
    });
}

module.exports = { sendNotification };
