const fs = require('fs');
const readline = require('readline');

class ScriptJson {
    
    constructor() {
        this.jsonDiccPath = 'ejemploDicc.json';
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    abrirArchivos() {
        // Pedir al usuario que ingrese la ruta del archivo
        this.rl.question('Inserte la ruta del archivo que desea abrir: ', (respuesta) => {
            // Abrir archivo ingresado por el usuario
            try{
                if (fs.existsSync(respuesta)) {
                    // Verificar la extensión del archivo
                    if (respuesta.endsWith('.ts')){
                        this.leerJavaScript(respuesta);
                    }else if(respuesta.endsWith('.html')) {
                        this.leerHtml(respuesta);
                    } else {
                        console.log('El archivo debe ser HTML o JavaScript (.js)');
                        this.cerrarInterfaz();
                    }
                } else {
                    console.log('El archivo no existe.');
                    this.cerrarInterfaz();
                }
            // Abrir archivo ejemploDicc.json
            fs.readFile(this.jsonDiccPath, 'utf8', (error, data) => {
                if (error) {
                    console.error('Error al leer el archivo JSON:', error);
                } else {
                    try {
                        // Analizar el contenido JSON
                        const jsonData = JSON.parse(data);
            
                        // Llamar a la función recursiva para leer todos los hijos del objeto JSON
                        //console.log('Contenido del archivo JSON:');
                        this.leerJson(jsonData);
                        this.cerrarInterfaz();
                    } catch (error) {
                        console.error('Error al procesar el contenido JSON:', error);
                    }
                }
            });
            }catch{
                console.log('No se encontró el archivo');
            }finally{
                this.cerrarInterfaz();
            }
        });
    }

    leerJavaScript(respuesta){
        fs.readFile(respuesta, 'utf8', (error, data) => {
            if (error) {
                console.error('Error al leer el archivo:', error);
            } else {
                console.log('Contenido del archivo:');
                console.log(data);
            }
        });
    }

    leerHtml(respuesta){
        fs.readFile(respuesta, 'utf8', (error, data) => {
            if (error) {
                console.error('Error al leer el archivo:', error);
            } else {
                // Utilizar expresión regular para encontrar la etiqueta
                const regex = /{{\s*'([^']+)'\s*\|\s*translate\s*}}/g;
                let match;
                const etiquetas = [];

                // Buscar todas las etiquetas en el contenido del archivo
                while ((match = regex.exec(data)) !== null) {
                    const etiqueta = match[1]; // Obtener el texto entre comillas simples
                    etiquetas.push(etiqueta);
                }

                // Mostrar las etiquetas encontradas
                if (etiquetas.length > 0) {
                    console.log('Etiquetas encontradas:');
                    etiquetas.forEach((etiqueta) => {
                        console.log(etiqueta);
                    });
                } else {
                    console.log('No se encontraron etiquetas.');
                }
            }
        });
    }

    cerrarInterfaz() {
        this.rl.close();
    }

    leerJson(objeto, padre = '', nivel = 0){
        for (const clave in objeto) {
            if (objeto.hasOwnProperty(clave)) {
                const valor = objeto[clave];
    
                // Imprimir la propiedad con indentación según el nivel de profundidad
                console.log(`${padre}.${clave}:`);
    
                // Si el valor es un objeto (es decir, tiene propiedades), llamar recursivamente
                if (typeof valor === 'object' && valor !== null) {
                    this.leerJson(valor, clave, nivel + 1); // Llamada recursiva con nivel incrementado
                } else {
                    // Si el valor no es un objeto, imprimir el valor
                    //console.log(clave);
                }
            }
        }
    }
}

// Instancia y ejecuta el script
const script = new ScriptJson();
script.abrirArchivos();

// Manejar cierre de la interfaz readline al salir
process.on('SIGINT', () => {
    script.cerrarInterfaz();
    process.exit();
});
