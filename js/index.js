                            
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

    
    let tselector ='<ul>';
    console.log(listacursos.cursos);
    console.log(listacursos.cursos.length);
    console.log(listacursos.cursos[0]);
    for ( i=0 ; i<listacursos.cursos.length;i++)
    {
      tselector += '<li><a href="alumnos.html?curso='+listacursos.cursos[i]+'">'+listacursos.cursos[i]+'</a></li>';
    }
    tselector += '</ul>';
    document.querySelector('#cursos').innerHTML=tselector;
    
   
  })
  .catch(err => {
    console.error("ERROR: ", err.message)
  });

