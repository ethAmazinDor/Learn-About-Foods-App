const sectionCenter = document.querySelector('.section-center')
const btnContainer = document.querySelector('.btn-container')
url = 'https://www.themealdb.com/api/json/v1/1/categories.php'





window.addEventListener('DOMContentLoaded', () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let mealInfo = data.categories
            displayMenuItems(mealInfo)
            displayBtns()



        })
        .catch(err => {
            console.log(err)
        })



})

function displayMenuItems(categoryItems) {

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)


            let displayMenu = categoryItems.map((item) => {
                return `<article class="menu-item">
                <div class="item-info">
                    <header>
                        <h4>${item.strCategory}</h4>
                        <img src="${item.strCategoryThumb}" class="photo" alt="">
                    </header>
                    <p class="item-text">${item.strCategoryDescription}</p>
                </div>
            </article>`
            }).join('')

            sectionCenter.innerHTML = displayMenu
        })
        .catch(err => {
            console.log(err)
        })

}

function displayBtns() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let mealInfo = data.categories
            const categories = mealInfo.reduce((values, item) => {
                if (!values.includes(item.strCategory)) {
                    values.push(item.strCategory)
                }
                return values
            }, ['all'])

            const categoryBtns = categories.map((category) => {
                return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`

            }).join('')

            btnContainer.innerHTML = categoryBtns
            const filterBtns = btnContainer.querySelectorAll('.filter-btn')
            filterBtns.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const category = e.currentTarget.dataset.id

                    const btnCategory = mealInfo.filter((menuItem) => {
                        if (menuItem.strCategory === category) {
                            return menuItem
                        }
                    })

                    if (category === 'all') {
                        displayMenuItems(mealInfo)
                    } else {
                        displayMenuItems(btnCategory)
                    }

                })
            })



        })
        .catch(err => {
            console.log(err)
        })



}


