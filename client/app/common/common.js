/**
 * @author name emailAddress
 */

'use strict';

import angular from 'angular';
import './commonheader/commonheader';
import './commonmenu/commonmenu';
import './automenu/automenu';
import './cimenu/cimenu';
import './cloudmenu/cloudmenu';

let commonModule = angular.module('app.common', [
  'commonmenu',
  'commonheader',
  'automenu',
  'cimenu',
  'cloudmenu'
]);

export default commonModule;
