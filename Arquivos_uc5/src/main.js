import { app, BrowserWindow, nativeTheme, ipcMain, dialog , Menu} from 'electron';
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
// let menubar = null;
const template = [
  {
    label: "Arquivo",
    submenu: [
       {label: "Novo", click: () => criarJanela() },
        { label: "Novo Bloco de Notas", click: () => janela.webContents.send('novo-bloco-notas') },
        { type: "separator" },
        { label: "Abrir", click: () => abrirArquivo() },
        { label: "Salvar", click: () => salvarArquivo() },
        { label: "Salvar Como", click: () => salvarComoNota() },
        { type: "separator" },
        { label: "Sair", role: "quit" },

    ],
  },

 {
    label: "Editar",
    submenu: [
      { label: "Novo Bloco de Notas", click: () => criarJanela() },
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
    label: "Navegação",
    submenu: [
      { label:"⬅️" , click: () => janela.loadFile('login.html') },
      { label: "➡️", click: () => janela.loadFile('cadastro.html') },

  ]
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
              title: "Tela de Login",
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

app.whenReady()
    .then(() => {
        criarJanela();
    });

// escrita de arquivo
const arquivoPadrao = path.join(__dirname, 'arquivo.txt');


function escreverArq (conteudo, destino = arquivoPadrao) {
 try {
        if (typeof conteudo === 'undefined') {
            console.log('escreverArq: conteúdo indefinido, nada escrito.');
            return;
        }
        fs.writeFileSync(destino, String(conteudo), 'utf-8');
        console.log('Arquivo escrito com sucesso em', destino);

    } catch (err) {
        console.log('Erro ao escrever o arquivo:', err);
        throw err;
    }
}
// leitura de arquivo
  async function lerArq() {
    let resultado = await dialog.showOpenDialog({
        title: 'abrir arquivo',
        defaultPath: arquivoPadrao,
        filters: [
            { name: 'Text Files', extensions: ['txt', 'doc'] }
        ],
        properties: ['openFile']
    });
    if (resultado.canceled) {
        console.log('Abertura de arquivo cancelada');
        return null;
    }
    const selecionado = resultado.filePaths[0];
    try{
        let conteudo = fs.readFileSync(selecionado, 'utf-8');
        console.log('Conteúdo do arquivo:', selecionado);
        return conteudo;
    } catch (err) {
        console.log('Erro ao ler o arquivo:', err);
        throw err;
    }
    }







// IPC handlers 
//ler
ipcMain.handle('ler-arquivo', async (event) => {
    try {
        const conteudo = await lerArq();
        return conteudo;
    } catch (err) {
        console.log('Erro ao ler o arquivo:', err);
        throw err;
    }
});
//escrever
ipcMain.handle('escrever-arquivo', async (event, texto, destino) => {
    try {
        escreverArq(texto, destino);
        return true;
    } catch (err) {
        console.log('Erro ao escrever o arquivo:', err);
        throw err;
    }
});
//salvar como nota
ipcMain.handle('salvar-como-nota', async (event, texto) => {
    try {
        salvarComoNota(texto);
        return true;
    } catch (err) {
        console.log('Erro ao salvar como Nota:', err);
        throw err;
    }
});




