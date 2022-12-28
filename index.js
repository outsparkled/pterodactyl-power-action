const core = require('@actions/core');
const fetch = require("node-fetch");

let panelUrl = core.getInput('panel-url', {required: true});
let serverId = core.getInput('server-id', {required: true});
let bearerToken = core.getInput('bearer-token', {required: true});
let powerAction = core.getInput('power-action');

if (panelUrl.endsWith("/")) panelUrl = panelUrl.substring(0, panelUrl.length - 1);
if (!powerAction) powerAction = "restart";

let url;
try {
    url = new URL(`${panelUrl}/api/client/servers/${serverId}/power`);
} catch (e) {
    core.setFailed("Malformed URL")
    process.exit(1);
}

const headers = {
    "Authorization": `Bearer ${bearerToken}`,
    "Content-Type": "application/json" // not including Content-Type will cause the request to fail in weird ways
};

const body = {signal: powerAction};

fetch(url.toString(), {
    method: "POST", headers: headers, body: JSON.stringify(body)
}).then(async (res) => {
    if (res.ok) {
        core.info(`Success! Got ${res.status} ${res.statusText}`)
        process.exit(0);
    } else {
        core.setFailed(`Non-OK response! Got ${res.status} ${res.statusText}: ${await res.text()}`);
        process.exit(1);
    }
});
