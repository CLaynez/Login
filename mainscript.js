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
        this.rl.question('Insert the file path you want to test: ', (path) => {
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
                    console.log(this.json);
                
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

        try{
            console.log(this.searchedArray);
            for(const key in this.json){
                const coinc = this.searchedArray.includes(key);

                if (coinc) {
                    coincidences[key] = this.json[key];
                } else {
                    noCoincidences[key] = this.json[key];
                }
            }
        }catch{
            console.log('Error looking for coincidences');
        }
        
        //Some testing here
        console.log(coincidences);
        console.log(noCoincidences);

        //Create coincidences.json
        this.createCoincidences(coincidences);
        
        //Create noCoincidences.txt
        this.createNoCoincidences(noCoincidences);
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
                console.log(this.searchedArray);
            }
        
            if (this.searchedArray.length > 0) {
                // Quita los duplicados
                this.searchedArray.filter((item, index) => {
                    return this.searchedArray.indexOf(item) === index;
                });
            }
        } catch (error) {
            console.error('Error reading the file or processing data:', error);
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
