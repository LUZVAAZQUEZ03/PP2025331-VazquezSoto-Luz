import { Serie } from "../modelo/serie.js"

const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const btnGuardar = document.getElementById("series")

export class Control {
    constructor(vista) {
        this.vista = vista;
        this.pagina = 1;
        this.series = []; //vacío la lista para poder eliminar las peliculas ya cargadas
        this.cargarSeries();
        btnSiguiente.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("siguiente")
            this.series = [];
            this.pagina++;
            this.cargarSeries();
        });
        
        btnAnterior.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("anterior")
            if (this.pagina > 1) {
                this.series = []; //vacío la lista para poder eliminar las peliculas ya cargadas
                this.pagina--;
                this.cargarSeries();
            }
        });
        btnGuardar.addEventListener("click", (e) => {
            if (e.target && e.target.matches(".btn-guardar-serie")) {
                const idSerie = parseInt(e.target.dataset.id);
                const serie = series.find(s => s.id === idSerie);
                Serie.guardarSerie(serie);
                console.log("series guardada" +serie)
            }
        });


    }

    cargarSeries() {
        const inicio = (this.pagina - 1) * 6 + 1;
        const fin = inicio + 5;
        const vista = this.vista;

        this.vista.mostrarSeries(this.series); 


        //estoy haciendo una funcion recursiva  
        const cargarUna = (i) => {
            if (i > fin) {
                this.vista.mostrarSeries(this.series); 
                return;
            }

            fetch(`https://api.tvmaze.com/shows/${i}`)//abro la api y le paso el indice de cada pelicula que quiero que me muestre
                .then(resp => resp.json())//paso la response a json 
                .then(data => {
                    console.log("hola desde then")
                    const serie = new Serie( //instancio una nueva serie en cada vez que se llama a a "cargar una" funcion recursiva
                        data.id,
                        data.officialSite || data.url,
                        data.name,
                        data.language,
                        data.genres,
                        data.image?.medium || "https://via.placeholder.com/210x295?text=Sin+Imagen"
                    
                    );
                    this.series.push(serie); //agrego la nueva series instanciada a una lista local de series 
                    cargarUna(i + 1); //hago un +1 para que la recursiviad no sea eterna 
                })
                .catch(err => {
                    console.error("Error al cargar:", err);
                    cargarUna(i + 1); //hago un +1 para que la recursiviad no sea eterna 
                });
        };

        cargarUna(inicio);
    }

    
}

