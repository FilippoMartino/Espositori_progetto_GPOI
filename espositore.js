
  /*
  *
  *   Secondo il regolamento nel sacchetto devono 
  *   esserci 100 tessere, rispettivamente 20
  *   per ogi colore.
  *
  */

  var num_espositori = 7;

  var tessere_nere = 20;
  var tessere_bianche = 20;
  var tessere_gialle = 20;
  var tessere_blu = 20;
  var tessere_rosse = 20;
  var totale_tessere = 100;



  function generate(){
    
    var button = document.getElementById("button");   
    var mio_div = document.getElementById("my_div");
    
    
    for (var i = 0; i < num_espositori; i++){

      var espositore = document.createElement("div");
      espositore.setAttribute('id', 'espositore_' + i);
      set_correct_dimension_espositore(espositore);

      for (var j = 0; j < 4; j++){
        
        var tessera = document.createElement("p");

        tessera.setAttribute('class', 'tessera');
        
        assign_random_card(tessera);

        set_correct_dimension_tessera(tessera);
        tessera.setAttribute('class', 'tessera');
        tessera.setAttribute('onclick', "delete_t(this);");

        espositore.appendChild(tessera); 
           
      }

      espositore.setAttribute('class', 'espositore'); 
      
      document.body.insertBefore(espositore, mio_div);

    }
     
  }

  /*
  
    questa è la funzione che viene richiamata
    dalla onclick di ogni tessera: includere da
    qui dentro il codice per posizionare le tessere 
    sul campo da gioco.
    TODO: quando si metteranno i due progetti insieme 
    cambiare il nome di questa funzione, perchè per 
    com'è adesso elimina semplicemente la tessera 
    per levarla dagli espositori

  */

  function delete_t(tessera) {
  
    //alert("el ->" + tessera);
    tessera.parentNode.removeChild(tessera);
  
  }
  

 /*
  *
  *   assign_random_card:
  *   
  *   - Assegna un valore random che va da
  *     0 a 4, in base a questo imposta una 
  *     diversa immagine di sfondo alla tessera
  *     (che diventerà quindi rossa, nera, bianca...)
  * 
  *   - Ad ogni generazione toglie una tessera dai contatori
  *     "globali" all'inizio del codice, assicurandosi anche ci ci
  *     siano effettettivamente tessere da togliere
  *
  */

  //TODO: completare commenti sull'implementazione dei controlli 

  function assign_random_card(tessera){

    var exit = false;
    var sacchetto_vuoto = false;

    

      while (exit == false){

        if((tessere_gialle + tessere_nere + tessere_blu + tessere_bianche + tessere_rosse) == 0){
          sacchetto_vuoto = true;
          break;
        }

        var random_value = Math.floor(Math.random() * 5);

        if (random_value == 0 && tessere_gialle != 0){
          exit = true;
          tessera.style.backgroundImage = "url('img/TessereAzul/Giallo.png')";
          tessera.setAttribute('id', 'tessera_gialla');
          tessere_gialle = tessere_gialle - 1;    
       }

        if (random_value == 1 && tessere_nere != 0){
          exit = true;
          tessera.style.backgroundImage = "url('img/TessereAzul/Nero.png')";
          tessera.setAttribute('id', 'tessera_nera');
          tessere_nere = tessere_nere - 1;
        }

        if (random_value == 2 && tessere_blu != 0){
          exit = true;
          tessera.style.backgroundImage = "url('img/TessereAzul/Blu.png')";
          tessera.setAttribute('id', 'tessera_blu');
          tessere_blu = tessere_blu - 1;
        }

        if (random_value == 3 && tessere_bianche != 0){
          exit = true;
          tessera.style.backgroundImage = "url('img/TessereAzul/Bianco.png')";
          tessera.setAttribute('id', 'tessera_bianca');
          tessere_bianche = tessere_bianche - 1;
        }

        if (random_value == 4 && tessere_rosse != 0){
          exit = true;
          tessera.style.backgroundImage = "url('img/TessereAzul/Rosso.png')";
          tessera.setAttribute('id', 'tessera_rossa');
          tessere_rosse = tessere_rosse - 1;
        }

        if((tessere_gialle + tessere_nere + tessere_blu + tessere_bianche + tessere_rosse) == 0){
          sacchetto_vuoto = true;
          break;
        }   

      }

      if (sacchetto_vuoto == true)
        alert("tessere finite! -> " + tessere_rosse + "-" + tessere_bianche + "-" + tessere_blu + "-" + tessere_nere);

  }

  function refresh_cards(){

    for (var i = 0; i < num_espositori; i ++){

      var espositore = document.getElementById("espositore_" + i)
      var n_tessere = espositore.childElementCount;

      /*
  
        Il ciclo for qui sotto genera (appoggiandosi alla funzione
        assign_random_card()) un numero di tessere che corrisponde 
        al numero mancante sull'espositore per arrivare a 4.
        Il "4-" davanti al numero di figli serve per ottenere il numero
        di tessere mancanti e quindi da generare.
        Essendo la generazione gestita dalla funzione assign_random_card()
        non dobbiamo preoccuparci se le tessere nel sacchetto sono finite
  
      */



      for (var j = 0; j < 4 - n_tessere; j++){

        var tessera = document.createElement("p");

        tessera.setAttribute('class', 'tessera');
        set_correct_dimension_tessera(tessera);
        
        if ((tessere_gialle + tessere_nere + tessere_blu + tessere_bianche + tessere_rosse) > 0)
          assign_random_card(tessera);

        else{

          alert("tessere finite!")
          return;
        }

        tessera.setAttribute('class', 'tessera');
        tessera.setAttribute('onclick', "delete_t(this);");

        espositore.appendChild(tessera); 

      }

    }

  }

 /*
  *
  *   Questa funzione serve per impostare le corrette 
  *   dimensioni agli espositori per far si che vengano correttamente
  *   visualizzati sulla pagina in base al loro numero
  *
  */


  function set_correct_dimension_espositore(espositore){

    if (num_espositori == 5){

      espositore.style.width = "300px";
      espositore.style.height = "300px";

      /*
  
          Il passaggio qui sotto serve per 
          dare una dimensione particolare e diversa
          al primo espositore che deve apparire spostato 
          dal margine sinistro di una certa misura che,
          se mantenuta invariata, andrebbe a definire anche la 
          dimensione dello spazio tra un espositore e l'altro
    
      */

        if (espositore.getAttribute('id') == "espositore_0"){
          espositore.style.marginLeft = "7.5%";
        }
        else
          espositore.style.marginLeft = "5%";  

      espositore.style.marginTop = "5%";

    }

    if (num_espositori == 7){


      espositore.style.width = "200px";
      espositore.style.height = "200px";
      espositore.style.marginLeft = "5%";
      espositore.style.marginTop = "5%";

    }

    if (num_espositori == 9){

      espositore.style.width = "210px";
      espositore.style.height = "210px";
      espositore.style.marginLeft = "2%";
      espositore.style.marginTop = "5%";

    }




  }

  //funzione uguale all'altra, cambia le dimensioni della tessera
  function set_correct_dimension_tessera(tessera){

    if (num_espositori == 5){    
    
      tessera.style.width = "75px";
      tessera.style.height = "75px";
    
    }

    if (num_espositori == 7){

      tessera.style.width = "50px";
      tessera.style.height = "50px";
    
    }

    if (num_espositori == 9){

      tessera.style.width = "50px";
      tessera.style.height = "50px";

    }



  }  

 