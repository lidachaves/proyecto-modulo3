
  /****** version 03 ******************/
  // funcion estrellas
  // enlaces en ficha persona
  // imagen de github
  // parUndefined(valor) -> para evitar mostrar valores vacios
  /* recoger valores de la url */
  const params = new URLSearchParams(window.location.search);
  let valor = params.get("curso");   
  console.log(`valor : |${valor}|`);
  if (valor === undefined || valor == null || valor =='') { valor = "curso_vacio.json"; } 
  //if (valor === undefined || valor == null  || valor == '') { valor = "mf0493_2023_10.json"; } 
  console.log(`valor : ${valor}`);                         
  
fetch(valor)
  .then(response => {
    if (response.ok){
      console.log('response.ok ' + response.ok); 
      return response.text()
    }else{
      throw new Error(response.status);
     } 
  })
  .then(data => {
    console.log("Datos: " + data);
    const clase=JSON.parse(data);
    console.log("Clase: " + clase);
    console.log("Curso: " + clase.curso);
    console.log("Lugar: " + clase.lugar);
    // datos curso a section
    tcurso = '';
    tcurso += `<h1>${clase.curso}</h1>`;
    tcurso += '<table>';
      for (let i in clase)   {
        if ( typeof clase[i] !== "object"){
               
            tcurso += `<tr><td><b>${i} : </b></td><td>${clase[i]} </td></tr>`;
        }
      
    }
    tcurso += '</table>';

    
    
    
    document.querySelector('#curso').innerHTML=tcurso

    // datos profesor a #profesor
    document.querySelector('#profesor').innerHTML=`<h2>Tutor</h2> ${ficha_persona(clase.tutor)} ${ficha_github(clase.tutor)}`;
    // datos alumnos a  #alumnos
    //let talumnos = '<h2>Alumnos</h2>';
    let talumnos ='';
    for (const item of clase.alumnos)
    {
      talumnos += '<article>';
      talumnos += ficha_persona(item);
      talumnos += evolucion(item);
      talumnos += '</article>';

    }
    document.querySelector('#alumnos').innerHTML=talumnos;
    
   
  })
  .catch(err => {
    console.error("ERROR: ", err.message)
  });


  function ficha_persona (persona){
    ficha = `<ul><li>Nombre : ${persona.Nombre}</li>
      <li>Email : ${persona.email}</li>
      <li>Linked : <a href="${persona.linked}" target="_blank">${persona.linked}</a></li>
      <li>Github : <a href="http://github.com/${persona.github}" target="_blank">${persona.github}</a> </li>
      </ul>`;
      ficha += `<img src="" id="img-${persona.github}" class="imagengithub">`;
      console.log('Preso.github' + persona.github)
      if  (!parUndefined(persona.github))  {
            ficha += `<img src="" id="${persona.github}" class="imagengithub">`;
            ficha_github(persona.github);
      }  
     
     
      return ficha;
  }

  function evolucion(pers) {
    let evolucion = '<table><tr><th>Materia</th><th>Inicio</th><th>Fin</th></tr>';
    console.log('persona.incio' + (pers.inicio));
    //console.log('HTML' + pers.inicio.html);
    for (let i in pers.inicio)
    {
       if (pers.inicio[i]>pers.fin[i]){estilo = 'class="destacado"'} else {estilo ='';};
       console.log ('🧏‍♂️' + i + ' = ' +  pers.inicio[i] + ' | ' + pers.fin[i] );
       evolucion += `<tr><td><b>${i}</b></td><td>(${pers.inicio[i]}) ${estrellas(pers.inicio[i])} | </td><td><span ${estilo}>[${pers.fin[i]}] ${estrellas(pers.fin[i])}</span></td></tr>`;
      
    }

    evolucion +='</table>';
    return evolucion;
  }

  function estrellas(num)
  {
    res = ''
    for (var i = 1; i <= 5; i++)
    {
        (i <= num) ? res +='✅' : res += '❌'; // operador ternario
    }
    // res += 'x'
    // res = res + 'x'   
        /*   if (i <= num)
    {
        res +='✅';
    } else {
        res += '❌';
    } */
    /* Array.from({length: 5}, (_, i) => (i < num) ? '✅' : '❌').forEach(x => res += x);*/
    return res; 
  }

  function parUndefined(valor) {
    if (valor === undefined || valor === null || valor === '') { return true} else { return false};
  }

  
  function ficha_github(usuario){
    var imageng = '';
    fetch(`https://api.github.com/users/${usuario}`)
    .then(response => {
      if (response.ok)
        return response.text()
      else
        throw new Error(response.status);
    })
    .then(data => {
      console.log("Datos: " + data);
      var datos_github=JSON.parse(data);
      console.log(datos_github.avatar_url);
      imageng = datos_github.avatar_url;
      document.getElementById(`${usuario}`).src=imageng;
      
    })
    .catch(err => {
      console.error("ERROR: ", err.message);
      imageng = '';

    });        
  
}

  

  
   