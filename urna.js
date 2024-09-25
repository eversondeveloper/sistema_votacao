/* eslint-disable no-undef */
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;
let apiProcess;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,  
    height: 1080, 
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);  

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000' 
      : `file://${path.join(__dirname, 'dist/index.html')}` 
  );
}

function startAPILocal() {
  const apiPath = path.join(__dirname, 'api', 'app.js'); 
  apiProcess = exec(`node ${apiPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar API: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro da API: ${stderr}`);
      return;
    }
    console.log(`API Output: ${stdout}`);
  });

  apiProcess.stdout.on('data', (data) => {
    console.log(`API: ${data}`);
  });
  apiProcess.stderr.on('data', (data) => {
    console.error(`Erro da API: ${data}`);
  });
}

app.whenReady().then(() => {
  startAPILocal(); 
  createWindow();  
});

app.on('window-all-closed', () => {
  if (apiProcess) {
    apiProcess.kill(); 
    console.log("API encerrada.");
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});
