export function cargafotos(texto) {
    fetch("images_list.json")
        .then(respuesta => respuesta.json())
        .then(contenido => {
            let fragmento = document.createDocumentFragment();
            document.getElementById("tarjetero").innerHTML = "";
            contenido.forEach((foto) => {
                const { FileName, FileSize, Height, Width, Keywords } = foto;
                if ((Keywords != null && Keywords.includes(texto)) || Keywords == null || texto == null) {
                    let tarjeta = document.createElement("div");
                    tarjeta.setAttribute("class", "tarjetas");

                    //Cargando foto
                    let imagen = document.createElement("img");
                    imagen.src = "imagenes/" + FileName;
                    imagen.tag = "Foto: " + FileName;
                    imagen.setAttribute("class", "foto");
                    tarjeta.appendChild(imagen);

                    //Cargando nombre de fichero
                    let fichero = document.createElement("div");
                    fichero.innerHTML = "<strong>Fichero:</strong>" + FileName;
                    tarjeta.appendChild(fichero);

                    //Cargando tamaño
                    let tamaño = document.createElement("div");
                    tamaño.innerHTML = "<strong>Tamaño:</strong>" + FileSize;
                    tarjeta.appendChild(tamaño);

                    //Cargando alto
                    let alto = document.createElement("div");
                    alto.innerHTML = "<strong>Alto:</strong>" + Height;
                    tarjeta.appendChild(alto);

                    //Cargando ancho
                    let ancho = document.createElement("div");
                    ancho.innerHTML = "<strong>Ancho:</strong>" + Width;
                    tarjeta.appendChild(ancho);

                    //Cargando palabras clave
                    let clave = document.createElement("div");
                    clave.innerHTML = "<strong>Claves:</strong>" + Keywords;
                    tarjeta.appendChild(clave);

                    fragmento.appendChild(tarjeta);
                }
            })
            document.getElementById("tarjetero").appendChild(fragmento);
        })
}