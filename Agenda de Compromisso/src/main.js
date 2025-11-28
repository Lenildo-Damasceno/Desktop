import { app, BrowserWindow, nativeTheme, ipcMain, dialog , Menu, Notification} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

let janela = null; 
function criarJanela() {
    janela = new BrowserWindow({
        title: 'Meu App Electron',
        width: 800,
        height: 800,
        icon: path.join(__dirname, '..', 'app', 'icon.png'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false,
          
        }
    });

    const indexPath = path.join(__dirname, '..', 'app', 'index.html');
    janela.loadFile(indexPath);
    janela.webContents.on("context-menu", () => {
    Menu.buildFromTemplate(template).popup({ window: janela });
  });
    
}

app.whenReady()
    .then(() => {
        criarJanela();
    });

let caminhoArquivo = path.join(__dirname,'arquivo.json');

function escreverArq (conteudo){
    try{
        fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8')
    }catch(err){
        console.error(err)
    }
}

// Handlers para criar e consultar compromissos
ipcMain.handle('novo', async (event, compromisso) => {
  console.log('[main] novo chamado', compromisso);
  caminhoArquivo = path.join(__dirname, 'arquivo.json');
  if (!compromisso || typeof compromisso !== 'object') {
    throw new Error('Dados de compromisso inválidos');
  }
  try {
    let arr = [];
    if (fs.existsSync(caminhoArquivo)) {
      const txt = fs.readFileSync(caminhoArquivo, 'utf-8');
      if (txt) {
        try { arr = JSON.parse(txt); } catch (e) { arr = []; }
      }
    }
    if (!Array.isArray(arr)) arr = [];
    const novo = Object.assign({ id: Date.now() }, compromisso);
    arr.push(novo);
    fs.writeFileSync(caminhoArquivo, JSON.stringify(arr, null, 2), 'utf-8');
    return arr;
  } catch (err) {
    console.error('Erro ao gravar compromisso:', err);
    throw err;
  }
});

ipcMain.handle('consultar', async (event) => {
  console.log('[main] consultar chamado');
  try {
    if (fs.existsSync(caminhoArquivo)) {
      const txt = fs.readFileSync(caminhoArquivo, 'utf-8');
      if (!txt) return [];
      try {
        const arr = JSON.parse(txt);
        return Array.isArray(arr) ? arr : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  } catch (err) {
    console.error('Erro ao ler arquivo:', err);
    throw err;
  }
});



  



   // let menubar = null;
const template = [
  {
    label: "Arquivo",
    submenu: [
       {label: "Novo", click: () => criarJanela() },
        { label: "Novo Bloco de Notas", click: () => janela.webContents.send('novo-bloco-notas') },
        { type: "separator" },
        { label: "Abrir", click: () => { if (janela) janela.webContents.send('menu-abrir'); } },
        { label: "Salvar", click: () => { if (janela) janela.webContents.send('menu-salvar'); } },
        { label: "Salvar Como", click: () => { if (janela) janela.webContents.send('menu-salvar-como'); } },
        { type: "separator" },
        { label: "Sair", role: "quit" },

    ],
  },

 {
    label: "Editar",
    submenu: [
      { type: "separator" },
      { label: "Desfazer", role: "undo" },
      { label: "Refazer", role: "redo" },
      { label: "Recortar", role: "cut" },
      { label: "Copiar", role: "copy" },
      { label: "Colar", role: "paste" },
      { label: "Limpar", role: "delete" },
      { label: "Selecionar Tudo", role: "selectAll" },
    ],
  },
 
  {
    label: "Exibir",
    submenu: [
      {
        label: "Zoom",
        submenu: [
          { label:"MAIS ZOOM" , role: "zoomIn" },

    { label: "MENOS ZOOM", role: "zoomOut" },

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
        label: "Sobre",
        click: () => {
          if (janela) {
            dialog.showMessageBox(janela, {
              type: "info",
              title: "",
              message: `Projeto Tela de Login Versões: 
               \nApp: ${app.getVersion()}\nNode: ${process.versions.node}\nChrome: ${process.versions.chrome}\nElectron: ${process.versions.electron}`,

            });
          }
        },
      },
    ],
  },
];


Menu.setApplicationMenu(Menu.buildFromTemplate(template));

app.whenReady().then(() => { 
    new Notification({
        title: 'Electron',
        body: 'Electron inicializado...',
        silent: false
    }).show()
    dialog.showMessageBox({
        title: 'Electron',
        type: 'info',
        message: 'Electron inicializado...'
    })


})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

