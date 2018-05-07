import { observable, action, computed } from 'mobx';
import Firebase from 'firebase'

import {db} from '../firebase.js'

class UserStore {
  // to be implemented later on
  @observable user = {}
  @observable apps = []
  
  @action
  addApp = (app) => {
    const addApp = {
      ...app,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      updatedAt: Firebase.database.ServerValue.TIMESTAMP,
    }
    const key = localStorage.getItem('key');
    db.ref(`users/${key}/apps`).push(addApp);
  };

  search = (searchkey) => {
    const key = localStorage.getItem('key');
    db.ref(`users/${key}/apps`).once('value', (snapshot) => {
      this.apps = []
      snapshot.forEach(element => {
        const app = { ...element.val(), key: element.key };
        app.showedPassword = '*'.repeat(app.password.length);
        if(app.app.includes(searchkey)) {
          this.apps.push(app);
        }
      })
    })
  }

  getAppList = () => {
    console.log('get app list')
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

  checkPassword = (password, index) => {
    console.log('masuk check password')
    db.ref('users').once('value', (snapshot) => {
      snapshot.forEach(element => {
        const email = localStorage.getItem('email')
        const user = element.val();
        if (user.email === email && user.password === password) {
          console.log(element)
          this.showPassword(index);
        }
      })
    })
  }

  showPassword = (index) => {
    this.apps[index].showedPassword = this.apps[index].password;
  }

  editApp = (appkey, objApp) => {
    const key = localStorage.getItem('key');
    console.log('key', appkey)
    console.log('obk', objApp)
    objApp.updatedAt = Firebase.database.ServerValue.TIMESTAMP;
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
          console.log(element);
          localStorage.setItem('key', element.key);
          localStorage.setItem('email', user.email);
          this.user = { ...objUser };
        }
      })
    })
  }

  register = (objUser) => {
    console.log(objUser)

    const obj = {
      ...objUser,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      updatedAt: Firebase.database.ServerValue.TIMESTAMP,
      apps: []
    }
    console.log('ini obj', obj)
    db.ref('users').push({...obj})

    // this.login(objUser)
  }

  @computed
  get appCount() {
    return this.apps.length;
  }
}

export default new UserStore();