const BaseURL = "http://localhost:3000/"

class Adapter{

  static getIngredients(){
    const url = BaseURL + "ingredient"
    return fetch(url).then(response => response.json())
  }

  static getIceCreams(){
    const url = BaseURL + "ice_cream"
    return fetch(url).then(response => response.json())
  }

  static postIceCream(data){
    const url = BaseURL + "ice_cream"
    return fetch(url,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
  }

  static deleteIceCream(iceCream){
    const url = BaseURL + `ice_cream/${iceCream.id}`
    return fetch(url,{
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response=>response.json())
  }
}
