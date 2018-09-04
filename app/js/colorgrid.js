/**
 * Color GRID
 */

function colorGRID() {
    this.ui = new UI();

    this.init = function() {
        //set the size of window
        this.ui.set_size();
        //set the bg color
        this.ui.set_bg_color();
        //init the ui
        this.ui.render();
    }
}