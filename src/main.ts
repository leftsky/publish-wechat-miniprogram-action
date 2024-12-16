import {getInput} from "@actions/core";
import path from "path";
import fs from "fs";
import * as ci from 'miniprogram-ci';

const appid = getInput('appid');
const projectPath = getInput('projectPath');
const uploadKey = getInput('uploadKey');
let type: "miniProgram" | "miniGame" | "miniProgramPlugin" | "miniGamePlugin";
switch (getInput('type')) {
    case 'miniProgram':
        type = 'miniProgram';
        break;
    case 'miniGame':
        type = 'miniGame';
        break;
    case 'miniProgramPlugin':
        type = 'miniProgramPlugin';
        break;
    case 'miniGamePlugin':
        type = 'miniGamePlugin';
        break;
    default:
        type = 'miniProgram';
}
const version = getInput('version');
const description = getInput('description') || '';
const robot = parseInt(getInput('robot') || "1");
const env = getInput('env') || 'prod';

if (!appid || !projectPath || !uploadKey || !version) {
    throw new Error('请配置 appid, projectPath, uploadKey, version');
}

const privateKeyPath = path.resolve("./uploadkey.key");
// 检查目录是否存在，若不存在则创建
const dir = path.dirname(privateKeyPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true}); // 创建目录
}
// 创建文件
fs.writeFileSync(privateKeyPath, uploadKey);
// fs.chmodSync(keyFile, '600');

const argvs = ['mp-ci', 'upload',
    projectPath,
    `--pkp=${privateKeyPath}`,
    `--type=${type}`,
    `--ver="${version}"`,
    `--desc="${description}"`,
    `--robot=${robot}`,
    `--env=${env}`
];

console.log('argvs', argvs);

;(async () => {
    const project = new ci.Project({
        appid,
        type,
        projectPath,
        privateKeyPath,
        // ignores: ['node_modules/**/*'],
    })
    const uploadResult = await ci.upload({
        project,
        version,
        desc: description,
        setting: {
            es6: true,
        },
        robot,
        onProgressUpdate: console.log,
    })
    console.log(uploadResult)
})()

// exec.exec('npx', argvs, {
//     listeners: {
//         stdout: (data: Buffer) => {
//             console.log('stdout', data.toString());
//         },
//         stderr: (data: Buffer) => {
//             console.error(data.toString());
//         }
//     }
// }).then(res => {
//     console.log(res);
// });

