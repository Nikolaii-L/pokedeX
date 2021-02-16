
//const dominio = `https://pokeapi.co/api/v2/pokemon`;
const pokedex = document.getElementById("pokedex")


const sendHttpRequest = (method, url, data) =>{
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
       
        xhr.open(method, url, true);

       xhr.responseType = 'json';
       
       xhr.onload = function() {
            if (xhr.status >= 400) {
                reject(xhr.response);
                console.log("a me rompi");
            } else {
                resolve(xhr.response);
                }
        }

        xhr.onerror = () => {
            reject('Ooops!! something it´s wrong!!')
        }


        xhr.send(JSON.stringify(data));
    });
    return promise;

    
};


const getData = () => {
    
    var bicho = [];

    for(let i = 1; i < 250; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
         
        
        bicho.push(sendHttpRequest('GET', url))//.then(datos => {
          //console.log(datos)
        
      // });
      };
        console.log(bicho);

        
        Promise.all(bicho).then(res => {

            const pokemones = res.map((resultado) => ({
                name: resultado.name,
                image: resultado.sprites['front_default'],
              
                type: resultado.types.map((type) => type.type.name).join(`, `),
                id: resultado.id

                
            }))
            mostrarCarta(pokemones);
            
        })

};

const mostrarCarta = poke => {

    console.log(poke)

    const pokemonCarta = poke.map(pokes =>  `
        <li class="card">
        <img class="imagen" src="${pokes.image}"/>
       
            <h2 class="titulo"> ${pokes.id}. ${pokes.name}<h2/>
            <p class="tipo">Type: ${pokes.type}</p>
        </li>
        `).join("") ;
    pokedex.innerHTML = pokemonCarta;
}

getData();



