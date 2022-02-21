
function Display(number){

    var j;
        
        document.write("<center>");
         if(number>0)
          {
            Display(number-1);//Recursion
    
            for(j=1; j<=number; j++)    
              document.write("  "+j);
    
                for(j=number-1; j>0; j--)
                    document.write("  "+j);
           }
        document.write("</center>");
    }