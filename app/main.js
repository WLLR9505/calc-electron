//Arquivo de inicialização do app

const electron = require('electron');

// Módulo utilizado para controlar o ciclo de vida da aplicação
const app = electron.app;

// Módulo para criar uma janela nativa do seu sistema operacional
const BrowserWindow = electron.BrowserWindow;

// ATENÇÃO: Se não existir uma referência global para a janela da aplicação,
// ela será fechada automaticamente quando o objeto for pego pelo Garbage Collector
let mainWindow;


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 340,
        height: 630,
        resizable: false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // mainWindow.openDevTools();
    // QUESTION: habilita DevTools?
    // ANSWER: Yes

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
