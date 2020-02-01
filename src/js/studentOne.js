// Навигация по сайту из меню
//при нажатии на ссылкуstep 2 — копия
$(".navbar-collapse a").click(function() {
    //если она не имеет класс dropdown-toggle
    if (!$(this).hasClass("dropdown-toggle")) {
        //то закрыть меню
        $(".navbar-collapse").collapse('hide');
    }
});