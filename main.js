import { Control } from "./control/control.js";
import { Vista } from "./vista/Vista.js";
import { Serie } from "./modelo/serie.js";



const view = new Vista();
const controller = new Control(view);

function paginaSiguiente(){

}
    

function paginaAnterior(){
    
}   
    
    




/*const path = window.location.pathname;

if (path.includes("index.html") || path.endsWith("/")) {
    new Control(); // Página de inicio

} else if (path.includes("guardados.html")) {
    const vista = new Vista();
    const guardadas = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

    const series = guardadas.map(s => new Serie(s.id, s.url, s.name, s.language, s.genres, s.image));
    vista.mostrarSeries(series);
}*/ 