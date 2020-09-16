// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
// import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions/index.js';

const linksNav = {
  activeLink: 'home',
  linksById: {
    home: { id: 'home', text: 'home', state: 'active' },
    aboutUs: { id: 'aboutUs', text: 'about us', state: 'deactive' },
    jobs: { id: 'jobs', text: 'jobs', state: 'deactive' },
    clients: { id: 'clients', text: 'clients', state: 'deactive' },
    employers: { id: 'employers', text: 'employers', state: 'deactive' },
    contact: { id: 'contact', text: 'contact us', state: 'deactive' },
  },
  allIds: ["contact", "employers", "clients", "jobs", "aboutUs", "home"],
};

const linksNavState = handleActions({
  [actions.clickOnNavLink](state, { payload: { id } }) {
    const { linksById, allIds } = state;
    allIds.forEach((key) => {
      linksById[key].state = linksById[key].id === id ?  'active' : 'deactive';
    });
    return {
      linksById,
      allIds,
      activeLink: id,
    };
  },
}, linksNav);

export default combineReducers({
  linksNavState,
  // form: formReducer,
});