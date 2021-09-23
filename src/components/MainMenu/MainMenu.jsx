import React from 'react'
import styles from './MainMenu.module.css'
import {Redirect} from 'react-router-dom'
import Storage from '../Storage/Storage'

function MainMenu({state, dispatch}) {
    const [storageId, setStorage] = React.useState('')


    const buttonExit = () => {
        dispatch({type:"EXIT"})
    }

    const buttonStorage = (id) => {
        setStorage(id)
    }

    const buttonBack=()=> {
        setStorage('')
    }

    if(!state.auth) return <Redirect to={'/'}/>

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <div className={styles.header}>
                    <div>Склады</div>
                    <div className={styles.login}>
                        <div>
                            {state.name}
                        </div>
                        <button onClick={buttonExit} className='btn btn-danger btn-sm'>Выход</button>
                    </div>
                </div>{}
                {!storageId ?
                    <ChangeStorage state={state} buttonStorage={buttonStorage}/>:
                    <Storage storageId={storageId} buttonBack={buttonBack} dispatch={dispatch} storage={state.storage.filter(item=>item.id===storageId)} />
                }
            </div>
        </div>
    )
}

const ChangeStorage = ({state, buttonStorage}) => {
    return <div className={styles.storageMenu}>
    {
        state.storage.map(item=><button onClick={()=>buttonStorage(item.id)} key={item.nameStorage} type="button" className="btn btn-primary btn-lg">{item.nameStorage}</button>)    
    }
</div>
}


export default MainMenu
