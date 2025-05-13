export class Vista {
    constructor() {
        this.contenedor = document.getElementById("series");
    }

    mostrarSeries(series) {
        this.contenedor.innerHTML = "";
        series.forEach(serie => {
            const elemento = serie.createHtmlElement();
            this.contenedor.appendChild(elemento);
        });
    }

    
}