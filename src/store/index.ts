
import counterStore from './counter';
import UserStore from './user';

export default {
    counterStore,
    userStore: new UserStore(),
}

export enum EStore {
    userStore = 'userStore',
}