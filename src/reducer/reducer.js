export const initialState = {
    infoTest: {
        users: [
            {
              id:1,
              login: 'ozz',
              pass: '1234'
            }
        ]
    },
    auth: false,
    name: '',
    storage: [
        {
            id: 1,
            nameStorage: 'первый склад',
            path: '/storage',
            categories: {
              phone: [
                { 
                  id: 1,
                  articl: 1000001,
                  brand: 'iphone',
                  model: '7',
                  price: 10000,
                  count: 0
                },
                { 
                  id: 2,
                  articl: 106540001,
                  brand: 'Samsung',
                  model: 'S8',
                  price: 13000,
                  count: 0
                },
                { 
                  id: 3,
                  articl: 10654361,
                  brand: 'Xiaomi',
                  model: 'Note 8',
                  price: 8000,
                  count: 0
                },
              ],
              glass: [
                {
                  id: 1,
                  articl: 1000001,
                  brand: 'iphone',
                  model: '7/8',
                  price: 500,
                  count: 0
                },
                {
                  id: 2,
                  articl: 1000001,
                  brand: 'Samsung',
                  model: '7/8',
                  price: 500,
                  count: 0
                },
                {
                  id: 2,
                  articl: 1000001,
                  brand: 'Realme',
                  model: '7/8',
                  price: 500,
                  count: 0
                },
              ],
              case: [

              ]
            }

        },
        {
            id: 2,
            nameStorage: 'второй склад',
            categories: {
              phone: [
                
              ],
              glass: [
                
              ]
            }
        },
        

    ]
}


export const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK": {
      const user = state.infoTest.users[0];
      if (
        action.payload.login === user.login &&
        action.payload.password === user.pass
      ) {
        return {...state, auth: true, name: action.payload.login}
      }else{
        return { ...state, auth: false };
      }
    }
    case "ADD_GOODS": {
      const categories = action.payload.categories
      const arrNew = state.storage.filter(item=>item.id === action.payload.storageId)[0]
      const arrNew1 = state.storage.filter(item=>item.id !== action.payload.storageId)[0]
      let changeArr
      if(arrNew.categories[categories]){
        changeArr = {...arrNew, categories: {...arrNew.categories, [categories]: [...arrNew.categories[categories]]}}
      }else{
        changeArr = {...arrNew, categories: {...arrNew.categories, [categories]: []}}
      }
   
      return {...state, 
        storage: [{...changeArr, categories: {...changeArr.categories, [categories]: [...changeArr.categories[categories], action.payload]}}, arrNew1 ]
      }
    }
    case "EXIT": {
      return {...state, auth: false}
    }

    default:
      return state;
  }
};
