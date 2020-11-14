window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    
        let calc = requier('./parts/calc.js'),
            timer = requier('./parts/timer.js'),
            form = requier('./parts/form.js'),
            slider = requier('./parts/slider.js'),
            tabs = requier('./parts/tabs.js'),
            modal = requier('./parts/modal.js');
        
        calc();
        timer();
        form();
        slider();
        tabs();
        modal();

    });