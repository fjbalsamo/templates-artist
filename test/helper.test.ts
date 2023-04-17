import Handlebars from 'handlebars';
import Helpers from '../src/core/Helpers';

describe('Custom Handlebars Helpers', function() {
  Helpers.init();
  const helpers = Handlebars.helpers;

  describe('The "ife" markup helper', function() {
    it('should be registered', function() {
      expect(helpers.ife).toBeDefined();
    });
    it('should show the corresponding value', function() {
      const expected = 'ts';
      const compileTemplate = Handlebars.compile('{{ife framework "js" "js" "ts"}}');
      const results = compileTemplate({framework: 'ts'});
      expect(results).toEqual(expected);
    });
  });
});
