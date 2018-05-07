import { observable, action, computed } from 'mobx';
import {db} from '../firebase.js'

class UserStore {
  // to be implemented later on
  @observable user = {}
  @observable apps = []
  
  @action
  addApp = (app) => {
    const key = localStorage.getItem('key');
    db.ref(`users/${key}/apps`).push(app);
  };

  getAppList = () => {
    const key = localStorage.getItem('key');
    db.ref(`users/${key}/apps`).once('value', (snapshot) => {
      this.apps = []
      snapshot.forEach(element => {
        const app = { ...element.val(), key: element.key };
        app.showedPassword = '*'.repeat(app.password.length);
        this.apps.push(app);
      })
    })
  }

  showPassword = (index) => {
    this.apps[index].showedPassword = this.apps[index].password;
  }

  editApp = (appkey, objApp) => {
    const key = localStorage.getItem('key');
    console.log('key', appkey),
    console.log('obk', objApp)
    db.ref(`users/${key}/apps/${appkey}`).set({ ...objApp })
  }

  deleteApp = (appkey) => {
    console.log('masuk')
    const key = localStorage.getItem('key');
    console.log(appkey)
    db.ref(`users/${key}/apps/${appkey}`).remove()
    this.getAppList();
  }

  login = (objUser) => {
    db.ref('users').once('value', (snapshot) => {
      snapshot.forEach(element => {
        const user = element.val();
        if (user.email === objUser.email && user.password === objUser.password) {
          console.log(element)
          localStorage.setItem('key', element.key);
          localStorage.setItem('email', user.email);
          this.user = objUser;
        }
      })
    })
  }

  register = (objUser) => {
    db.ref('users').push({
      ...objUser,
      apps: []
    })
  }

  @computed
  get appCount() {
    return this.apps.length;
  }
}

export default new UserStore();