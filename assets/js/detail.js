const id = new URLSearchParams(window.location.search).get("id")
const flower=document.querySelector(".flower-main")

    axios.get(`http://localhost:3000/main/`+id)
    .then(res => res.data)
    .then(element => {
        console.log(element);
    flower.innerHTML=`
        <div>
            <div class="card">
                <div class="image">
                    <img src=${element.image} alt="">
                </div>
                <div class="icon-text">
                    <h3>${element.name}</h3>
                    <span class="price">$${element.price}</span>
                </div>
            </div>
        </div>`
    })