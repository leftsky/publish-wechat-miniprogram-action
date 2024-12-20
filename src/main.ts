import {getInput} from "@actions/core";
import path from "path";
import fs from "fs";
import * as exec from "@actions/exec";

const projectPath = getInput('projectPath');
const uploadKey = getInput('uploadKey');
const type = getInput('type') || 'miniProgram';
const version = getInput('version');
const description = getInput('description') || '';
const robot = getInput('robot') || 1;
const env = getInput('env') || 'prod';

if (!projectPath || !uploadKey || !version) {
    throw new Error('请配置projectPath, uploadKey, version');
}

const keyFile = path.resolve("./uploadkey.key");
// 检查目录是否存在，若不存在则创建
const dir = path.dirname(keyFile);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true}); // 创建目录
}
// 创建文件
fs.writeFileSync(keyFile, uploadKey);
// fs.chmodSync(keyFile, '600');

const argvs = ['mp-ci', 'upload',
    projectPath,
    `--pkp=${keyFile}`,
    `--type=${type}`,
    `--ver="${version}"`,
    `--desc="${description}"`,
    `--robot=${robot}`,
    `--env=${env}`
];

console.log('argvs', argvs);

exec.exec('npx', argvs, {
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

