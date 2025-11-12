import { app, BrowserWindow, nativeTheme, ipcMain, Menu, dialog } from "electron";
import { fileURLToPath } from "url";
import path from "path";

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let janela = null; // Variável para armazenar a janela

function criarJanela() {
  nativeTheme.themeSource = "light";
  janela = new BrowserWindow({
    width: 800,
    height: 800,
    title: "Jogo de Adivinhação",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
      setZoomFactor: 1.0, //deixando o zoom em 100%
    },
  });
  // Não remover o menu para que o item "Ajuda" apareça
  janela.loadFile(path.join(__dirname, "index.html"));
  janela.webContents.on("did-finish-load", () => {
    //evento disparado quando a janela termina de carregar
    janela.webContents.setZoomFactor(1.0);

    janela.webContents.on("context-menu",()=>{
      Menu.buildFromTemplate(template).popup({ window: janela });
    });

  });

}

let menubar = null;

const template = [
  {
    label: "Arquivo",
    submenu: [
      { label: "Novo", click: () => criarJanela() },
      { type: "separator" },
      { label: "Sair", role: "quit" },
    ],
  },
  {
    label: "Exibir",
    submenu: [
      {
  label: "Zoom",
  submenu: [
    { label:"MAIS ZOOM" , role: "zoomIn" }, 

    { label: "MENOS ZOO", role: "zoomOut" },

    { type: "separator" },

    { label: "VOLTAR TELA ORIGINAL ", role: "resetZoom" }
  ]
},
      { type: "separator" },
      { label: "Tela Cheia", role: "togglefullscreen" },
      { type: "separator" },
      {
        label: "Trocar Tema",
        type: "checkbox",
        checked: false,
        click: () => {
          if (nativeTheme.themeSource === "dark") {
            nativeTheme.themeSource = "light";
          } else {
            nativeTheme.themeSource = "dark";
          }
        },
      },
    ],
  },
   {
    label: "Ferramenta",
    submenu: [
      {
        label: "Desenvolvedor",
        click: () => {
          if (janela) janela.webContents.openDevTools();
        },
      },
    ],
  },
  {
    label: "Ajuda",
    submenu: [
      {
        label: "Sobre o Jogo de Adivinhação",
        click: () => {
          if (janela) {
            dialog.showMessageBox(janela, {
              type: "info",
              title: "Sobre o Jogo de Adivinhação",
              message: `Versões:\nApp: ${app.getVersion()}\nNode: ${process.versions.node}\nChrome: ${process.versions.chrome}\nElectron: ${process.versions.electron}`,
              detail: ` https://github.com/electron/electron`
            });
          }
        },
      },
    ],
  },
];


Menu.setApplicationMenu(Menu.buildFromTemplate(template));

app.whenReady().then(criarJanela);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("mudar-tema", () => {
  if (nativeTheme.themeSource === "dark") {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
});

ipcMain.on("mudar-zoom", () => {
  if (!janela) return;
  const zoomAtual = janela.webContents.getZoomFactor();
  janela.webContents.setZoomFactor(zoomAtual + 0.1);
});

ipcMain.on("mudar-zoom-", () => {
  if (!janela) return;
  const zoomAtual = janela.webContents.getZoomFactor();
  janela.webContents.setZoomFactor(Math.max(0.1, zoomAtual - 0.1));
});
