import {getInput} from "@actions/core";
import path from "path";
import fs from "fs";
import * as exec from "@actions/exec";

const codesDir = getInput('uploadKey');
const uploadKey = getInput('uploadKey');
const type = getInput('type') || 'miniProgram';
const version = getInput('version');
const description = getInput('description') || '';
const robot = getInput('robot') || 1;
const env = getInput('env') || 'prod';

if (!codesDir || !uploadKey || !version) {
    throw new Error('请配置codesDir, uploadKey, version');
}

const keyFile = path.join(codesDir, './uploadkey.key');
fs.writeFileSync(keyFile, uploadKey);
// fs.chmodSync(keyFile, '600');

exec.exec('npx', ['mp-ci', 'upload',
    codesDir,
    `--pkp=${keyFile}`,
    `--type=${type}`,
    `--ver="${version}"`,
    `--desc="${description}"`,
    `--robot=${robot}`,
    `--env=${env}`
], {
    listeners: {
        stdout: (data: Buffer) => {
            console.log('stdout', data.toString());
        },
        stderr: (data: Buffer) => {
            console.error(data.toString());
        }
    }
}).then(res => {
    console.log(res);
});

