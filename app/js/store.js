"use strict"

//store local app data
function app_data() {
	this.app_name = 'colorgrid';
	
	//store data || default
	this.default = {
		bgcolor: {
			name: 'dark',
			color: '#111',
		},
		opentab: {
			name: 'home',
		},
		//swatches
		swatches: [],
		//temp swatch
		temp_swatch: ['#EEE', '#EEE', '#EEE', '#EEE'],
		temp_color : {
			color: '#EEE',
			percent: '0.1',
		},
	}

	//store preset data
	this.preset  = {
		//bg colors
		bg: {
			light: {
				name: 'light',
				color: '#fff',
			},
			dark : {
				name: 'dark',
				color: '#111',
			}	
		},
		//tabs
		tabs: {
			home: {
				name: 'home',
			},
			shades: {
				name: 'shades',
			},
			swatches: {
				name: 'swatches',
			}
		}
	}

	//set the data
	this.set = function(data) {
		if(typeof(localStorage) !== 'undefined') {
			try {
				localStorage.setItem(this.app_name, JSON.stringify(data));
				return true;
			} catch(e) {
				throw "localStorage Error" + e;
			}
		} else {
			return false;
		}
	}

	//get the data
	this.get = function() {
		if(typeof(localStorage) !== 'undefined') {
			try {
				return JSON.parse(localStorage.getItem(this.app_name));
			} catch(e) {
				throw "localStorage Error" + e;
			}
		} else {
			return null;
		}
	}

	//get value of key
	this.get_key = function(key) {
		if(typeof(localStorage) !== 'undefined') {
			try {
				let get_data = JSON.parse(localStorage.getItem(this.app_name));
				return get_data[key];
			} catch(e) {
				throw "localStorage Error" + e;
			}
		} else {
			return null;
		}
	}

	//update
	this.update = function(key, value) {
		let get_data = this.init();

		let save = '';
		switch(key) {
			case 'bgcolor':
				save = this.preset.bg[value];
				get_data.bgcolor = save; 
				break;
			case 'opentab':
				save = this.preset.tabs[value];
				get_data.opentab = save; 
				break;
			case 'temp_swatch':
				get_data.temp_swatch = value;
				break;
			case 'temp_color':
				get_data.temp_color = value;
				break;
			case 'swatches':
				get_data.swatches.push(value);
				break;
			default:
				break;
		}

		this.set(get_data);
	}

	//init data || if no data available
	this.init = function() {
		let curr_data = this.get();

		if(curr_data == null || curr_data == "undefined") {
			//set data 
			this.set(this.default);
			return this.default;
		} else {
			return curr_data;
		}
	}
}