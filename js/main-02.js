
  /****** version 02 ******************/
  const params = new URLSearchParams(window.location.search);
  let valor = params.get("curso");   
  console.log(`valor : ${valor}`);
  if (valor === undefined || valor == null ) { valor = "curso_vacio.json"; } 
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
    // datos curso a h1
    //document.querySelector('h1').innerHTML=`${clase.curso} ${clase.fecha_inicio}`;
    document.querySelector('#curso').innerHTML=`${clase.curso} ${clase.fecha_inicio} Localidad : ${clase.lugar}`;
    //document.querySelector('#curso').innerHTML=clase.curso + ' '  + clase.fecha_inicio + ' Localidad : ' + clase.lugar ;

    // datos profesor a #profesor
    document.querySelector('#profesor').innerHTML=`<h2>Tutor</h2> ${ficha_persona(clase.tutor)}`;
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
      <li>Linked : ${persona.linked}</li>
      <li>Github : ${persona.github}</li>
      </ul>`;
     
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
       evolucion += `<tr><td>${i}</td><td>${pers.inicio[i]}</td><td><span ${estilo}>${pers.fin[i]}</span></td></tr>`;
    
    }
    evolucion +='</table>';
    return evolucion;
  }

  

  
   