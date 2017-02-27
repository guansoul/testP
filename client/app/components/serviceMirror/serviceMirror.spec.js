import ServiceMirrorModule from './serviceMirror'
import ServiceMirrorController from './serviceMirror.controller';
import ServiceMirrorComponent from './serviceMirror.component';
import ServiceMirrorTemplate from './serviceMirror.html';

describe('ServiceMirror', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ServiceMirrorModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ServiceMirrorController();
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
      expect(ServiceMirrorTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ServiceMirrorComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ServiceMirrorTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ServiceMirrorController);
      });
  });
});
