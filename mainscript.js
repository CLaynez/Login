const fs = require('fs');
const readline = require('readline');

class ScriptJson {
    
    constructor() {
        this.languageJson = 'src\\assets\\i18n\\en.json';
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.searchedArray = [];
        this.finalJson = {};
    }

    openFiles() {
        // Pedir al usuario que ingrese la ruta del archivo
        this.rl.question('Inserte la ruta del archivo que desea abrir: ', (respuesta) => {
            // Abrir archivo ingresado por el usuario
            try {
                //Hay que insertar un directorio y entrar en los archivos internos
                if (fs.existsSync(respuesta)) {
                    // Verificar la extensión del archivo
                    if (respuesta.endsWith('.ts')) {
                        this.readJavascript(respuesta);
                    } else if (respuesta.endsWith('.html')) {
                        this.readHtml(respuesta);
                    } else {
                        console.log('El archivo debe ser HTML o TypeScript (.html o .ts)');
                        this.closeInterface();
                        return;
                    }
            
                    // Leer archivo en.json
                    fs.readFile(this.languageJson, 'utf8', (error, data) => {
                        if (error) {
                            console.error('Error al leer el archivo JSON:', error);
                            this.closeInterface();
                            return;
                        }
        
                        // Analizar el contenido JSON
                        this.languageJson = JSON.parse(data);
                        console.log(this.languageJson);
        
                        // Llamar a la función para buscar coincidencias después de ambas lecturas
                        this.searchForCoincidences();
        
                        // Cerrar la interfaz después de completar todas las operaciones
                        this.closeInterface();
                    });
                    
                } else {
                    console.log('El archivo no existe.');
                    this.closeInterface();
                }
            } catch (e) {
                console.log('Error:', e);
                this.closeInterface();
            }            
        });
    }
    
    searchForCoincidences(){
        const coincidences = {};
        const noCoincidences = {};

        // Recorrer cada elemento del primer array
        for(const key in this.languageJson){
            const coincidencia = this.searchedArray.includes(key);

            if (coincidencia) {
                coincidences[key] = this.languageJson[key];
            } else {
                noCoincidences[key] = this.languageJson[key];
            }
        }
        
        console.log(coincidences);
        console.log(noCoincidences);

        //Create coincidences.json
        this.createCoincidences(coincidences);
        
        //Create noCoincidences.txt
        this.createNoCoincidences(noCoincidences);
    }

    createNoCoincidences(noCoincidences){
        // Nombre del archivo de salida
        const textContent = this.convertObjectToText(noCoincidences);

        // Nombre del archivo de salida
        const outputFile = 'noCoincidences.txt';

        // Escribir el contenido en el archivo de texto
        fs.writeFile(outputFile, textContent, 'utf8', (err) => {
            if (err) {
                console.error('Error al escribir el archivo de texto:', err);
            } else {
                console.log(`Archivo '${outputFile}' creado con éxito.`);
            }
        });
    }

    convertObjectToText(obj) {
        let text = '';
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                text += `${key}: ${obj[key]}\n`;
            }
        }
        return text;
    }

    createCoincidences(coincidences) {
        const outputFile = 'coincidences.json';

        // Convertir el objeto JSON a una cadena JSON formateada
        const jsonData = JSON.stringify(coincidences, null, 2);

        // Escribir el contenido en el archivo
        fs.writeFile(outputFile, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
            } else {
                console.log(`Archivo '${outputFile}' creado con éxito.`);
            }
        });
    }

    readJavascript(respuesta){
        fs.readFile(respuesta, 'utf8', (error, data) => {
            if (error) {
                console.error('Error al leer el archivo:', error);
            } else {
                console.log('Contenido del archivo:');
                console.log(data);
            }
        });
    }

    readHtml(respuesta){
        fs.readFile(respuesta, 'utf8', (error, data) => {
            if (error) {
                console.error('Error al leer el archivo:', error);
            } else {
                // Utilizar expresión regular para encontrar la etiqueta
                const regex = /{{\s*'([^']+)'\s*\|\s*translate\s*}}/g;
                let match;

                // Buscar todas las etiquetas en el contenido del archivo
                while ((match = regex.exec(data)) !== null) {
                    const etiqueta = match[1]; // Obtener el texto entre comillas simples
                    this.searchedArray.push(etiqueta);
                }

                if (this.searchedArray.length > 0) {
                    //Quitar duplicados
                    this.searchedArray = this.searchedArray.filter((item,index)=>{
                        return this.searchedArray.indexOf(item) === index;
                    })
                    
                } else {
                    console.log('No se encontraron etiquetas.');
                }
            }
        });
    }

    closeInterface() {
        this.rl.close();
    }
}

// Instancia y ejecuta el script
const script = new ScriptJson();
script.openFiles();

// Manejar cierre de la interfaz readline al salir
process.on('SIGINT', () => {
    script.closeInterface();
    process.exit();
});
