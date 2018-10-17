let allIngredients = []
class Ingredient{
  constructor({ id, name }){
    this.id = id
    this.name = name
    this.createDomElement()
    allIngredients.push(this)
  }

  createDomElement(){
    this.node = document.createElement("li")
              this.node.id = `${this.id}`
              this.node.dataset.id= `${this.id}`

    this.node.innerHTML = `<label for="ing-${this.id}">${this.name}</label>
                          <input id="ing-${this.id}" data-id="${this.id}" class= "checkbox" type="checkbox">`
  }
}
