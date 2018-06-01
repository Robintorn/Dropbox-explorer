import { Dropbox } from "dropbox/src/index";

let instance;

// invoke after successful login
export const createDropbox = accessToken => {
    instance = new Dropbox({ accessToken });
};

// invoke when calling dropbox API.
export const getDropbox = () => {
    return instance;
};