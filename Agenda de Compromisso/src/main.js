import { app, BrowserWindow, nativeTheme, ipcMain, dialog, Menu, Notification } from 'electron';
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
      if (template && janela) Menu.buildFromTemplate(template).popup({ window: janela });
    });
    
}

// Caminho do arquivo JSON (arquivo no diretório src)
const compromissosPath = path.join(__dirname, 'compromissos.json');
console.log('compromissosPath:', compromissosPath);

function lerCompromissos() {
  try {
    if (fs.existsSync(compromissosPath)) {
      const data = fs.readFileSync(compromissosPath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (err) {
    return [];
  }
}

let compromissos = lerCompromissos();

function salvarCompromissos(compromissosList) {
  try {
    fs.writeFileSync(compromissosPath, JSON.stringify(compromissosList, null, 2), 'utf8');
  } catch (err) {
    // intentionally silent per user preference
  }
}

// Handlers IPC registrados antes de criar a janela
ipcMain.handle('salvarCompromisso', async (event, compromisso) => {
  if (!compromisso || !compromisso.titulo || !compromisso.titulo.trim()) {
    return { success: false, message: 'Título obrigatório.' };
  }

  compromisso.titulo = compromisso.titulo.trim();
  compromisso.data = (compromisso.data || '').trim();
  compromisso.hora = (compromisso.hora || '').trim();
  compromisso.descricao = (compromisso.descricao || '').trim();

  compromisso.id = compromisso.id || Date.now();
  const idx = compromissos.findIndex(c => c.id === compromisso.id);
  if (idx >= 0) compromissos[idx] = compromisso; else compromissos.push(compromisso);

  salvarCompromissos(compromissos);
  return { success: true, message: 'Compromisso salvo com sucesso!', compromisso };
});

ipcMain.handle('consultarCompromissos', async () => {
  return JSON.parse(JSON.stringify(compromissos || []));
});



ipcMain.handle('removerCompromisso', async (event, id) => {
  const before = compromissos.length;
  compromissos = compromissos.filter(c => c.id !== id);
  if (compromissos.length !== before) {
    salvarCompromissos(compromissos);
    return { success: true };
  }
  return { success: false, message: 'Id não encontrado.' };
});

const template = [
 {
    label: "Arquivo",
    submenu: [
        {
            label: "Novo compromisso",
            onclick: "location.href='novocompromisso.html'" 
        }, 
        { 
            type: "separator" 
        },
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
              message: `AGENDA DE COMPROMISSO\nVersão: ${app.getVersion()}\nNode: ${process.versions.node}\nChrome: ${process.versions.chrome}\nElectron: ${process.versions.electron}`,

            });
          }
        },
      },
    ],
  },
];


function verificarCompromissos() {
    const hoje = new Date();
 
    const hojeString = `${hoje.getFullYear()}-${(hoje.getMonth() + 1).toString().padStart(2, '0')}-${hoje.getDate().toString().padStart(2, '0')}`;

    const compromissosDeHoje = compromissos.filter(c => {
      
        return c.data === hojeString;
    });

    if (compromissosDeHoje.length > 0) {
        let mensagem = `Você tem ${compromissosDeHoje.length} compromisso(s) para **hoje**, ${hojeString}:\n\n`;

        compromissosDeHoje.forEach(c => {
            mensagem += `**${c.titulo}** às ${c.hora || 'Hora não especificada'}\n`;
        });

      
        if (janela) {
            dialog.showMessageBox(janela, {
                type: 'warning',
                title: 'Lembrete de Compromisso',
                message: mensagem,
                detail: 'Não se esqueça dos seus compromissos agendados para este dia!',
            });
        }
    }
}


app.whenReady().then(() => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    criarJanela();

    verificarCompromissos(); 
    
    new Notification({
        title: 'Electron',
        body: 'Electron inicializado...',
        silent: false
    }).show();

    // if (janela) {
    //   dialog.showMessageBox(janela, {
    //       title: 'Electron',
    //       type: 'info',
    //       message: 'Electron inicializado...'
    //   });
    // } else {
    //   dialog.showMessageBox({
    //       title: 'Electron',
    //       type: 'info',
    //       message: 'Electron inicializado...'
    //   });
    }
  )