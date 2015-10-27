import device;
import qrscanner;

import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;

var BG_WIDTH = 576;
var BG_HEIGHT = 1024;

exports = Class(GC.Application, function () {

  this.initUI = function () {
    this.view.style.backgroundColor = "#FFFFFF";

    this.setScreenDimensions(BG_WIDTH > BG_HEIGHT);

    this._button2 = new ButtonView({
      superview: this.view,
      width: 200,
      height: 60,
      x: BG_WIDTH / 2 - 100,
      y: 250,
      backgroundColor : "#7f8c8d",
      // images: {
      //   up: "resources/images/blue1.png",
      //   down: "resources/images/blue2.png",
      //   disabled: "resources/images/white1.png"
      // },
      scaleMethod: "9slice",
      sourceSlices: {
        horizontal: {left: 80, center: 116, right: 80},
        vertical: {top: 10, middle: 80, bottom: 10}
      },
      destSlices: {
        horizontal: {left: 40, right: 40},
        vertical: {top: 4, bottom: 4}
      },
      title: "QR CODE",
      text: {
        color: "#000044",
        size: 16,
        autoFontSize: false,
        autoSize: false
      },
      on:{
            up: bind(this, "onQRCode")
      }
    });
    new TextView({
      superview: this.view,
      width: 200,
      height: 60,
      x: BG_WIDTH / 2 - 100,
      y: 100,
      text: "Scanner App",
      size: 70,
      fontFamily: "Arial Black",
      clip: true
    });
    new ButtonView({
      superview: this.view,
      width: 200,
      height: 60,
      x: BG_WIDTH / 2 - 100,
      y: 350,
      backgroundColor : "#7f8c8d",
      // images: {
      //   up: "resources/images/blue1.png",
      //   down: "resources/images/blue2.png"
      // },
      scaleMethod: "9slice",
      sourceSlices: {
        horizontal: {left: 80, center: 116, right: 80},
        vertical: {top: 10, middle: 80, bottom: 10}
      },
      destSlices: {
        horizontal: {left: 40, right: 40},
        vertical: {top: 4, bottom: 4}
      },
      on: {
        down: bind(this._button2, "setState", ButtonView.states.UP)
      },
      title: "BAR CODE",
      text: {
        color: "#000044",
        size: 16,
        autoFontSize: false,
        autoSize: false
      },
      on:{
            up: bind(this, "onBarCode")
      }
    });
  };

  this.onQRCode = function() {
    qrscanner.scanQRCode();
  }

  this.onBarCode = function() {
    qrscanner.scanBarCode();
  }

  /**
   * setScreenDimensions
   * ~ normalizes the game's root view to fit any device screen
   */
  this.setScreenDimensions = function(horz) {
    var ds = device.screen;
    var vs = this.view.style;
    vs.width = horz ? ds.width * (BG_HEIGHT / ds.height) : BG_WIDTH;
    vs.height = horz ? BG_HEIGHT : ds.height * (BG_WIDTH / ds.width);
    vs.scale = horz ? ds.height / BG_HEIGHT : ds.width / BG_WIDTH;
  };

  this.launchUI = function () {};
});