import dotenv from "dotenv";

import { obtenerIpsZoom, compararIps } from "./utils/manejadorIps.js";
import { appendLogIps, crearDirectorio } from "./utils/manejadorArchivos.js";

dotenv.config();

const rLog = process.env.RUTA_LOG;
const sUrl = process.env.URL_ZOOM;
const aDirectorios = ["logs", "errors"];

const aUltimasIpsZoom = [
  "3.80.20.128/25",
  "3.235.82.0/23",
  "18.205.93.128/25",
  "52.61.100.253",
  "52.61.100.254",
  "134.224.0.0/16",
  "144.195.0.0/16",
  "170.114.0.0/16",
];

const main = () => {
    // Crear directorio si no existen al inicializar
    crearDirectorio(aDirectorios);

    // Mostrar Ips de Respaldo
    console.log("------- Ultimas Ips Zoom -------");
    console.table(aUltimasIpsZoom);

    // Obtener Ips actualizadas desde Doc Zoom Developers
    const aIpsZoom = obtenerIpsZoom(sUrl);

    // Comparar Ips actualizadas vs respaldo
    aIpsZoom.then(aIpsZoom => {

        if (aIpsZoom === undefined) return;
        
        compararIps(aIpsZoom, aUltimasIpsZoom);
        const sContenido =  aIpsZoom + ";" + aUltimasIpsZoom;
        appendLogIps(rLog, sContenido);
    });
};

main();
