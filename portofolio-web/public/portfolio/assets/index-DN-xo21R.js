(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`menuToggle`),t=document.getElementById(`navLinks`);e.addEventListener(`click`,function(){let n=t.classList.toggle(`active`);e.innerHTML=n?`✕`:`☰`,e.setAttribute(`aria-expanded`,String(n)),e.setAttribute(`aria-label`,n?`Tutup menu navigasi`:`Buka menu navigasi`)}),document.querySelectorAll(`.nav-links a`).forEach(function(n){n.addEventListener(`click`,function(){t.classList.remove(`active`),e.innerHTML=`☰`,e.setAttribute(`aria-expanded`,`false`),e.setAttribute(`aria-label`,`Buka menu navigasi`)})});var n=new Date().getFullYear();console.log(`Portfolio Farhan berhasil dimuat!`),console.log(`Tahun:`,n);var r=document.getElementById(`contactForm`),i=document.getElementById(`contactFormStatus`),a;function o(e,t=`success`){let n=document.getElementById(`contactToast`);n||(n=document.createElement(`div`),n.id=`contactToast`,n.className=`contact-toast`,n.setAttribute(`role`,`status`),n.setAttribute(`aria-live`,`polite`),document.body.appendChild(n)),n.textContent=e,n.classList.remove(`success`,`error`),n.classList.add(t,`show`),clearTimeout(a),a=setTimeout(function(){n.classList.remove(`show`)},4e3)}r&&i&&r.addEventListener(`submit`,async function(e){e.preventDefault();let t=r.querySelector(`button[type="submit"]`),n=t.textContent,a=document.getElementById(`contactName`).value.trim(),c=document.getElementById(`contactEmail`).value.trim(),l=document.getElementById(`contactSubject`).value.trim(),u=document.getElementById(`contactMessage`).value.trim();function d(e,t){i.hidden=!1,i.textContent=e,i.className=t?`text-sm text-green-400`:`text-sm text-red-400`,o(e,t?`success`:`error`)}t.disabled=!0,t.textContent=`Mengirim pesan...`,i.hidden=!0;try{let e=await fetch(`${s}/messages`,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({sender_name:a,sender_email:c,subject:l,body:u})}),t=await e.json();if(e.status===422){d(t.errors?Object.values(t.errors).flat().join(` `):t.message||`Periksa kembali data yang kamu masukkan.`,!1);return}if(e.status===429){d(`Terlalu banyak pesan dikirim. Silakan tunggu sebentar sebelum mencoba lagi.`,!1);return}if(!e.ok)throw Error(t.message||`Pesan gagal dikirim. Silakan coba lagi.`);d(t.message||`Pesan berhasil dikirim!`,!0),r.reset()}catch(e){console.error(`Error Contact Form:`,e),d(e.message||`Terjadi kesalahan. Periksa koneksi dan coba lagi.`,!1)}finally{t.disabled=!1,t.textContent=n}});var s=`/api/portfolio`,c=document.getElementById(`skillsDataContainer`);function l(e){return String(e??``).replace(/[&<>"']/g,function(e){return{"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`}[e]})}async function u(){if(c){c.innerHTML=`
        <div class="skills-container skeleton-container" aria-label="Memuat skills">
            ${Array.from({length:6},function(){return`
                    <div class="skill-card skeleton">
                        <span class="skeleton-line"></span>
                    </div>
                `}).join(``)}
        </div>
    `;try{let e=await fetch(`${s}/skills`);if(!e.ok)throw Error(`Gagal mengambil data skills.`);let t=(await e.json()).data||[];if(t.length===0){c.innerHTML=`
                <p class="section-description">
                    Belum ada data skills yang tersedia.
                </p>
            `;return}let n=t.reduce(function(e,t){let n=t.category||`Lainnya`;return e[n]||(e[n]=[]),e[n].push(t),e},{});c.innerHTML=Object.entries(n).map(function([e,t]){return`
                    <div class="skill-group">
                        <h3 class="skill-category-title">
                            ${l(e)}
                        </h3>

                        <div class="skills-container">
                            ${t.map(function(e){return`
                                    <div class="skill-card">
                                        ${l(e.name)}
                                    </div>
                                `}).join(``)}
                        </div>
                    </div>
                `}).join(``)}catch(e){console.error(`Error Fetch Skills:`,e),c.innerHTML=`
            <p class="section-description">
                Data skills gagal dimuat. Silakan coba muat ulang halaman.
            </p>
        `}}}u();var d=document.getElementById(`projectsDataContainer`);async function f(){if(d){d.innerHTML=`
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2" aria-label="Memuat proyek">
            ${Array.from({length:2},function(){return`
                    <div class="rounded-2xl border border-purple-500/20 bg-white/5 p-7">
                        <div class="skeleton-line mb-5" style="width: 45%; height: 16px;"></div>
                        <div class="skeleton-line mb-3" style="width: 90%;"></div>
                        <div class="skeleton-line mb-3" style="width: 75%;"></div>
                        <div class="skeleton-line" style="width: 55%;"></div>
                    </div>
                `}).join(``)}
        </div>
    `;try{let e=await fetch(`${s}/projects`);if(!e.ok)throw Error(`Gagal mengambil data projects.`);let t=(await e.json()).data||[],n={edubridge:`project-edubridge`,smartstock:`project-smartstock`,"civora-community-reporting-app":`project-civora`},r=[];t.forEach(function(e){let t=n[e.slug];if(t){let n=document.getElementById(t);if(!n)return;let r=n.querySelector(`.project-content > p:not(.project-category)`),i=n.querySelector(`.project-tags`);r&&(r.textContent=e.description||``),i&&(i.innerHTML=(e.skills||[]).map(function(e){return`<span>${l(e.name)}</span>`}).join(``));return}let i=(e.skills||[]).map(function(e){return`<span>${l(e.name)}</span>`}).join(``);r.push(`
                <div class="project-card">
                    <div class="project-image">
                        <div class="project-fallback">
                            ${l(e.title)}
                        </div>
                    </div>

                    <div class="project-content">
                        <p class="project-category">PROJECT · PORTFOLIO</p>

                        <h3>${l(e.title)}</h3>

                        <p>${l(e.description||``)}</p>

                        <div class="project-tags">
                            ${i}
                        </div>
                    </div>
                </div>
            `)}),d.innerHTML=r.join(``)}catch(e){console.error(`Error Fetch Projects:`,e),d.innerHTML=``}}}f();var p=document.getElementById(`certificatesDataContainer`);async function m(){if(p){p.innerHTML=`
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2" aria-label="Memuat sertifikat">
            ${Array.from({length:2},function(){return`
                    <div class="rounded-2xl border border-purple-500/20 bg-white/5 p-7">
                        <div class="skeleton-line mb-5" style="width: 55%; height: 16px;"></div>
                        <div class="skeleton-line mb-3" style="width: 70%;"></div>
                        <div class="skeleton-line mb-3" style="width: 45%;"></div>
                        <div class="skeleton-line" style="width: 85%;"></div>
                    </div>
                `}).join(``)}
        </div>
    `;try{let e=await fetch(`${s}/certificates`);if(!e.ok)throw Error(`Gagal mengambil data sertifikat.`);let t=await e.json(),n=(Array.isArray(t.data)?t.data:[]).filter(function(e){let t=(e.title||``).toLowerCase(),n=(e.issuer||``).toLowerCase(),r=(e.description||``).toLowerCase();return!(t.includes(`contoh`)||n.includes(`dummy`)||r.includes(`bukan sertifikat asli`))});if(n.length===0){p.innerHTML=`
                <p class="section-description">
                    Belum ada sertifikat tambahan dari API.
                </p>
            `;return}p.innerHTML=`
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                ${n.map(function(e){let t=e.credential_url?`
                            <a
                                href="${l(e.credential_url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-purple-400 hover:text-purple-300"
                            >
                                Lihat Sertifikat
                            </a>
                        `:``;return`
                        <div class="rounded-2xl border border-purple-500/20 bg-white/5 p-7">
                            <h3 class="text-xl font-semibold">
                                ${l(e.title||`Sertifikat`)}
                            </h3>

                            <p class="mt-2 text-sm text-gray-400">
                                ${l(e.issuer||``)}
                            </p>

                            <p class="mt-3 text-sm text-gray-400">
                                ${l(e.issued_date?new Date(e.issued_date).toLocaleDateString(`id-ID`):``)}
                            </p>

                            <p class="mt-3 text-sm text-gray-300">
                                ${l(e.description||``)}
                            </p>

                            <div class="mt-4">
                                ${t}
                            </div>
                        </div>
                    `}).join(``)}
            </div>
        `}catch(e){console.error(`Error Fetch Certificates:`,e),p.innerHTML=`
            <p class="section-description">
                Data sertifikat dari API belum dapat dimuat.
            </p>
        `}}}m();var h=document.getElementById(`githubDataContainer`);async function g(){if(h){h.innerHTML=`
        <div class="skeleton-line mb-4" style="width: 40%; height: 18px;"></div>
        <div class="skeleton-line mb-3" style="width: 70%;"></div>
        <div class="skeleton-line" style="width: 50%;"></div>
    `;try{let e=await fetch(`https://api.github.com/users/farhanalhabsyi`);if(!e.ok)throw e.status===403||e.status===429?Error(`Batas permintaan GitHub API tercapai. Coba lagi nanti.`):Error(`Gagal mengambil profil GitHub.`);let t=await e.json();h.innerHTML=`
            <div class="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                <img
    src="${l(t.avatar_url)}"
    alt="Foto profil GitHub"
    class="h-24 w-24 rounded-full border border-purple-500/30"
    loading="lazy"
    onerror="this.onerror=null; this.src='assets/profile.jpg';"
>

                <div class="flex-1">
                    <h3 class="text-2xl font-semibold">
                        ${l(t.name||t.login)}
                    </h3>

                    <p class="mt-1 text-purple-400">
                        @${l(t.login)}
                    </p>

                    <p class="mt-3 text-sm leading-relaxed text-gray-400">
                        ${l(t.bio||`Profil GitHub`)}
                    </p>

                    <div class="mt-5 flex flex-wrap justify-center gap-5 text-sm text-gray-300 sm:justify-start">
                        <span>
                            <strong>${t.public_repos}</strong> Repositories
                        </span>

                        <span>
                            <strong>${t.followers}</strong> Followers
                        </span>

                        <span>
                            <strong>${t.following}</strong> Following
                        </span>
                    </div>

                    <a
                        href="${l(t.html_url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mt-5 inline-block text-purple-400 hover:text-purple-300"
                    >
                        Kunjungi Profil GitHub ↗
                    </a>
                </div>
            </div>
        `}catch(e){console.error(`Error GitHub API:`,e),h.innerHTML=`
            <p class="section-description">
                Profil GitHub belum dapat dimuat.
                <a
                    href="https://github.com/farhanalhabsyi"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-purple-400 hover:text-purple-300"
                >
                    Buka profil GitHub secara langsung.
                </a>
            </p>
        `}}}g();var _=document.getElementById(`projectSearch`),v;_&&_.addEventListener(`input`,function(){clearTimeout(v),v=setTimeout(function(){let e=_.value.trim().toLowerCase();document.querySelectorAll(`.projects-container .project-card`).forEach(function(t){let n=t.textContent.toLowerCase();t.style.display=n.includes(e)?``:`none`})},300)});