import React from 'react'
import styles from './Storage.module.css'

function Storage({buttonBack, storage, dispatch, storageId}) {
    const [categories, setCategories] = React.useState(null)
    const [brand, setBrand] = React.useState(null)
    const [isAddGoods, setIsAddGoods] = React.useState(false)


    const buttonCoise = (e) => {
        setCategories(e)
    }
    const buttonCoiseBrand =(e) => {
        setBrand(e)
    }
    React.useEffect(() => {
       setBrand(null)
    }, [categories])
    
    const addGoods = () => {
        setIsAddGoods(true)
    }

    if(!storage) return <div>Empty</div>
    const arrItems = categories && storage[0].categories[categories].filter(item=>item.brand === brand)
    const arrKeyCategories = Object.keys(storage[0].categories)
    
    const arrKeyBrand = categories && storage[0].categories[categories]
    .map(item=>item.brand)
    .filter(function(item, pos) {
        return storage[0].categories[categories]
        .map(item=>item.brand).indexOf(item) === pos;
    })
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.addGoods}>
                <button onClick={()=> addGoods()} type="button" className="btn btn-success">Добавить товар</button>
            </div>
            <div className={styles.searchInput}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Введите товар или артикул" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Поиск</button>
                </div>
            </div>
            <div className={styles.wrapperMenu}>
                <div >
                    <button onClick={()=>buttonBack()} type="button" className="btn btn-info">назад</button>
                </div>
                <div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Ассортимент
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            {arrKeyCategories && arrKeyCategories.map(item=>{
                                return <li key={item}><button  onClick={()=>buttonCoise(item)} className="dropdown-item" type="button">{item}</button></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {categories && <div className={styles.container}>
                <h3>{categories}</h3>
                <div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Брэнд
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            {arrKeyBrand && arrKeyBrand.map(item=>{
                                return <li key={item}><button  onClick={()=>buttonCoiseBrand(item)} className="dropdown-item" type="button">{item}</button></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            }
            {arrItems && 
                <div className={styles.listItems}>
                <ul className="list-group">
                    {arrItems.map(item=><li key={item.articl} className="list-group-item">
                        <div className={styles.item}>
                            <div>
                                <div>
                                    Артикл: {item.articl}
                                </div>
                                    Модель: {item.brand} {item.model} 
                                </div>
                            <div>
                            <div>{item.price} р</div>
                            </div>
                            <div className={styles.countButton}>
                                <button type="button" className="btn btn-danger">-</button>
                                <div>{item.count}</div>
                                <button type="button" className="btn btn-success">+</button>
                                <button type="button" className="btn btn-primary">Sell</button>
                            </div>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
            }{isAddGoods &&
                <ModalWindow storageId={storageId} setIsAddGoods={setIsAddGoods} dispatch={dispatch}/>
            }
            
        </div>
    )
}

const ModalWindow = ({setIsAddGoods, dispatch, storageId}) => {
    const [goods, setGoods] = React.useState({storageId, id: 4})

    const addGoods = () => {
        let validation = Object.keys(goods).length>6 && !Object.values(goods).some(item=>item==='')
        if(validation){
            dispatch({type: "ADD_GOODS", payload: goods})
            setIsAddGoods(false)
        }
        
    }

    return(
        <div className={styles.modal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Добавление товара</h5>
                    <button onClick={()=>setIsAddGoods(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className={styles.inputAddGoods}>
                        <input onChange={(e)=>setGoods({...goods, articl:e.currentTarget.value})} type="text" className="form-control" placeholder="Артикл" aria-label="Username" aria-describedby="basic-addon1"/>
                        <input onChange={(e)=>setGoods({...goods, categories:e.currentTarget.value})} type="text" className="form-control" placeholder="Картегория" aria-label="Username" aria-describedby="basic-addon1"/>
                        <input onChange={(e)=>setGoods({...goods, brand:e.currentTarget.value})} type="text" className="form-control" placeholder="Брэнд" aria-label="Username" aria-describedby="basic-addon1"/>
                        <input onChange={(e)=>setGoods({...goods, model:e.currentTarget.value})} type="text" className="form-control" placeholder="Модель" aria-label="Username" aria-describedby="basic-addon1"/>
                        <input onChange={(e)=>setGoods({...goods, price:e.currentTarget.value})} type="text" className="form-control" placeholder="Цена" aria-label="Username" aria-describedby="basic-addon1"/>
                        <input onChange={(e)=>setGoods({...goods, count:e.currentTarget.value})} type="text" className="form-control" placeholder="Количество" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    </div>
                    <div className="modal-footer">
                    <button onClick={()=>setIsAddGoods(false)} type="button" className="btn btn-danger" data-bs-dismiss="modal">отмена</button>
                    <button onClick={()=>addGoods()} type="button" className="btn btn-primary">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Storage
