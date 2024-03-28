import './index.css'

const CryptoItem=(props)=>{
    const {details}=props
    const {symbol,rate,description,rateFloat}=details
    return(
        <div className='box'>
            <h1>{symbol}</h1>
            <p>{description}</p>
            <p>The price is <span>{rate}</span> or to be exact <span>{rateFloat}</span></p>
        </div>
    )
}
export default CryptoItem