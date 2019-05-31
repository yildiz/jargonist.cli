#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

const log = console.log;

const JARGONS = {
	git: { keywords: "commit, push, pull, fetch, branch, merge", description: "git, bir versiyon kontrol sistemidir. Sürüm kontrolü, bir ya da daha fazla dosya üzerinde yapılan değişiklikleri kaydeden ve daha sonra belirli bir sürüme geri dönebilmenizi sağlayan bir sistemdir."},
	integer: { keywords: "number", description: "integer, İngilizce tamsayı anlamına gelir. Programlama dillerinde tamsayı türündeki değişkenleri ifade eder."},
}

const getJargon = jargon => {
	if(JARGONS[jargon]){
		log(`${chalk.blue.bold('Başlık')}: ${jargon}\n${chalk.blue.bold('Etiket(ler)')}: ${JARGONS[jargon].keywords}\n${chalk.blue.bold('Açıklama')}: ${JARGONS[jargon].description}`);
	}else{
		log(`${chalk.white.bgRed.bold(" Hata: ")} "${jargon}" jargonist'te bulunmuyor, eklemek ister misin?\nhttps://jargon.ist/ekle/${jargon}`);
	}
}

program
	.version('0.0.1')
	.option('-d, --debug', 'output extra debugging')
	.arguments('<keyword>')
		.action(getJargon)

program.parse(process.argv);