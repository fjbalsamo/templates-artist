import Questions from '../src/core/Questions';

const questions = Questions.readQuestions(
  process.cwd() + '/example-questions.json'
);

describe('Test Questions', () => {
  it('TODO', () => {
    expect(1 + 1).toEqual(2);
  });

  describe('matchWitchAnswers', () => {
    it('should matchWitchAnswers', () => {
      const answers = {
        name: 'hola',
        confirm: true,
        yearsOld: 18,
        food: 'pizza',
        cars: 'camaro',
        ide: 'vsc',
      };

      const results = Questions.matchWitchAnswers({
        answers,
        questions,
      });

      expect(results).toEqual([]);
    });
  });

  it('should error with missing answer', () => {
    const answers = {
      name: 'hola',
      confirm: true,
      yearsOld: 18,
      cars: 'camaro',
      ide: 'vsc',
    };

    const results = Questions.matchWitchAnswers({
      answers,
      questions,
    });

    expect(results).toEqual([{
      messageError: 'Missing answer for food',
      name: 'food',
    }]);
  });

  it('should error with missing question', () => {
    const answers = {
      name: 'hola',
      description: 'Muy bien',
      confirm: true,
      yearsOld: 18,
      food: 'pizza',
      cars: 'camaro',
      ide: 'vsc',
    };
    
    const results = Questions.matchWitchAnswers({
      answers,
      questions,
    });

    expect(results).toEqual([{
      messageError: 'Missing question for description',
      name: 'description',
    }]);
  });
});
