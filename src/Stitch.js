import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import {STITCH_CONFIG} from './config.js';

let client = Stitch.initializeDefaultAppClient(STITCH_CONFIG);

const getLeafies = () => {
    return client.callFunction("getLeafies")
}

const getSingleLeafy = (id) => {
    return client.callFunction("getSingleLeafy", [id])
}

const saveLeafy = (leafy) => {
    return client.callFunction("saveLeafy", [leafy]);
}

export { client, getLeafies, getSingleLeafy, saveLeafy };