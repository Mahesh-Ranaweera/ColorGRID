"use strict";

function UI() {

	//UI
	this.el = document.createElement('ui');
    this.el.id = 'interface';

    //create header buttons
    this.el_head = document.createElement('div');
    this.el_head.className = 'header';
    this.el_head.id = 'header';

    //display frame 
    this.xmlns = 'http://www.w3.org/2000/svg';
    this.boxW = 500;
    this.boxH = this.boxW;
    this.svgEl =  null;

    //get the colors 
    this.colors = materialcolors.colors;

    //get buttons
    this.pg_btns = pg_btns;

    //app settings
    this.settings = {
        c_max_size: 20, //circle max size
        c_min_size: 10, //circle min size
        loc_diff : 5, //location gap
    }

    var self = this;

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

    //generate the buttons
    var header_btns = function() {
    	self.pg_btns.btns.forEach(b => {
	        let btn = document.createElement('div');
	        btn.setAttribute('onclick', 'colorgrid.ui.btnclick(this);');
	        btn.className = 'btn';
	        btn.innerText = b.name;
	        btn.setAttribute('data-btn', b.value);
	        self.el_head.appendChild(btn);
	    });
    }

    //home page 
    var colorgrid_pg = function() {
	    self.svgEl = document.createElementNS(self.xmlns, "svg");
	    self.svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + self.boxW + ' '  + self.boxH);
	    self.svgEl.setAttributeNS(null, 'width', self.boxW);
	    self.svgEl.setAttributeNS(null, 'height', self.boxH);
	    self.svgEl.style.display = 'block';
	    self.svgEl.id = 'colorwrap';

	    let count = 16;
        let size =  parseInt(self.boxW / count);
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

    //btn click
    this.btnclick = function(e) {
        console.log("btn click", e);
        let selectbtn = e.getAttribute('data-btn');

        if(selectbtn === 'home'){
        	console.log('selected home')
        }

        if(selectbtn === 'shades') {
        	console.log('selected shades');
        }

        if(selectbtn === 'swatch') {
        	console.log('selected swatch');
        }

        console.log(self.colorgrid_pg());

        this.render(self.colorgrid_pg());
    }

    this.render = function() {
    	this.el.innerHTML = "";
    	header_btns();
    	this.el.appendChild(this.el_head);
        document.getElementById("app").appendChild(this.el);
        console.log('colorGRID initialized');
    }
}