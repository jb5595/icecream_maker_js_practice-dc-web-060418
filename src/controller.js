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
    // ingredients.forEach(ingredient => parentNode.appendChild(ingredient.node))
    parentNode.appendChild(Ingredient.CreateIngredientsForm())
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
    document.querySelector(`#edit-${iceCream.id}`).addEventListener("click",Controller.createEditIceCreamForm)

  }

  static createIceCreamFromForm(e){
    e.preventDefault()
    let iceCreamName = createIceCreamForm.querySelector("#iceCreamName").value
    let checkboxes = createIceCreamForm.querySelectorAll(".checkbox")
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
  static createEditIceCreamForm(e){
    let iceCream = allIceCreams.find(iceCream=> iceCream.id == e.target.dataset.id)
    iceCream.node.querySelector("ul").remove()
    let iceCreamCard = document.querySelector(`#icecream-${iceCream.id}`)
    iceCreamCard.appendChild(iceCream.createEditForm())
    Controller.removeEditAndDeleteButtons(iceCream)
    Controller.addSubmitButton(iceCream)
    iceCream.node.querySelector("h3").remove()
    Controller.addEditNameInput(iceCream)
  }

  static addEditNameInput(iceCream){
    let iceCreamCard = document.querySelector(`#icecream-${iceCream.id}`)
    let input = document.createElement("input")
                 input.type = "text"
                 input.id = `name-${iceCream.id}`
                 input.value = `${iceCream.name}`
                 input.dataset.id = `${iceCream.id}`
   iceCreamCard.insertBefore(input, iceCreamCard.children[0]);
  }

  static addSubmitButton(iceCream){
    let iceCreamCard = document.querySelector(`#icecream-${iceCream.id}`)
    let button = document.createElement("button")
                 button.id = `submit-${iceCream.id}`
                 button.dataset.id = `${iceCream.id}`
                 button.innerText = "Submit"
    iceCreamCard.insertBefore(button, iceCreamCard.children[2]);
    button.addEventListener("click", Controller.editIceCream)
  }
  static removeEditAndDeleteButtons(iceCream){
    let edit = document.querySelector(`#edit-${iceCream.id}`)
    let deleteButton = document.querySelector(`#delete-${iceCream.id}`)
    edit.remove()
    deleteButton.remove()
  }

  static editIceCream(e){
    let iceCream = allIceCreams.find(icecream=> icecream.id == e.target.dataset.id)
    let iceCreamCard = document.querySelector(`#icecream-${iceCream.id}`)
    let nameInput = iceCreamCard.querySelector(`#name-${iceCream.id}`).value
    let checkboxes = iceCreamCard.querySelectorAll(".checkbox")
    let ingredientIds = []
    checkboxes.forEach(function(checkbox){
      if (checkbox.checked){
        ingredientIds.push(checkbox.dataset.id)
      }
    })
    iceCream.ingredients_ids = ingredientIds
    iceCream.name = nameInput
    
    // updates Ice Cream instance with new Dom element
    iceCream.createDomElement()
    Adapter.updateIceCream(iceCream).then(function(ice_cream){

      iceCreamCard.remove()
      Controller.displayIceCream(iceCream)
    })
  }

}
