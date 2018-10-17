const createIceCreamButton = document.querySelector("#create-ice-cream")
const createIceCreamCheckBoxes = document.querySelector("iceCreamCheckboxes")
const createIceCreamForm = document.querySelector("#iceCreamForm")
class Controller{
  static init(){
    Adapter.getIngredients()
    .then(function(ingredientsData){
      Controller.createIngredients(ingredientsData)
      Controller.displayIngredientsForm(allIngredients)
    })
    Adapter.getIceCreams()
    .then(function(iceCreamData){
      Controller.createIceCreams(iceCreamData)
      Controller.displayIceCreams(allIceCreams)
    })
    createIceCreamButton.addEventListener("click",Controller.createIceCreamFromForm)
    createIceCreamForm.addEventListener("submit",Controller.createIceCreamFromForm)
  }

  static createIngredients(ingredientsData){
      ingredientsData.forEach(function(ingredientData){
      let ingredient = new Ingredient(ingredientData)
    })
  }

  static displayIngredientsForm(ingredients){
    let parentNode = document.querySelector("#iceCreamCheckboxes")
    ingredients.forEach(ingredient => parentNode.appendChild(ingredient.node))
  }

  static createIceCreams(iceCreamData){
    iceCreamData.forEach(data => new IceCream(data))
  }

  static displayIceCreams(iceCreams){
    iceCreams.forEach(iceCream => Controller.displayIceCream(iceCream) )
  }
  static displayIceCream(iceCream){
    let parentNode = document.querySelector("#iceCreamGrid")
    parentNode.appendChild(iceCream.node)

    document.querySelector(`#delete-${iceCream.id}`).addEventListener("click",Controller.deleteIceCream)
    document.querySelector(`#edit-${iceCream.id}`).addEventListener("click",Controller.editIceCream)

  }

  static createIceCreamFromForm(e){
    e.preventDefault()
    let iceCreamName = document.querySelector("#iceCreamName").value
    let checkboxes = document.querySelectorAll(".checkbox")
    let ingredientIds = []
    checkboxes.forEach(function(checkbox){
      if (checkbox.checked){
        ingredientIds.push(checkbox.dataset.id)
        checkbox.checked = false
      }
    })
    let data = {"name":iceCreamName, "ingredients": ingredientIds}
    Adapter.postIceCream(data).then(function(iceCreamData){
      let iceCream = new IceCream(iceCreamData)
      Controller.displayIceCream(iceCream)
    })
    createIceCreamForm.reset()
  }

  static deleteIceCream(e){
    let id = e.target.dataset.id
    let iceCream = allIceCreams.find(iceCreamObj=>iceCreamObj.id == id)
    Adapter.deleteIceCream(iceCream).then(function(data){
      IceCream.deleteIceCream(iceCream.id)
      iceCream.node.remove()
    })
  }
  static editIceCream(e){
    let iceCream = allIceCreams.find(iceCream=> iceCream.id = e.target.dataset.id)
    // iceCream.node.querySelector("ul").remove()
    debugger
  }
}
