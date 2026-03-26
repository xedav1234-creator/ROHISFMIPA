const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-LUj6UM_IWtnLFyx0t5S6UkEVw1vLnYNCUB9BUKAODY_TiPOU4xi8s0-bM5qmMj2w/exec";

function handleFormSubmit(e) {
    e.preventDefault(); 
    
    const form = e.target;
    const n = form.querySelector('#nama').value;
    const p = form.querySelector('#prodi').value;
    const i = form.querySelector('#nim').value;
    const t = form.querySelector('#tgl_pinjam').value;
    const b = form.querySelector('#buku').value;

    console.log("Data Terdeteksi:", { n, p, i, t, b });

    if (!n.trim() || !p.trim()) {
        alert("NAMA dan PRODI tidak boleh kosong!");
        return;
    }

    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "UPLOADING...";
    btn.disabled = true;

    const finalUrl = `${SCRIPT_URL}?nama=${encodeURIComponent(n)}&prodi=${encodeURIComponent(p)}&nim=${encodeURIComponent(i)}&tanggal=${encodeURIComponent(t)}&buku=${encodeURIComponent(b)}`;

    fetch(finalUrl, {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(() => {
        alert("Terima Kasih Sudah Meeminjam, Selamat Membaca!.");
        closeContent(); 
    })
    .catch(err => {
        console.error(err);
        alert("Gagal mengirim data!");
        btn.innerText = originalText;
        btn.disabled = false;
    });
}

function openMenu(menuName) {
    const menuContainer = document.querySelector('.p3r-menu');
    const contentScreen = document.getElementById('content-screen');
    const body = document.getElementById('content-body');

    menuContainer.classList.add('exit-animation');

    setTimeout(() => {
        document.getElementById('content-title').innerText = menuName;
        
        if(menuName === 'TATA TERTIB') {
            document.getElementById('content-body').innerHTML = `
                <ul>
                    <li>Dilarang merusak fasilitas perpustakaan.</li>
                    <li>Wajib menjaga ketenangan di area sekitar.</li>
                    <li>Buku yang rusak wajib diperbaiki/diganti.</li>
                    <li>Pengembalian buku yang dipinjam harus tepat waktu.</li>
                    <li>Peminjaman buku maksimal 1 pekan.</li>
                </ul>`;
        }

        if (menuName === 'FAQ') {
            body.innerHTML = `
                <div class="faq-container">
                    <div class="faq-item">
                        <h3 class="faq-subtitle">BAGAIMANA CARA MENGGANTI BUKU RUSAK?</h3>
                        <p class="faq-text">
                            Segera lapor ke petugas. Penggantian dapat dilakukan dengan buku 
                            berjudul sama atau membayar denda sesuai ketentuan perpustakaan.
                        </p>
                    </div>

                    <div class="faq-item">
                        <h3 class="faq-subtitle">BERAPA LAMA DURASI PEMINJAMAN?</h3>
                        <p class="faq-text">
                            Durasi peminjaman maksimal adalah 7 hari kerja dan dapat diperpanjang 
                            satu kali jika buku tidak sedang dipesan oleh orang lain.
                        </p>
                    </div>
                </div>
            `;
        }

        if (menuName === 'TENTANG KAMI') {
            body.innerHTML = `
                <div class="about-container">
                    <div class="about-item">
                        <h3 class="about-subtitle">MISI KAMI</h3>
                        <p class="about-text">
                            Menjadi pusat literasi yang dinamis dan modern, menyediakan akses 
                            pengetahuan bagi seluruh civitas akademika dengan semangat pelayanan 
                            yang unggul dan koleksi yang up-to-date.
                        </p>
                    </div>

                <div class="about-item">
                    <h3 class="about-subtitle">ROHIS PERPUSTAKAAN</h3>
                    <p class="about-text">
                        Kami berdedikasi untuk menciptakan lingkungan membaca yang nyaman, 
                        aman, dan inspiratif. Melalui inovasi digital, kami berusaha 
                        memudahkan akses informasi di mana saja dan kapan saja.
                    </p>
                </div>
            </div>
            `;
        }

        if (menuName === 'PEMINJAMAN BUKU') {
            body.innerHTML = `
                <form id="loan-form" onsubmit="handleFormSubmit(event)" class="p3r-form">
                    <div class="input-group"><label>NAMA</label><input type="text" id="nama" required></div>
                    <div class="input-group"><label>PRODI</label><input type="text" id="prodi" required></div>
                    <div class="input-group"><label>NIM</label><input type="text" id="nim" required></div>
                    <div class="input-group"><label>TANGGAL</label><input type="date" id="tgl_pinjam" required></div>
                    <div class="input-group"><label>BUKU</label><input type="text" id="buku" required></div>
                    <button type="submit" class="submit-btn">KONFIRMASI DATA</button>
                </form>
            `;
        }
        document.getElementById('content-screen').classList.add('active');
    }, 400);
}   

function closeContent() {
    const menuContainer = document.querySelector('.p3r-menu');
    const contentScreen = document.getElementById('content-screen');

    contentScreen.classList.remove('active');
    
    setTimeout(() => {
        menuContainer.classList.remove('exit-animation');
    }, 500);
}