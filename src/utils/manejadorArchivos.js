import fs from "fs";
import path from "path";
import moment from "moment";

export const appendLogIps = (ruta, sContenido) => {

    let sAhora = moment().format("YYYYMMDD_hhmmss");

    let contenidoLog = "";
    contenidoLog += sAhora + ";" + sContenido + "\n";

    const logRutaCompleta = path.join(ruta, sAhora.slice(0, 8) + ".log");

    
    fs.appendFile(logRutaCompleta, contenidoLog, (err) => {
        if (err) throw err;
        console.log(`\n${sAhora} Archivo creado en: ${ruta}.\n`);
    });
};

export const crearDirectorio = aDirectorios => {
    aDirectorios.map( directorio => {
        const rutaDirectorio = path.join("src", directorio);
        if (!fs.existsSync(rutaDirectorio)) {
            fs.mkdirSync(rutaDirectorio);
        }
    });
};