(()=>{var l=class{ver;type;finished;paged;genre_list;subjects;genre;baseAPI="https://node.wpista.com/v1/outer/";token;constructor(){this.ver="1.0.1",this.type="movie",this.finished=!1,this.paged=1,this.genre_list=[],this.genre=[],this.subjects=[],this._create()}on(e,s,a){var t=document.querySelectorAll(s);t.forEach(r=>{r.addEventListener(e,a)})}_fetchGenres(){document.querySelector(".db--genres").innerHTML="",fetch(this.baseAPI+"genres?token="+this.token+"&type="+this.type).then(e=>e.json()).then(e=>{e.data.length&&(this.genre_list=e.data,this._renderGenre())})}_handleGenreClick(){this.on("click",".db--genreItem",e=>{let s=e.currentTarget;if(s.classList.contains("is-active")){let a=this.genre.indexOf(s.innerText);s.classList.remove("is-active"),this.genre.splice(a,1),this.paged=1,this.finished=!1,this.subjects=[],this._fetchData();return}document.querySelector(".db--list").innerHTML="",document.querySelector(".lds-ripple").classList.remove("u-hide"),s.classList.add("is-active"),this.genre.push(s.innerText),this.paged=1,this.finished=!1,this.subjects=[],this._fetchData()})}_renderGenre(){document.querySelector(".db--genres").innerHTML=this.genre_list.map(e=>`<span class="db--genreItem${this.genre_list.includes(e.name)?" is-active":""}">${e.name}</span>`).join(""),this._handleGenreClick()}_fetchData(){fetch(this.baseAPI+"faves?token="+this.token+"&type="+this.type+"&paged="+this.paged+"&genre="+JSON.stringify(this.genre)).then(e=>e.json()).then(e=>{e.data.length?(document.querySelector(".db--list").classList.contains("db--list__card")?(this.subjects=[...this.subjects,...e.data],this._randerDateTemplate()):(this.subjects=[...this.subjects,...e.data],this._randerListTemplate()),document.querySelector(".lds-ripple").classList.add("u-hide")):(this.finished=!0,document.querySelector(".lds-ripple").classList.add("u-hide"))})}_randerDateTemplate(){let e=this.subjects.reduce((a,t)=>{let r=new Date(t.create_time),i=r.getFullYear(),n=r.getMonth()+1,c=`${i}-${n.toString().padStart(2,"0")}`;return Object.prototype.hasOwnProperty.call(a,c)?a[c].push(t):a[c]=[t],a},{}),s="";for(let a in e){let t=a.split("-");s+=`<div class="db--listBydate"><div class="db--titleDate "><div class="db--titleDate__day">${t[1]}</div><div class="db--titleDate__month">${t[0]}</div></div><div class="db--dateList__card">`,s+=e[a].map(r=>`<div class="db--item">${r.is_top250?'<span class="top250">Top 250</span>':""}<img src="${r.poster}" referrerpolicy="no-referrer" class="db--image"><div class="db--score ">${r.douban_score>0?'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>'+r.douban_score:""}${r.year>0?" \xB7 "+r.year:""}</div><div class="db--title"><a href="${r.link}" target="_blank">${r.name}</a></div></div>`).join(""),s+="</div></div>"}document.querySelector(".db--list").innerHTML=s}_randerListTemplate(){document.querySelector(".db--list").innerHTML=this.subjects.map(e=>`<div class="db--item">${e.is_top250?'<span class="top250">Top 250</span>':""}<img src="${e.poster}" referrerpolicy="no-referrer" class="db--image"><div class="ipc-signpost ">${e.create_time}</div><div class="db--score ">${e.douban_score>0?'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>'+e.douban_score:""}${e.year>0?" \xB7 "+e.year:""}</div><div class="db--title"><a href="${e.link}" target="_blank">${e.name}</a></div>
                </div>
                </div>`).join("")}_handleScroll(){window.addEventListener("scroll",()=>{var e=window.scrollY||window.pageYOffset;document.querySelector(".block-more").offsetTop+-window.innerHeight<e&&document.querySelector(".lds-ripple").classList.contains("u-hide")&&!this.finished&&(document.querySelector(".lds-ripple").classList.remove("u-hide"),this.paged++,this._fetchData())})}_handleNavClick(){this.on("click",".db--navItem",e=>{if(e.currentTarget.classList.contains("current"))return;this.genre=[],this.type=e.currentTarget.dataset.type,this.type!="book"?(this._fetchGenres(),document.querySelector(".db--genres").classList.remove("u-hide")):document.querySelector(".db--genres").classList.add("u-hide"),document.querySelector(".db--list").innerHTML="",document.querySelector(".lds-ripple").classList.remove("u-hide"),document.querySelector(".db--navItem.current").classList.remove("current"),e.target.classList.add("current"),this.paged=1,this.finished=!1,this.subjects=[],this._fetchData()})}_create(){if(document.querySelector(".db--container")){let e=document.querySelector(".db--container");if(e.dataset.token)this.token=e.dataset.token;else return;let s=document.querySelector(".db--navItem.current");s instanceof HTMLElement&&(this.type=s.dataset.type);let a=document.querySelector(".db--list");a.dataset.type&&(this.type=a.dataset.type),this.type=="movie"&&document.querySelector(".db--genres").classList.remove("u-hide"),this._fetchGenres(),this._fetchData(),this._handleScroll(),this._handleNavClick()}document.querySelector(".db--collection")&&document.querySelectorAll(".db--collection").forEach(e=>{this._fetchCollection(e)})}_fetchCollection(e){let s=e.dataset.style?e.dataset.style:"card";fetch(obvInit.api+"v1/movies?type="+e.dataset.type+"&paged=1&genre=&start_time="+e.dataset.start+"&end_time="+e.dataset.end).then(a=>a.json()).then(a=>{if(a.length)if(s=="card")e.innerHTML+=a.map(t=>`<div class="doulist-item">
                            <div class="doulist-subject">
                            <div class="db--viewTime ">Marked ${t.create_time}</div>
                            <div class="doulist-post"><img referrerpolicy="no-referrer" src="${t.poster}"></div><div class="doulist-content"><div class="doulist-title"><a href="${t.link}" class="cute" target="_blank" rel="external nofollow">${t.name}</a></div><div class="rating"><span class="allstardark"><span class="allstarlight" style="width:75%"></span></span><span class="rating_nums">${t.douban_score}</span></div><div class="abstract">${t.remark||t.card_subtitle}</div></div></div></div>`).join("");else{let t=a.reduce((i,n)=>(Object.prototype.hasOwnProperty.call(i,n.create_time)?i[n.create_time].push(n):i[n.create_time]=[n],i),{}),r="";for(let i in t)r+=`<div class="db--date">${i}</div><div class="db--dateList">`,r+=t[i].map(n=>`<div class="db--card__list"">
                                    <img referrerpolicy="no-referrer" src="${n.poster}">
                                    <div>
                                    <div class="title"><a href="${n.link}" class="cute" target="_blank" rel="external nofollow">${n.name}</a></div>
                                    <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:75%"></span></span><span class="rating_nums">${n.douban_score}</span></div>
                                    ${n.remark||n.card_subtitle}
                                    </div>
                                    </div>`).join(""),r+="</div>";e.innerHTML=r}})}};new l;document.querySelector(".menu--icon")&&document.querySelector(".menu--icon").addEventListener("click",()=>{document.querySelector(".site--nav").classList.add("is-active"),document.querySelector("body").classList.add("menu--actived")});document.querySelector(".mask")&&document.querySelector(".mask").addEventListener("touchstart",()=>{document.querySelector(".site--nav").classList.remove("is-active"),document.querySelector("body").classList.remove("menu--actived")});if(document.querySelector('[data-action="loadmore"]')){let e=document.querySelector('[data-action="loadmore"]'),s=document.querySelector(".lds-circle"),a=document.querySelector(".articleList");e.addEventListener("click",()=>{s.classList.remove("u-hide"),e.classList.add("u-hide"),fetch("/index.json").then(t=>t.json()).then(t=>{let r=e.dataset.paged,n=t.slice((r-1)*5,r*5).map(c=>`<article class="articleItem articleItem__withImage">  
                    ${c.cover?`<img src="${c.cover}" class="cover">`:""}
                    <div class="content">
                        <h2 class="title">
                            <a href="${c.permalink}">
                                ${c.title}
                            </a>
                        </h2>
                        <div class="summary">${c.summary}</div>
                        <div class="time">${c.date}</div>
                    </div>
                </article>`);a.innerHTML+=n.join(""),s.classList.add("u-hide"),e.dataset.paged+=1,r*5<t.length&&document.querySelector(".button--more").classList.remove("u-hide")})})}})();
