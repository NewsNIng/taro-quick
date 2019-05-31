
import counterStore from './counter';
import UserStore from './user';
import AppStore from './app';

export enum EStore {
    userStore = 'userStore',
    appStore = 'appStore',
}

const store = {
    counterStore,
    userStore: new UserStore(),
    appStore: new AppStore(),
}

export default store

export const getStore = () => {return store}

