/*
    Intercept all clicks leading to ids, and do some stuff first.
*/

document.addEventListener('click', function (event) {

    // Work around silly mdl thing where it prevents the default setting the url. We actually wanna do that.
    if (event.target && event.target.matches && event.target.matches('span') && event.target.parentNode && event.target.parentNode.matches('a') && event.target.parentNode.getAttribute('href').substr(0, 1) === '#') {
        var href = event.target.parentNode.getAttribute('href').substr(1);

        // Temporarily move the id to the top of the page, so we don't scroll annoyingly
        document.getElementById(href).setAttribute('id', 'TEMP_BS_'+href)
        document.getElementById('top').setAttribute('id', href);
        window.location = '#'+href;
        // Put it back
        document.getElementById(href).setAttribute('id', 'top');
        document.getElementById('TEMP_BS_'+href).setAttribute('id', href);
        return;
    }

    if (event.target && event.target.getAttribute('href') && event.target.getAttribute('href')[0] == '#') {
        var goTo = event.target.getAttribute('href');

        if (goTo.indexOf('-') === -1) {
            return;
        }

        var targetPage = goTo.substr(1, goTo.indexOf('-')-1);

        Array.prototype.forEach.call(document.getElementsByClassName('mdl-layout__tab-panel'), function(elem) {
            elem.classList.remove('is-active');
        });
        document.getElementById(targetPage).classList.add('is-active');

        Array.prototype.forEach.call(document.getElementsByClassName('mdl-layout__tab'), function(elem) {
            if (elem.getAttribute('href') == '#' + targetPage) {
                elem.classList.add('is-active');
            } else {
                elem.classList.remove('is-active');
            }
        });
        document.getElementById(targetPage).classList.add('is-active');
        // Lazy-load any images available
        Array.prototype.forEach.call(document.getElementById(targetPage).querySelectorAll('img[show-src]'), function(elem) {
            elem.setAttribute('src', elem.getAttribute('show-src'));
            elem.removeAttribute('show-src');
        });

    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        var repeats = 10; // Try to center on the page for 2 seconds... hopefully it "really" loads by then... browsers are weird, man.
        var theInterval = setInterval(function() {
            Array.prototype.forEach.call(document.querySelectorAll('a'), function(elem) {
                if (elem.getAttribute('href') == window.location.hash) {
                    elem.click();
                }
            });
            repeats--;
            if (repeats === 0) {
                clearInterval(theInterval);
            }
        }, 200);
    }

    // Lazy-load images after the page is done rendering
    setTimeout(function() {
        Array.prototype.forEach.call(document.querySelectorAll('img[show-src]'), function(elem) {
            elem.setAttribute('src', elem.getAttribute('show-src'));
        });
    }, 500);
}, false);

window.doCommentToggle = function(id) {
    var elem = document.getElementById(id);

    if (elem.style.display === 'none') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}