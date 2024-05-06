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
        // Ask the user to introduce the path
        this.rl.question('Insert the file path you want to test: ', (respuesta) => {
            // Open the path introduced by the user
            try {
                //Hay que insertar un directorio y entrar en los archivos internos
                if (fs.existsSync(respuesta)) {
                    // Verify the file type
                    if (respuesta.endsWith('.ts')) {
                        this.readTypescript(respuesta);
                    } else if (respuesta.endsWith('.html')) {
                        this.readHtml(respuesta);
                    } else {
                        console.log('File must be either HTML or TypeScript (.html or .ts)');
                        this.closeInterface();
                        return;
                    }
            
                    // Read en.json
                    fs.readFile(this.languageJson, 'utf8', (error, data) => {
                        if (error) {
                            console.error('Error reading JSON file:');
                            this.closeInterface();
                            return;
                        }
        
                        // Analyze JSON content
                        this.languageJson = JSON.parse(data);
                        console.log(this.languageJson);
        
                        // Call for coincidences to create both files
                        this.searchForCoincidences();
                        this.closeInterface();
                    });
                    
                } else {
                    console.log('File doesn`t exists');
                    this.closeInterface();
                }
            } catch (e) {
                console.log('Error when reading file, check if you have insert a valid path');
                this.closeInterface();
            }            
        });
    }
    
    searchForCoincidences(){
        const coincidences = {};
        const noCoincidences = {};

        try{
            // Run every key in the JSON file and fill both json
            for(const key in this.languageJson){
                const coinc = this.searchedArray.includes(key);

                if (coinc) {
                    coincidences[key] = this.languageJson[key];
                } else {
                    noCoincidences[key] = this.languageJson[key];
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
        // Changing the content type to txt
        const textContent = this.convertObjectToText(noCoincidences);

        // File`s name
        const outputFile = 'noCoincidences.txt';

        // Writing the new file
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

        // Converting JSON object to a formated JSON string
        const jsonData = JSON.stringify(coincidences, null, 2);

        // Write file content
        fs.writeFile(outputFile, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error generating the file');
            } else {
                console.log(`File '${outputFile}' created succesfully.`);
            }
        });
    }

    readTypescript(respuesta){
        fs.readFile(respuesta, 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading the file:');
            } else {
                // Use a regular expression to find occurrences of this.translate.instant('')
                const regex = /this\.translate\.instant\(\s*'([^']+)'\s*\)/g;
                let match;
                const searchedArray = [];
    
                // Find every match in the file
                while ((match = regex.exec(data)) !== null) {
                    const etiqueta = match[1];
                    searchedArray.push(etiqueta);
                }
    
                if (searchedArray.length > 0) {
                    // Remove duplicates from the array
                    const uniqueArray = [...new Set(searchedArray)];
                    console.log('Found labels:', uniqueArray);
                } else {
                    console.log('No labels found.');
                    this.closeInterface();
                    return;
                }
            }
        });
    }

    readHtml(respuesta){
        fs.readFile(respuesta, 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading the file:');
            } else {
                // Use a regular expresion to find the label
                const regex = /{{\s*'([^']+)'\s*\|\s*translate\s*}}/g;
                let match;

                // Find every label in the file
                while ((match = regex.exec(data)) !== null) {
                    const etiqueta = match[1];
                    this.searchedArray.push(etiqueta);
                }

                if (this.searchedArray.length > 0) {
                    //Delete duplicates
                    this.searchedArray = this.searchedArray.filter((item,index)=>{
                        return this.searchedArray.indexOf(item) === index;
                    })
                    
                } else {
                    console.log('No labels found');
                }
            }
        });
    }

    closeInterface() {
        this.rl.close();
    }
}

// Instance and run the script
const script = new ScriptJson();
script.openFiles();

// Manage interface closing when finishing
process.on('SIGINT', () => {
    script.closeInterface();
    process.exit();
});
