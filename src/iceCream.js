let allIceCreams = []

class IceCream{
  constructor({name, ingredients, id}){
    this.name = name;
    this.ingredients_ids = ingredients;
    this.id = id;
    this.image = "icecream.jpeg"
    this.createDomElement()
    allIceCreams.push(this)
  }

  get ingredients(){
  return allIngredients.filter(ingredient => this.ingredients_ids.includes(`${ingredient.id}`))
  }


  static deleteIceCream(iceCreamId){
    allIceCreams = allIceCreams.filter(iceCream=> iceCream.id != iceCreamId)
  }

  createDomElement(){
    this.node = document.createElement("div")
              this.node.id = `icecream-${this.id}`

    let h3 = document.createElement("h3")
             h3.innerText = `${this.name}`
             this.node.appendChild(h3)

    let image = document.createElement("img")
                image.src= `${this.image}`
                this.node.appendChild(image)

    let buttons = document.createElement("div")
                buttons.innerHTML = `
                <button data-button-type="edit" id = "edit-${this.id}"data-id = "${this.id}" class="editButton">Edit</button>
                <button data-button-type="delete"  id = "delete-${this.id}" data-id = "${this.id}"  class="deleteButton">Delete</button>`
                this.node.appendChild(buttons)

    let h4 = document.createElement("h4")
            h4.innerText= "Ingredients:"
            this.node.appendChild(h4)
    let ingredientsList = document.createElement("ul")

    this.ingredients.forEach(function(ingredient){
      let li = document.createElement("li")
              li.innerHTML = `<li data-ingredientid="${ingredient.id}">${ingredient.name}</li>`
              ingredientsList.appendChild(li)
    })

    this.node.appendChild(ingredientsList)
  }
}
