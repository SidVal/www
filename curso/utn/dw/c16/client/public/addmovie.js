$(function() {
    $('#movieForm')
        .bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                title: {
                    validators: {
                        stringLength: {
                            min: 2,
                        },
                        notEmpty: {
                            message: 'Por favor ingrese un titulo.'
                        }
                    }
                },
                genre: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor ingrese un genero.'
                        }
                    }
                },
                year: {
                    validators: {
                        value: {
                            min: 1900,
                            max: 2100
                        },
                        notEmpty: {
                            message: 'Por favor ingrese un año en formato numerico'
                        }
                    }
                },
                country: {
                    validators: {
                        stringLength: {
                            min: 3,
                        },
                        notEmpty: {
                            message: 'Por favor ingrese un pais'
                        }
                    }
                },
                seasons: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor ingrese una temporada en formato numerico.'
                        }
                    }
                },
                summary: {
                    validators: {
                        stringLength: {
                            min: 10,
                            max: 500,
                            message: 'Por favor ingrese el resumen con mas de 10 y no mas de 500 caracteres'
                        },
                        notEmpty: {
                            message: 'Por favor ingrese un resumen'
                        }
                    }
                },
                posterFile: {
                    validators: {
                        notEmpty: {
                            message: 'Por favor seleccione un archivo.'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#movieForm').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.ajax({
                url: $form.attr('action'),
                type: "POST",
                data: $form.serialize(),
                dataType: 'json',
                success: function(result) {
                    $(".panel panel-danger").addClass("hidden");
                    console.log(result);
                    location.pathname = "/list";
                },
                error: function(x, t, err) {
                    $(".panel.panel-danger").removeClass("hidden");
                    $("#error").html(err);
                }
            })
        });
});

function onFileselected(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        const fileName = event.target.files[0].name;

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = () => { // called once readAsDataURL is completed
            $("#poster").val(reader.result);
            $("#posterFile").val(fileName).invalid();
        };
    }
}