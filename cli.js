#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const Ora = require('ora');
const cliSpinners = require('cli-spinners');

const axios = require('axios');
const slug = require('slug');
const cheerio = require('cheerio');

const BASE_URL = 'https://jargon.ist';
const log = console.log;

const CLI = {
	version: '1.0.2'
}

let isJargonDefined = false;

const getJargon = jargon => {
	isJargonDefined = true;

	if(['dizin', 'konular'].includes(jargon)){ log(`${chalk.white.bgRed.bold(' Hata: ')} "${jargon}" için arama yapılamıyor.`); return; }
	
	const spinner = new Ora({ text: 'jargon.ist\'e bağlanılıyor...\n', spinner: cliSpinners.point }).start();
	
	const FETCH_URL = `${BASE_URL}/${slug(jargon, { lower: true })}`;
	axios.get(FETCH_URL, { timeout: 30000 }).then(response => {
		let status = response.status;
		
		if(status === 200){
			spinner.succeed();
			const $ = cheerio.load(response.data);

			const codeBlock = $("main > section div.gatsby-highlight").text();
			$("main > section div.gatsby-highlight").remove();
			
			const title = $("main > section h1.u-color-primary.u-clear-gap").text();
			const desc = $("main > section div.u-pad-top-xsmall").text();

			log(`${chalk.blue.bold('Başlık')}: ${title}\n${chalk.blue.bold('Etiket(ler)')}: ${jargon}\n${chalk.blue.bold('Açıklama')}: ${desc.trim()}`);
			if(codeBlock)
				log(`\n${chalk.black.bgGreen(' Kod: ')}\n${chalk.green(codeBlock.trim())}`);

			log(`\njargon.ist adresinde görüntüle:\n${FETCH_URL}`);
		}else{
			if(status === 404){
				log(`${chalk.white.bgRed.bold(' Hata: ')} "${jargon}" jargonist'te bulunmuyor, eklemek ister misin?\n\nhttps://github.com/jargonist/jargon.ist/blob/master/CONTRIBUTING.md`);
			}else{ log(`${chalk.white.bgRed.bold(' Hata: ')} Bilinmeyen bir hata meydana geldi. HTTP Kodu: ${status}`); }
		}
	}).catch(err => {
		if(err.code === "ECONNABORTED"){ spinner.fail(); log(`${chalk.white.bgRed.bold(' Hata: ')} İstek zaman aşımına uğradı.`); return; }
		if(err.response.status === 404){
			spinner.succeed();
			log(`${chalk.white.bgRed.bold(' Hata: ')} "${jargon}" jargonist'te bulunmuyor, eklemek ister misin?\n\nhttps://github.com/jargonist/jargon.ist/blob/master/CONTRIBUTING.md`);
		}else{
			spinner.fail();
			log('Bilinmeyen hata oluştu. Hata Kodu: '+err.response.status);
		}
	}).finally(() => {
		spinner.stop();
	});
}

program
	.version(CLI.version, '-v, --version')
	.option('-d, --debug', 'output extra debugging')
	.option('-h, --help', 'list packages installed', { isDefault: true })
	.arguments('<keyword>')
		.action(getJargon);
	
program.parse(process.argv);

if(!isJargonDefined){
	log(`${chalk.blue("Kullanım:")} jargonist <jargon>\n\njargonist -h, --help  => yardım\njargonist -a, --about => hakkında\n\nVersion: ${CLI.version}`)
}