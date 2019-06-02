# Jargon.ist CLI

> jargon.ist için geliştirilmiş komut satırı arayüzü ile çalışan bir komut satırı

    Buraya GIF eklenecek


# Kurulum

    $ npm install -g jargonist

# Nasıl kullanılır?

    $ jargonist <aranacak jargon>
    
    # Örnek:
    
    $ jargonist git
    
    √ jargon.ist'e bağlanılıyor...

	Başlık: remote git
	Etiket(ler): remote git
	Açıklama: remote, clone'lanan repository'nin kaynak repository ile senkronize kalmasına yardımcı bir git komutudur. Başlangıçta kaynak belirtilmediyse komut origin repository'sini yazdırır, bu repository'lere tanımlanan standart isimdir.
**Birden fazla kelimeli jargon araması**

	$ jargonist "<aranacak jargon>"
	
    $ jargonist "remote git"
	√ jargon.ist'e bağlanılıyor...

	Başlık: remote git
	Etiket(ler): remote git
	Açıklama: remote, clone'lanan repository'nin kaynak repository ile senkronize kalmasına yardımcı bir git komutudur. Başlangıçta kaynak belirtilmediyse komut origin repository'sini yazdırır, bu repository'lere tanımlanan standart isimdir.

# Son
Jargon.ist CLI, **[Volkan Yıldız](https://github.com/volkany)** tarafından geliştirilmektedir ve bir açık kaynak projedir.