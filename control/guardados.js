import { Serie } from "../modelo/serie.js";


const pornombre = document.getElementById("ordenar_nombre")
const porIdioma = document.getElementById("ordenar_lenguaje")

let series =[];

export function cargarSeriesGuardadas() {
    const contenedor2 = document.getElementById("mostrarGuardadas");
    contenedor2.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

    console.log("series guardaradass    -....\n"  +data)

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
}

cargarSeriesGuardadas()


pornombre.addEventListener("click",(e)=>{
    e.preventDefault()
    ordenarPorNombre()
    console.log("oredenadas x nombre")
})
porIdioma.addEventListener("click",(e)=>{
    e.preventDefault()
    ordenarPorIdioma()
    console.log("oredenadas x idioma")
})

function ordenarPorNombre() {
    series.sort((a, b) => a.name.localeCompare(b.name));
    mostrarOrdenadas();
}

function ordenarPorIdioma() {
    series.sort((a, b) => a.language.localeCompare(b.language));
    mostrarOrdenadas();
}

function mostrarOrdenadas() {
    const contenedor = document.getElementById("mostrarGuardadas");
    contenedor.innerHTML = "";
    series.forEach(s => 
        contenedor.appendChild(s.createHtmlElement()));
}