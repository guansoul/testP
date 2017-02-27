import stepsPageComponent from './stepsPage.component';
import steps from "../nebulaSteps/nebulaSteps.js";

export default angular.module('stepsPage', [steps.name])
.component('stepsPage', stepsPageComponent);
