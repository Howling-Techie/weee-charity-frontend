import PropTypes from 'prop-types';
import {FaCircleInfo, FaRoute} from "react-icons/fa6";
import Barcode from "react-barcode";

export const ItemLabel = ({item}) => {
    return (
        <div className="bg-white text-black p-2 rounded-lg flex flex-col h-48 w-96">
            <div className="w-full flex justify-evenly place-items-center">
                <Barcode value={item.reference_number} height={80}/>
            </div>
            <div className="w-full justify-between flex h-full items-center px-2">
                <ul>
                    <li className="flex items-center text-xl font-semibold space-x-2">
                        <FaCircleInfo/><span>{item.name}</span>
                    </li>
                </ul>
                <ul>
                    <li className="flex items-center text-xl font-semibold space-x-2 min-w-32">
                        <FaRoute/><span>{item.transfer.postcode}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
        ;
}

ItemLabel.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        reference_number: PropTypes.string.isRequired,
        transfer: PropTypes.shape({
            postcode: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired
};