/**
 * (description)
 * 
 * @author yourname
 */
import bluebackground from "./image/bluebackground.png";
import blueline from "./image/blueline.png";
import graybackground from "./image/graybackground.png";
import grayline from "./image/grayline.png";

export default class NebulaStepsController {
  constructor() {
    this.name = 'nebulaSteps';
    this.lineb=blueline;
    this.lineg=grayline;
    this.backb=bluebackground;
    this.backg=graybackground;
  }
  log(param){
  	console.log(param);
  }
}