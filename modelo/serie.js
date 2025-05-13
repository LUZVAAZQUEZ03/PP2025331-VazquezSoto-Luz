
export class Serie{
    constructor(id,url,name, language, genres, image){
        this.id = id;        
        this.url = url;        
        this.name = name;        
        this.language = language;        
        this.genres = genres;        
        this.image = image;        
    }

    toJsonString(){
        return JSON.stringify({
            id: this.id,
            url: this.url,
            name: this.name,
            language: this.language,
            genres: this.genres,
            image: this.image
        });
    }


    createFromJsonString(json){
        const data = JSON.parse(json);
        return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image);
    }

    createHtmlElement() {
        const card = document.createElement("div");
        card.classList.add("serie-card");

        card.innerHTML = `
            <h3>${this.name}</h3>
            <p><strong>Idioma:</strong> ${this.language}</p>
            <p><strong>Géneros:</strong> ${this.genres.join(", ")}</p>
            <img src="${this.image}" alt="${this.name}" style="cursor:pointer" />
            <br>
            <button class="btn-guardar">Guardar</button>
        `;

        card.querySelector("img").addEventListener("click", () => {
            window.open(this.url, "_blank");
        });

        card.querySelector(".btn-guardar").addEventListener("click", () => {
            Serie.guardarSerie(this);
            alert("Serie guardada correctamente.");
        });

        return card;
    
    }

    static guardarSerie(serie) {
        let guardadas = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];
        guardadas.push(serie);
        localStorage.setItem("seriesGuardadas", JSON.stringify(guardadas));
    }

}