const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function (ws) {
    console.log('Клиент подключился');

    ws.on('message', function (message) {
        console.log('Получено сообщение:', message);
    });

    ws.on('close', function () {
        console.log('Клиент отключился');
    });
});

// Функция для отправки уведомлений всем клиентам
function sendNotification(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message }));
        }
    });
}

// Экспорт функции для использования через Corezoid
module.exports = { sendNotification };
