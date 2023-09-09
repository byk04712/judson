#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const { inquirerPrompt } = require('./inquirer');
const { copyDir, checkMkdirExists, copyFile, copyTemplate } = require('./copy');
const { install } = require('./manager')

yargs.command(
	['create', 'c'],
	'新建一个模版',
	function(yarg) {
		return yarg.option('name', {
			alias: 'n',
			demand: true,
			describe: '模版名称',
			type: 'string'
		})
	},
	function(argv) {
		inquirerPrompt(argv)
			.then(answers => {
				const { name, type } = answers
				const isMkdirExists = checkMkdirExists(
					path.resolve(process.cwd(), `./src/pages/${name}`)
				)

				if (isMkdirExists) {
					console.log(`${name} 文件夹已经存在`)
				} else {
					// copyDir(
					// 	path.resolve(__dirname, `./template/${type}`),
					// 	path.resolve(process.cwd(), `./src/pages/${name}`)
					// )

					// copyFile(
					// 	path.resolve(__dirname, `./template/${type}/index.js`),
					// 	path.resolve(process.cwd(), `./src/pages/${name}/index.js`)
					// )

					copyTemplate(
						path.resolve(__dirname, `./template/${type}/index.tpl`),
						path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
						{
							name
						}
					)
					install(process.cwd(), answers)
				}
			})
	}
).argv;