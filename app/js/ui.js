'use strict'

function UI() {
    //ui
    this.el = document.createElement('ui');
    this.el.id = 'interface';

    //create header buttons
    this.el_head = document.createElement('div');
    this.el_head.className = 'header';
    this.el_head.id = 'header';
    //generate buttons
    settings.btns.forEach(b => {
        let btn = document.createElement('div');
        btn.setAttribute('onclick', 'colorgrid.ui.btnclick(this);');
        btn.className = 'btn';
        btn.innerText = b.name;
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

    //generate the pixel boxes
    this.gen_pixels = function() {

        //colors
        var colors = materialcolors.colors;

        let count = 16;
        let size =  parseInt(boxW / count);

        let row_count = 0;
        let col_count = 0;

        var index = 0;
        for(let row = 0; row < count; row++) {
            for(let col = 0; col < count; col++) {
                let color = 'fill:#'+colors[index];

                let box = document.createElementNS(xmlns, "rect");
                box.setAttributeNS(null, 'width', size + 'px');
                box.setAttributeNS(null, 'height', size + 'px');
                box.setAttributeNS(null, 'x', col_count + 'px');
                box.setAttributeNS(null, 'y', row_count + 'px');
                box.setAttributeNS(null, 'rx', count);
                box.setAttributeNS(null, 'ry', count);
                box.setAttributeNS(null, 'style', color);
                box.setAttribute('value', [row_count, col_count]);
                box.setAttribute('class', 'box');
                box.setAttribute('onmouseenter', 'colorgrid.ui.over(this)');
                box.setAttribute('onmouseleave', 'colorgrid.ui.away(this)');
                box.setAttribute('onclick', 'colorgrid.ui.click(this)');
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
    this.set_bg_color = function(color = '#000') {
        this.el.style.backgroundColor = color;
    }

    //hover 
    this.over = function(e) {
        //console.log('mouse hovered', e.getAttribute('value'), e);
        e.setAttributeNS(null, 'stroke', '#fff');
        e.setAttributeNS(null, 'stroke-width', '2');
    }

    //away
    this.away = function(e) {
        e.setAttributeNS(null, 'stroke', 'none');
        e.setAttributeNS(null, 'stroke-width', 'none');
    }

    //click
    this.click = function(e) {
        
    }

    //btn click
    this.btnclick = function(e) {
        console.log("btn click", e);
        this.render();
    }

    //render
    this.render = function() {
        this.el.appendChild(this.el_head);
        this.el.appendChild(this.gen_pixels());
        document.getElementById("app").appendChild(this.el);
        console.log('colorGRID initialized');
    }
}