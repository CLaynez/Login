const fs = require('fs');
const path = require('path');
const readline = require('readline');

class ScriptJson {
    
    constructor() {
        this.json = 'src\\assets\\i18n\\en.json';
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.searchedArray = [];
        this.finalJson = {};
    }

    openFiles() {
        // Pregunta al usuario la direccion
        this.rl.question('Insert the path you want to test: ', (path) => {
            try {
                // Comprueba si la direccion es válida
                const stats = fs.statSync(path);
                if (stats.isFile()) {
                    this.readFile(path);
                }
                else if (stats.isDirectory()) {
                    this.readDirectory(path);
                }

                // Lee el json de la variable
                try {
                    const jsonData = fs.readFileSync(this.json, 'utf8');
                    this.json = JSON.parse(jsonData);
                
                    this.searchForCoincidences();
                    this.closeInterface();
                } catch (error) {
                    console.error('Error reading or parsing JSON file:', error);
                    this.closeInterface();
                }
            } catch (e) {
                console.log('Error when reading file, check if you have insert a valid path');
                this.closeInterface();
            }            
        });
    }

    readFile(path){
        if (path.endsWith('.ts')) {
            this.readTypescript(path);
        } else if (path.endsWith('.html')) {
            this.readHtml(path);
        }
    }

    readDirectory(dirPath){
        try {
            const files = fs.readdirSync(dirPath);
    
            files.forEach((file) => {
                const filePath = path.join(dirPath, file);
                const stats = fs.statSync(filePath);
    
                if (stats.isDirectory()) {
                    this.readDirectory(filePath);
                } else if (stats.isFile()) {
                    this.readFile(filePath);
                }
            });
        } catch (error) {
            console.error('Error reading directory:', error);
        }
    }
    
    searchForCoincidences(){
        const coincidences = {};
        const noCoincidences = {};

        //Recursivamente busca las coincidencias y las añade
        this.fillArraysCoinc(this.json, coincidences, noCoincidences);
        
        //Crea coincidences.json
        this.createCoincidences(coincidences);
        
        //Crea noCoincidences.txt
        this.createNoCoincidences(noCoincidences);
    }

    fillArraysCoinc(json, coincidences, noCoincidences, path = ''){
        try{
            for (const key in json) {
                if (json.hasOwnProperty(key)) {
                    
                    // Construir la ruta completa
                    const fullPath = path ? `${path}.${key}` : key;

                    //Si es un objeto, entra otra vez al método
                    if (typeof json[key] === 'object' && json[key] !== null) {
                        this.fillArraysCoinc(json[key], coincidences, noCoincidences, fullPath);
                    }else{
                        // Verificar si la ruta completa coincide con algún elemento del array
                        const coinc = this.searchedArray.includes(fullPath);
            
                        // Si hay coincidencia, agregar al objeto de coincidencias, si no al otro
                        if (coinc) {
                            coincidences[fullPath] = json[key];
                        } else {
                            noCoincidences[fullPath] = json[key];
                        }
                    }
                }
            }
        }catch{
            console.log('Error looking for coincidences');
        }
    }

    createNoCoincidences(noCoincidences){

        // Cambia el tipo a txt
        const textContent = this.convertObjectToText(noCoincidences);

        // Nombre del fichero
        const outputFile = 'noCoincidences.txt';

        // Escribe en el fichero
        fs.writeFile(outputFile, textContent, 'utf8', (err) => {
            if (err) {
                console.error('Error generating the file', err);
            } else {
                console.log(`File '${outputFile}' created succesfully.`);
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

        // Convierte el objeto JSON al formato adecuado para el archivo
        const jsonData = JSON.stringify(coincidences, null, 2);

        // Escribe el contendio del archivo
        fs.writeFile(outputFile, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error generating the file');
            } else {
                console.log(`File '${outputFile}' created succesfully.`);
            }
        });
    }

    readTypescript(typePath){
        try {
            const data = fs.readFileSync(typePath, 'utf8');
        
            // Usa la expresion regular que filtra el html
            const regex = /this\.translate\.instant\(\s*'([^']+)'\s*\)/g;
            let match;
        
            // Añade cada coincidencia al array
            while ((match = regex.exec(data)) !== null) {
                const etiqueta = match[1];
                this.searchedArray.push(etiqueta);
            }
        
            if (this.searchedArray.length > 0) {
                // Quita los duplicados del array
                const uniqueArray = [...new Set(this.searchedArray)];
                this.searchedArray.push(...uniqueArray);
            }
        } catch (error) {
            console.error('Error reading the file or processing data:', error);
            this.closeInterface();
        }        
    }

    readHtml(htmlPath){
        try {
            const data = fs.readFileSync(htmlPath, 'utf8');
        
            // Usa la expresion regular para filtrar en el ts
            const regex = /{{\s*'([^']+)'\s*\|\s*translate\s*}}/g;
            let match;
        
            // Añade los encontrados al array
            while ((match = regex.exec(data)) !== null) {
                const label = match[1];
                this.searchedArray.push(label);
            }
        
            if (this.searchedArray.length > 0) {
                // Quita los duplicados
                this.searchedArray.filter((item, index) => {
                    return this.searchedArray.indexOf(item) === index;
                });
            }
        } catch (error) {
            console.error('Error reading the file or processing data:');
        }
        
    }

    closeInterface() {
        this.rl.close();
    }
}

// Instancia y ejecuta la script
const script = new ScriptJson();
script.openFiles();

// Cierra la script una vez termina
process.on('SIGINT', () => {
    script.closeInterface();
    process.exit();
});
