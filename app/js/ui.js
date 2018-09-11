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

    //initialize store data
    this.store = new app_data();
    this.store.init();

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
    this.set_bg_color = function(color = this.store.get_key('bgcolor').color) {
        document.body.style.backgroundColor = color;
    }

    //generate the header
    var header_btns = function() {
    	let el_head = document.createElement('DIV');
	    el_head.className = 'header';
	    el_head.id = 'header';
    	self.pg_btns.btns.forEach(b => {
	        let btn = document.createElement('DIV');
	        btn.setAttribute('onclick', 'colorgrid.ui.btnclick(this);');
	        btn.className = 'btn';
	        btn.innerText = b.name;
	        btn.setAttribute('data-btn', b.value);
	        el_head.appendChild(btn);
	    });

	    return el_head;
    }

    //generate the footer
    var footer_pg = function() {
    	let el_foot = document.createElement('DIV');
    	el_foot.className = 'footer';
    	el_foot.id = 'footer';

    	//BG toggle
    	let bg_toggle = document.createElement('DIV');
    	bg_toggle.setAttribute('style', 'width:100px; height:40px; float:right; display:flex;');

    	let text = document.createElement('DIV');
    	text.setAttribute('style', 'width:100%; line-height: 40px; text-transform: uppercase; color: #78909c; 40px; flex: 1;');
    	text.innerText = 'BG COLOR';

    	let icon = document.createElement('DIV');
    	icon.setAttribute('style', 'width: 40px; height: 40px; float:right; padding: 8px; box-sizing:border-box;');
    	icon.innerHTML = `<svg id='bgicon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`;
    	icon.id = 'bg_color';
    	icon.onmouseover = function() {
    		let icon = document.getElementById('bgicon');
    		icon.setAttributeNS(null, 'stroke', '#2962ff');
    	}
    	icon.onmouseleave = function() {
    		let icon = document.getElementById('bgicon');
    		icon.setAttributeNS(null, 'stroke', '#78909c');
    	}
    	icon.onclick = function() {
    		let icon = document.getElementById('bgicon');
    		let BG = document.body;

    		if(self.store.get_key('bgcolor').name === 'light'){
    			BG.style.backgroundColor = '#111';
    			self.store.update('bgcolor', 'dark');
    		} else {
    			BG.style.backgroundColor = '#fff';
    			self.store.update('bgcolor', 'light');
    		}
    	}

    	bg_toggle.appendChild(text);
    	bg_toggle.appendChild(icon);

    	el_foot.appendChild(bg_toggle);
    	return el_foot;
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
    	section.setAttribute('style', 'width: 500px; height: 40px; display:block; margin: 0 auto 0 auto; display: flex;');

    	let hex_input = document.createElement('INPUT');
    	hex_input.setAttribute('style', 'width: 100%; height: 40px; float: left; border-style:none; background-color: inherit; color: #78909c; font-size: 16px; text-indent: 10px; flex: 1;  letter-spacing:4px; text-transform:uppercase;')
    	hex_input.setAttribute('type', 'text');
    	hex_input.id = 'getcolor';
    	hex_input.value = '#2196F3';
    	hex_input.onkeyup = function() {
    		let color = this.value;
    		if(!is_hex(color)){
    			this.style.color = '#f06292';
    		} else {	
    			this.style.color = '#78909c';
    		}
    	}

    	let perc_input = document.createElement('INPUT');
    	perc_input.setAttribute('style', 'width: 80px; height: 40px; float: left; border-style:none; background-color: inherit; color: #78909c; font-size: 16px; text-indent: 10px; letter-spacing:4px; text-transform:uppercase;')
    	perc_input.setAttribute('type', 'number');
    	perc_input.setAttribute('min', '0');
    	perc_input.setAttribute('max', '1');
    	perc_input.setAttribute('step', '0.01');
    	perc_input.id = 'getpercent';
    	perc_input.value = '0.5';
    	perc_input.onkeyup = function() {
    		let percent = this.value;
    		if(!is_percent(percent)){
    			this.style.color = '#f06292';
    		} else {	
    			this.style.color = '#78909c';
    		}
    	}

    	let btn = document.createElement('DIV');
    	btn.setAttribute('style', 'width:40px; height:40px; text-align:center; line-height:40px; float: left; padding: 8px; box-sizing:border-box;')
    	btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    	btn.onmouseover = function() {
    		this.style.color = '#2962ff'; //hover
    	}
    	btn.onmouseleave = function() {
    		this.style.color = '';
    	}
    	btn.onclick = function() {
    		let sel = document.getElementById('getcolor');
     		let perc= document.getElementById('getpercent');
     		if(!is_hex(sel.value) || !is_percent(perc.value)){
     			return;
     		}

    		page.innerHTML = "";
    		section.appendChild(hex_input);
    		section.appendChild(perc_input);
	    	section.appendChild(btn);

	    	let shades = get_shades(sel.value, perc.value);
	    	let M = render_shades(shades);
	    	search.appendChild(section);
	    	page.appendChild(search);
	    	page.appendChild(M);

    		self.render(page, header);
    	}

    	section.appendChild(hex_input);
    	section.appendChild(perc_input);
    	section.appendChild(btn);

    	let shades = get_shades('#2196F3', 0.5);
    	let M = render_shades(shades);
    	search.appendChild(section);
    	page.appendChild(search);
    	page.appendChild(M);

    	return page;
    }

    //creat Vertical Numbers
    var V_num = function(n, node) {
    	for(let i = 0; i < n; i++){
    		let ne = document.createElement('DIV');
    		ne.setAttribute('style', 'width: 50px; height: 40px; float:left; text-align:center; line-height: 40px; font-size: 10px;');
    		ne.innerText = i;
    		node.appendChild(ne);
    	}
    	return node;
    }

    //create Horizontal Numbers
    var H_num = function(n, node) {
    	for(let i = 0; i < n; i++){
    		let ne = document.createElement('DIV');
    		ne.setAttribute('style', 'width: 40px; height: 30px; float:left; text-align:center; line-height: 30px; font-size: 10px;');
    		ne.innerText = i;
    		node.appendChild(ne);
    	}
    	return node;
    }

    var is_hex = function(string) {
    	let regex =  /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    	if(regex.test(string)){
    		return true;
    	}
    	return false;
    }

    var is_percent = function(percent) {
    	if(percent > 1 || percent < 0 || percent === undefined){
    		return false;
    	} 
    	return true;
    }

    //get the shades
    var get_shades = function(value, percent) {
    	//generate colors
    	let gen = new gen_colors();
    	let color = {hex:[], rgb:[]};

		let col = null;
		let hex_c = value;

    	for(let i = 0; i < 100; i++){
    		col = gen.gen_hex_shades(hex_c, percent);
    		color.hex.push(col[0]);
    		color.rgb.push(col[1]);

    		hex_c = col[0];
    	}

    	return color;
    }   

    //get render shades page colors
    var render_shades = function(color_arr) {

    	let count = 10;

    	//header section
    	let H = document.createElement('DIV');
    	H.setAttribute('style', 'width:100%; height:30px; float:left; padding-left:50px; padding-right:50px; box-sizing:border-box;');
    	H_num(count, H);

    	let M = document.createElement('DIV');
    	M.setAttribute('style', 'width:100%; height:460px; float:left;');

    	let X1 = document.createElement('DIV');
    	X1.setAttribute('style', 'width:50px; height:400px; float:left;');
    	V_num(count, X1);

    	let X2 = document.createElement('DIV');
    	X2.setAttribute('style', 'width:50px; height:400px; float:left;');
    	V_num(count, X2);

    	let C = document.createElement('DIV');
    	C.setAttribute('style', 'width:400px; height:400px; float:left;');

    	let col_count = 0, counter = 0;
    	//generate the shades
    	for(let i = 0; i < count; i++) {
    		let svgEl = document.createElementNS(self.xmlns , 'svg');
	    	svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + '400' + ' ' + '40');
	    	svgEl.setAttributeNS(null, 'width', '400');
	    	svgEl.setAttributeNS(null, 'height', '40');
	    	svgEl.style.display = 'block';

	    	col_count += 20;
    		for(let j = 0; j < count; j++) {
    			let svg = document.createElementNS(self.xmlns, 'circle');
		    	svg.setAttributeNS(null, 'width', 20 + 'px');
		    	svg.setAttributeNS(null, 'height', 20 + 'px');
		    	svg.setAttributeNS(null, 'cx', col_count);
		    	svg.setAttributeNS(null, 'cy', 20);
		    	svg.setAttributeNS(null, 'r', 10);
		    	svg.setAttributeNS(null, 'stroke', '#EEE');
		    	svg.setAttributeNS(null, 'stroke-width', '2');
		    	svg.setAttributeNS(null, 'style', 'fill:'+color_arr.hex[counter]);
		    	svg.setAttribute('hex', color_arr.hex[counter]);
		    	svg.setAttribute('rgb', color_arr.rgb[counter]);
		    	svgEl.appendChild(svg);

		    	col_count += 40;
		    	counter += 1;
    		}
    		col_count = 0;
    		C.appendChild(svgEl);
    	}

  		M.appendChild(H);
    	M.appendChild(X1);
    	M.appendChild(C);
    	M.appendChild(X2);

    	return M;
    }

    //swatches page
    var swatch_pg = function() {
    	let page = document.createElement('DIV');
    	page.setAttribute('style', 'width:'+self.boxW +'px; height:' + self.boxH+'px; overflow: auto;');
    	page.id = 'swatche_pg';

    	let swatch_data = self.store.get_key('swatches');
    	swatch_data.forEach((e) => {
    		let wrapper = document.createElement('DIV');
    		wrapper.setAttribute('style', 'width:50%;height:32px;float:left;padding:4px;box-sizing:border-box;');
    		let swatch = document.createElement('DIV');
    		swatch.setAttribute('style', 'width:100%;height:24px;border:1px solid #EEE;');
    		swatch.style.display = 'block';

    		let c = e;

    		for(let i = 0; i < 4; i++){
    			let el = document.createElement('DIV');
    			el.setAttribute('style', 'width:25%;height:100%;float:left;background-color:'+c.color[i]+';');
    			swatch.appendChild(el);
    		}

    		wrapper.appendChild(swatch);
    		page.appendChild(wrapper);
    	});

    	return page;
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
        	self.store.update('opentab', 'home');
        	this.render(colorgrid_pg(), header);
        }

        if(selectbtn === 'shades') {
        	console.log('selected shades');
        	self.store.update('opentab', 'shades');
        	this.render(shade_pg(), header);
        }

        if(selectbtn === 'swatches') {
        	self.store.update('opentab', 'swatches');
        	this.render(swatch_pg(), header);
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
    	this.el.appendChild(footer_pg());
        this.app.appendChild(this.el);
        console.log('colorGRID initialized');
    }
}