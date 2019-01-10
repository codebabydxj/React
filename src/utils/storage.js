class Storage {
    constructor() {
        this.sessionStorage = window.sessionStorage;
        this.localStorage   = window.localStorage;
    }

    getSessionStorage(key) {
        return this.sessionStorage.getItem(key);
    }

    setSessionStorage(key, value) {
        if(value instanceof Object) {
            this.sessionStorage.setItem(key, JSON.stringify(value));
            return;
        }
        this.sessionStorage.setItem(key, value);
    }

    removeSessionStorage(key) {
        this.sessionStorage.removeItem(key);
    }

    getLocalStorage(key) {
        return this.localStorage.getItem(key);
    }

    setLocalStorage(key, value) {
        if(value instanceof Object) {
            this.localStorage.setItem(key, JSON.stringify(value));
            return;
        }
        this.localStorage.setItem(key, value);
    }

    removeLocalStorage(key) {
        this.localStorage.removeItem(key);
    }
}

export default Storage;