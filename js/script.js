document.getElementById('btnBuscar').addEventListener('click', function() {
    const inputBuscar = document.getElementById('inputBuscar').value;
    const contenedor = document.getElementById('contenedor');
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=fe58129fbf0b3d4a03c3031bad49f56c271c7ddf&hash=e7f8a986196ae4c5f9753a70c06587bf&nameStartsWith=${encodeURIComponent(inputBuscar)}`;
    
    // Limpiar el contenedor antes de mostrar los resultados
    contenedor.innerHTML = '';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const results = data.data.results;
            if (results.length > 0) {
                results.forEach(item => {
                    // Crear columna
                    const column = document.createElement('div');
                    column.className = 'col-md-4 d-flex align-items-stretch';
                    
                    // Crear tarjeta de Bootstrap
                    const card = document.createElement('div');
                    card.className = 'card mb-4 shadow-sm';
                    card.style.width = '100%';
                    
                    // Imagen
                    const img = document.createElement('img');
                    img.src = `${item.thumbnail.path}.${item.thumbnail.extension}`;
                    img.className = 'card-img-top';
                    img.alt = item.name;
                    
                    // Cuerpo de la tarjeta
                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';
                    
                    // Título
                    const title = document.createElement('h5');
                    title.className = 'card-title';
                    title.innerText = item.name;
                    
                    // Descripción con scroll
                    const description = document.createElement('div');
                    description.className = 'card-text overflow-auto';
                    description.style.maxHeight = '100px';
                    description.innerText = item.description || 'No description available';
                    
                    // Añadir elementos al cuerpo de la tarjeta
                    cardBody.appendChild(title);
                    cardBody.appendChild(description);
                    
                    // Añadir imagen y cuerpo a la tarjeta
                    card.appendChild(img);
                    card.appendChild(cardBody);
                    
                    // Añadir tarjeta a la columna
                    column.appendChild(card);
                    
                    // Añadir columna al contenedor
                    contenedor.appendChild(column);
                });
            } else {
                const noResults = document.createElement('p');
                noResults.innerText = 'No se encontraron resultados para tu búsqueda.';
                contenedor.appendChild(noResults);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Hubo un error al realizar la búsqueda. Intenta nuevamente.';
            contenedor.appendChild(errorMessage);
        });
});
