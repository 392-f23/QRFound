import "./Item.css"

const Item = ({item}) => {

    return (
        <div className="item">
            <h2>{item.itemName}</h2>
        </div>
    )
}

export default Item;