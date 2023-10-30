import "./Item.css"

const Item = ({item}) => {

    return (
        <div className="item">
            <h2><image src="src/components/item/icons8-phone-100 (1).png"></image>{item.name}</h2>
        </div>
    )
}

export default Item;