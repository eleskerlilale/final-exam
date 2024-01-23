const id =new URLSearchParams(window.location.search).get("id")
const form=document.querySelector(".form")
const name=document.querySelector("#name")
const price=document.querySelector("#price")
const save=document.querySelector(".save")
const image=document.querySelector(".image")
const img=document.querySelector("img")
const file=document.querySelector("#file")
const table=document.querySelector("table")
const tbody=document.querySelector("tbody")

if(id){
    axios.get(`http://localhost:3000/main/`+id)
    .then(res => res.data)
    .then(data => {
        img.src=data.image
        name.value=data.name
        price.value=data.price
    })
    table.style.display='none'
}else{
    axios.get(`http://localhost:3000/main/`)
    .then(res => res.data)
    .then(data => {
        data.forEach(element => {
            if(element.type){
                tbody.innerHTML+=`
                   <tr>
                   <td>${element.id}</td>
                   <td>${element.name}</td>
                   <td>${element.price}</td>
                   <td>
                   <a href="./add.html?id=${element.id}"><i class="bi bi-pencil"></i></a>
                   <i class="bi bi-trash3" onclick='delFunc(${element.id})'></i>
                   </td>
               </tr>`
                }
        })
        
    })
}

function delFunc(id){
    console.log(id);
    axios.delete(`http://localhost:3000/main/${id}`)
    window.location.reload()
}

file.addEventListener("input", () => {
    const i = file.files[0]
    if(i) {
        const reader= new FileReader
        reader.readAsDataURL(i)
        reader.addEventListener("load", () => {
            img.src=reader.result
        })
    }
})

save.addEventListener("click" , () => {
    if(name.value=='' || price.value=='' || img.src==''){
       alert("butun xanalari doldur")
    }
    else{
        if(id){
            axios.put(`http://localhost:3000/main/`+id, {
                name:name.value,
                price:price.value,
                image:img.src
            })
        }else{
            axios.post(`http://localhost:3000/main/`, {
                name:name.value,
                price:price.value,
                image:img.src,
                type:true
            })
        }
        window.location='./index.html'
    }
})