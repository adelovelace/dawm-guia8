let cargarDatos = () => {
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");

            let authors = xml.getElementsByTagName('escritor');

            for (let author of authors) {
                let id = author.getElementsByTagName('id')[0].textContent
                let name = author.getElementsByTagName('nombre')[0].textContent

                let plantilla = `<option value="${id}">${name}</option>`

                document.querySelector('div.input-group > select').innerHTML += plantilla
            }



            let select = document.querySelector('div.input-group > select');
            select.addEventListener('change', (event) => {

                let id_selected = event.target.value;

                fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
                    .then(response => response.json())
                    .then(data => {

                        let arreglo = []

                        for (let valor in data['frases']) {
                            arreglo.push(data['frases'][valor])
                        }

                        let text_by_author = []

                        for (let i = 0; i < arreglo.length; i++) {

                            if (arreglo[i]["id_autor"] == id_selected) {
                                text_by_author.push(arreglo[i]["texto"])
                                console.log(arreglo[i]["texto"])
                            }
                        }

                        let ul = document.createElement('ul');
                        ul.setAttribute('id', "authors_text");
                        document.querySelector('#frases').appendChild(ul);

                        for (let i = 0; i < text_by_author.length; i++) {
                            let plantilla = `<li>${text_by_author[i]}</li>`
                            document.querySelector('#authors_text').innerHTML += plantilla
                        }

                        arreglo.length = 0
                        text_by_author.length = 0
                        



                    })
                    .catch(console.error);

                   
            })

            



        }).catch(console.error);

}




window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
});




