import ServiceManageModule from './serviceManage'
import ServiceManageController from './serviceManage.controller';
import ServiceManageComponent from './serviceManage.component';
import ServiceManageTemplate from './serviceManage.html';

describe('ServiceManage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ServiceManageModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ServiceManageController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(ServiceManageTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ServiceManageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ServiceManageTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ServiceManageController);
      });
  });
});
