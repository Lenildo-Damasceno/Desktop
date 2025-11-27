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

 let caminhoArquivo = path.join(__dirname,'arquivo.txt')

function escreverArq (conteudo){
    try{
        fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8') // escreve no aquivo
    }catch(err){
        console.error(err)
    }
}
// leitura de arquivo
async function lerArq(){
    let {canceled, filePaths} = await dialog.showOpenDialog({
        title: 'Abrir caminhoArquivo',
        defaultPath: 'caminhoArquivo.txt',
        filters: [{name: 'Texto', extensions: ['txt', 'doc']}],
        properties: ['openFile']
    })
    if(canceled){
        return
    }
    caminhoArquivo = filePaths[0]
    try {
        let conteudo = fs.readFileSync(caminhoArquivo, 'utf-8')
        return conteudo
    } catch (err) {
        console.error(err)
    }  
}

  


ipcMain.handle('salvar-arq', (event, texto) =>{
  
    escreverArq(texto)    
    return caminhoArquivo
})

ipcMain.handle('abrir-arq', (event) =>{
    let conteudo = lerArq()
    return conteudo
})

ipcMain.handle('salvarComo-arq', (event, texto) => {
   dialog.showSaveDialog({
        title: 'Salvar como',
        defaultPath: 'caminhoArquivo',
        filters: [{name: 'Texto', extensions: ['txt', 'doc']}]
    }).then((resultado) => {
        if(resultado.canceled) return
        caminhoArquivo = resultado.filePath
        escreverArq(texto)        
    })
    return caminhoArquivo     
})

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
              title: "BLOCO DE NOTAS",
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
    criarJanela()

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

