import axios from "axios";

import {appendLogIps} from './manejadorArchivos.js';

const procesarDataAxios = sRespuesta => {

    const rgxTop = /## IP address.*/g;
    const rgxBot = /(.*)The Zoom Webhook/g;
    const rgxSlice = /```(.*)```/g;

    sRespuesta = rgxTop.exec(sRespuesta)[0];
    sRespuesta = rgxBot.exec(sRespuesta)[0];
    sRespuesta = rgxSlice.exec(sRespuesta)[0];

    let aRespuesta = sRespuesta.split("\\n");

    aRespuesta = aRespuesta.filter( e => e != "```");

    return aRespuesta;
}

export const obtenerIpsZoom = url => axios.get(url)
    .then( response => procesarDataAxios(response.data))
    .catch( error   => {
        const rLog = process.env.RUTA_ERRORES;
        const sContenido = `Error al Obtener datos: ${error}`;
        console.log("\n" + sContenido);
        appendLogIps(rLog, sContenido);
    });
    
export const compararIps = ( aIpsZoom, aIpsRespaldo ) => {

    console.log("\n*** Proceso de Comparación ***");
    const aIpsRespNoEnc = aIpsRespaldo.filter((ipRespaldo) => {
        const encontrado = aIpsZoom.find((ipZoom) => ipZoom == ipRespaldo);

        if (encontrado === undefined) return true;
    });

    console.log("\nIp antigua no encontrada:");
    if (aIpsRespNoEnc.length != 0) {
      console.table(aIpsRespNoEnc);
    } else {
        console.log("  - Se encontraron todas las Ips del respaldo.");
    }

    const aIpsZoomNoEnc = aIpsZoom.filter( ipZoom => {
        const encontrado = aIpsRespaldo.find( ipRespaldo => ipZoom == ipRespaldo);

        if (encontrado === undefined) return true;
    });

    console.log("\nIps Nuevas:");
    if (aIpsZoomNoEnc.length != 0) {
        console.table(aIpsZoomNoEnc);
    } else {
        console.log("  - No se encontraron Ips nuevas.");
    }
};

