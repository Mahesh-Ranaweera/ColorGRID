"use strict"

//store local app data
function app_data() {
	this.app_name = 'colorgrid';
	
	//store data
	this.default = {
		bgcolor: '',
	}

	//store preset data
	this.preset  = {
		bglight: {
			name: 'light',
			color: '#fff',
		},
		bgdark : {
			name: 'dark',
			color: '#111',
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
				if(value === 'dark'){ save = this.preset.bgdark; } else { save = this.preset.bglight; }
				get_data.bgcolor = save; 
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