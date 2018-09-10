"use strict"

//generate the colors
function gen_colors() {
	this.base = 16;
	this.shade= 0.05;

	this.gen_hex_shades = function(color, percent=this.shade) {

		//slice and convert to base 16
		let base=parseInt(color.slice(1),this.base);
		let t=percent<0?0:255;
		let p=percent<0?percent*-1:percent;
		let R=base>>16;
		let G=base>>8&0x00FF;
		let B=base&0x0000FF;

		let hex_color = "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
		let rgb_color = `rgb(${R},${G},${B})`;

    	return [hex_color, rgb_color];
	}
}