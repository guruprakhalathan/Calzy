export const LOAD_ALL_QUESTIONS = 'LOAD_ALL_QUESTIONS';

export function loadAllQuetions() {
    return (dispatch) => {
        let loadArr = [];
        let stepsNum = 5;
        let steps = [];
        let getFile = (step) => {
            return $.getJSON('contents/questions/step' + (step + 1) + '.json').then((data) => {
                steps[step] = data;
            });
        };
        for (let i = 0; i < stepsNum; i++) {
            loadArr.push(getFile(i));
        }
        return $.when.apply(null, loadArr).then(() => {
            return dispatch({
                type: LOAD_ALL_QUESTIONS,
                steps: steps
            });
        });
    };
}