const apiKey = "7cefdfb71afc4919ad53b686a7bbf3ed";
const noticias = document.getElementById('noticias');
const templateCard = document.getElementById('templateCard');
const busqueda = document.getElementById('buscar')

function formularioBusqueda(event) {
    event.preventDefault()
    const query = document.getElementById('input').value.trim()
    let linkBusqueda = `https://newsapi.org/v2/top-headlines?q=${query}&country=us&apiKey=${apiKey}`;
    fetch(linkBusqueda)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            noticias.innerHTML = ''
            if(data.totalResults === 0){
                const titulo = document.getElementById('h1')
                titulo.innerText = 'No se encontraron noticias...'
                return
            }
            data.articles.forEach((articulo, index) => {
                const card = templateCard.content.cloneNode(true)

                const cardTitulo = card.querySelector('.card_titulo')
                const cardImagen = card.querySelector('.card_imagen')
                const cardReal = card.querySelector('.card')
                const cardLink = card.querySelector('a')

                cardTitulo.textContent = articulo.title
                cardImagen.src = articulo.urlToImage
                cardLink.href = articulo.url
                if (index === 0) {
                    cardReal.classList.add('importante')
                } else {
                    cardReal.classList.remove('importante')
                }
                noticias.appendChild(card)
            })
        })
        .catch(error => console.log(error))
}


function obtenerNoticias() {
    const url = new URL(window.location.href);
    const categoria = url.pathname;
    let link = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    if (categoria.includes('negocio')) {
        link = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
    } else if (categoria.includes('tecnologia')) {
        link = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;
    } else if (categoria.includes('deportes')) {
        link = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`;
    }

    fetch(link)
        .then(response => response.json())
        .then(data => {
            data.articles.forEach((articulo, index) => {
                const card = templateCard.content.cloneNode(true)

                const cardTitulo = card.querySelector('.card_titulo')
                const cardImagen = card.querySelector('.card_imagen')
                const cardReal = card.querySelector('.card')
                const cardLink = card.querySelector('a')

                cardTitulo.textContent = articulo.title
                cardImagen.src = articulo.urlToImage
                cardLink.href = articulo.url
                if (index === 0) {
                    cardReal.classList.add('importante')
                } else {
                    cardReal.classList.remove('importante')
                }
                noticias.appendChild(card)
            })
        })
        .catch(error => {
            console.log(error)
        });
}



obtenerNoticias();



