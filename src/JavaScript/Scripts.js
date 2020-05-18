import * as $ from "jquery"

export function mudaNome() {
    $(document).ready(function () {
        $('#inputGroupFile01').on('change', function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileName);
        })
    })
}

export function abrirUpload() {
    $(document).ready(function () {
        $('input[type=file]').trigger('click');
    })
}


export function menu() {
    $(document).ready(function () {
        $(window).on("scroll", function () {
            if ($(window).scrollTop()) {
                $("nav").addClass("black");
            }
            else {
                $("nav").removeClass("black");
            }
        })
    })
}