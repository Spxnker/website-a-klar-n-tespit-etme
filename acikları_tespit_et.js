function güvenlikTaraması() {
    const rapor = [];

    function raporEkle(tür, mesaj) {
        rapor.push({ tür: tür, mesaj: mesaj });
    }

    // XSS (Cross-Site Scripting) kontrolü
    const xssTestString = '<script>alert("XSS açığı!")</script>';
    if (document.body.innerHTML.includes(xssTestString)) {
        raporEkle('XSS', 'XSS açığı bulundu');
    }

    // SQL Injection kontrolü (Örnek olarak, form alanlarından gelen kullanıcı girdileri güvenli bir şekilde işlenmediğinde)
    const sqlInjectionTestString = "' OR 1=1--";
    if (document.body.innerHTML.includes(sqlInjectionTestString)) {
        raporEkle('SQL Injection', 'SQL Injection açığı bulundu');
    }

    // CSRF (Cross-Site Request Forgery) kontrolü
    // Burada bir istek yaparak CSRF saldırısını tespit etmek için örnek bir istek gönderilebilir.

    // Clickjacking kontrolü
    if (window != top) {
        raporEkle('Clickjacking', 'Clickjacking açığı bulundu');
    }

    // Güvenli olmayan bağlantı kontrolü (HTTP yerine HTTPS kullanımı)
    if (window.location.protocol === 'http:') {
        raporEkle('Güvenli Olmayan Bağlantı', 'Güvenli olmayan bağlantı bulundu');
    }

    // Güvenlik duvarı ayarları kontrolü (X-Frame-Options, Content Security Policy vb.)
    const xFrameOptions = document.querySelector('meta[http-equiv="X-Frame-Options"]');
    if (!xFrameOptions || xFrameOptions.content !== 'DENY' || xFrameOptions.content !== 'SAMEORIGIN') {
        raporEkle('X-Frame-Options', 'X-Frame-Options açığı bulundu');
    }
    const contentSecurityPolicy = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!contentSecurityPolicy) {
        raporEkle('Content Security Policy', 'Content Security Policy (CSP) açığı bulundu');
    }

    // Raporu döndür
    return rapor;
}

// Güvenlik taramasını yap ve raporu al
const güvenlikRaporu = güvenlikTaraması();
console.log(güvenlikRaporu);
