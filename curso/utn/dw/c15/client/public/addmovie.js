$(function() {
    //NADA!... 
});

function onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        const fileName = event.target.files[0].name;

        //Lee el archivo que estoy por subir...
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function() {
            $("#poster").val(reader.result);
            $("#posterFile").val(fileName);
        }
    }
}