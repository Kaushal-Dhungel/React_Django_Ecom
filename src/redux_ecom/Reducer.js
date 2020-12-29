import axios from 'axios'

const initialStore = {
    cart_items: [],
    total_items : 0,
    total_amount : 0,
    change: ''
}

export const fetchDataNav = (token) => {
    return  (dispatch)=> {

         axios.get('http://reactshopee.herokuapp.com/orders/',{
            headers: {
                    "Content-Type" : "application/json",
                    Authorization : `Token ${token}`
            }
        })
        .then (response => {
            const items = response.data['get_cart_items']
            const total = response.data['get_cart_total']

            if(items === undefined){
                dispatch({type: 'TOTAL', payload : [0,total]})
                return
            }
            dispatch({type: 'TOTAL', payload : [items,total]})
        })
        .catch (error =>{
            dispatch({type: 'TOTAL', payload : [0,0]})

        })
    }
}



export const updateCart = (e) => {
    return (dispatch) => {
        const action = e.target.dataset.action;
        const id = e.target.dataset.product;
        const token = e.target.dataset.token;
        const auth = e.target.dataset.auth

        if (auth !== 'false')
        {    
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization : `Token ${token}`
                }
            };

            
            axios.post('http://reactshopee.herokuapp.com/cartitems/',{action,id},config)

            .then (response => {console.log(response.data)
                    dispatch({type: 'UPDATE_NAV'})}
            )
            
            .catch (error =>{
                console.log(error)
            })
        }

        else {
            alert("you need to register before performing this action")
        }



}
    
}


  
const Reducer = (state = initialStore,action) => {

    switch(action.type){
        case 'TOTAL':
            return {
                ...state,
                total_items : action.payload[0] ,
                total_amount : action.payload[1],
            }
        
        case 'UPDATE_NAV':  // this is for add_to_cart button
            return {
                ...state,
                total_items : state.total_items + 1,
            }


            default:
                return {
                    ...state
                }
    }

}

export default Reducer;
