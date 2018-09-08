'use strict'

function UI() {
    //ui
    this.el = document.createElement('ui');
    this.el.id = 'interface';

    //create header buttons
    this.el_head = document.createElement('div');
    this.el_head.className = 'header';
    this.el_head.id = 'header';

    var self = this;

    //generate buttons
    settings.btns.forEach(b => {
        let btn = document.createElement('div');
        btn.setAttribute('onclick', 'colorgrid.ui.btnclick(this);');
        btn.className = 'btn';
        btn.innerText = b.name;
        btn.setAttribute('data-btn', b.value);
        this.el_head.appendChild(btn);
    });

    //create svg bg
    var xmlns = 'http://www.w3.org/2000/svg';
    var boxW = 500;
    var boxH = boxW;
    this.svgEl = document.createElementNS(xmlns, "svg");
    this.svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + boxW + ' '  + boxH);
    this.svgEl.setAttributeNS(null, 'width', boxW);
    this.svgEl.setAttributeNS(null, 'height', boxH);
    this.svgEl.style.display = 'block';
    this.svgEl.id = 'colorwrap';

    //app settings
    this.settings = {
        c_max_size: 20, //circle max size
        c_min_size: 10, //circle min size
        loc_diff : 5, //location gap
    }

    //generate the pixel boxes
    this.gen_pixels = function() {

        //colors
        var colors = materialcolors.colors;

        let count = 16;
        let size =  parseInt(boxW / count);
        console.log(size);

        let row_count = 0 + 10; //add a small padding
        let col_count = 0; //add a small padding

        var index = 0;
        for(let row = 0; row < count; row++) {
            //row_count += 10.5;
            col_count += 10.5;
            for(let col = 0; col < count; col++) {
                let color = null;
                if(colors[index] === undefined){
                    color = '#'+'000';
                }else{
                    color = '#'+colors[index];
                }

                let box = document.createElementNS(xmlns, "rect");
                box.setAttributeNS(null, 'width', 10 + 'px');
                box.setAttributeNS(null, 'height', 10 + 'px');
                box.setAttributeNS(null, 'x', col_count + 'px');
                box.setAttributeNS(null, 'y', row_count + 'px');
                box.setAttributeNS(null, 'rx', count);
                box.setAttributeNS(null, 'ry', count);
                box.setAttributeNS(null, 'style', 'fill:'+color);
                box.setAttributeNS(null, 'stroke', 'transparent');
                box.setAttributeNS(null, 'stroke-width', '2');
                box.setAttribute('value', [row_count, col_count]);
                box.setAttribute('class', 'box');
                box.setAttribute('onmouseenter', 'colorgrid.ui.over(this, "'+color+'")');
                box.setAttribute('onmouseleave', 'colorgrid.ui.away(this)');
                box.setAttribute('onclick', 'colorgrid.ui.click(this, "'+color+'")');
                this.svgEl.appendChild(box);

                col_count += size;
                index++;
            }

            row_count += size;
            col_count = 0; //reset
        }

        return this.svgEl;
    }

    //set the frame size
    this.set_size = function(size = {width: 500, height: 500}) {
        this.el.style.width = size.width + 'px';
        this.el.style.height = size.height + 'px';
        this.el.style.marginTop = 50 + 'px';
        this.el.style.borderRadius = 2 + 'px';
    }

    //set the bg color
    this.set_bg_color = function(color = 'none') {
        this.el.style.backgroundColor = color;
    }

    //hover 
    this.over = function(e, color) {
        console.log('mouse hovered', e.getAttribute('value'), color);
        e.setAttributeNS(null, 'stroke', '#78909c');
        e.setAttributeNS(null, 'stroke-width', '2');
        e.setAttributeNS(null, 'width', this.settings.c_max_size + 'px');
        e.setAttributeNS(null, 'height', this.settings.c_max_size + 'px');

        //get current location coordinates
        let x = parseInt(e.getAttribute('x')) - this.settings.loc_diff;
        let y = parseInt(e.getAttribute('y')) - this.settings.loc_diff;

        e.setAttributeNS(null, 'x', x + 'px');
        e.setAttributeNS(null, 'y', y + 'px');
    }

    //away
    this.away = function(e) {
        console.log('mouse away', e.getAttribute('value'));
        e.setAttributeNS(null, 'stroke', 'none');
        e.setAttributeNS(null, 'stroke-width', 'none');
        e.setAttributeNS(null, 'width', this.settings.c_min_size + 'px');
        e.setAttributeNS(null, 'height', this.settings.c_min_size + 'px');

        //get current location coordinates
        let x = parseInt(e.getAttribute('x')) + this.settings.loc_diff;
        let y = parseInt(e.getAttribute('y')) + this.settings.loc_diff;

        e.setAttributeNS(null, 'x', x + 'px');
        e.setAttributeNS(null, 'y', y + 'px');
    }

    //click
    this.click = function(e, color) {
        this.resetE(e);
        console.log('clicked', e.getAttribute('value'));
        e.setAttributeNS(null, 'stroke', '#2196F3');
        e.setAttributeNS(null, 'stroke-width', '2');
        e.setAttributeNS(null, 'width', this.settings.c_max_size + 'px');
        e.setAttributeNS(null, 'height', this.settings.c_max_size + 'px');

        //get current location coordinates
        let x = parseInt(e.getAttribute('x')) - this.settings.loc_diff;
        let y = parseInt(e.getAttribute('y')) - this.settings.loc_diff;

        e.setAttributeNS(null, 'x', x + 'px');
        e.setAttributeNS(null, 'y', y + 'px');

        //copy to clipboard
        this.copytoclip(color);
    }

    //reset the element
    this.resetE = function(e) {
        let x = parseInt(e.getAttribute('x')) + this.settings.loc_diff;
        let y = parseInt(e.getAttribute('y')) + this.settings.loc_diff;

        e.setAttributeNS(null, 'x', x + 'px');
        e.setAttributeNS(null, 'y', y + 'px');
    }

    //btn click
    this.btnclick = function(e) {
        console.log("btn click", e);
        this.clear();
        this.render();
    }

    //copy color code to clipboard
    this.copytoclip = function(color){
        let el = document.createElement('textarea');
        el.value = color;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log("copied to clipboard");
    }

    //render
    this.render = function() {
        this.el.appendChild(this.el_head);
        this.el.appendChild(this.gen_pixels());
        document.getElementById("app").appendChild(this.el);
        console.log('colorGRID initialized');
    }

    //clear frame
    this.clear = function() {
        var app = document.getElementById("app");
        //console.log('before', app);
        app.innerHTML = "";
        console.log('after', app);
    }

    //shades page
    this.shadespg = function() {

    }

    //swatches page
    this.swatcgpg = function() {

    }

    //settings page
    this.settingspg = function() {
        
    }

    //save settings
    this.savedata = function(appdata) {
        if(typeof localStorage !== 'undefined'){
            try {
                localStorage.setItem('colorgrid', JSON.stringify(appdata));
                return true;
            } catch(e) {
                return false;
            }
        }
    }

    //get save data 
    this.getdata = function() {
        if(typeof localStorage !== 'undefined') {
            try {
                return localStorage.getItem('colorgrid');
            } catch (e) {
                return null;
            }
        }
    }
}