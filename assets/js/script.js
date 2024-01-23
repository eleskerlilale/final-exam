const menuBtn=document.querySelector(".menu-button")
const menuList=document.querySelector(".menu-list")
const loadMore=document.querySelector(".load-more")
const flower=document.querySelector(".flower-main")
const sort=document.querySelector(".sort")
const search=document.querySelector("#search")
const btn=document.querySelector(".btn")
const menubtn=document.querySelector(".menu-btn")
const count=document.querySelector(".count")

btn.addEventListener("click" ,( ) => {
    menubtn.style.height="130px"
console.log(menuBtn);
})
menuBtn.addEventListener("click" , () => {
    if(menuBtn.classList.value=='menu-button'){
        menuList.style.left='0'
        menuBtn.classList.toggle("active")
        menuBtn.innerHTML=`<i class="bi bi-x-lg"></i>`
    }else{
        menuList.style.left='-300px'
        menuBtn.innerHTML=`<i class="bi bi-list"></i>`
        menuBtn.classList.toggle("active")
    }
})
let page=1;
function item(){
    axios.get(`http://localhost:3000/main?_page=${page}&_limit=4`)
    .then(res => res.data)
    .then(data => {
        axios.get(`http://localhost:3000/favorite`)
        .then(res => res.data)
        .then(datafav => {
            count.innerText=`${datafav.length}`
            data.forEach(element => {
                const ids = datafav.find( f => f.id === element.id)
                if(ids){
                    flower.innerHTML+=`
                    <div class="col-lg-3 col-sm-4 col-sm-6 col-xs-12">
                        <div class="card">
                            <div class="image">
                                <img src=${element.image} alt="">
                                <div class="icon">                                    
                                    <a href="./add.html?id=${element.id}"><i class="bi bi-pencil"></i></a>
                                    <i class="bi bi-trash3" onclick='delFunc(${element.id})'></i>
                                    <i class="bi bi-heart-fill bi${element.id}" onclick="favFunc(${element.id})"></i>
                                </div>
                            </div>
                            <div class="icon-text">
                                <h3>${element.name}</h3>
                                <span class="price">$${element.price}</span>
                                <a href="./detail.html?id=${element.id}">Detail</a>
                            </div>
                        </div>
                    </div>`
                }else{
                    flower.innerHTML+=`
                    <div class="col-lg-3 col-sm-4 col-sm-6 col-xs-12">
                        <div class="card">
                            <div class="image">
                                <img src=${element.image} alt="">
                                
                                <div class="icon">                                    
                                    <a href="./add.html?id=${element.id}"><i class="bi bi-pencil"></i></a>
                                    <i class="bi bi-trash3" onclick='delFunc(${element.id})'></i>
                                    <i class="bi bi-heart bi${element.id}" onclick="favFunc(${element.id})"></i>
                                </div>
                            </div>
                            <div class="icon-text">
                                <h3>${element.name}</h3>
                                <span class="price">$${element.price}</span>
                                <a href="./detail.html?id=${element.id}">Detail</a>
                            </div>
                        </div>
                    </div>`
                }
            })
        })
    })
}
item()
loadMore.addEventListener("click" , () => {
    page++
    item()
    axios.get(`http://localhost:3000/main`)
    .then(res => res.data)
    .then(data => {
        if( data.length <= page*4){
            loadMore.remove()
        }
    })
})
function delFunc(id){
    console.log(id);
    axios.delete(`http://localhost:3000/main/${id}`)
    window.location.reload()
    
}
function favFunc(id){
    const fav=document.querySelector(`.bi${id}`)
    axios.get(`http://localhost:3000/main/`+id)
    .then(res => res.data)
    .then(data => {
        axios.get(`http://localhost:3000/favorite`)
        .then(res => res.data)
        .then(datafav => {
            const ids=datafav.find(f => f.id === data.id)
            if(ids){
                axios.delete(`http://localhost:3000/favorite`)
                fav.classList.add("bi-heart")
                fav.classList.remove("bi-heart-fill")
                count.innerText=`${Number(datafav.length)-1}`
            }
            else{
                axios.post(`http://localhost:3000/favorite`, data)
                fav.classList.remove("bi-heart")
                fav.classList.add("bi-heart-fill")
                count.innerText=`${Number(datafav.length)+1}`

            }
        })
    })
}

sort.addEventListener("click" ,() => {
    axios.get(`http://localhost:3000/main`)
    .then(res => res.data)
    .then(data => {
        info=[...data]

        if(sort.innerText=='Default'){

            infonew=data.sort((a,b) => a.price.localeCompare(b.price))
            sort.innerText='Azdan Coxa'
        }
        else if ( sort.innerText=='Azdan Coxa'){
            infonew=data.sort((a,b) => a.price.localeCompare(b.price))
            sort.innerText='Coxdan Aza'
        }else{
            sort.innerText='Default'
            infonew=info
        }
        infonew.forEach(element=>{
            console.log(element);
        })
    })
})
search.addEventListener("input", () => {
    flower.innerHTML=``
    loadMore.remove()
    axios.get(`http://localhost:3000/main`)
    .then(res => res.data)
    .then(data => {
        data.forEach(element => {
            console.log(search.value.toLowerCase().includes("f"));
            if(element.name.toLowerCase().includes(search.value.toLowerCase())){
                flower.innerHTML+=`
                <div class="col-lg-3 col-sm-4 col-sm-6 col-xs-12">
                    <div class="card">
                        <div class="image">
                            <img src=${element.image} alt="">
                            <div class="icon">                                    
                                <a href="./add.html?id=${element.id}"><i class="bi bi-pencil"></i></a>
                                <i class="bi bi-trash3" onclick='delFunc(${element.id})'></i>
                                <i class="bi bi-heart-fill bi${element.id}" onclick="favFunc(${element.id})"></i>
                            </div>
                        </div>
                        <div class="icon-text">
                            <h3>${element.name}</h3>
                            <span class="price">$${element.price}</span>
                            <a href="./detail.html?id=${element.id}">Detail</a>
                        </div>
                    </div>
                </div>`
            }
        })
    })
})
