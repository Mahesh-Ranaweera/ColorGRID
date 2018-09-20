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

    //get the bg color
    this.bgcolor = this.store.get_key('bgcolor').color;

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

        //info icon
        let info_ic = document.createElement('DIV');
        info_ic.setAttribute('style', 'width:40px;height:40px;float:right;padding:8px;box-sizing:border-box;line-height:40px;color:#78909c;');
        info_ic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>`;
        info_ic.classList.add('btn');
        info_ic.setAttribute('title', 'Open Info');
        info_ic.id = 'info_icon';
        info_ic.onmouseover = function() {
            this.style.color = '#2962FF';
        }
        info_ic.onmouseleave = function() {
            this.style.color = '#78909c';
        }
        info_ic.onclick = function() {
            let info_pg = document.getElementById('info_page');
            if(info_pg.style.display === 'none') {
                info_pg.style.display = 'block';
            } else {
                info_pg.style.display = 'none';
            }
        }

        el_head.appendChild(info_ic);

	    return el_head;
    }

    //generate the info panel
    var info_pg = function() {
        let pop_up = document.createElement('DIV');
        pop_up.setAttribute('style', `width:${self.boxW}px;height:${self.boxH}px;display:block;margin:auto;display:none;z-index:1000;background-color:${self.bgcolor};position:absolute;left:0;right:0;bottom:0;top:0;border-radius:2px;`);
        pop_up.classList.add('box_shadow');
        pop_up.id = 'info_page';

        //popup header
        let pop_head = document.createElement('DIV');
        pop_head.setAttribute('style', 'width:100%;height:40px;float:left;display:flex;');

        //pop title
        let pop_title = document.createElement('DIV');
        pop_title.setAttribute('style', 'width:100%;heightL:40px;flex:1;float:left;line-height:40px;font-size:10px;text-indent:10px;color:#78909c;');
        pop_title.innerText = 'ColorGRID Info';
        pop_head.appendChild(pop_title);

        //pop close 
        let pop_close = document.createElement('DIV');
        pop_close.setAttribute('style', 'width:40px;height:40px;float:right;padding:8px;box-sizing:border-box;line-height:40px;color:#78909c;');
        pop_close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        pop_close.onmouseover = function() {
            this.style.color = '#2962FF';
        }
        pop_close.onmouseleave = function() {
            this.style.color = '#78909c';
        }
        pop_close.onclick = function() {
            let info_pg = document.getElementById('info_page');
            info_pg.style.display = 'none';
        }
        pop_head.appendChild(pop_close);

        let pop_body = document.createElement('DIV');
        pop_body.setAttribute('style', 'width:100%;height:calc(100% - 80px);');
        pop_body.setAttribute('data-simplebar', '');

        let info = '';
        info_data.sections.forEach((section) => {
            info += section.content;
        });

        pop_body.innerHTML = info;

        console.log(info_data);

        let pop_footer = document.createElement('DIV');
        pop_footer.setAttribute('style', 'width:100%;height:40px;float:left;bottom:0;');

        pop_up.appendChild(pop_head);
        pop_up.appendChild(pop_body);
        pop_up.appendChild(pop_footer);

        return pop_up;
    }

    //generate the footer
    var footer_pg = function() {
    	let el_foot = document.createElement('DIV');
    	el_foot.className = 'footer';
    	el_foot.id = 'footer';

    	//Name TAG
    	let app_name = document.createElement('DIV');
    	app_name.setAttribute('style', 'width:100%;height:40px;float:left;flex:1;text-align:center;line-height:40px;text-transform:uppercase;color:#78909c;');
    	app_name.innerText = 'Color GRID V 1.0';

    	//BG toggle
    	let bg_toggle = document.createElement('DIV');
    	bg_toggle.setAttribute('style', 'width:100px; height:40px; float:right; display:flex;');

    	let text = document.createElement('DIV');
    	text.setAttribute('style', 'width:100%; line-height: 40px; text-transform: uppercase; color: #78909c; 40px; flex: 1;');
    	text.innerText = 'BG COLOR';

    	let icon = document.createElement('DIV');
    	icon.setAttribute('style', 'width: 40px; height: 40px; float:right; padding: 8px; box-sizing:border-box;color:#78909c;');
    	icon.innerHTML = `<svg id='bgicon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`;
        icon.setAttribute('title', 'Toggle BG Color');
    	icon.id = 'bg_color';
    	icon.onmouseover = function() {
    		this.style.color = '#2962FF';
    	}
    	icon.onmouseleave = function() {
            this.style.color = '#78909c';
    	}
    	icon.onclick = function() {
    		let icon = document.getElementById('bgicon');
    		let BG = document.body;
            let info_pg = document.getElementById('info_page');

    		if(self.store.get_key('bgcolor').name === 'light'){
    			BG.style.backgroundColor = '#111';
                info_pg.style.backgroundColor = '#111';
    			self.store.update('bgcolor', 'dark');
    		} else {
    			BG.style.backgroundColor = '#fff';
                info_pg.style.backgroundColor = '#fff';
    			self.store.update('bgcolor', 'light');
    		}
    	}

    	// swatch 
    	let swatch_h = swatch_handler();

    	bg_toggle.appendChild(text);
    	bg_toggle.appendChild(icon);

    	el_foot.appendChild(swatch_h[0]);
    	el_foot.appendChild(swatch_h[1]);
    	el_foot.appendChild(app_name);
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
                box.setAttribute("title", color);
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

        //get old data 
        let temp_color = self.store.get_key("temp_color");

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
    	hex_input.value = temp_color.color; //set the temp color
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
    	perc_input.value = temp_color.percent;
    	perc_input.onkeyup = function() {
    		let percent = this.value;
    		if(!is_percent(percent)){
    			this.style.color = '#f06292';
    		} else {	
    			this.style.color = '#78909c';
    		}
    	}

    	let btn = document.createElement('DIV');
    	btn.setAttribute('style', 'width:40px; height:40px; text-align:center; line-height:40px; float: left; padding: 8px; box-sizing:border-box;color:#78909c;')
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

            //save search color
            self.store.update('temp_color', {color: sel.value, percent: perc.value});

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

    	let shades = get_shades(temp_color.color, temp_color.percent);
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
		    	svg.setAttribute('data-color', color_arr.hex[counter]);
		    	svg.setAttribute('hex', color_arr.hex[counter]);
		    	svg.setAttribute('rgb', color_arr.rgb[counter]);
		    	svg.setAttribute('data-x', j);
		    	svg.setAttribute('data-y', i);
                svg.setAttribute("title", color_arr.hex[counter]);
		    	svg.onmouseover = function() {
		    		this.setAttributeNS(null, 'stroke', '#78909c');
		    		console.log(this.getAttribute('data-color'));
		    		//console.log(this.getAttribute('data-x'), this.getAttribute('data-y'))
		    	}
		    	svg.onmouseleave = function() {
		    		this.setAttributeNS(null, 'stroke', '#EEE');
		    	}
		    	svg.onclick = function() {
                    let color = this.getAttribute('data-color');

		    		this.setAttributeNS(null, 'stroke', '#2196F3');
		    		swap_colors(color, 'shades');
                    clipboard(color);
		    	}
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
    	page.setAttribute('style', 'width:'+self.boxW +'px; height:' + self.boxH+'px;');
        page.setAttribute('data-simplebar', '');
    	page.id = 'swatch_pg';

    	let swatch_data = self.store.get_key('swatches').reverse();
    	swatch_data.forEach((e) => {

    		let wrapper = document.createElementNS(self.xmlns, 'svg');
    		wrapper.setAttributeNS(null, 'viewBox', '0 0 ' + 244 + ' ' + 24);
    		wrapper.setAttributeNS(null, 'width', 240 + 'px');
    		wrapper.setAttributeNS(null, 'height', 24 + 'px');
    		wrapper.setAttributeNS(null, 'stroke-width', '1');
    		wrapper.setAttribute('style', 'padding:2px;');

    		let c = e;
    		let col = 0;
    		for(let i = 0; i < 4; i++){
                let g = document.createElementNS(self.xmlns, 'g');
                g.setAttribute('style', 'cursor:pointer !important;');
                g.setAttribute('data-color', c.color[i]);
                g.onclick = function() {
                    //console.log(this.getAttribute('data-color'));
                    clipboard(this.getAttribute('data-color'));
                }

    			let el = document.createElementNS(self.xmlns, 'rect');
    			el.setAttributeNS(null, 'width', 58 + 'px');
    			el.setAttributeNS(null, 'height', 22 + 'px');
    			el.setAttributeNS(null, 'stroke-width', '1');
    			el.setAttributeNS(null, 'x', col + 'px');
    			el.setAttributeNS(null, 'style', 'fill:'+c.color[i]);
    			el.setAttribute('data-color', c.color[i])
    			el.setAttribute('title', c.color[i]);
    			//el.onmouseover = function() {
    				//this.setAttributeNS(null, 'stroke', '#78909c');
    				//console.log(this.getAttribute('data-color'))
    			//}
    			//el.onmouseleave = function() {
    				//this.setAttributeNS(null, 'stroke', '');
    			//}
    			//el.onclick = function() {
    				//this.setAttributeNS(null, 'stroke', '#2196F3');
    				//console.log(this.getAttribute('data-color'));
    			//}

                let textcolor = document.createElementNS(self.xmlns, 'text');
                textcolor.setAttributeNS(null, 'y', 14 + 'px');
                textcolor.setAttributeNS(null, 'style', 'fill:#FFF');
                textcolor.setAttributeNS(null, 'x', col + 6 + 'px');
                textcolor.setAttributeNS(null, 'text-anchor', 'start');
                let textnode = document.createTextNode(c.color[i]);
                textcolor.appendChild(textnode);

                g.appendChild(el)
                g.appendChild(textcolor);
    			wrapper.appendChild(g);
    			col += 60;
    		}

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
        swap_colors(color, 'home');
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

    //swatch handler
   	var swatch_handler = function() {

   		//temp swatch colors
   		let temp_colors = self.store.get_key('temp_swatch');

   		//Swatch
    	let svgbox = document.createElementNS(self.xmlns, 'svg');
    	svgbox.setAttributeNS(null, 'viewBox', '0 0 ' + 100 + ' ' + 40);
    	svgbox.setAttributeNS(null, 'width', 100 + 'px');
    	svgbox.setAttributeNS(null, 'height', 40 + 'px');

    	// TODO :: add svg colors
    	var col = 12;
    	for(let i = 0; i < 4; i++) {
    		let circle = document.createElementNS(self.xmlns, 'circle');
    		circle.setAttributeNS(null, 'width', 25 + 'px');
    		circle.setAttributeNS(null, 'height', 25 + 'px');
    		circle.setAttributeNS(null, 'cx', col + 'px');
    		circle.setAttributeNS(null, 'cy', 20 + 'px');
    		circle.setAttributeNS(null, 'stroke', '#78909c');
    		circle.setAttributeNS(null, 'stroke-width', '2');
    		circle.setAttributeNS(null, 'style', 'fill:'+temp_colors[i]);

    		circle.setAttributeNS(null, 'r', 10);
    		circle.onmouseover = function() {
    			this.setAttributeNS(null, 'stroke', '#78909c');
    		}
    		circle.onmouseleave = function() {
    			this.setAttributeNS(null, 'stroke', '#78909c');
    		}
    		circle.onclick = function() {
    			this.setAttributeNS(null, 'stroke', '#2196F3');
    		}

    		svgbox.appendChild(circle);
    		col += 25;
    	}

    	//save btn
    	let savebtn = document.createElement('DIV');
    	savebtn.setAttribute('style', 'width:40px;height:40px;float:left;padding:8px;box-sizing:border-box;color:#78909c;');
    	savebtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
        savebtn.setAttribute('title', 'Save Swatch');
    	savebtn.onmouseover = function() {
    		this.style.color = '#2962FF';
    	}
    	savebtn.onmouseleave = function() {
    		this.style.color = '#78909c';
    	}
    	savebtn.onclick = function() {
    		this.style.color = '#2196F3';

            //get the swatch array
            let swatch_arr = self.store.get_key('swatches');
    		//get current swatch section data and save it and a new swatch
    		let temp_colors = self.store.get_key('temp_swatch');

            let color_found = false;
            //compare swatch before save to avoid duplicate
            swatch_arr.forEach((e) => {
                if(e.color[0] == temp_colors[0] && e.color[1] == temp_colors[1] && e.color[2] == temp_colors[2] && e.color[3] == temp_colors[3]) {
                    color_found = true;
                }
            });

            let save_swatch = {
                id: uuid(),
                color: temp_colors,
            }

            if(!color_found) {
                //save data
                self.store.update('swatches', save_swatch);
            }
    	}

    	//Color
    	let swatch_c = document.createElement('DIV');
    	swatch_c.setAttribute('style', 'width:100px;height:40px;float:left;');
    	swatch_c.appendChild(svgbox);

    	return [swatch_c, savebtn];
   	}

   	//swap swatch colors
   	var swap_colors = function(color="#EEE", pageRef) {

   		var page = null;
   		switch(pageRef) {
   			case 'home':
   				page = colorgrid_pg();	
   				break;
   			case 'shades':
   				page = shade_pg();
   				break;
   			case 'swatches':
   				page = swatch_pg();
   				break;
   			default:
   				break;
   		}
   		let temp_colors = self.store.get_key('temp_swatch');

   		//swap colors
   	 	let temp = "";
   	 	temp_colors.unshift(color);
   	 	temp_colors.pop();
   	 	//save data
   	 	self.store.update('temp_swatch', temp_colors);

   		//refresh content
   		self.render(page, header);
   	}

    var tippy = function() {
        var script = document.createElement('script');
        script.innerHTML = "tippy('[title]');";
        return script;
    }

    //render the page
    this.render = function(page=colorgrid_pg(), header=header_btns()) {
    	this.el.innerHTML = "";
    	this.el.appendChild(header);
    	this.el.appendChild(page);
    	this.el.appendChild(footer_pg());
        this.el.appendChild(info_pg());
        this.app.appendChild(this.el);
        this.app.appendChild(tippy());
        console.log('colorGRID initialized');
    }
}