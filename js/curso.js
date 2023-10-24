                            
fetch("cursos_2023.json")
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
    const listacursos=JSON.parse(data);
    console.log("titulo : " + listacursos.titulo);
    console.log("año: " + listacursos.año);
   
    //document.querySelector('#curso').innerHTML=`${clase.curso} ${clase.fecha_inicio} Localidad : ${clase.lugar}`;
    //document.querySelector('#curso').innerHTML=clase.curso + ' '  + clase.fecha_inicio + ' Localidad : ' + clase.lugar ;

    
    let tselector ='<select name="selcurso" id="selcurso" onChange="seleccionarCurso()">';
    console.log(listacursos.cursos);
    console.log(listacursos.cursos.length);
    console.log(listacursos.cursos[0]);
    for ( i=0 ; i<listacursos.cursos.length;i++)
    {
      tselector += '<option value="'+listacursos.cursos[i]+'">'+listacursos.cursos[i]+'</option>';
    }
    tselector += '</select>';
    document.querySelector('#selector').innerHTML=tselector;
    
   
  })
  .catch(err => {
    console.error("ERROR: ", err.message)
  });

function seleccionarCurso()
{
  curso = document.getElementById('selcurso').value;
   fetch(curso, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
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

}


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

  
   