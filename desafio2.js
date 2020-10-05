/* Requerimientos
1. Crear las funciones request, getUser y getRespositories async..await,
manejando los posibles errores. La función request hará las peticiones a la API,
getUser y getRespositories enviarán los datos a la función request para obtener
los datos que requieran.

2. Crear la función openRepository con el argumento url que abra ésta en una nueva
ventana/pestaña. Crear la función template con el argumento repo en la que se
pasa la información de cada repositorio, para que se pueda utilizar de plantilla con el
html que debe ser insertado en el elemento “repositories” del archivo index.html.

3. Crear la función showRepositories que contenga las llamadas a las APIs
https://api.github.com/users/XXX y https://api.github.com/users/XXX/repos, donde
XXX es un nombre de usuario. con la información obtenida crear el html con ésta e
insertarlo en el html de la página index.html. Debe mostrar 3 cuadros de texto y un
botón, uno para ingresar el nombre de usuario, otro en el que se ingrese el numero de
pagina y el otro un cuadro de texto para indicar cuántos resultados quiere obtener
por página.

 */


let showRepositories = () =>{
    document.querySelector('.total').innerHTML = ''
    repositories.innerHTML = ''
    let username;
    let numero = size.value
    let pag = from.value

    fetch(`https://api.github.com/users/${user.value}`)
        .then(response => response.json())
        .then(datos => {
            username = datos.login
            document.querySelector('.total').innerHTML = `Total: ${datos.public_repos}`
        }).catch(error => console.log(error))

    fetch(`https://api.github.com/users/${user.value}/repos?page=${pag}`)
        .then(response => response.json())
        .then(datos => {
            let solicitados = datos.slice(0,numero)
            solicitados.forEach(element => {
                repositories.innerHTML += `
                <div class="repo"><a href="${element.svn_url}" target="_blank">
                    <p><strong>${element.full_name.replace(`${username}/`,'')}</strong></p>
                    <p>${element.svn_url}</p>

                </a><div>
                `
            });
        }).catch(error => console.log(error))
}


