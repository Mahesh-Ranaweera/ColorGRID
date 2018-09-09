"use strict";

function UI() {

	//app
	this.app = document.getElementById('app');

	//UI
	this.el = document.createElement('ui');
    this.el.id = 'interface';

    //display frame 
    this.xmlns = 'http://www.w3.org/2000/svg';
    this.boxW = 500;
    this.boxH = this.boxW;

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
    	let el_head = document.createElement('div');
	    el_head.className = 'header';
	    el_head.id = 'header';
    	self.pg_btns.btns.forEach(b => {
	        let btn = document.createElement('div');
	        btn.setAttribute('onclick', 'colorgrid.ui.btnclick(this);');
	        btn.className = 'btn';
	        btn.innerText = b.name;
	        btn.setAttribute('data-btn', b.value);
	        el_head.appendChild(btn);
	    });

	    return el_head;
    }

    //home page 
    var colorgrid_pg = function() {
	    let svgEl = document.createElementNS(self.xmlns, "svg");
	    svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + self.boxW + ' '  + self.boxH);
	    svgEl.setAttributeNS(null, 'width', self.boxW);
	    svgEl.setAttributeNS(null, 'height', self.boxH);
	    svgEl.style.display = 'block';
	    svgEl.id = 'colorwrap';

	    let count = 16;
        let size =  parseInt(self.boxW / count);

        let row_count = 0 + 10; //add a small padding
        let col_count = 0; //add a small padding

        var index = 0;
        for(let row = 0; row < count; row++) {
            //row_count += 10.5;
            col_count += 10.5;
            for(let col = 0; col < count; col++) {
                let color = null;
                if(self.colors[index] === undefined){
                    color = '#'+'000';
                }else{
                    color = '#'+self.colors[index];
                }

                let box = document.createElementNS(self.xmlns, "rect");
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
                svgEl.appendChild(box);

                col_count += size;
                index++;
            }

            row_count += size;
            col_count = 0; //reset
        }

        return svgEl;
    }

    //shades page
    var shade_pg = function() {
    	let page = document.createElement('DIV');
    	page.setAttribute('style', 'width:'+self.boxW+'px; height:'+self.boxH+'px;');
    	page.id = 'shade_pg';

    	let search = document.createElement('DIV');
    	search.setAttribute('style', 'width:100%; height: 40px; float: left;');
    	let section = document.createElement('DIV');
    	section.setAttribute('style', 'width: 300px; height: 40px; display:block; margin: 0 auto 0 auto; display: flex;');

    	let input = document.createElement('INPUT');
    	input.setAttribute('style', 'width: 100%; height: 40px; float: left; border-style:none; background-color: inherit; color: #78909c; font-size: 16px; text-indent: 10px; flex: 1;  letter-spacing:4px; text-transform:uppercase;')
    	input.setAttribute('type', 'text');
    	input.value = '#2196F3';
    	input.onkeyup = function() {
    		console.log(this.value);
    		if(this.value.length <= 7){
    			console.log('valid');
    		} else {	
    			console.log('invalid');
    		}
    	}

    	let btn = document.createElement('DIV');
    	btn.setAttribute('style', 'width:40px; height:40px; text-align:center; line-height:40px; float: left; padding: 8px; box-sizing:border-box;')
    	btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    	btn.onmouseover = function() {
    		this.style.color = '#2962ff';
    	}
    	btn.onmouseleave = function() {
    		this.style.color = '';
    	}
    	btn.setAttribute('onclick', '');

    	section.appendChild(input);
    	section.appendChild(btn);

    	let scroll = document.createElement('DIV');
    	scroll.setAttribute('style', 'width:100%; height:460px; float:left; overflow:hidden;');

		search.appendChild(section);
    	page.appendChild(search);
    	page.appendChild(scroll);

    	return page;
    }

    //swatches page
    var swatch_pg = function() {

    }

    //settings page
    var setting_pg = function() {
        
    }

    //event listeners
    //=>hover 
    this.over = function(e, color) {
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

    //=>away
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

    //=>click
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
        clipboard(color);
    }

    //=>btn click
    this.btnclick = function(e) {
        let selectbtn = e.getAttribute('data-btn');
        let header = header_btns();

        if(selectbtn === 'home'){
        	console.log('selected home')
        	this.render(colorgrid_pg(), header);
        }

        if(selectbtn === 'shades') {
        	console.log('selected shades');
        	this.render(shade_pg(), header);
        }

        if(selectbtn === 'swatch') {
        	console.log('selected swatch');
        }
    }

    //=>reset the element
    this.resetE = function(e) {
        let x = parseInt(e.getAttribute('x')) + this.settings.loc_diff;
        let y = parseInt(e.getAttribute('y')) + this.settings.loc_diff;

        e.setAttributeNS(null, 'x', x + 'px');
        e.setAttributeNS(null, 'y', y + 'px');
    }

    //clipboard
    var clipboard = function(color) {
    	let el = document.createElement('textarea');
        el.value = color;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log("copied to clipboard");
    }

    //render the page
    this.render = function(page=colorgrid_pg(), header=header_btns()) {
    	this.el.innerHTML = "";
    	this.el.appendChild(header);
    	this.el.appendChild(page);
        this.app.appendChild(this.el);
        console.log('colorGRID initialized');
    }
}