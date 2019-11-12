import {
    FIX_HEADER,
    HIDE_NAVBAR,
    SHOW_NAVBAR,
    UNFIX_HEADER,
    UPDATE_SCROLL_POS,
    SET_SKILLS,
    SET_DEGREES,
    SET_EXPERIENCES,
    SHOW_SNACKBAR,
    HIDE_SNACKBAR,
    SHOW_EXPERIENCES_FORM,
    HIDE_EXPERIENCES_FORM,
    DELETE_EXPERIENCE,
    DELETE_SKILL,
    HIDE_SKILLS_FORM,
    SHOW_SKILLS_FORM, ADD_EXPERIENCE, ADD_SKILL, SHOW_DEGREES_FORM, HIDE_DEGREES_FORM, ADD_DEGREE, DELETE_DEGREE
} from '../actions/actions';
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
    },
    snackBar: {
        showSnackBar: false,
        snackbarMessage: '',
        snackbarVariant: 'info'
    },
    experiencesForm: {
        show: false
    },
    skillsForm: {
        show: false
    },
    degreesForm: {
        show: false
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
    if (action.type === SHOW_SNACKBAR) {
        return Object.assign({}, state, {
            snackBar: {
                showSnackBar: true,
                snackbarMessage: action.payload.message,
                snackbarVariant: action.payload.variant
            }
        });
    }
    if (action.type === HIDE_SNACKBAR) {
        return Object.assign({}, state, {
            snackBar: {
                showSnackBar: false,
                snackbarMessage: '',
                snackbarVariant: 'info'
            }
        });
    }
    if (action.type === SHOW_EXPERIENCES_FORM) {
        return Object.assign({}, state, {
            experiencesForm: {
                show: true
            }
        });
    }
    if (action.type === HIDE_EXPERIENCES_FORM) {
        return Object.assign({}, state, {
            experiencesForm: {
                show: false
            }
        });
    }
    if (action.type === DELETE_EXPERIENCE) {
        return Object.assign({}, state, {
            experiences: [...state.experiences.filter(exp => exp._id !== action.payload)]
        });
    }
    if (action.type === SHOW_SKILLS_FORM) {
        return Object.assign({}, state, {
            skillsForm: {
                show: true
            }
        });
    }
    if (action.type === HIDE_SKILLS_FORM) {
        return Object.assign({}, state, {
            skillsForm: {
                show: false
            }
        });
    }
    if (action.type === DELETE_SKILL) {
        return Object.assign({}, state, {
            skills: [...state.skills.filter(skill => skill._id !== action.payload)]
        });
    }
    if (action.type === DELETE_DEGREE) {
        return Object.assign({}, state, {
            degrees: [...state.degrees.filter(degree => degree._id !== action.payload)]
        });
    }
    if (action.type === ADD_EXPERIENCE) {
        return Object.assign({}, state, {
            experiences: [...state.experiences, action.payload]
        });
    }
    if (action.type === ADD_SKILL) {
        return Object.assign({}, state, {
            skills: [...state.skills, action.payload]
        });
    }
    if (action.type === ADD_DEGREE) {
        return Object.assign({}, state, {
            degrees: [...state.degrees, action.payload]
        });
    }
    if (action.type === SHOW_DEGREES_FORM) {
        return Object.assign({}, state, {
            degreesForm: {
                show: true
            }
        });
    }
    if (action.type === HIDE_DEGREES_FORM) {
        return Object.assign({}, state, {
            degreesForm: {
                show: false
            }
        });
    }
    return state;
}
export default reducer;