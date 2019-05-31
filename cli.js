#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const Ora = require('ora');
const cliSpinners = require('cli-spinners');

const axios = require('axios');
const slug = require('slug');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const log = console.log;

const CLI = {
	version: "0.0.2"
}

let isJargonDefined = false;

const getJargon = jargon => {
	isJargonDefined = true;

	if(["dizin", "konular"].includes(jargon)){ log(`${chalk.white.bgRed.bold(" Hata: ")} "${jargon}" için arama yapılamıyor.`); return; }
	
	const spinner = new Ora({ text: 'jargon.ist\'e bağlanılıyor...\n', spinner: cliSpinners.point }).start();
	
	// TODO: seo url'e dönüştür
	axios.get("https://jargon.ist/"+slug(jargon, { lower: true })).then(response => {
		let document = new JSDOM(response.data).window.document;
		let status = response.status;
		if(status !== 200){
			log(`${chalk.white.bgRed.bold(" Hata: ")} "${jargon}" jargonist'te bulunmuyor, eklemek ister misin?\n\nhttps://github.com/jargonist/jargon.ist/blob/master/CONTRIBUTING.md`);
		}else{
				let title = document.querySelector("#___gatsby > main > section > div > div > h1").textContent;
				let desc = document.querySelector("#___gatsby > main > section > div > div > div.u-pad-top-xsmall > p:nth-child(1)").textContent;
				spinner.succeed();
				log(`${chalk.blue.bold('Başlık')}: ${jargon}\n${chalk.blue.bold('Etiket(ler)')}: ${jargon}\n${chalk.blue.bold('Açıklama')}: ${desc}\n\njargon.ist adresinde görüntüle:\n${"https://jargon.ist/"+slug(jargon, { lower: true })}`);
		}
	}).catch((err) => {
		spinner.succeed();
		if(err.response.status === 404){
			log(`${chalk.white.bgRed.bold(" Hata: ")} "${jargon}" jargonist'te bulunmuyor, eklemek ister misin?\n\nhttps://github.com/jargonist/jargon.ist/blob/master/CONTRIBUTING.md`);
		}else{
			log("Bilinmeyen hata oluştu. Hata Kodu: "+err.response.status);
		}
	}).finally(() => {
		spinner.stop();
	});
}

program
	.version(CLI.version, '-v, --version')
	.option('-d, --debug', 'output extra debugging')
	.option('-h, --help', 'list packages installed', {isDefault: true})
	.arguments('<keyword>')
		.action(getJargon);
	
program.parse(process.argv);

if(!isJargonDefined){
	log(`${chalk.blue("Kullanım:")} jargonist <kelime>\n\njargonist -h, --help  => yardım\njargonist -a, --about => hakkında\n\nVersion: ${CLI.version}`)
}