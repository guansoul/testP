import AutomenuModule from './automenu'
import AutomenuController from './automenu.controller';
import AutomenuComponent from './automenu.component';
import AutomenuTemplate from './automenu.html';

describe('Automenu', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AutomenuModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AutomenuController();
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
      expect(AutomenuTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AutomenuComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AutomenuTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AutomenuController);
      });
  });
});
