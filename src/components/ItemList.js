import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";
import { CDN_URL } from "../../utils/constants";

const ItemList = ({ items }) => {

const dispatch=useDispatch();

const handleAddItem=(items)=>{
  dispatch(addItem(items))
}

  return (
    <div>
      {items.map((items) => (
        <div
          key={items.card.info.id}
          className="p-2 m-2  border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{items.card.info.name}</span>-
              <span>
                ₹
                {items.card.info.price
                  ? items.card.info.price / 100
                  : items.card.info.defaultprice / 100}
              </span>
            </div>
            <p className="text-xs">{items.card.info.description}</p>
          </div>
          <div className="w-3/12">
            <div className="absolute">
              <button className="p-2 bg-gray-200 shadow-lg  m-auto"
              onClick={()=>handleAddItem(items)}>
                Add +
              </button>
            </div>

            <img
              src={CDN_URL + items.card.info.imageId}
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
