export const SET_PERSONALIZED_PAYLOAD = 'SET_PERSONALIZED_PAYLOAD';

function sendPersonalizedPayload(payload) {
    return {
        type: SET_PERSONALIZED_PAYLOAD,
        payload: payload
    };
}

export function setProjectName(projectName, round) {
    return (dispatch, getState) => {
        let state = getState();
        let personalize = state.answers.personalize;
        personalize['projectName'][round] = projectName;
        dispatch(sendPersonalizedPayload({
            projectName: personalize['projectName']
        }));
    };
}

export function setPreparedFor(preparedFor) {
    return (dispatch, getState) => {
        dispatch(sendPersonalizedPayload({
            preparedFor: preparedFor
        }));
    };
}

export function setPreparedBy(preparedBy) {
    return (dispatch, getState) => {
        dispatch(sendPersonalizedPayload({
            preparedBy: preparedBy
        }));
    };
}