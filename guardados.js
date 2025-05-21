import {Serie} from "./modelo/serie.js"


const contenedor2 = document.getElementById("mostrarGuardadas")
const btnOrdenPorNombre = document.getElementById("ordenarNombre")
const btnOrdenPorIdioma= document.getElementById("ordenarLenguaje")

let series = [];
class cargarSeriesGuardadas {
    constructor() {
        const contenedor2 = document.getElementById("mostrarGuardadas");
        contenedor2.innerHTML = " ";

        const data = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

        series = data.map(s => new Serie(
            s.id,
            s.url,
            s.name,
            s.language,
            s.genres,
            s.image
        ));

        series.forEach(s => {
            contenedor2.appendChild(s.createHtmlElement());
        });

        btnOrdenPorNombre.addEventListener("click",(e)=>{
            e.preventDefault();
            console.log("clickkkkk nomre")
            this.ordenarPorNombre();
        })
        btnOrdenPorIdioma.addEventListener("click",(e)=>{
            e.preventDefault();
            console.log("clickkkkk idioma")
            this.ordenarPorIdioma();
        })
    
    }

   
        
    ordenarPorNombre() {
        series.sort((a, b) => a.name.localeCompare(b.name));
        this.mostrarOrdenadas();
    }
    
        
    ordenarPorIdioma() {
        series.sort((a, b) => a.language.localeCompare(b.language));
        this.mostrarOrdenadas();
    }
    
    mostrarOrdenadas() {
        const contenedor = document.getElementById("mostrarGuardadas");
        contenedor.innerHTML = "";
        series.forEach(s => contenedor.appendChild(s.createHtmlElement()));
    }
}


new cargarSeriesGuardadas() 