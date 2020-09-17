import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
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

const formState = {
  inputValue: '',
  checkbox1: false,
  checkbox2: false,
  buttonSearch: 'waiting',
  choosedLanguage: null,
  findedJobs: [],
}

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

const formJobState = handleActions({
  [actions.onNavForm](state) {
    state.buttonSearch = 'disabled';
    (async () => {
      const where = encodeURIComponent(JSON.stringify({ "title": state.inputValue }));
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Occupations_Job?limit=10&order=title&keys=title&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id': 'Tt2Q2v6qgiPaPMceP9WFM4tuImZv86A1CQX4bubI',
            'X-Parse-REST-API-Key': 'pxsNa9SN6tsy4fisJZ6KQIFAvlmmY2o77A9RYov2',
          }
        }
      );
      if (await response.ok) state.buttonSearch = 'waiting';
      const data = await response.json();
      state.findedJobs = [ ...data.results ];
      console.log(JSON.stringify(data, null, 2));
      return { ...state };
    })();
  },
  [actions.onChangeSearchJob](state, { payload: { value } }) {
    state.inputValue = value;
    return { ...state };
  },
  [actions.clickCheckbox](state, { payload: { id } }) {
    state[id] = !state[id];
    return state;
  },
  [actions.choosingCoutnry](state, { payload: { value } }) {
    state.choosedLanguage = value;
    return { ...state };
  }
}, formState);

const buttonFindMore = handleActions({
  [actions.clickFindMore](state) {

    return state === 'waiting' ? 'active' : 'waiting';
  }
}, 'waiting');

const mailField = handleActions({
  [actions.subscribe](state) {
    const { mailText, emailsIds, emailByID } = state;
    state.subscribeOn = true;
    const id = _.uniqueId();
    state.emailByID[id] = { mail: mailText, id };
    emailsIds.push(id);
    return { mailText: '', ...state };
  },
  [actions.fillMail](state, { payload: { value } }) {
    state.mailText = value;
    return { ...state };
  }
}, { mailText: '', subscribeOn: false, emailByID: {}, emailsIds: [] });

export default combineReducers({
  linksNavState,
  buttonFindMore,
  formJobState,
  mailField,
  // form: formReducer,
});