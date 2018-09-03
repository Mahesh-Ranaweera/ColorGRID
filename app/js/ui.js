'use strict'

function UI() {
    this.el = document.createElement('ui');
    this.el.id = 'interface';

    this.render = function() {
        document.getElementById("app").appendChild(this.el);
    }
}