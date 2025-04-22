export default function Button({value , isheld , hold}){
    const style={
            backgroundColor: isheld ? '#59E391' : 'white',  
         
    }
    return(
        <button style={style} onClick={hold}>
           {value}
        </button>  
    )
}