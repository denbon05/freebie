import { createAction } from 'redux-actions';

export const clickOnNavLink = createAction("CLICK_NAV_LINK");

export const onNavForm = createAction("ON_NAV_FORM");
export const onChangeSearchJob = createAction("ONCHANGE_JOB");
export const clickCheckbox = createAction("CLICK_CHECKBOX");
export const choosingCoutnry = createAction("CHOSE_COUNTRY");

export const clickFindMore = createAction("FIND_MORE");