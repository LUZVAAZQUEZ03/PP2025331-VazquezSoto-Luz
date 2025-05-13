import { Serie } from "../modelo/serie.js"

const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const btnGuardar = document.getElementById("series")
const guardadas = document.getElementById("mostrarGuardadas")

export class Control {
    constructor(vista) {
        this.vista = vista;
        this.pagina = 1;
        this.series = [];
        this.cargarSeries();
        btnSiguiente.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("siguiente")
            this.pagina++;
            this.cargarSeries();
        });
        
        btnAnterior.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("anterior")
            if (this.pagina > 1) {
                this.pagina--;
                this.cargarSeries();
            }
        });
        btnGuardar.addEventListener("click", (e) => {
            if (e.target && e.target.matches(".btn-guardar-serie")) {
                const idSerie = parseInt(e.target.dataset.id);
                const serie = series.find(s => s.id === idSerie);
                Serie.guardarSerie(serie);
                console.log("series guardadsa" +serie)
            }
        });
        guardadas.addEventListener("click",(e)=>{
            e.preventDefault()
            this.cargarSeriesGuardadas();
        })

    }

    cargarSeries() {
        const inicio = (this.pagina - 1) * 6 + 1;
        const fin = inicio + 5;
        const vista = this.vista;

        this.vista.mostrarSeries(this.series); 

        const cargarUna = (i) => {
            if (i > fin) {
                vista.mostrarSeries(this.series); 
                return;
            }

            fetch(`https://api.tvmaze.com/shows/${i}`)
                .then(resp => resp.json())
                .then(data => {
                    console.log("hola desde then")
                    const serie = new Serie(
                        data.id,
                        data.officialSite || data.url,
                        data.name,
                        data.language,
                        data.genres,
                        data.image?.medium || "https://via.placeholder.com/210x295?text=Sin+Imagen"
                    
                    );
                    this.series.push(serie);
                    cargarUna(i + 1); 
                })
                .catch(err => {
                    console.error("Error al cargar:", err);
                    cargarUna(i + 1); 
                });
        };

        cargarUna(inicio);
    }

    cargarSeriesGuardadas() {
        const contenedor2 = document.getElementById("mostrarGuardadas");
        contenedor2.innerHTML = " ";

        const data = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

        this.series = data.map(s => new Serie(
            s.id,
            s.url,
            s.name,
            s.language,
            s.genres,
            s.image
        ));

        this.series.forEach(s => {
            this.contenedor2.appendChild(s.createHtmlElement());
        });
    }

    ordenarPorNombre() {
        series.sort((a, b) => a.name.localeCompare(b.name));
        mostrarOrdenadas();
    }
}

