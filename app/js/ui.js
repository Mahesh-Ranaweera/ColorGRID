'use strict'

function UI() {
    this.el = document.createElement('ui');
    this.el.id = 'interface';

    //create svg bg
    var xmlns = 'http://www.w3.org/2000/svg';
    var boxW = 500;
    var boxH = 500;
    this.svgEl = document.createElementNS(xmlns, "svg");
    this.svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + boxW + ' '  + boxH);
    this.svgEl.setAttributeNS(null, 'width', boxW);
    this.svgEl.setAttributeNS(null, 'height', boxH);
    this.svgEl.style.display = 'block';

    //generate the pixel boxes
    this.gen_pixels = function() {
        let count = 20;
        let size =  boxW / count;

        let row_count = 0;
        let col_count = 0;

        for(let row = 0; row < count; row++) {
            for(let col = 0; col < count; col++) {
                //console.log(row, col);
                let box = document.createElementNS(xmlns, "rect");
                box.setAttributeNS(null, 'width', size + 'px');
                box.setAttributeNS(null, 'height', size + 'px');
                box.setAttributeNS(null, 'x', col_count + 'px');
                box.setAttributeNS(null, 'y', row_count + 'px');
                box.setAttributeNS(null, 'style', 'fill:rgb(0, 0, 255);stroke-width:0.2;stroke:rgb(255,255,255)');
                box.setAttribute('value', [row_count, col_count]);
                box.setAttribute('class', 'box');
                box.setAttribute('onmouseover', 'colorgrid.ui.over(this)');
                this.svgEl.appendChild(box);

                col_count += size;
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
        e.setAttributeNS(null, 'style', 'fill:rgb(255,0,0)');
        console.log('mouse hovered', e.getAttribute('value'));
    }

    //render
    this.render = function() {
        this.el.appendChild(this.gen_pixels());
        document.getElementById("app").appendChild(this.el);
        console.log('colorGRID initialized');
    }
}