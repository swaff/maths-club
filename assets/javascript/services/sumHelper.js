const operatorMap = {
    addition: '+',
    subtraction: '-',
    multiplication: '×',
    division: '÷'
};

const decorateSum = (sum) => {
    sum.sign = operatorMap[sum.operator];
    return sum;
};

/**
 * Takes in a sum object and returns an answer object which is very similar
 * but contains less properties ready to be saved to the data store
 */
const getAnswerFromSum = (sum) => {
    const { left, operator, right, answer, result } = sum;
    return { left, operator, right, answer, result };
};

const isCorrect = sum => sum.result == sum.answer;

const getResultTemplate = (sums) => {
    return {
        created: new Date(),
        club: sums.length,
        answers: {
            correct: [],
            incorrect: []
        },
        score () {
            return this.answers.correct.length;
        }
    };
};

const getResult = (sums) => {

    const result = getResultTemplate(sums);

    sums.forEach(sum => {
        const destination = isCorrect(sum) ? result.answers.correct : result.answers.incorrect;
        destination.push(getAnswerFromSum(sum));
    });
    return result;
};

module.exports = function () {
    return { decorateSum, getResult };
};
