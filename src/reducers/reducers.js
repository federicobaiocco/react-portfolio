import {FIX_HEADER, HIDE_NAVBAR, SHOW_NAVBAR, UNFIX_HEADER, UPDATE_SCROLL_POS, SET_SKILLS, SET_DEGREES, SET_EXPERIENCES} from '../actions/actions';
const initialState = {
    experiences: [
    ],
    skills: [
    ],
    degrees: [

    ],
    header : {
        headerState: 'normal'
    },
    navbar: {
        prevScrollpos: window.pageYOffset,
        visible: true
    }
};

function reducer(state = initialState, action) {
    if (action.type === FIX_HEADER) {
        return Object.assign({}, state, {
            header: {headerState: 'fixedTop'}
        });
    }
    if (action.type === UNFIX_HEADER) {
        return Object.assign({}, state, {
            header: {headerState: 'normal'}
        });
    }
    if (action.type === HIDE_NAVBAR) {
        return Object.assign({}, state, {
            navbar: {visible: false, prevScrollpos: state.navbar.prevScrollpos}
        });
    }
    if (action.type === SHOW_NAVBAR) {
        return Object.assign({}, state, {
            navbar: {visible: true, prevScrollpos: state.navbar.prevScrollpos}
        });
    }
    if (action.type === UPDATE_SCROLL_POS) {
        return Object.assign({}, state, {
            navbar: {prevScrollpos: action.payload, visible: state.navbar.visible}
        });
    }
    if (action.type === SET_SKILLS) {
        return Object.assign({}, state, {
           skills: action.payload
        });
    }
    if (action.type === SET_DEGREES) {
        return Object.assign({}, state, {
            degrees: action.payload
        });
    }
    if (action.type === SET_EXPERIENCES) {
        return Object.assign({}, state, {
            experiences: action.payload
        });
    }
    return state;
}
export default reducer;