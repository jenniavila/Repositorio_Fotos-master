    <?php
      $data = array();
      $ruta = "imagenes/"; // Indicar la ruta
      $filehandle = opendir($ruta); // Abrir archivos de la carpeta leer las imagenes
      while ($file = readdir($filehandle)) {
        $objetos = new StdClass();
        if ($file != "." && $file != "..") {
            $exif = exif_read_data($ruta.$file, 0, true);
            recorrer_array_recursivo($exif);
            array_push($data,$objetos); 
        }
      } 
      file_put_contents('./images_list.json', str_replace('\\u0000', '', json_encode($data,JSON_UNESCAPED_UNICODE)));
      echo "Fichero grabado con exito";
     

      function recorrer_array_recursivo($array)
      {
        $lista = array("FileName", "FileSize", "Height", "Width","Keywords");
        global $objetos;
        foreach($array as $key => $value)
        {
          // Si es un array, invoco de nuevo la función
          if(is_array($value))
          {
            recorrer_array_recursivo($value);
          }else{
            // Si no, imprimo el valor. Aquí puedes almacenar la info en vez de imprimir.
            if (in_array($key, $lista) and (str_contains($value,'?') == false)){
              $objetos->{$key} = utf8_encode(trim($value));
            }
          }
        }
      }
    ?>  
