document.addEventListener("DOMContentLoaded", function () {
  // ----- SMOOTH SCROLL UNTUK NAVIGASI DAN FOOTER LINK -----
  // Gabungkan semua link nav dan .footer-link agar scroll smooth
  const smoothLinks = document.querySelectorAll('nav a[href^="#"], .footer-link');
  smoothLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ----- Scroll ke #portofolio saat klik "Lihat Karya Saya" -----
  const lihatKaryaBtn = document.querySelector('.primary');
  if (lihatKaryaBtn) {
    lihatKaryaBtn.addEventListener('click', function() {
      const portofolioSection = document.getElementById('portofolio');
      if (portofolioSection) {
        portofolioSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ----- Scroll ke #harga saat klik "Dapatkan Penawaran Gratis" -----
  const penawaranBtn = document.querySelector('.outline');
  if (penawaranBtn) {
    penawaranBtn.addEventListener('click', function() {
      const hargaSection = document.getElementById('harga');
      if (hargaSection) {
        hargaSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ----- FILTER KATEGORI PORTOFOLIO -----
  function filterKategori(kategori) {
    const gambar = document.querySelectorAll('.kategori-gambar');
    gambar.forEach(img => {
      if (kategori === 'semua') {
        img.style.display = '';
      } else {
        img.style.display = img.classList.contains(kategori) ? '' : 'none';
      }
    });
  }
  // Event filter kategori + highlight tombol aktif
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const kategori = btn.getAttribute('data-kategori');
      filterKategori(kategori);
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  // Highlight kategori "Semua Karya" di awal
  if (filterBtns.length) {
    filterBtns[0].click();
  }

  // ----- Scroll ke form kontak saat klik "Mulai Sekarang" di harga -----
  document.querySelectorAll('.harga-card button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const formKontak = document.getElementById('form-kontak-scroll');
      if (formKontak) {
        formKontak.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ----- MODAL IMAGE SLIDER (Preview) -----
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("image-modal-img");
  const captionText = document.getElementById("image-modal-caption");
  const closeBtn = document.querySelector(".image-modal-close");
  const prevBtn = document.querySelector(".image-modal-prev");
  const nextBtn = document.querySelector(".image-modal-next");
  const galleryImgs = Array.from(document.querySelectorAll('.kategori-gambar'));
  let currentImgIndex = 0;

  function showModalAt(idx) {
    currentImgIndex = idx;
    const img = galleryImgs[currentImgIndex];
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerText = img.alt;
  }
  // Buka modal saat gambar diklik
  galleryImgs.forEach((img, idx) => {
    img.style.cursor = "zoom-in";
    img.addEventListener('click', function() {
      showModalAt(idx);
    });
  });
  // Tombol close modal
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
  }
  // Tombol prev pada modal
  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      showModalAt((currentImgIndex - 1 + galleryImgs.length) % galleryImgs.length);
    };
  }
  // Tombol next pada modal
  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.stopPropagation();
      showModalAt((currentImgIndex + 1) % galleryImgs.length);
    };
  }
  // Navigasi keyboard untuk modal
  document.addEventListener('keydown', function(e) {
    if (modal && modal.style.display === "block") {
      if (e.key === "Escape") {
        modal.style.display = "none";
      } else if (e.key === "ArrowLeft") {
        showModalAt((currentImgIndex - 1 + galleryImgs.length) % galleryImgs.length);
      } else if (e.key === "ArrowRight") {
        showModalAt((currentImgIndex + 1) % galleryImgs.length);
      }
    }
  });
  // Klik luar gambar untuk menutup modal
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  // ----- FORM KONTAK KIRIM KE WHATSAPP -----
  const form = document.getElementById("form-kontak");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.querySelector('#nama').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector("#pesan").value.trim();

      if (!name || !email || !message) {
        alert("Mohon lengkapi semua bidang formulir.");
        return;
      }

      // Nomor WhatsApp tujuan (tanpa +, pakai 62 untuk Indonesia)
      const waNumber = "62895363043768"; // GANTI dengan nomor WA kamu!
      const text = encodeURIComponent(
        `Halo, saya ingin bertanya/berkonsultasi.\n\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`
      );
      const waLink = `https://wa.me/${waNumber}?text=${text}`;

      window.open(waLink, "_blank");
      form.reset();
    });
  }

  // ----- Navbar Active Saat Scroll -----
  // Beri .active pada nav link yg sesuai posisi scroll
  window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    let fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      if (section) {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // ----- Saran tambahan -----
  // Autofocus ke input nama di form kontak (UX lebih baik)
  if (form) {
    form.querySelector("#nama")?.focus();
  }
  // Tutup modal jika user scroll (UX: biar tidak menghalangi navigasi)
  window.addEventListener("scroll", function() {
    if (modal && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
});