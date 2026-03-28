let title = document.getElementById('title')
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let inputs = document.querySelectorAll(".price input");
let total = document.querySelector(".total")
let create = document.querySelector(".create")
let count = document.getElementById('count')
let category = document.getElementById('category')
let searchInput = document.getElementById("search");
let btnTitle = document.getElementById("searchtitle");
let btnCategory = document.getElementById("searchcategory");
let mood = 'create'
let searchMood = "title";
let tmp;


inputs.forEach(input =>{
    input.addEventListener("input", calctotal)
})
function calctotal(){
    if(price.value !== ""){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = `المجموع ${result}`
        total.style.background = "green"
    }else{
        total.innerHTML = "المجموع"
        total.style.background = "red"

    }
}

let datapro;
if(localStorage.getItem("product")){
    datapro = JSON.parse(localStorage.getItem("product"))
}else{
    datapro = []
}


create.onclick = function(){
    let newpro = {
        title: title.value,
        price:+price.value,
        taxes:+taxes.value,
        ads:+ads.value,
        discount:+discount.value,
        count:+count.value,
        category:category.value,
        total:total.innerHTML
    }
    if(title.value !== "" && price.value !== ""){
        if(mood === 'create'){
        datapro.push(newpro)
    }else{
        datapro[tmp] = newpro;
        mood = 'create'
        create.innerHTML = 'انشاء'
    }
    }
    
    
    localStorage.setItem("product",JSON.stringify(datapro))
    clearInputs()
    showData()
}

function clearInputs(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    category.value = ""
    total.innerHTML = "المجموع"
    total.style.background = "red"
}

function showData() {
    let table = "";
    let cards = "";

    for (let i = 0; i < datapro.length; i++) {

        let totalCalc =
            (datapro[i].price +
                datapro[i].taxes +
                datapro[i].ads -
                datapro[i].discount) * datapro[i].count;

        // ✅ TABLE
        table += `
        <tr>
            <td>
                <input type="checkbox" class="checkItem" data-index="${i}">
                ${i + 1}
            </td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${totalCalc}</td>
            <td>${datapro[i].category}</td>
            <td>${datapro[i].count}</td>
            <td class="px-2 py-2">
            <!-- زرار التحديث -->
            <button onclick="updatedata(${i})"
                class="bg-purple-600 px-3 py-1 rounded w-full mb-2 cursor-pointer">
                تعديل
            </button>
            </td>

            <td class="px-2 py-2">
            <!-- زرار الحذف -->
            <button onclick="deleteData(${i})"
                class="bg-red-600 px-3 py-1 rounded w-full mb-2 cursor-pointer">
                مسح
            </button>
            </td>
        </tr>
        `;

        // ✅ CARDS
        cards += `
        <div class="bg-[#111] p-4 rounded-xl my-2 sm:hidden">

            <div class="flex justify-between">
                <span>#${i + 1}</span>
                <input type="checkbox" class="checkItem" data-index="${i}">
            </div>

            <h2 class="font-bold mt-2">${datapro[i].title}</h2>

            <p>💰 السعر: ${datapro[i].price}</p>
            <p>📊 المجموع: ${totalCalc}</p>
            <p>🏷 النوع: ${datapro[i].category}</p>
            <p>📦 العدد: ${datapro[i].count}</p>

            <div class="flex gap-3 mt-4">
                <button onclick="updatedata(${i})" class="flex-1 bg-purple-600 py-2 rounded">تعديل</button>
                <button onclick="deleteData(${i})" class="flex-1 bg-red-600 py-2 rounded">حذف</button>
            </div>

        </div>
        `
        let deletebutton = document.querySelector(".deletebutton");
let dlebto = document.querySelector(".dlebto");

if (datapro.length > 0) {
    deletebutton.innerHTML = `
    <button onclick="deleteAll()" 
    class="cursor-pointer w-full my-2 bg-purple-600 py-2 rounded-lg">
    مسح الكل (${datapro.length})
    </button>`;

    dlebto.innerHTML = `
    <button onclick="deletecheked()" 
    class="cursor-pointer w-full my-2 bg-purple-600 py-2 rounded-lg">
    مسح المحدد
    </button>`;
} else {
    deletebutton.innerHTML = "";
    dlebto.innerHTML = "";
}
    }

    document.getElementById("tbody").innerHTML = table;
    document.getElementById("cards").innerHTML = cards;
}
showData()
//ده سويت اليرت حطيته جوه مسح الكل 
function deleteAll() {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: "مش هتقدر ترجع البيانات تاني!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7c3aed',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم، امسح',
        cancelButtonText: 'إلغاء'
    }).then((result) => {
        if (result.isConfirmed) {
            // ✔️ المسح يحصل هنا فقط
            localStorage.clear();
            datapro = [];
            showData();

            Swal.fire(
                'تم المسح!',
                'تم حذف كل البيانات بنجاح.',
                'success'
            );
        }
    });
}

/*دي Array جديدة:

هنحط فيها المنتجات اللي هنسيبها

مش اللي هنمسحها لف على كل checkbox
لو الشيك بوكس مش متعلم احتفظ بالعنصر وخد المنتج اللي 
في الداتا برو وحطه في النيو داتا 
علشان المنتج اللي متعلم مش بيضاف ده بيتمسح تلقائي
*/
function deletecheked() {
    let checkboxes = document.querySelectorAll(".checkItem");
    let newData = [];

    checkboxes.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            newData.push(datapro[index]);
        }
    });

    datapro = newData;
    localStorage.setItem("product", JSON.stringify(datapro));
    showData();
}



function updatedata(i){
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    count.value = datapro[i].count
    category.value = datapro[i].category
    calctotal()
    mood = 'update'
    tmp = i
    create.innerHTML = 'تحديث'
}

function deleteData(i){
    datapro.splice(i,1)
    localStorage.setItem("product",JSON.stringify(datapro))
    showData()   
}

btnTitle.onclick = function(){
  searchMood = "title"
  searchInput.placeholder = "بحث بالاسم"
  searchInput.focus()
  searchInput.value = ""
  showData()
}

btnCategory.onclick = function(){
  searchMood = "category"
  searchInput.placeholder = "بحث بالنوع"
  searchInput.focus()
  searchInput.value = ""
  showData()
}

function searchData(value) {
  let table = "";

  for (let i = 0; i < datapro.length; i++) {
    if (
      (searchMood === "title" &&
        datapro[i].title.toLowerCase().includes(value.toLowerCase())) ||
      (searchMood === "category" &&
        datapro[i].category.toLowerCase().includes(value.toLowerCase()))
    ) {
      let totalCalc = (datapro[i].price + datapro[i].taxes + datapro[i].ads - datapro[i].discount) * datapro[i].count;
      table += `
      <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${totalCalc}</td>
        <td>${datapro[i].category}</td>
        <td>${datapro[i].count}</td>
        <td>
          <button onclick="updatedata(${i})"
            class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded cursor-pointer mb-[3px]">
            UPDATE
          </button>
        </td>
        <td>
          <button onclick="deleteData(${i})"
            class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded cursor-pointer">
            DELETE
          </button>
        </td>
      </tr>`;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}



showData()
calctotal()

