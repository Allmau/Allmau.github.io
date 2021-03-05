
let total
let ba
let al

document.querySelector(".first").addEventListener('click', function(){
    Swal.fire({
        title: 'digite la base',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'OK',
        showLoaderOnConfirm: true,
        preConfirm: (b) => {
            ba=b
          return b
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    
  });

  let a = document.querySelector(".second").addEventListener('click', function(){
    Swal.fire({
        title: 'digite la altura',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'OK',
        showLoaderOnConfirm: true,
        preConfirm: (a) => {
            al=a
          return a
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    
  });
  
  
document.querySelector(".third").addEventListener('click', function(){
    Swal.fire("El Area es " + ba*al);
  });





